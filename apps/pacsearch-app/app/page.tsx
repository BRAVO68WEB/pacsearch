import PacSearchRender from "@/components/pac-search-render";
import getDataRepo from "@/libs/get_repos";

const repos = await getDataRepo();

export default async function Home() {
    return <PacSearchRender repos={repos.repos} />;
}
