from PIL import Image

def crop_emblem(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    width, height = img.size
    
    # We want to keep only the emblem, which is in the upper part of the image.
    # The text is at the bottom.
    # Let's find the bounding box of the non-transparent pixels in the top 75% of the image.
    
    bbox_top = height
    bbox_bottom = 0
    bbox_left = width
    bbox_right = 0
    
    pixels = img.load()
    
    # Analyze only top 70% to avoid the text
    limit_y = int(height * 0.70)
    
    for y in range(limit_y):
        for x in range(width):
            _, _, _, a = pixels[x, y]
            if a > 0:
                if y < bbox_top: bbox_top = y
                if y > bbox_bottom: bbox_bottom = y
                if x < bbox_left: bbox_left = x
                if x > bbox_right: bbox_right = x
                
    # Add some padding
    padding = 20
    bbox_left = max(0, bbox_left - padding)
    bbox_top = max(0, bbox_top - padding)
    bbox_right = min(width, bbox_right + padding)
    bbox_bottom = min(height, bbox_bottom + padding)
    
    # Crop
    cropped = img.crop((bbox_left, bbox_top, bbox_right, bbox_bottom))
    cropped.save(output_path)
    print(f"Cropped logo saved to {output_path}")

if __name__ == '__main__':
    crop_emblem('pegadaian_monochrome_v2.png', 'pegadaian_emblem_only.png')
