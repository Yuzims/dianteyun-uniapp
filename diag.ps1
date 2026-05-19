Write-Output '---EFFECTIVE POLICY---'
Get-ExecutionPolicy
Write-Output '---POLICY LIST---'
Get-ExecutionPolicy -List
Write-Output '---NPM COMMANDS---'
Get-Command npm -All | Format-List
Write-Output '---WHERE NPM---'
where.exe npm
$paths = (where.exe npm) -split "\r?\n"
foreach($p in $paths){
    if($p){
        Write-Output "---FILE: $p"
        Get-Item -Force $p | Format-List
        if($p -match '\.ps1$'){
            Write-Output '---PS1 CONTENT START---'
            Get-Content $p
            Write-Output '---PS1 CONTENT END---'
        }
    }
}
