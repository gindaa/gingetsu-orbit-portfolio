from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # The logo has a light beige background and dark brown lines
    # We want to make any pixel that is bright (close to beige/white) transparent
    for item in datas:
        # Get brightness (average of RGB)
        r, g, b, a = item
        brightness = (r + g + b) / 3
        # If it's bright (e.g., > 200), make it transparent
        if r > 200 and g > 200 and b > 200:
            # We can also do alpha tapering based on brightness for smooth edges
            alpha = int(255 * (1 - ((min(r, 255) - 200) / 55)))
            alpha = max(0, min(255, alpha))
            newData.append((r, g, b, alpha))
        elif brightness > 150:
            alpha = int(255 * (1 - ((brightness - 150) / 105)))
            alpha = max(0, min(255, alpha))
            newData.append((r, g, b, alpha))
        else:
            # Dark pixels (the logo) stay fully opaque
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_background("public/dboss_logo.png", "public/dboss_logo_transparent.png")
