import NameContext from "@/components/NameContext";
import PacSearchRender from "@/components/pac-search-render";
import getRepoPackages from "@/libs/get_packages";
import getDataRepo from "@/libs/get_repos";

const repos = await getDataRepo();
const packages = await getRepoPackages(
    null,
    null,
    {
        perPage: 50,
        pageNumber: 1,
    }
);

export default async function Home() {
    return (
        <NameContext>
            <PacSearchRender 
                repos={repos.repos}
                packages={packages.packages}
            />
        </NameContext>
    );
}
