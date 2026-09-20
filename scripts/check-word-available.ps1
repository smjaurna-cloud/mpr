<#
.SYNOPSIS
  ตรวจสอบความพร้อมของ dependencies สำหรับ DOCX Preview Pipeline
  มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)

.DESCRIPTION
  ตรวจสอบว่าเครื่องนี้มี:
  1. Microsoft Word (COM Object) พร้อมใช้งาน
  2. pdftoppm (Poppler) หรือ mutool (MuPDF) สำหรับแปลง PDF → PNG

.OUTPUTS
  JSON status report บน stdout
#>

$result = @{
  wordAvailable     = $false
  wordVersion       = ""
  pdftoppmAvailable = $false
  pdftoppmPath      = ""
  mutoolAvailable   = $false
  mutoolPath        = ""
  recommendedRenderer = ""
  ready             = $false
  hints             = @()
}

# ─── ตรวจสอบ Microsoft Word COM ──────────────────────────────────────────────
try {
  $word = New-Object -ComObject "Word.Application" -ErrorAction Stop
  $result.wordAvailable = $true
  $result.wordVersion = $word.Version
  $word.Quit()
  [System.Runtime.Interopservices.Marshal]::ReleaseComObject($word) | Out-Null
  [System.GC]::Collect()
}
catch {
  $result.hints += "ไม่พบ Microsoft Word — กรุณาติดตั้ง Microsoft Office บนเครื่องนี้"
}

# ─── ตรวจสอบ pdftoppm (Poppler) ──────────────────────────────────────────────
$pdftoppmCmd = Get-Command "pdftoppm" -ErrorAction SilentlyContinue
if ($null -ne $pdftoppmCmd) {
  $result.pdftoppmAvailable = $true
  $result.pdftoppmPath = $pdftoppmCmd.Path
  $result.recommendedRenderer = "pdftoppm (Poppler)"
} else {
  $result.hints += "ไม่พบ pdftoppm — ดาวน์โหลด Poppler for Windows: https://github.com/oschwartz10612/poppler-windows/releases"
}

# ─── ตรวจสอบ mutool (MuPDF) ──────────────────────────────────────────────────
$mutoolCmd = Get-Command "mutool" -ErrorAction SilentlyContinue
if ($null -ne $mutoolCmd) {
  $result.mutoolAvailable = $true
  $result.mutoolPath = $mutoolCmd.Path
  if ($result.recommendedRenderer -eq "") {
    $result.recommendedRenderer = "mutool (MuPDF)"
  }
} else {
  $result.hints += "ไม่พบ mutool (MuPDF) — ทางเลือกสำรอง: https://mupdf.com/releases/"
}

# ─── สรุปสถานะ ────────────────────────────────────────────────────────────────
$result.ready = $result.wordAvailable -and ($result.pdftoppmAvailable -or $result.mutoolAvailable)

Write-Output ($result | ConvertTo-Json -Depth 3 -Compress)
exit $(if ($result.ready) { 0 } else { 1 })
