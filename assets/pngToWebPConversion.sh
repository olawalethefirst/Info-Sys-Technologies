#!/bin/bash
SOURCE_DIR=C:/Users/OlawaleTheFirst/Documents/projects/Info-Sys-Technologies/assets/temp
DEST_DIR=C:/Users/OlawaleTheFirst/Documents/projects/Info-Sys-Technologies/assets/newImages
WEBP_QUALITY=80
cd $SOURCE_DIR
for f in *.png; do
  echo "Converting $f to WebP"
  ff=${f%????}
  echo "no ext ${ff}"
  cwebp -q $WEBP_QUALITY -m 6 "$(pwd)/${f}" -o "${DEST_DIR}/${ff}.webp"
done
