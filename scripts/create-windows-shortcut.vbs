' ==============================================================================
' Script to create Windows Desktop Shortcut for MVU College ERP Desktop App
' มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)
' ==============================================================================

Set WshShell = CreateObject("WScript.Shell")
Set FSO = CreateObject("Scripting.FileSystemObject")

strDesktop = WshShell.SpecialFolders("Desktop")
strCurrentDir = FSO.GetParentFolderName(WScript.ScriptFullName)
strProjectDir = FSO.GetParentFolderName(strCurrentDir)
strTargetBatch = FSO.BuildPath(strProjectDir, "start_desktop_app.bat")
strIcon = FSO.BuildPath(strProjectDir, "public\favicon.ico")

strShortcutPath = FSO.BuildPath(strDesktop, "ระบบงานมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย.lnk")

Set oShortcut = WshShell.CreateShortcut(strShortcutPath)
oShortcut.TargetPath = strTargetBatch
oShortcut.WorkingDirectory = strProjectDir
oShortcut.WindowStyle = 7 ' Minimized console
oShortcut.Description = "ระบบสารสนเทศมหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย (วส. มจร)"
If FSO.FileExists(strIcon) Then
    oShortcut.IconLocation = strIcon & ", 0"
End If
oShortcut.Save

WScript.Echo "สร้าง Shortcut บนหน้าจอ Desktop เรียบร้อยแล้ว: " & vbCrLf & strShortcutPath
