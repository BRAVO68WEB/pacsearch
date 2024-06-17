#!/bin/bash

echo "Getting the list of databases"

# Delete all files and directory in pkgs directory, except .gitkeep
find pkgs -mindepth 1 ! -name '.gitkeep' -delete

echo $(date +"%s") > pkgs/starttime

echo "Downloading core"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"core"'")' | jq .url -r) --output pkgs/core.db.tar.gz >/dev/null 2>&1
echo "Downloaded core"

echo "Downloading extra"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"extra"'")' | jq .url -r) --output pkgs/extra.db.tar.gz >/dev/null 2>&1
echo "Downloaded extra"

echo "Downloading multilib"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"multilib"'")' | jq .url -r) --output pkgs/multilib.db.tar.gz >/dev/null 2>&1
echo "Downloaded multilib"

echo "Downloading chaotic-aur"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"chaotic-aur"'")' | jq .url -r) --output pkgs/chaotic-aur.db.tar.zst >/dev/null 2>&1
echo "Downloaded chaotic-aur"

echo "Downloading blackarch"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"blackarch"'")' | jq .url -r) --output pkgs/blackarch.db.tar.gz >/dev/null 2>&1
echo "Downloaded blackarch"

echo "Downloading mingw64"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"mingw64"'")' | jq .url -r) --output pkgs/mingw64.files >/dev/null 2>&1
echo "Downloaded mingw64"

echo "Downloading aur"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"aur"'")' | jq .url -r) --output pkgs/aur.json.gz >/dev/null 2>&1
echo "Downloaded aur"

echo "Downloading visual-studio-code-insiders"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"visual-studio-code-insiders"'")' | jq .url -r) --output pkgs/visual-studio-code-insiders.tar.gz >/dev/null 2>&1
echo "Downloaded visual-studio-code-insiders"

echo "Downloading build.kilabit.info"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"build.kilabit.info"'")' | jq .url -r) --output pkgs/build.kilabit.info.db.tar.gz >/dev/null 2>&1
echo "Downloaded build.kilabit.info"

echo "Downloading dx37essentials"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"dx37essentials"'")' | jq .url -r) --output pkgs/dx37essentials.tar.zst >/dev/null 2>&1
echo "Downloaded dx37essentials"

echo "Downloading bioarchlinux"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"bioarchlinux"'")' | jq .url -r) --output pkgs/bioarchlinux.db.tar.gz >/dev/null 2>&1
echo "Downloaded bioarchlinux"

echo "Downloading arch4edu"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"arch4edu"'")' | jq .url -r) --output pkgs/arch4edu.db.tar.gz >/dev/null 2>&1
echo "Downloaded arch4edu"

echo "Downloading archlinuxcn"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"archlinuxcn"'")' | jq .url -r) --output pkgs/archlinuxcn.db.tar.gz >/dev/null 2>&1
echo "Downloaded archlinuxcn"

echo "Downloading ownstuff"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"ownstuff"'")' | jq .url -r) --output pkgs/ownstuff.db.tar.xz >/dev/null 2>&1
echo "Downloaded ownstuff"

echo "Downloading seiichiro"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"seiichiro"'")' | jq .url -r) --output pkgs/seiichiro.db.tar.zst >/dev/null 2>&1
echo "Downloaded seiichiro"

echo "Downloading quarry"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"quarry"'")' | jq .url -r) --output pkgs/quarry.db.tar.xz >/dev/null 2>&1
echo "Downloaded quarry"

echo "Downloading alex19ep"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"alex19ep"'")' | jq .url -r) --output pkgs/alex19ep.db.tar.zst >/dev/null 2>&1
echo "Downloaded alex19ep"

echo "Downloading dbermond"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"dbermond"'")' | jq .url -r) --output pkgs/dbermond.db.tar.zst >/dev/null 2>&1
echo "Downloaded dbermond"

echo "Downloading artafinde"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"artafinde"'")' | jq .url -r) --output pkgs/artafinde.db.tar.gz >/dev/null 2>&1
echo "Downloaded artafinde"

echo "Downloading grawlinson"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"grawlinson"'")' | jq .url -r) --output pkgs/grawlinson.db.tar.xz >/dev/null 2>&1
echo "Downloaded grawlinson"

echo "Downloading heftig"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"heftig"'")' | jq .url -r) --output pkgs/heftig.db.tar.gz >/dev/null 2>&1
echo "Downloaded heftig"

echo "Downloading maximbaz"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"maximbaz"'")' | jq .url -r) --output pkgs/maximbaz.db.tar >/dev/null 2>&1
echo "Downloaded maximbaz"

echo "Downloading orhun"
curl $(cat config/repo.json | jq -r '.[] | select(.name == "'"orhun"'")' | jq .url -r) --output pkgs/orhun.db.tar.gz >/dev/null 2>&1
echo "Downloaded orhun"

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
mkdir -p pkgs/alex19ep
mkdir -p pkgs/dbermond
mkdir -p pkgs/artafinde
mkdir -p pkgs/grawlinson
mkdir -p pkgs/heftig
mkdir -p pkgs/maximbaz
mkdir -p pkgs/orhun
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
tar --zstd -xvf pkgs/chaotic-aur.db.tar.zst -C pkgs/chaotic-aur >/dev/null 2>&1
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
tar -xzf pkgs/build.kilabit.info.db.tar.gz -C pkgs/build.kilabit.info >/dev/null 2>&1
echo "Extracted build.kilabit.info"

echo "Extracting dx37essentials"
tar -xzf pkgs/dx37essentials.tar.zst -C pkgs/dx37essentials >/dev/null 2>&1
echo "Extracted dx37essentials"

echo "Extracting bioarchlinux"
tar -xzf pkgs/bioarchlinux.db.tar.gz -C pkgs/bioarchlinux >/dev/null 2>&1
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

echo "Extracting alex19ep"
tar --zstd -xvf pkgs/alex19ep.db.tar.zst -C pkgs/alex19ep >/dev/null 2>&1
echo "Extracted alex19ep"

echo "Extracting dbermond"
tar --zstd -xvf pkgs/dbermond.db.tar.zst -C pkgs/dbermond >/dev/null 2>&1
echo "Extracted dbermond"

echo "Extracting artafinde"
tar -xzf pkgs/artafinde.db.tar.gz -C pkgs/artafinde >/dev/null 2>&1
echo "Extracted artafinde"

echo "Extracting grawlinson"
tar -xvf pkgs/grawlinson.db.tar.xz -C pkgs/grawlinson >/dev/null 2>&1
echo "Extracted grawlinson"

echo "Extracting heftig"
tar -xzf pkgs/heftig.db.tar.gz -C pkgs/heftig >/dev/null 2>&1
echo "Extracted heftig"

echo "Extracting maximbaz"
tar -xvf pkgs/maximbaz.db.tar -C pkgs/maximbaz >/dev/null 2>&1
echo "Extracted maximbaz"

echo "Extracting orhun"
tar -xzf pkgs/orhun.db.tar.gz -C pkgs/orhun >/dev/null 2>&1
echo "Extracted orhun"

echo "Completed extracting databases"

echo "Removing tar files"
rm pkgs/core.db.tar.gz
rm pkgs/extra.db.tar.gz
rm pkgs/multilib.db.tar.gz
rm pkgs/chaotic-aur.db.tar.zst
rm pkgs/blackarch.db.tar.gz
rm pkgs/mingw64.zst
rm pkgs/mingw64.files
# rm pkgs/aur.json
rm pkgs/visual-studio-code-insiders.tar.gz
rm pkgs/build.kilabit.info.db.tar.gz
rm pkgs/dx37essentials.tar.zst
rm pkgs/bioarchlinux.db.tar.gz
rm pkgs/arch4edu.db.tar.gz
rm pkgs/archlinuxcn.db.tar.gz
rm pkgs/ownstuff.db.tar.xz
rm pkgs/seiichiro.db.tar.zst
rm pkgs/quarry.db.tar.xz
rm pkgs/alex19ep.db.tar.zst
rm pkgs/dbermond.db.tar.zst
rm pkgs/artafinde.db.tar.gz
rm pkgs/grawlinson.db.tar.xz
rm pkgs/heftig.db.tar.gz
rm pkgs/maximbaz.db.tar
rm pkgs/orhun.db.tar.gz
echo "Removed tar files"

echo "Remove unnecessary files 'files'"
rm pkgs/*/*/files

echo $(date +"%s") > pkgs/endtime

echo "Completed getting the list of databases"

echo "Total time taken: $(($(cat pkgs/endtime) - $(cat pkgs/starttime))) seconds"
