from PIL import Image
from collections import Counter

img = Image.open('public/dboss_logo.png').convert('RGB')
datas = img.getdata()

# Round to nearest 10 to group similar colors
rounded_colors = [ ( (r//10)*10, (g//10)*10, (b//10)*10 ) for r, g, b in datas ]
most_common = Counter(rounded_colors).most_common(10)

print("Most common colors (R, G, B) and their counts:")
for color, count in most_common:
    brightness = sum(color)/3
    print(f"Color: {color}, Count: {count}, Brightness: {brightness:.1f}")
