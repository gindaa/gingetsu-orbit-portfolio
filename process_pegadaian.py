from PIL import Image

def process_logo_advanced(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    out_img = Image.new("RGBA", (width, height))
    pixels = img.load()
    out_pixels = out_img.load()
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            
            # The light green arcs have high R and G (e.g. 200, 224, 48)
            # The white scales and text have high R, G, B (e.g. 255, 255, 255)
            # The solid green circle has low R (e.g. 19), high G (163), low B (84)
            # The background has very low values (e.g. 8, 48, 34)
            
            # We only want to keep the arcs and the scales (R > 100 and G > 100)
            if r > 100 and g > 100:
                # Calculate alpha based on how bright it is, to preserve smooth anti-aliased edges
                # Max of r, g, b to determine brightness
                brightness = max(r, g, b)
                # Map brightness from 100..255 to 0..255
                alpha = int(min(255, max(0, (brightness - 100) * 255 / 155)))
                
                # Make it pure white with the calculated alpha
                out_pixels[x, y] = (255, 255, 255, alpha)
            else:
                out_pixels[x, y] = (0, 0, 0, 0)
                
    out_img.save(output_path)
    print(f"Saved {output_path}")

if __name__ == '__main__':
    process_logo_advanced('240703161850-663.png', 'pegadaian_monochrome.png')
