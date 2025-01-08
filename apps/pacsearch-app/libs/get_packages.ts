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
                          where: {
                              _or: [
                                  { name: { _ilike: $pkgName } }
                                  { description: { _ilike: $pkgName } }
                                  { md5_sum: { _ilike: $pkgName } }
                                  { sha256_sum: { _ilike: $pkgName } }
                                  { base: { _ilike: $pkgName } }
                                  { packager: { _ilike: $pkgName } }
                                  { pgp_signature: { _ilike: $pkgName } }
                                  { home_url: { _ilike: $pkgName } }
                                  { conflicts: { _ilike: $pkgName } }
                                  { groups: { _ilike: $pkgName } }
                              ]
                          }
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
                          where: {
                              _or: [
                                  { name: { _ilike: $pkgName } }
                                  { description: { _ilike: $pkgName } }
                                  { md5_sum: { _ilike: $pkgName } }
                                  { sha256_sum: { _ilike: $pkgName } }
                                  { base: { _ilike: $pkgName } }
                                  { packager: { _ilike: $pkgName } }
                                  { pgp_signature: { _ilike: $pkgName } }
                                  { home_url: { _ilike: $pkgName } }
                                  { conflicts: { _ilike: $pkgName } }
                                  { groups: { _ilike: $pkgName } }
                              ]
                          }
                      ) {
                          aggregate {
                              count
                          }
                      }
                  }
                `,
                variables: {
                    pkgName: `%${pkgName}%`,
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
                      where: {
                          repo: { _eq: $repo_name }
                          _or: [
                              { name: { _ilike: $pkgName } }
                              { description: { _ilike: $pkgName } }
                              { md5_sum: { _ilike: $pkgName } }
                              { sha256_sum: { _ilike: $pkgName } }
                              { base: { _ilike: $pkgName } }
                              { packager: { _ilike: $pkgName } }
                              { pgp_signature: { _ilike: $pkgName } }
                              { home_url: { _ilike: $pkgName } }
                              { conflicts: { _ilike: $pkgName } }
                              { groups: { _ilike: $pkgName } }
                          ]
                      }
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
                      where: {
                          repo: { _eq: $repo_name }
                          _or: [
                              { name: { _ilike: $pkgName } }
                              { description: { _ilike: $pkgName } }
                              { md5_sum: { _ilike: $pkgName } }
                              { sha256_sum: { _ilike: $pkgName } }
                              { base: { _ilike: $pkgName } }
                              { packager: { _ilike: $pkgName } }
                              { pgp_signature: { _ilike: $pkgName } }
                              { home_url: { _ilike: $pkgName } }
                              { conflicts: { _ilike: $pkgName } }
                              { groups: { _ilike: $pkgName } }
                          ]
                      }
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
