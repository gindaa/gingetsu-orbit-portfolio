from PIL import Image
import math

def remove_solid_background(input_path, output_path, tolerance=30):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # Sample top-left pixel
    bg_color = img.getpixel((0, 0))
    
    newData = []
    for y in range(height):
        for x in range(width):
            r, g, b, a = img.getpixel((x, y))
            
            # Calculate distance from background color
            dist = math.sqrt((r - bg_color[0])**2 + (g - bg_color[1])**2 + (b - bg_color[2])**2)
            
            if dist < tolerance:
                # Same as background: make transparent
                newData.append((r, g, b, 0))
            elif dist < tolerance + 30:
                # Anti-aliasing edge: partial transparency
                alpha = int(255 * ((dist - tolerance) / 30))
                # Preserve original alpha if it was already lower
                newData.append((r, g, b, min(a, alpha)))
            else:
                # Foreground: keep fully opaque
                newData.append((r, g, b, a))
                
    img.putdata(newData)
    img.save(output_path, "PNG")

if __name__ == '__main__':
    remove_solid_background('babyscheduler_pwa_logo.png', 'babyscheduler_logo_transparent.png')
    print("Saved transparent logo")
