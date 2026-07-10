from PIL import Image, ImageFilter

def make_line_art(input_path, output_path):
    # Open the image (it has transparency from the previous step)
    img = Image.open(input_path).convert("RGBA")
    
    # Paste onto a black background so edge detection works smoothly on the boundaries
    black_bg = Image.new("RGBA", img.size, (0, 0, 0, 255))
    black_bg.paste(img, (0, 0), img)
    
    # Convert to grayscale
    gray = black_bg.convert("L")
    
    # Find edges (this creates a black image with white lines)
    edges = gray.filter(ImageFilter.FIND_EDGES)
    
    # Enhance the edges to make them brighter and cleaner
    edges = edges.point(lambda p: min(255, int(p * 2.0)))
    
    # Create the final image: pure white, with alpha determined by the edges
    width, height = img.size
    line_art = Image.new("RGBA", (width, height))
    
    pixels = line_art.load()
    edge_pixels = edges.load()
    orig_pixels = img.load()
    
    for y in range(height):
        for x in range(width):
            intensity = edge_pixels[x, y]
            # Don't draw edges outside the original alpha bounds
            _, _, _, orig_a = orig_pixels[x, y]
            alpha = min(intensity, orig_a)
            
            pixels[x, y] = (255, 255, 255, alpha)
            
    line_art.save(output_path, "PNG")
    print(f"Saved line art logo to {output_path}")

if __name__ == '__main__':
    make_line_art('babyscheduler_logo_transparent.png', 'babyscheduler_line_art.png')
