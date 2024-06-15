"use client";
import React from 'react'
import { useRepoName } from './NameContext'

function SearchBar() {
    const { setSearchPkgName } = useRepoName()
    return (
        <div className="flex justify-center">
            <input
                className="border-2 border-blue-500 text-black text-lg p-3"
                type="text"
                placeholder="Search for a package"
                onChange={(e) => setSearchPkgName(e.target.value)}
            />
        </div>
    )
}

export default SearchBar