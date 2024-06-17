import { query } from "@/helpers/ApolloClient"
import { gql } from "@apollo/client"

export interface IRepoData {
    name: string
}

export interface IRepoListData {
    repos: IRepoData[]
}

const getDataRepo = async () => {
    const { data } : {
        data: IRepoListData
    } = await query({
      query: gql`
        query {
          repos(order_by: {
             name: asc
          }) {
            name
          }
        }
      `
    })
  
    return data
}

export default getDataRepo