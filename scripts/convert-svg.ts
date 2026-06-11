import * as fs from 'fs';
import * as path from 'path';

const svgPath = path.join(__dirname, '../public/world-map.svg');
const outputPath = path.join(__dirname, '../components/WorldMapSVG.tsx');

let svg = fs.readFileSync(svgPath, 'utf8');

// 1. Remove XML declaration and comments
svg = svg.replace(/<\?xml[^>]*\?>/g, '');
svg = svg.replace(/<!--[\s\S]*?-->/g, '');

// 2. Remove metadata tag and its content
svg = svg.replace(/<metadata[\s\S]*?<\/metadata>/g, '');

// 3. Remove Sodipodi/Inkscape custom tags and other namespace elements
svg = svg.replace(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/g, '');
svg = svg.replace(/<sodipodi:namedview[^>]*\/>/g, '');
svg = svg.replace(/<inkscape:path-effect[\s\S]*?<\/inkscape:path-effect>/g, '');
svg = svg.replace(/<inkscape:path-effect[^>]*\/>/g, '');
svg = svg.replace(/<rdf:RDF[\s\S]*?<\/rdf:RDF>/g, '');
svg = svg.replace(/<cc:Work[\s\S]*?<\/cc:Work>/g, '');

// Remove any remaining tags containing colons
svg = svg.replace(/<[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+[^>]*\/?>/g, '');
svg = svg.replace(/<\/[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+>/g, '');

// 4. Remove attributes with colons (sodipodi:*, inkscape:*, rdf:*, cc:*, dc:*)
svg = svg.replace(/\s[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+="[^"]*"/g, '');
svg = svg.replace(/\s[a-zA-Z0-9_-]+:[a-zA-Z0-9_-]+='[^']*'/g, '');

// 5. Convert attributes to JSX camelCase
const attributeMap: { [key: string]: string } = {
  'class': 'className',
  'xml:space': 'xmlSpace',
  'stroke-width': 'strokeWidth',
  'stroke-linejoin': 'strokeLinejoin',
  'stroke-linecap': 'strokeLinecap',
  'stroke-miterlimit': 'strokeMiterlimit',
  'fill-rule': 'fillRule',
  'clip-rule': 'clipRule',
  'stroke-dasharray': 'strokeDasharray',
};

for (const [key, value] of Object.entries(attributeMap)) {
  const regex = new RegExp(`\\s${key}=`, 'g');
  svg = svg.replace(regex, ` ${value}=`);
}

// 6. Remove default inline style attributes from paths to allow CSS overrides
svg = svg.replace(/\sstyle="[^"]*"/g, '');
svg = svg.replace(/\sfill="[^"]*"/g, '');

// 7. Reconstruct the SVG tag to ensure it has correct props
svg = svg.replace(/<svg([^>]*)>/, (match, attrs) => {
  return `<svg className="world-map-svg" viewBox="0 0 950 620" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">`;
});

// 8. Wrap into a React Component
const componentContent = `import React from "react";

export default function WorldMapSVG() {
  return (
    ${svg.trim()}
  );
}
`;

fs.writeFileSync(outputPath, componentContent, 'utf8');
console.log('✅ WorldMapSVG.tsx component generated successfully!');
