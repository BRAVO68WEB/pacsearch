import { gql } from "@apollo/client";

import { query } from "@/helpers/ApolloClient";

export interface IPkgInfo {
    arch: string;
    base: string;
    build_date: string;
    compressed_size: string;
    conflicts: string;
    description: string;
    file_name: string;
    groups: string;
    home_url: string;
    installed_size: string;
    license: string;
    md5_sum: string;
    name: string;
    packager: string;
    pgp_signature: string;
    provides: string;
    replaces: string;
    repo: string;
    sha256_sum: string;
    version: string;
    download_url: string;
}
export interface IPkgInfoData {
    packages: IPkgInfo[];
}

const getPackageInfo = async ({
    pkgName,
    repoName,
}: Readonly<{ pkgName: string; repoName: string }>) => {
    const {
        data,
    }: {
        data: IPkgInfoData;
    } = await query({
        query: gql`
          query getPkgInfo($pkgName: String, $repoName: String) @cached {
              packages(where: { name: { _eq: $pkgName }, repo: { _eq: $repoName } }) {
                  arch
                  base
                  build_date
                  compressed_size
                  conflicts
                  description
                  file_name
                  groups
                  home_url
                  installed_size
                  license
                  md5_sum
                  name
                  packager
                  pgp_signature
                  provides
                  replaces
                  repo
                  sha256_sum
                  version
                  download_url
              }
          }
        `,
        variables: {
            pkgName: pkgName,
            repoName: repoName,
        },
    });

    return data;
};

export default getPackageInfo;
