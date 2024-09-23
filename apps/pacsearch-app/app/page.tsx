import PacSearchRender from "@/components/PacSearchRender";
import getDataRepo from "@/libs/get_repos";

const repos = await getDataRepo();

export default async function Home() {
    return <PacSearchRender repos={repos.repos} />;
}
