#!/usr/bin/env python3
"""Fetch a small set of themed images from source.unsplash.com (no API key required)
and save them into the netlify site's `public/assets/unsplash/` folder.

This script uses the unsplash 'source' endpoints which return a redirect
to a CDN image. It does not provide photographer metadata, so attribution
will reference Unsplash and the query used.

Run: python3 netlify-site/scripts/fetch_unsplash.py
"""
import os
import sys
import time
import urllib.request
import urllib.parse
import ssl

root = os.path.expanduser('netlify-site')
assets_dir = os.path.join(root, 'public', 'assets', 'unsplash')
os.makedirs(assets_dir, exist_ok=True)

queries = ['senior healthcare', 'elderly patient', 'doctor visit elderly', 'senior smile', 'home care nurse', 'pharmacy senior']
max_images = 6
downloaded = []

# relaxed SSL context for local testing
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def download_for_query(q, index):
    # Unsplash Source returns a redirect to a specific image
    url = f'https://source.unsplash.com/1600x900/?{urllib.parse.quote(q)}'
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'curl/7.64.1'})
        with urllib.request.urlopen(req, timeout=30, context=ctx) as resp:
            data = resp.read()
            # final url (redirect target) may be in resp.geturl()
            final_url = resp.geturl()
        filename = f'unsplash_{int(time.time())}_{index}.jpg'
        out_path = os.path.join(assets_dir, filename)
        with open(out_path, 'wb') as f:
            f.write(data)
        return filename, q, final_url
    except Exception as e:
        print('Failed to download for query', q, '-', e, file=sys.stderr)
        return None

i = 0
for idx, q in enumerate(queries, start=1):
    if len(downloaded) >= max_images:
        break
    result = download_for_query(q, idx)
    if result:
        downloaded.append(result)
        print('Downloaded', result[0], 'for query:', q)

# write attributions
attrib_file = os.path.join(assets_dir, 'attributions.txt')
with open(attrib_file, 'w') as f:
    f.write('filename\tquery\tfinal_url\n')
    for row in downloaded:
        f.write(f'{row[0]}\t{row[1]}\t{row[2]}\n')

print('Saved', len(downloaded), 'images to', assets_dir)

if len(downloaded) == 0:
    print('No images downloaded. Consider running again or uploading manually.')
