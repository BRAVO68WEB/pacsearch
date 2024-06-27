"use client";
import React, { useEffect } from "react";
import { useRepoName } from "./NameContext";
import useDebounce from "@/libs/debounce";
import { Search } from "lucide-react";

function SearchBar() {
    const { setSearchPkgName } = useRepoName();

    const search = useDebounce(async (input: string) => {
        setSearchPkgName(input);
    });

    return (
        <div className="flex justify-center w-full max-w-lg">
            <label className="text-white p-3 flex items-center justify-center bg-rp-moon-overlay px-4">
                <Search className="h-6 w-6" />
            </label>
            <input
                className=" bg-transparent  text-lg p-1 px-4 w-full focus-visible:outline-none bg-rp-moon-highlight-med"
                type="text"
                placeholder="Search for a package"
                onChange={e => search(e.target.value)}
            />
        </div>
    );
}

export default SearchBar;
