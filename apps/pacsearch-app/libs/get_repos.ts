import { query } from "@/helpers/ApolloClient"
import { gql } from "@apollo/client"

const getDataRepo = async () => {
    const { data } = await query({
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
  
    return data as { repos: [{ name: string }] }
}

export default getDataRepo