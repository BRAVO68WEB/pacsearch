"use client";

import React from 'react'
import { PacSearch } from './pac-search';
import { IRepoData } from '@/libs/get_repos';

export default function PacSearchRender(
    {
        repos,
    }: Readonly<{
        repos: IRepoData[];
    }>
) {
  return (
    <PacSearch
        repos={repos}
    />
  )
}
