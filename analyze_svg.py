import xml.etree.ElementTree as ET

tree = ET.parse('pegadaian_syariah_logo.svg')
root = tree.getroot()
ns = {'svg': 'http://www.w3.org/2000/svg'}
ET.register_namespace('', ns['svg'])

# The viewBox is 0 0 79.37 41.08
# The emblem is probably on the left (x < 40).
# The text is on the right (x > 40).
# Let's inspect the groups and their transformations.

for g in root.findall('.//svg:g', ns):
    transform = g.get('transform', '')
    print(f"Group transform: {transform}")
