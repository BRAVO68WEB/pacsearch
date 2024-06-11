#!/bin/bash

echo "Getting the list of databases"

echo $(date +"%s") > db/starttime

echo "Downloading core"
curl https://mirror.rackspace.com/archlinux/core/os/x86_64/core.db.tar.gz --output db/core.db.tar.gz >/dev/null 2>&1
echo "Downloaded core"

echo "Downloading extra"
curl https://mirror.rackspace.com/archlinux/extra/os/x86_64/extra.db.tar.gz --output db/extra.db.tar.gz >/dev/null 2>&1
echo "Downloaded extra"

echo "Downloading multilib"
curl https://mirror.rackspace.com/archlinux/multilib/os/x86_64/multilib.db.tar.gz --output db/multilib.db.tar.gz >/dev/null 2>&1
echo "Downloaded multilib"

echo "Downloading chaotic-aur"
curl https://mirror.nag.albony.in/chaotic-aur/chaotic-aur/x86_64/chaotic-aur.files --output db/chaotic-aur.files >/dev/null 2>&1
echo "Downloaded chaotic-aur"

echo "Downloading blackarch"
curl https://mirrors.gethosted.online/blackarch/blackarch/blackarch/os/x86_64/blackarch.db.tar.gz --output db/blackarch.db.tar.gz >/dev/null 2>&1
echo "Downloaded blackarch"

echo "Downloading mingw64"
curl https://repo.msys2.org/mingw/x86_64/mingw64.files --output db/mingw64.files >/dev/null 2>&1
echo "Downloaded mingw64"

echo "Completed downloading databases"

echo "Creating directories"
mkdir -p db/core
mkdir -p db/extra
mkdir -p db/multilib
mkdir -p db/chaotic-aur
mkdir -p db/blackarch
mkdir -p db/mingw64
echo "Directories created"

echo "Extracting Databases"

echo "Extracting core"
tar -xzf db/core.db.tar.gz -C db/core >/dev/null 2>&1
echo "Extracted core"

echo "Extracting extra"
tar -xzf db/extra.db.tar.gz -C db/extra >/dev/null 2>&1
echo "Extracted extra"

echo "Extracting multilib"
tar -xzf db/multilib.db.tar.gz -C db/multilib >/dev/null 2>&1
echo "Extracted multilib"

echo "Extracting chaotic-aur"
cp db/chaotic-aur.files db/chaotic-aur.zst
tar --zstd -xvf db/chaotic-aur.zst -C db/chaotic-aur >/dev/null 2>&1
echo "Extracted chaotic-aur"

echo "Extracting blackarch"
tar -xzf db/blackarch.db.tar.gz -C db/blackarch >/dev/null 2>&1
echo "Extracted blackarch"

echo "Extracting mingw64"
cp db/mingw64.files db/mingw64.zst
tar --zstd -xvf db/mingw64.zst -C db/mingw64 >/dev/null 2>&1
echo "Extracted mingw64"

echo "Completed extracting databases"

echo "Removing tar files"
rm db/core.db.tar.gz
rm db/extra.db.tar.gz
rm db/multilib.db.tar.gz
rm db/chaotic-aur.zst
rm db/chaotic-aur.files
rm db/blackarch.db.tar.gz
rm db/mingw64.zst
rm db/mingw64.files
echo "Removed tar files"

# Remove unnecessary files 'files'
rm db/**/files

echo $(date +"%s") > db/endtime

# aur
# https://aur.archlinux.org/rpc/v5/info/$arg
# https://aur.archlinux.org/rpc/v5/suggest/$arg