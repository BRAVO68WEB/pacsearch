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
            <div className="font-sans h-screen w-screen overflow-hidden text-rp-moon-text">
                <div className="flex w-full">
                    <div className="flex w-1/6 h-screen bg-rp-moon-surface flex-col items-center justify-items-center">
                        <div className="logo w-full bg-rp-moon-overlay">
                            <h1 className="items-center justify-items-center text-2xl p-5">
                                Repo List
                            </h1>
                        </div>
                        <div className="logos my-4 mb-10 w-full px-4 flex gap-5 text-white">
                            <Link className="p-4 bg-rp-moon-overlay rounded-full" href={"#"}>
                                <Github className="h-6 w-6" />
                            </Link>
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
