"use client";

import React from "react";

import { IRepoData } from "@/libs/get_repos";

import { PacSearch } from "./pac-search";

export default function PacSearchRender({
    repos,
}: Readonly<{
    repos: IRepoData[];
}>) {
    return <PacSearch repos={repos} />;
}
