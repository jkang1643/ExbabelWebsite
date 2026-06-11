#!/bin/bash
# Convert all PNG images to WebP for PageSpeed optimization
set -e
cd /home/jkang1643/projects/exbabel/public

echo "=== Converting avatars ==="
for f in avatars/avatar-*.png; do
  base=$(basename "$f" .png)
  ffmpeg -y -i "$f" -quality 80 -compression_level 6 "avatars/${base}.webp" 2>/dev/null
  orig=$(stat -c%s "$f")
  new=$(stat -c%s "avatars/${base}.webp")
  echo "  $f: ${orig} -> ${new} bytes ($(( (orig - new) * 100 / orig ))% reduction)"
done

echo "=== Converting photos ==="
for f in photos/*.png; do
  # Skip Zone.Identifier files
  [[ "$f" == *Zone.Identifier* ]] && continue
  base=$(basename "$f" .png)
  # Replace spaces with hyphens in output filename
  safename=$(echo "$base" | tr ' ' '-')
  ffmpeg -y -i "$f" -quality 80 -compression_level 6 "photos/${safename}.webp" 2>/dev/null
  orig=$(stat -c%s "$f")
  new=$(stat -c%s "photos/${safename}.webp")
  echo "  $f: ${orig} -> ${new} bytes ($(( (orig - new) * 100 / orig ))% reduction)"
done

echo "=== Converting badges ==="
for f in badges/*.png; do
  [[ "$f" == *Zone.Identifier* ]] && continue
  base=$(basename "$f" .png)
  safename=$(echo "$base" | tr ' ' '-')
  ffmpeg -y -i "$f" -quality 80 -compression_level 6 "badges/${safename}.webp" 2>/dev/null
  orig=$(stat -c%s "$f")
  new=$(stat -c%s "badges/${safename}.webp")
  echo "  $f: ${orig} -> ${new} bytes ($(( (orig - new) * 100 / orig ))% reduction)"
done

echo ""
echo "=== Summary ==="
echo "Total original PNG size:"
find avatars photos badges -name "*.png" ! -name "*Zone*" -exec stat -c%s {} + 2>/dev/null | awk '{s+=$1}END{printf "  %.1f MB\n", s/1048576}'
echo "Total WebP size:"
find avatars photos badges -name "*.webp" -exec stat -c%s {} + 2>/dev/null | awk '{s+=$1}END{printf "  %.1f MB\n", s/1048576}'
