import React from "react";
import getPackageInfo from "@/libs/get_package_info";
import { PackageInfoCard } from "./package-info-card";

async function PackageInfo({ pkgName, repoName }: Readonly<{ pkgName: string; repoName: string }>) {
    const data = await getPackageInfo({
        pkgName,
        repoName,
    });
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-screen-md">
                <PackageInfoCard props={data.packages[0]} />
            </div>
        </div>
    );
}

export default PackageInfo;
