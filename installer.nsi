; Thunder HTTPS NSIS Installer Script
!include "MUI2.nsh"

; Application info
Name "Thunder HTTPS"
OutFile "C:\Users\HelloWorld\Downloads\Thunder HTTPS Setup 2.0.0.exe"
InstallDir "$PROGRAMFILES\Thunder HTTPS"
InstallDirRegKey HKLM "Software\Thunder HTTPS" "InstallDir"
RequestExecutionLevel admin

; Version info
VIProductVersion "2.0.0.0"
VIAddVersionKey "ProductName" "Thunder HTTPS"
VIAddVersionKey "FileDescription" "Thunder HTTPS - Download Link Converter"
VIAddVersionKey "LegalCopyright" "Copyright (c) 2025 HelloWorld05"
VIAddVersionKey "FileVersion" "2.0.0"
VIAddVersionKey "ProductVersion" "2.0.0"

; Icon
!define MUI_ICON "build\icon.ico"
!define MUI_UNICON "build\icon.ico"

; Pages
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_LICENSE "LICENSE"
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

; Language
!insertmacro MUI_LANGUAGE "SimpChinese"
!insertmacro MUI_LANGUAGE "English"

; Installer sections
Section "Install"
  SetOutPath "$INSTDIR"
  
  ; Copy all files
  File /r "dist-output\win-unpacked\*.*"
  
  ; Create uninstaller
  WriteUninstaller "$INSTDIR\Uninstall.exe"
  
  ; Start Menu shortcuts
  CreateDirectory "$SMPROGRAMS\Thunder HTTPS"
  CreateShortcut "$SMPROGRAMS\Thunder HTTPS\Thunder HTTPS.lnk" "$INSTDIR\Thunder HTTPS.exe"
  CreateShortcut "$SMPROGRAMS\Thunder HTTPS\Uninstall.lnk" "$INSTDIR\Uninstall.exe"
  
  ; Desktop shortcut
  CreateShortcut "$DESKTOP\Thunder HTTPS.lnk" "$INSTDIR\Thunder HTTPS.exe"
  
  ; Registry for uninstall
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Thunder HTTPS" "DisplayName" "Thunder HTTPS"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Thunder HTTPS" "UninstallString" "$\"$INSTDIR\Uninstall.exe$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Thunder HTTPS" "DisplayIcon" "$\"$INSTDIR\Thunder HTTPS.exe$\""
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Thunder HTTPS" "Publisher" "HelloWorld05"
  WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Thunder HTTPS" "DisplayVersion" "2.0.0"
SectionEnd

; Uninstaller section
Section "Uninstall"
  ; Remove files
  RMDir /r "$INSTDIR"
  
  ; Remove shortcuts
  RMDir /r "$SMPROGRAMS\Thunder HTTPS"
  Delete "$DESKTOP\Thunder HTTPS.lnk"
  
  ; Remove registry
  DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\Thunder HTTPS"
  DeleteRegKey HKLM "Software\Thunder HTTPS"
SectionEnd
