Add-Type -AssemblyName System.Drawing

# Create a 128x128 bitmap
$bitmap = New-Object System.Drawing.Bitmap(128, 128)
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.SmoothingMode = 'AntiAlias'

# White background
$graphics.Clear([System.Drawing.Color]::White)

# Red circle background
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 68, 68))
$graphics.FillEllipse($brush, 8, 8, 112, 112)

# White prohibition line
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 10)
$graphics.DrawLine($pen, 35, 35, 93, 93)

# White "S" letter
$font = New-Object System.Drawing.Font('Arial', 48, [System.Drawing.FontStyle]::Bold)
$stringBrush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$stringFormat = New-Object System.Drawing.StringFormat
$stringFormat.Alignment = [System.Drawing.StringAlignment]::Center
$stringFormat.LineAlignment = [System.Drawing.StringAlignment]::Center
$rect = New-Object System.Drawing.RectangleF(0, 0, 128, 128)
$graphics.DrawString('S', $font, $stringBrush, $rect, $stringFormat)

# Save the image
$bitmap.Save('icon.png', [System.Drawing.Imaging.ImageFormat]::Png)

# Clean up
$graphics.Dispose()
$bitmap.Dispose()
$brush.Dispose()
$pen.Dispose()
$font.Dispose()
$stringBrush.Dispose()

Write-Host "Icon created successfully as icon.png"
