import NameContext from "@/components/NameContext";
import PackageList from "@/components/PackageList";
import Pagination from "@/components/Pagination";
import RepoList from "@/components/RepoList";
import SearchBar from "@/components/SearchBar";

export default function Home() {
    return (
        <NameContext>
            <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <div className="flex gap-16 flex-row sm:flex-row">
                    <div className="flex border-2 border-sky-500 flex-col items-center justify-items-center">
                        <h1 className="items-center justify-items-center text-2xl pt-2">
                            Repo List
                        </h1>
                        <RepoList />
                    </div>
                    <div className="flex gap-4 flex-col border-sky-500 border-2">
                        <div 
                            className="flex justify-between items-center p-2"
                        >
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
