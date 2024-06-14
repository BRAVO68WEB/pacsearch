import { query } from "@/helpers/ApolloClient"
import { gql } from "@apollo/client";

const getDataRepo = async () => {
  const { data } = await query({
    query: gql`
      query {
        repos {
          name
        }
      }
    `
  })

  return data as { repos: [{ name: string }]}
}

const getRepoPackages = async (repo: string) => {
  const { data } = await query({
    query: gql`
      query {
        packages(repo: "${repo}") {
          name
          version
        }
      }
    `
  })

  return data as { packages: [{ name: string, version: string }]}
}

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-row sm:flex-row">
          <div>
            {
              getDataRepo().then(data => (
                <div className="flex items-center flex-col">
                  {
                    data.repos.map(repo => (
                      <div key={repo.name}>
                        <span>{repo.name}</span>
                      </div>
                    ))
                  }
                </div>
              ))
            }
          </div>
          <div>
            {
              
            }
          </div>
        </div>
      </main>
    </div>
  );
}
