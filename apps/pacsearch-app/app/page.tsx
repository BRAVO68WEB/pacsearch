import NameContext from "@/components/NameContext";
import PackageList from "@/components/PackageList";
import Pagination from "@/components/Pagination";
import RepoList from "@/components/RepoList";
import SearchBar from "@/components/SearchBar";
import { SiGithub, SiArchlinux, SiWikipedia } from "@icons-pack/react-simple-icons";
import Link from "next/link";

export default function Home() {
    return (
        <NameContext>
            <div className="font-sans h-screen w-screen overflow-hidden text-rp-moon-text">
                <div className="flex w-full">
                    <div className="flex w-1/6 h-screen bg-rp-moon-surface flex-col items-center justify-items-center">
                        <div className="flex logo items-center justify-center w-full bg-rp-moon-overlay">
                            <img 
                                src="https://pacsearch-assets.b68.dev/logov2.png"
                                width={225}
                                height={225}
                                alt="PacSearch"
                            />
                        </div>
                        <div className="logos my-4 mb-10 w-full px-4 flex gap-5 text-white justify-center">
                            <Link className="p-4 bg-rp-moon-overlay rounded-full" href={"https://github.com/BRAVO68WEB/pacsearch/"}>
                                <SiGithub className="h-6 w-6" />
                            </Link>
                            <Link className="p-4 bg-rp-moon-overlay rounded-full" href={"https://wiki.archlinux.org/"}>
                                <SiWikipedia className="h-6 w-6" />
                            </Link>
                            <Link className="p-4 bg-rp-moon-overlay rounded-full" href={"https://archlinux.org/"}>
                                <SiArchlinux className="h-6 w-6" />
                            </Link>
                        </div>
                        <div className="flex flex-col items-center justify-items-center">
                            <h3 className="items-center justify-items-center p-1 text-2xl">
                                Repo List
                            </h3>
                        </div>
                        <div className="flex-1 w-full overflow-y-auto">
                            <RepoList />
                        </div>
                    </div>
                    <div className="flex h-screen overflow-hidden flex-1 gap-4 flex-col ">
                        <div className="flex justify-between items-center p-2 px-10 bg-rp-moon-surface py-3">
                            <SearchBar />
                            <Pagination />
                        </div>
                        <div className="flex-1 w-full overflow-y-auto px-10">
                            <PackageList />
                        </div>
                    </div>
                </div>
            </div>
        </NameContext>
    );
}
