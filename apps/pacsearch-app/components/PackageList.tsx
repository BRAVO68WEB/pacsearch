"use client";
import { useEffect, useState } from "react";

import PackageRender from "./PackagesRender";
import getRepoPackages from "@/libs/get_packages";
import { useRepoName } from "./NameContext";

interface IData {
    packages: [{ name: string; version: string; description: string; repo: string }];
}

function PackageList() {
    const [data, setData] = useState<IData | null>(null);
    const { name: repo_name, searchPkgName, pageNumber, perPage, setTotalPackages } = useRepoName();

    useEffect(() => {
        async function fetchData() {
          const newData = await getRepoPackages(repo_name, searchPkgName, {
            perPage,
            pageNumber,
          });
          setData(newData);
          setTotalPackages(newData.packages_aggregate.aggregate.count);
        }
        fetchData();
    }, [repo_name, searchPkgName, pageNumber, perPage]);
    
    return <>{data && <PackageRender data={data} />}</>;
}

export default PackageList;
