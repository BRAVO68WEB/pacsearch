"use client";

import React, { createContext, useContext, useState, } from "react";

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
    setTotalPackages: () => {}
});

interface NameContextProps {
    children: React.ReactNode;
}
function NameContext({ children }: Readonly<NameContextProps>) {
    const [name, setName] = useState<string | null>(null);
    const [searchPkgName, setSearchPkgName] = useState<string | null>(null);
    const [perPage, setPerPage] = useState<number>(25);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [totalPackages, setTotalPackages] = useState<number>(0);
    
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
                setTotalPackages
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
