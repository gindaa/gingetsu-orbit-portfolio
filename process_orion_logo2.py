from PIL import Image

img = Image.open('/Users/Gin/.gemini/antigravity/brain/bdafc94a-3aee-442f-bc57-91612ca057c2/media__1783435557700.jpg').convert('RGBA')
width, height = img.size
new_img = Image.new('RGBA', (width, height), (0, 0, 0, 0))

pixels = img.load()
new_pixels = new_img.load()

for y in range(height):
    for x in range(width):
        r, g, b, a = pixels[x, y]
        brightness = (r + g + b) / 3.0
        
        # JPEG compression creates noise. The blue background is ~201.
        # We must aggressively threshold at 235 to ensure the background is fully destroyed.
        if brightness < 235:
            alpha = 0
        else:
            alpha = int(min(255, (brightness - 235) * (255.0 / 20.0)))
            
        new_pixels[x, y] = (255, 255, 255, alpha)

new_img.save('/Users/Gin/Documents/GingetsuOrbit/public/orion_logo.png')
print("Processed logo saved to public/orion_logo.png")
