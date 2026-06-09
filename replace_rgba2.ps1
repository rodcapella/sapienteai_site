
# Phase 2: replace rgba() inside gradient/style strings using color-mix()
# Also add --color-error / --color-success vars for semantic reds/greens.

$colorMap = @{
  '0,21,71'     = 'var(--brand-night)'
  '0,209,255'   = 'var(--brand-cyan-bright)'
  '0,212,255'   = 'var(--brand-cyan-bright)'
  '122,92,252'  = 'var(--brand-purple)'
  '5,8,22'      = 'var(--brand-darkest)'
  '5,8,27'      = 'var(--brand-darkest)'
  '10,180,255'  = 'var(--brand-cyan-mid)'
  '10,132,255'  = 'var(--brand-primary)'
  '1,32,80'     = 'var(--brand-deep)'
  '234,246,255' = 'var(--brand-offwhite)'
  '241,237,255' = 'var(--brand-offwhite)'
  '250,248,255' = 'white'
  '8,18,40'     = 'var(--brand-darkest)'
  '7,26,88'     = 'var(--brand-night)'
  '24,65,115'   = 'var(--brand-mid)'
  '16,24,46'    = 'var(--brand-darkest)'
  '26,31,46'    = 'var(--brand-darkest)'
  '85,212,242'  = 'var(--brand-cyan)'
  '10,17,40'    = 'var(--brand-darkest)'
  '255,255,255' = 'white'
  '0,0,0'       = 'black'
  '34,211,238'  = 'var(--brand-cyan)'
  # Semantic — keep the value but log if encountered
  '248,113,113' = 'var(--color-error)'
  '52,211,153'  = 'var(--color-success)'
}

function Convert-RgbaToColorMix($rgb, $alpha, $cssVar) {
  $a = [double]$alpha
  if ($a -eq 0) { return 'transparent' }
  $pct = [Math]::Round($a * 100).ToString()
  return "color-mix(in srgb,$cssVar ${pct}%,transparent)"
}

$srcPath = "C:\Users\Rodrigo\Documents\GitHub\sapienteai_site\client\src"
$files = Get-ChildItem -Path $srcPath -Recurse -Include '*.tsx','*.ts' |
         Where-Object { $_.FullName -notmatch 'node_modules' }

$totalChanged = 0

foreach ($file in $files) {
  $content = Get-Content $file.FullName -Raw -Encoding utf8
  $original = $content

  foreach ($rgb in $colorMap.Keys) {
    $cssVar = $colorMap[$rgb]
    $rgbEscaped = [regex]::Escape($rgb)

    # Generic: replace any remaining rgba(R,G,B,A) with color-mix(in srgb, var() P%, transparent)
    $genericPattern = 'rgba\(' + $rgbEscaped + ',(?<alpha>[0-9.]+)\)'

    $content = [regex]::Replace($content, $genericPattern, {
      param($m)
      $alpha = $m.Groups['alpha'].Value
      Convert-RgbaToColorMix $rgb $alpha $cssVar
    })
  }

  if ($content -ne $original) {
    Set-Content -Path $file.FullName -Value $content -Encoding utf8 -NoNewline
    $totalChanged++
    Write-Host "Updated: $($file.Name)"
  }
}

Write-Host "`nTotal files changed: $totalChanged"
