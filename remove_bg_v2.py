from PIL import Image

def remove_background(input_path, output_path):
    img = Image.open(input_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    for item in datas:
        r, g, b, a = item
        brightness = (r + g + b) / 3
        
        # If it's bright (beige, white, etc), completely remove it
        if brightness > 180:
            newData.append((r, g, b, 0))
        # Smooth the edges for pixels that are anti-aliased between the brown text and the background
        elif brightness > 130:
            # Taper alpha from 255 (at 130) to 0 (at 180)
            alpha = int(255 * (1 - ((brightness - 130) / 50)))
            alpha = max(0, min(255, alpha))
            newData.append((r, g, b, alpha))
        else:
            # Dark text and brown lines stay fully opaque
            newData.append(item)

    img.putdata(newData)
    img.save(output_path, "PNG")

remove_background("public/dboss_logo.png", "public/dboss_logo_transparent.png")
