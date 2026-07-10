import xml.etree.ElementTree as ET

tree = ET.parse('pegadaian_syariah_logo.svg')
root = tree.getroot()

# SVG namespace
ns = {'svg': 'http://www.w3.org/2000/svg'}

paths = []
for elem in root.iter():
    if 'path' in elem.tag:
        paths.append(elem.attrib.get('d', ''))

print(f"Total paths: {len(paths)}")
for i, p in enumerate(paths[:10]):
    print(f"Path {i}: {p[:60]}...")
