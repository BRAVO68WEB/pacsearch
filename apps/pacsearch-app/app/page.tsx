import NameContext from "@/components/NameContext";
import PackageList from "@/components/PackageList";
import Pagination from "@/components/Pagination";
import RepoList from "@/components/RepoList";
import SearchBar from "@/components/SearchBar";
import { Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
    return (
        <NameContext>
            <div className="font-sans h-screen w-screen overflow-hidden">
                <div className="flex w-full gap-16">
                    <div className="flex w-1/6 h-screen border-r-2 border-sky-500 flex-col items-center justify-items-center">
                        <div className="logo w-full bg-white/10">
                            <h1 className="items-center justify-items-center text-2xl p-5">
                                Repo List
                            </h1>
                        </div>
                        <div className="logos my-4 mb-10 w-full px-4 flex gap-5 text-white">
                            <Link className="p-4 bg-white/10 rounded-full" href={"#"}>
                                <Github className="h-6 w-6" />
                            </Link>
                        </div>
                        <div className="flex-1 w-full overflow-y-auto">
                            <RepoList />
                        </div>
                    </div>
                    <div className="flex flex-1 gap-4 flex-col border-sky-500 border-2">
                        <div className="flex justify-between items-center p-2">
                            <SearchBar />
                            <Pagination />
                        </div>
                        <PackageList />
                    </div>
                </div>
            </div>
        </NameContext>
    );
}
