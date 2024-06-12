#!/bin/bash

echo "Getting the list of databases"

echo $(date +"%s") > pkgs/starttime

echo "Downloading core"
curl https://mirror.rackspace.com/archlinux/core/os/x86_64/core.db.tar.gz --output pkgs/core.db.tar.gz >/dev/null 2>&1
echo "Downloaded core"

echo "Downloading extra"
curl https://mirror.rackspace.com/archlinux/extra/os/x86_64/extra.db.tar.gz --output pkgs/extra.db.tar.gz >/dev/null 2>&1
echo "Downloaded extra"

echo "Downloading multilib"
curl https://mirror.rackspace.com/archlinux/multilib/os/x86_64/multilib.db.tar.gz --output pkgs/multilib.db.tar.gz >/dev/null 2>&1
echo "Downloaded multilib"

echo "Downloading chaotic-aur"
curl https://mirror.nag.albony.in/chaotic-aur/chaotic-aur/x86_64/chaotic-aur.files --output pkgs/chaotic-aur.files >/dev/null 2>&1
echo "Downloaded chaotic-aur"

echo "Downloading blackarch"
curl https://mirrors.gethosted.online/blackarch/blackarch/blackarch/os/x86_64/blackarch.db.tar.gz --output pkgs/blackarch.db.tar.gz >/dev/null 2>&1
echo "Downloaded blackarch"

echo "Downloading mingw64"
curl https://repo.msys2.org/mingw/x86_64/mingw64.files --output pkgs/mingw64.files >/dev/null 2>&1
echo "Downloaded mingw64"

echo "Downloading aur"
curl https://aur.archlinux.org/packages-meta-ext-v1.json.gz --output pkgs/aur.json.gz >/dev/null 2>&1
echo "Downloaded aur"

echo "Completed downloading databases"

echo "Creating directories"
mkdir -p pkgs/core
mkdir -p pkgs/extra
mkdir -p pkgs/multilib
mkdir -p pkgs/chaotic-aur
mkdir -p pkgs/blackarch
mkdir -p pkgs/mingw64
mkdir -p db
echo "Directories created"

echo "Extracting Databases"

echo "Extracting core"
tar -xzf pkgs/core.db.tar.gz -C pkgs/core >/dev/null 2>&1
echo "Extracted core"

echo "Extracting extra"
tar -xzf pkgs/extra.db.tar.gz -C pkgs/extra >/dev/null 2>&1
echo "Extracted extra"

echo "Extracting multilib"
tar -xzf pkgs/multilib.db.tar.gz -C pkgs/multilib >/dev/null 2>&1
echo "Extracted multilib"

echo "Extracting chaotic-aur"
cp pkgs/chaotic-aur.files pkgs/chaotic-aur.zst
tar --zstd -xvf pkgs/chaotic-aur.zst -C pkgs/chaotic-aur >/dev/null 2>&1
echo "Extracted chaotic-aur"

echo "Extracting blackarch"
tar -xzf pkgs/blackarch.db.tar.gz -C pkgs/blackarch >/dev/null 2>&1
echo "Extracted blackarch"

echo "Extracting mingw64"
cp pkgs/mingw64.files pkgs/mingw64.zst
tar --zstd -xvf pkgs/mingw64.zst -C pkgs/mingw64 >/dev/null 2>&1
echo "Extracted mingw64"

echo "Extracting aur"
gunzip -d pkgs/aur.json.gz
echo "Extracted aur"

echo "Completed extracting databases"

echo "Removing tar files"
rm pkgs/core.db.tar.gz
rm pkgs/extra.db.tar.gz
rm pkgs/multilib.db.tar.gz
rm pkgs/chaotic-aur.zst
rm pkgs/chaotic-aur.files
rm pkgs/blackarch.db.tar.gz
rm pkgs/mingw64.zst
rm pkgs/mingw64.files
echo "Removed tar files"

echo "Remove unnecessary files 'files'"
rm pkgs/*/*/files

echo $(date +"%s") > pkgs/endtime