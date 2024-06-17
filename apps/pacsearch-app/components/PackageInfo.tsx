import React from "react";
import PackageInfoRender from "./PackageInfoRender";
import getPackageInfo from "@/libs/get_package_info";

async function PackageInfo(
    { pkgName, repoName }: Readonly<{ pkgName: string; repoName: string }>
) {
    const data = await getPackageInfo({
        pkgName,
        repoName,
    });
    return <PackageInfoRender data={data} />;
}

export default PackageInfo;
