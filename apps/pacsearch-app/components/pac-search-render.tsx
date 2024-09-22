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
        packages={packages}
        perPage={25}
        setPerPage={() => {}}
        repos={repos}
        setRepos={() => {}}
        setSelectedRepo={() => {}}
    />
  )
}
