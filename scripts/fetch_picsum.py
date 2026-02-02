#!/usr/bin/env python3
"""Fetch images from picsum.photos list API (no API key required) and save
them into `netlify-site/public/assets/picsum/` with an attributions file.

Run: python3 netlify-site/scripts/fetch_picsum.py
"""
import os
import sys
import json
import time
import urllib.request
import ssl

root = os.path.expanduser('netlify-site')
assets_dir = os.path.join(root, 'public', 'assets', 'picsum')
os.makedirs(assets_dir, exist_ok=True)

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    api_url = 'https://picsum.photos/v2/list?page=1&limit=100'
    req = urllib.request.Request(api_url, headers={'User-Agent': 'python-urllib'})
    with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
        data = json.load(resp)
except Exception as e:
    print('Failed to fetch picsum list:', e, file=sys.stderr)
    sys.exit(1)

max_images = 6
downloaded = []
for item in data:
    if len(downloaded) >= max_images:
        break
    try:
        pid = item.get('id')
        author = item.get('author', 'Unknown')
        # Request a resized 1600x900 image for reasonable size
        img_url = f'https://picsum.photos/id/{pid}/1600/900'
        req = urllib.request.Request(img_url, headers={'User-Agent': 'python-urllib'})
        with urllib.request.urlopen(req, timeout=30, context=ctx) as r:
            img_data = r.read()
            final_url = r.geturl()
        filename = f'picsum_{pid}.jpg'
        out_path = os.path.join(assets_dir, filename)
        with open(out_path, 'wb') as f:
            f.write(img_data)
        downloaded.append((filename, author, final_url))
        print('Downloaded', filename, 'by', author)
    except Exception as e:
        print('Failed to download id', pid, '-', e, file=sys.stderr)

attrib_file = os.path.join(assets_dir, 'attributions.txt')
with open(attrib_file, 'w') as f:
    f.write('filename\tauthor\tfinal_url\n')
    for row in downloaded:
        f.write(f'{row[0]}\t{row[1]}\t{row[2]}\n')

print('Saved', len(downloaded), 'images to', assets_dir)
