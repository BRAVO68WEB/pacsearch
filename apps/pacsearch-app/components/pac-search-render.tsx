"use client";

import React from 'react'
import { PacSearch } from './pac-search';
import { IRepoData } from '@/libs/get_repos';
import { IMiniPkgInfoData } from '@/libs/get_packages';

export default function PacSearchRender(
    {
        repos,
        packages
    }: Readonly<{
        repos: IRepoData[];
        packages: IMiniPkgInfoData[];
    }>
) {
  return (
    <PacSearch
        currentPage={0}
        setCurrentPage={() => {}}
        packages={packages}
        perPage={25}
        setPerPage={() => {}}
        searchQuery={""}
        setSearchQuery={() => {}}
        repos={repos}
        setRepos={() => {}}
        selectedRepo={""}
        setSelectedRepo={() => {}}
        totalPages={0}
        totalPackages={0}
    />
  )
}
