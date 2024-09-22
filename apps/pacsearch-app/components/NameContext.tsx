"use client";

import getRepoPackages, { IMiniPkgInfoData, IRepoPkgsData } from "@/libs/get_packages";
import React, { createContext, useContext, useEffect, useState } from "react";

interface IRepoNameContextType {
    name: string | null;
    setName: (name: string | null) => void;
    searchPkgName: string | null;
    setSearchPkgName: (searchPkgName: string | null) => void;
    perPage: number;
    setPerPage: (perPage: number) => void;
    pageNumber: number;
    setPageNumber: (pageNumber: number) => void;
    totalPackages: number;
    setTotalPackages: (totalPackages: number) => void;
    packages: IMiniPkgInfoData[];
}
const repoNameContext = createContext<IRepoNameContextType>({
    name: null,
    setName: () => {},
    searchPkgName: null,
    setSearchPkgName: () => {},
    pageNumber: 1,
    setPageNumber: () => {},
    perPage: 25,
    setPerPage: () => {},
    totalPackages: 0,
    setTotalPackages: () => {},
    packages: [],
});

interface NameContextProps {
    children: React.ReactNode;
    pkgData: IRepoPkgsData;
}
function NameContext({ pkgData: _pkgData, children }: Readonly<NameContextProps>) {
    const [name, setName] = useState<string | null>(null);
    const [searchPkgName, setSearchPkgName] = useState<string | null>(null);
    const [perPage, setPerPage] = useState<number>(25);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPackages, setTotalPackages] = useState<number>(0);
    const [pkgData, setPkgDate] = useState<IRepoPkgsData>(_pkgData);
    console.log(perPage, pageNumber);
    useEffect(() => {
        if (!name) {
            setPkgDate(_pkgData);
            return;
        }
        getRepoPackages(name, null, {
            perPage: perPage,
            pageNumber: pageNumber,
        }).then(pkg => {
            setPkgDate(pkg);
        });
    }, [name, _pkgData, pageNumber, perPage]);

    return (
        <repoNameContext.Provider
            value={{
                name,
                setName,
                searchPkgName,
                setSearchPkgName,
                perPage,
                setPerPage,
                pageNumber,
                setPageNumber,
                totalPackages,
                setTotalPackages,
                packages: pkgData.packages,
            }}
        >
            {children}
        </repoNameContext.Provider>
    );
}

export default NameContext;

export const useRepoName = () => {
    return useContext(repoNameContext);
};
