"use client";
import React from "react";
import { useRepoName } from "./NameContext";

function SearchBar() {
    const { setSearchPkgName } = useRepoName();
    return (
        <div className="flex justify-center">
            <input
                className="border-2 bg-transparent text-white border-blue-500 text-lg p-3 px-4 w-full"
                type="text"
                placeholder="Search for a package"
                onChange={e => setSearchPkgName(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
