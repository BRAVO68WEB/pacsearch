import React from "react";
// import RepoRender from "./RepoRender";
import getDataRepo from "@/libs/get_repos";

async function RepoList() {
    const data = await getDataRepo();
    // return <RepoRender data={data} />;
    return data
}

export default RepoList;
