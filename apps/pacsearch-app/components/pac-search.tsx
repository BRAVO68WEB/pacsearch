"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Github, FileText, ArrowLeft, ArrowRight } from "lucide-react";
import getDataRepo from "@/libs/get_repos";
import { useRouter } from "next/navigation";

const repos = [
    "alex19ep",
    "arch4edu",
    "archlinuxcn",
    "artafinde",
    "aur",
    "bioarchlinux",
    "blackarch",
    "build.kitabit.info",
];
export function PacSearch() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRepo, setSelectedRepo] = useState("alex19ep");
    // const [repos, setRepos] = useState([])
    const [packages, setPackages] = useState([
        {
            name: "at-spi2-core-docs-git",
            version: "2.53.90.r3.g3e43d79ce-1",
            description: "Protocol definitions and daemon for D-Bus at-spi (documentation)",
            repo: "alex19ep",
        },
        {
            name: "at-spi2-core-git",
            version: "2.53.90.r3.g3e43d79ce-1",
            description: "Protocol definitions and daemon for D-Bus at-spi",
            repo: "alex19ep",
        },
        {
            name: "bees-git",
            version: "0.10.r3.g7513f13-1",
            description: "Best-Effort Extent-Same, a btrfs deduplicator daemon",
            repo: "alex19ep",
        },
        {
            name: "espeak-ng-git",
            version: "1.51.r902.g16a7f64a-1",
            description: "Multi-lingual software speech synthesizer (development version)",
            repo: "alex19ep",
        },
        {
            name: "espeakup-git",
            version: "0.90.r6.g316e4fc-1",
            description:
                "Allows the Speakup screen review system to use the espeak-ng synthesizer (development version)",
            repo: "alex19ep",
        },
    ]);
    useEffect(() => {
        //Api call here
        // const packages = [];
        // setPackages(packages);
    }, [selectedRepo]);

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <aside className="w-64 2xl:w-80 bg-gray-800 p-4">
                <div className="flex items-center mb-6">
                    <Search className="w-6 h-6 mr-2 text-purple-400" />
                    <h1 className="text-2xl 2xl:text-3xl font-bold text-purple-400">Pac-Search</h1>
                </div>
                <nav>
                    <h2 className="text-lg font-semibold mb-2">Repo List</h2>
                    <ScrollArea className="h-[calc(100vh-120px)]">
                        {repos.map(repo => (
                            <Button
                                key={repo}
                                variant={repo === selectedRepo ? "secondary" : "ghost"}
                                className="w-full justify-start mb-1 2xl:text-xl 2xl:py-5"
                                onClick={() => setSelectedRepo(repo)}
                            >
                                {repo}
                            </Button>
                        ))}
                    </ScrollArea>
                </nav>
            </aside>
            <main className="flex-1 p-6">
                <div className="flex items-center mb-6">
                    <div className="relative flex-1 mr-4">
                        <Input
                            className="w-full pl-10 bg-gray-700 border-gray-600"
                            placeholder="Search for a package"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                    <Select defaultValue="25">
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25">25</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table className="2xl: text-xl">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Repo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {packages.map(pkg => (
                            <TableRow
                                className="cursor-pointer"
                                onClick={() => {
                                    router.push(`/${pkg.repo}/${pkg.name}`);
                                }}
                                key={pkg.name}
                            >
                                <TableCell>{pkg.name}</TableCell>
                                <TableCell>{pkg.version}</TableCell>
                                <TableCell>{pkg.description}</TableCell>
                                <TableCell>{pkg.repo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-400">Showing 1 to 5 of 25 entries</div>
                    <div className="flex items-center space-x-2">
                        <Button variant="outline" size="icon">
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm">
                            Page <span className="font-medium">1</span> of{" "}
                            <span className="font-medium">5</span>
                        </div>
                        <Button variant="outline" size="icon">
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
