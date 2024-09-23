import { gql } from "@apollo/client";

import { query } from "@/helpers/ApolloClient";

export interface IPkgCount {
    packages_aggregate: {
        aggregate: {
            count: number;
        };
    };
}

export const getPkgCount = async () => {
    const {
        data,
    }: {
        data: IPkgCount;
    } = await query({
        query: gql`
          query {
            packages_aggregate {
                aggregate {
                    count
                }
            }
          }
        `,
    });

    return data;
};

export interface IRepoCount {
    repos_aggregate: {
        aggregate: {
            count: number;
        };
    };
}

export const getRepoCount = async () => {
    const {
        data,
    }: {
        data: IRepoCount;
    } = await query({
        query: gql`
          query {
            repos_aggregate {
                aggregate {
                    count
                }
            }
          }
        `,
    });

    return data;
};
