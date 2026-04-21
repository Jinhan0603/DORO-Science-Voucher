# Keeps Windows awake while this PowerShell window remains open.
# Run in a separate PowerShell window before starting long Codex work:
# powershell -ExecutionPolicy Bypass -File .\.codex-plan\v4\10_KEEP_AWAKE_WINDOWS.ps1

Add-Type @"
using System;
using System.Runtime.InteropServices;
public class SleepUtil {
  [DllImport("kernel32.dll", SetLastError = true)]
  public static extern uint SetThreadExecutionState(uint esFlags);
}
"@

$ES_CONTINUOUS = 0x80000000
$ES_SYSTEM_REQUIRED = 0x00000001
$ES_DISPLAY_REQUIRED = 0x00000002

[SleepUtil]::SetThreadExecutionState($ES_CONTINUOUS -bor $ES_SYSTEM_REQUIRED -bor $ES_DISPLAY_REQUIRED) | Out-Null
Write-Host "Keep-awake mode is ON. Do not close this window while Codex is running. Press Ctrl+C to stop."

try {
  while ($true) {
    Start-Sleep -Seconds 60
    [SleepUtil]::SetThreadExecutionState($ES_CONTINUOUS -bor $ES_SYSTEM_REQUIRED -bor $ES_DISPLAY_REQUIRED) | Out-Null
  }
}
finally {
  [SleepUtil]::SetThreadExecutionState($ES_CONTINUOUS) | Out-Null
  Write-Host "Keep-awake mode is OFF."
}
