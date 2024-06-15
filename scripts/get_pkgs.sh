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

echo "Downloading visual-studio-code-insiders"
curl https://nihaals.github.io/visual-studio-code-insiders-arch/visual-studio-code-insiders.db.tar.gz --output pkgs/visual-studio-code-insiders.tar.gz >/dev/null 2>&1
echo "Downloaded visual-studio-code-insiders"

echo "Downloading build.kilabit.info"
curl https://build.kilabit.info/aur/build.kilabit.info.db.tar.gz --output pkgs/build.kilabit.info.tar.gz >/dev/null 2>&1
echo "Downloaded build.kilabit.info"

echo "Downloading dx37essentials"
curl https://dx37.gitlab.io/dx37essentials/x86_64/dx37essentials.db.tar.zst --output pkgs/dx37essentials.tar.zst >/dev/null 2>&1
echo "Downloaded dx37essentials"

echo "Downloading bioarchlinux"
curl https://repo.bioarchlinux.org/x86_64/bioarchlinux.db.tar.gz --output pkgs/bioarchlinux.tar.gz >/dev/null 2>&1
echo "Downloaded bioarchlinux"

echo "Downloading arch4edu"
curl https://mirrors.tuna.tsinghua.edu.cn/arch4edu/any/arch4edu.db.tar.gz --output pkgs/arch4edu.db.tar.gz >/dev/null 2>&1
echo "Downloaded arch4edu"

echo "Downloading archlinuxcn"
curl https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/any/archlinuxcn.db.tar.gz --output pkgs/archlinuxcn.db.tar.gz >/dev/null 2>&1
echo "Downloaded archlinuxcn"

echo "Downloading ownstuff"
curl https://martchus.dyn.f3l.de/repo/arch/ownstuff/os/any/ownstuff.db.tar.xz --output pkgs/ownstuff.db.tar.xz >/dev/null 2>&1
echo "Downloaded ownstuff"

echo "Downloading seiichiro"
curl https://www.seiichiro0185.org/repo/x86_64/seiichiro.db.tar.zst --output pkgs/seiichiro.db.tar.zst >/dev/null 2>&1
echo "Downloaded seiichiro"

echo "Downloading quarry"
curl https://pkgbuild.com/~anatolik/quarry/x86_64/quarry.db.tar.xz --output pkgs/quarry.db.tar.xz >/dev/null 2>&1
echo "Downloaded quarry"

echo "Completed downloading databases"

echo "Creating directories"
mkdir -p pkgs/core
mkdir -p pkgs/extra
mkdir -p pkgs/multilib
mkdir -p pkgs/chaotic-aur
mkdir -p pkgs/blackarch
mkdir -p pkgs/mingw64
mkdir -p pkgs/visual-studio-code-insiders
mkdir -p pkgs/build.kilabit.info
mkdir -p pkgs/dx37essentials
mkdir -p pkgs/bioarchlinux
mkdir -p pkgs/arch4edu
mkdir -p pkgs/archlinuxcn
mkdir -p pkgs/ownstuff
mkdir -p pkgs/seiichiro
mkdir -p pkgs/quarry
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

echo "Extracting visual-studio-code-insiders"
tar -xzf pkgs/visual-studio-code-insiders.tar.gz -C pkgs/visual-studio-code-insiders >/dev/null 2>&1
echo "Extracted visual-studio-code-insiders"

echo "Extracting build.kilabit.info"
tar -xzf pkgs/build.kilabit.info.tar.gz -C pkgs/build.kilabit.info >/dev/null 2>&1
echo "Extracted build.kilabit.info"

echo "Extracting dx37essentials"
tar -xzf pkgs/dx37essentials.tar.zst -C pkgs/dx37essentials >/dev/null 2>&1
echo "Extracted dx37essentials"

echo "Extracting bioarchlinux"
tar -xzf pkgs/bioarchlinux.tar.gz -C pkgs/bioarchlinux >/dev/null 2>&1
echo "Extracted bioarchlinux"

echo "Extracting arch4edu"
tar -xzf pkgs/arch4edu.db.tar.gz -C pkgs/arch4edu >/dev/null 2>&1
echo "Extracted arch4edu"

echo "Extracting archlinuxcn"
tar -xzf pkgs/archlinuxcn.db.tar.gz -C pkgs/archlinuxcn >/dev/null 2>&1
echo "Extracted archlinuxcn"

echo "Extracting ownstuff"
tar -xvf pkgs/ownstuff.db.tar.xz -C pkgs/ownstuff >/dev/null 2>&1
echo "Extracted ownstuff"

echo "Extracting seiichiro"
tar --zstd -xvf pkgs/seiichiro.db.tar.zst -C pkgs/seiichiro >/dev/null 2>&1
echo "Extracted seiichiro"

echo "Extracting quarry"
tar -xvf pkgs/quarry.db.tar.xz -C pkgs/quarry >/dev/null 2>&1
echo "Extracted quarry"

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
# rm pkgs/aur.json
rm pkgs/visual-studio-code-insiders.tar.gz
rm pkgs/build.kilabit.info.tar.gz
rm pkgs/dx37essentials.tar.zst
rm pkgs/bioarchlinux.tar.gz
rm pkgs/arch4edu.db.tar.gz
rm pkgs/archlinuxcn.db.tar.gz
rm pkgs/ownstuff.db.tar.xz
rm pkgs/seiichiro.db.tar.zst
rm pkgs/quarry.db.tar.xz
echo "Removed tar files"

echo "Remove unnecessary files 'files'"
rm pkgs/*/*/files

echo $(date +"%s") > pkgs/endtime

echo "Completed getting the list of databases"

echo "Total time taken: $(($(cat pkgs/endtime) - $(cat pkgs/starttime))) seconds"
