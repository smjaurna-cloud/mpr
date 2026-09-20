<#
.SYNOPSIS
  DOCX → PDF → PNG Preview Renderer
  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)

.DESCRIPTION
  ใช้ Microsoft Word COM Automation เพื่อส่งออก DOCX เป็น PDF ชั่วคราว
  จากนั้นใช้ Poppler (pdftoppm) หรือ MuPDF (mutool) แปลง PDF เป็น PNG ทุกหน้า
  ไฟล์ .docx ต้นฉบับไม่ถูกแก้ไขหรือเปลี่ยนแปลงใดๆ ทั้งสิ้น

.PARAMETER InputDocx
  Path เต็มของไฟล์ .docx ที่ต้องการแสดงตัวอย่าง

.PARAMETER OutputDir
  Directory สำหรับเก็บไฟล์ PNG ชั่วคราว (จะถูกสร้างอัตโนมัติถ้าไม่มี)

.PARAMETER Dpi
  ความละเอียดของ PNG (default: 150 DPI — สมดุลระหว่างคุณภาพและขนาดไฟล์)

.OUTPUTS
  JSON object บน stdout:
  { "success": true, "pages": ["path1.png", "path2.png", ...], "totalPages": N }
  หรือ { "success": false, "error": "..." }

.EXAMPLE
  .\docx-preview-render.ps1 -InputDocx "D:\mpr\docs\mou\mou-mcukmutt-bai.docx" -OutputDir "C:\Temp\preview-abc123"
#>

[CmdletBinding()]
param(
  [Parameter(Mandatory = $true)]
  [string]$InputDocx,

  [Parameter(Mandatory = $true)]
  [string]$OutputDir,

  [Parameter(Mandatory = $false)]
  [int]$Dpi = 150
)

# ปิด error output ไปที่ stderr เท่านั้น เพื่อให้ stdout สะอาดสำหรับ JSON
$ErrorActionPreference = "Stop"

function Write-JsonResult {
  param($Object)
  Write-Output ($Object | ConvertTo-Json -Depth 5 -Compress)
}

# ─── ตรวจสอบ Input File ─────────────────────────────────────────────────────
if (-not (Test-Path -LiteralPath $InputDocx -PathType Leaf)) {
  Write-JsonResult @{ success = $false; error = "ไม่พบไฟล์: $InputDocx" }
  exit 1
}

$InputDocxResolved = (Resolve-Path -LiteralPath $InputDocx).Path
$FileExt = [System.IO.Path]::GetExtension($InputDocxResolved).ToLower()
if ($FileExt -ne ".docx") {
  Write-JsonResult @{ success = $false; error = "รองรับเฉพาะไฟล์ .docx เท่านั้น (ได้รับ: $FileExt)" }
  exit 1
}

# ─── สร้าง Output Directory ──────────────────────────────────────────────────
if (-not (Test-Path -LiteralPath $OutputDir)) {
  New-Item -ItemType Directory -Path $OutputDir -Force | Out-Null
}
$OutputDirResolved = (Resolve-Path -LiteralPath $OutputDir).Path

# ─── กำหนด Path ของ PDF ชั่วคราว ────────────────────────────────────────────
$TempPdfPath = Join-Path $OutputDirResolved "preview_temp.pdf"

# ─── ขั้นที่ 1: Word COM Automation (DOCX → PDF) ────────────────────────────
$wordApp = $null
try {
  $wordApp = New-Object -ComObject "Word.Application"
  $wordApp.Visible = $false
  $wordApp.DisplayAlerts = 0  # wdAlertsNone — ปิด dialog ทั้งหมด

  # เปิดไฟล์ DOCX แบบ ReadOnly, ไม่ Repair, ไม่ AddToRecentFiles
  $doc = $wordApp.Documents.Open(
    $InputDocxResolved,  # FileName
    $false,              # ConfirmConversions
    $true,               # ReadOnly ← ไฟล์ต้นฉบับปลอดภัย 100%
    $false,              # AddToRecentFiles
    "",                  # PasswordDocument
    "",                  # PasswordTemplate
    $true,               # Revert
    "",                  # WritePasswordDocument
    "",                  # WritePasswordTemplate
    1                    # Format: wdOpenFormatAuto
  )

  # Export เป็น PDF (wdFormatPDF = 17)
  $doc.SaveAs2($TempPdfPath, 17)
  $doc.Close($false)  # false = ไม่บันทึกการเปลี่ยนแปลง
}
catch {
  if ($null -ne $wordApp) {
    try { $wordApp.Quit($false) } catch {}
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($wordApp) | Out-Null
  }
  Write-JsonResult @{ success = $false; error = "Word COM Automation ล้มเหลว: $_" }
  exit 1
}
finally {
  if ($null -ne $wordApp) {
    try { $wordApp.Quit($false) } catch {}
    [System.Runtime.Interopservices.Marshal]::ReleaseComObject($wordApp) | Out-Null
    [System.GC]::Collect()
    [System.GC]::WaitForPendingFinalizers()
  }
}

# ตรวจสอบว่า PDF สร้างสำเร็จ
if (-not (Test-Path -LiteralPath $TempPdfPath)) {
  Write-JsonResult @{ success = $false; error = "Word ไม่สามารถสร้างไฟล์ PDF ชั่วคราวได้" }
  exit 1
}

# ─── ขั้นที่ 2: PDF → PNG (Poppler pdftoppm หรือ MuPDF mutool) ──────────────
$PngBaseName = Join-Path $OutputDirResolved "page"
$RenderedPages = @()
$RenderSuccess = $false
$RenderError = ""

# ลองใช้ pdftoppm (Poppler) ก่อน
$PdftoppmCmd = Get-Command "pdftoppm" -ErrorAction SilentlyContinue
if ($null -ne $PdftoppmCmd) {
  try {
    $Args = @(
      "-png",
      "-r", $Dpi.ToString(),
      $TempPdfPath,
      $PngBaseName
    )
    $proc = Start-Process -FilePath $PdftoppmCmd.Path -ArgumentList $Args `
              -Wait -NoNewWindow -PassThru `
              -RedirectStandardError (Join-Path $OutputDirResolved "pdftoppm_err.txt")

    if ($proc.ExitCode -eq 0) {
      $RenderSuccess = $true
    } else {
      $RenderError = "pdftoppm ออก exit code: $($proc.ExitCode)"
    }
  }
  catch {
    $RenderError = "pdftoppm error: $_"
  }
}

# ถ้า pdftoppm ล้มเหลว → ลอง mutool (MuPDF)
if (-not $RenderSuccess) {
  $MutoolCmd = Get-Command "mutool" -ErrorAction SilentlyContinue
  if ($null -ne $MutoolCmd) {
    try {
      # mutool convert -o page%d.png -O resolution=150 input.pdf
      $MuOutputPattern = Join-Path $OutputDirResolved "page%d.png"
      $Args = @(
        "convert",
        "-o", $MuOutputPattern,
        "-O", "resolution=$Dpi",
        $TempPdfPath
      )
      $proc = Start-Process -FilePath $MutoolCmd.Path -ArgumentList $Args `
                -Wait -NoNewWindow -PassThru `
                -RedirectStandardError (Join-Path $OutputDirResolved "mutool_err.txt")

      if ($proc.ExitCode -eq 0) {
        $RenderSuccess = $true
        $RenderError = ""
      } else {
        $RenderError = "mutool ออก exit code: $($proc.ExitCode)"
      }
    }
    catch {
      $RenderError += " | mutool error: $_"
    }
  }
}

# ─── เก็บรายชื่อ PNG ที่สร้างสำเร็จ ──────────────────────────────────────────
if ($RenderSuccess) {
  # รองรับทั้ง page-1.png (pdftoppm) และ page1.png (mutool)
  $PngFiles = Get-ChildItem -Path $OutputDirResolved -Filter "page*.png" |
    Sort-Object {
      if ($_.Name -match "page[_-]?(\d+)\.png") { [int]$Matches[1] }
      else { 0 }
    }

  foreach ($f in $PngFiles) {
    $RenderedPages += $f.FullName
  }
}

# ─── ลบ PDF ชั่วคราวและ error log files ─────────────────────────────────────
foreach ($cleanup in @($TempPdfPath, (Join-Path $OutputDirResolved "pdftoppm_err.txt"), (Join-Path $OutputDirResolved "mutool_err.txt"))) {
  if (Test-Path -LiteralPath $cleanup) {
    Remove-Item -LiteralPath $cleanup -Force -ErrorAction SilentlyContinue
  }
}

# ─── Output Result ────────────────────────────────────────────────────────────
if ($RenderSuccess -and $RenderedPages.Count -gt 0) {
  Write-JsonResult @{
    success    = $true
    pages      = $RenderedPages
    totalPages = $RenderedPages.Count
    renderer   = if ($null -ne $PdftoppmCmd) { "pdftoppm (Poppler)" } else { "mutool (MuPDF)" }
    dpi        = $Dpi
  }
  exit 0
} else {
  # ลบ temp PNG ที่อาจสร้างไม่สมบูรณ์
  Get-ChildItem -Path $OutputDirResolved -Filter "page*.png" -ErrorAction SilentlyContinue |
    Remove-Item -Force -ErrorAction SilentlyContinue

  Write-JsonResult @{
    success = $false
    error   = if ($RenderError) { $RenderError } else { "ไม่พบ pdftoppm หรือ mutool ใน PATH — กรุณาติดตั้ง Poppler for Windows" }
    hint    = "ดาวน์โหลด Poppler: https://github.com/oschwartz10612/poppler-windows/releases"
  }
  exit 1
}
