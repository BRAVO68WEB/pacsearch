"use server";

import { gql } from "@apollo/client";

import { query } from "@/helpers/ApolloClient";

export interface IMiniPkgInfoData {
    name: string;
    version: string;
    description: string;
    repo: string;
}

export interface IRepoPkgsData {
    packages: IMiniPkgInfoData[];
    packages_aggregate: {
        aggregate: {
            count: number;
        };
    };
}

const getRepoPackages = async (
    repo: string | null,
    pkgName: string | null,
    options: {
        perPage: number;
        pageNumber: number;
    },
) => {
    if (!repo) {
        if (pkgName) {
            const {
                data,
            }: {
                data: IRepoPkgsData;
            } = await query({
                query: gql`
                  query getPksByRepoName($pkgName: String, $limit: Int, $offset: Int) @cached {
                      packages(
                          where: { name: { _iregex: $pkgName } }
                          limit: $limit
                          order_by: { name: asc }
                          offset: $offset
                      ) {
                          name
                          version
                          description
                          repo
                      }
                      packages_aggregate(where: { name: { _iregex: $pkgName } }) {
                          aggregate {
                              count
                          }
                      }
                  }
                `,
                variables: {
                    pkgName: pkgName,
                    limit: options.perPage,
                    offset: (options.pageNumber - 1) * options.perPage,
                },
            });
            return data;
        } else {
            const {
                data,
            }: {
                data: IRepoPkgsData;
            } = await query({
                query: gql`
                  query getPksByRepoName($limit: Int, $offset: Int) @cached {
                      packages(limit: $limit, order_by: { name: asc }, offset: $offset) {
                          name
                          version
                          description
                          repo
                      }
                      packages_aggregate {
                          aggregate {
                              count
                          }
                      }
                  }
                `,
                variables: {
                    limit: options.perPage,
                    offset: (options.pageNumber - 1) * options.perPage,
                },
            });

            return data;
        }
    } else if (pkgName) {
        const {
            data,
        }: {
            data: IRepoPkgsData;
        } = await query({
            query: gql`
              query getPksByRepoName(
                  $repo_name: String
                  $pkgName: String
                  $limit: Int
                  $offset: Int
              ) @cached {
                  packages(
                      where: { repo: { _eq: $repo_name }, name: { _iregex: $pkgName } }
                      limit: $limit
                      order_by: { name: asc }
                      offset: $offset
                  ) {
                      name
                      version
                      description
                      repo
                  }
                  packages_aggregate(
                      where: { repo: { _eq: $repo_name }, name: { _iregex: $pkgName } }
                  ) {
                      aggregate {
                          count
                      }
                  }
              }
            `,
            variables: {
                repo_name: repo,
                pkgName: pkgName,
                limit: options.perPage,
                offset: (options.pageNumber - 1) * options.perPage,
            },
        });
        return data;
    } else {
        const {
            data,
        }: {
            data: IRepoPkgsData;
        } = await query({
            query: gql`
              query getPksByRepoName($repo_name: String, $limit: Int, $offset: Int) @cached {
                  packages(
                      where: { repo: { _eq: $repo_name } }
                      limit: $limit
                      order_by: { name: asc }
                      offset: $offset
                  ) {
                      name
                      version
                      description
                      repo
                  }
                  packages_aggregate(where: { repo: { _eq: $repo_name } }) {
                      aggregate {
                          count
                      }
                  }
              }
            `,
            variables: {
                repo_name: repo,
                limit: options.perPage,
                offset: (options.pageNumber - 1) * options.perPage,
            },
        });

        return data;
    }
};

export default getRepoPackages;
