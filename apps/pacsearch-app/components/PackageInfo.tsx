import React from "react";
import getPackageInfo from "@/libs/get_package_info";
import { PackageInfoCard } from "./package-info-card";

async function PackageInfo({ pkgName, repoName }: Readonly<{ pkgName: string; repoName: string }>) {
    const data = await getPackageInfo({
        pkgName,
        repoName,
    });
    return <PackageInfoCard props={data.packages[0]} />;
}

export default PackageInfo;
