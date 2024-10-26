#!/usr/bin/bash

set -euxo pipefail

for lang in en es fr de
do
  url=https://raw.githubusercontent.com/atebits/Words/master/Words/$lang.txt
  echo "Downloading $lang.txt from $url"
  curl -s -o ./static/$lang.txt $url
done
