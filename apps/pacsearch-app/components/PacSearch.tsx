"use client";

import { ArrowLeft, ArrowRight, Github, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import useDebounce from "@/libs/debounce";
import { IRepoData } from "@/libs/get_repos";

import { useRepoName } from "./NameContext";

export function PacSearch({
    repos,
}: Readonly<{
    repos: IRepoData[];
}>) {
    const {
        name,
        setName,
        pageNumber,
        perPage,
        setPerPage,
        searchPkgName,
        setPageNumber,
        setSearchPkgName,
        totalPackages,
        packages,
    } = useRepoName();

    const search = useDebounce(async (input: string) => {
        setSearchPkgName(input);
    });

    return (
        <div className="flex h-screen bg-gray-900 text-gray-100">
            <aside className="w-64 2xl:w-80 bg-gray-800 p-4 pr-0">
                <div className="flex items-center mb-6">
                    <Search className="w-6 h-6 mr-2 text-white-400" />
                    <h1 className="text-2xl 2xl:text-3xl font-bold text-purple-400">Pac-Search</h1>
                    <a
                        href="https://github.com/pac-search/pac-search"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white-400 hover:text-white-600 transition-colors ml-8"
                    >
                        <Github className="w-6 h-6" />
                    </a>
                </div>
                <nav>
                    <h2 className="text-lg font-semibold mb-2 2xl:text-xl">Repo List</h2>
                    <ScrollArea className="h-[calc(100vh-120px)] pr-4">
                        <Button
                            variant={"" === name ? "secondary" : "ghost"}
                            className="w-full justify-start mb-1 2xl:text-lg"
                            onClick={() => setName("")}
                        >
                            All
                        </Button>
                        {repos.map(repo => (
                            <Button
                                key={repo.name}
                                variant={repo.name === name ? "secondary" : "ghost"}
                                className="w-full justify-start mb-1 2xl:text-lg"
                                onClick={() => setName(repo.name)}
                            >
                                {repo.name}
                            </Button>
                        ))}
                        <Button
                            variant="outline"
                            className="w-full justify-start mb-1 2xl:text-lg"
                            onClick={() => {
                                window.open(
                                    "https://github.com/BRAVO68WEB/pacsearch/issues/new?title=[REQUEST]%20Add%20a%20missing%20AUR%20Repo&labels=request&assignees=BRAVO68WEB",
                                );
                            }}
                        >
                            Missing Repo?
                        </Button>
                    </ScrollArea>
                </nav>
            </aside>
            <main className="flex-1 p-6 h-screen overflow-x-hidden overflow-y-auto">
                <div className="flex items-center mb-6">
                    <div className="relative flex-1 mr-4">
                        <Input
                            className="w-full pl-10 bg-gray-700 border-gray-600 "
                            placeholder="Search for a package"
                            value={searchPkgName ?? ""}
                            onChange={e => search(e.target.value)}
                        />
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    </div>
                    <Select
                        value={String(perPage)}
                        onValueChange={val => {
                            setPerPage(Number(val));
                        }}
                        defaultValue="25"
                    >
                        <SelectTrigger value={String(perPage)} className="w-[100px]">
                            <SelectValue placeholder="Per page" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="25" onClick={() => setPerPage(25)}>
                                25
                            </SelectItem>
                            <SelectItem value="50" onClick={() => setPerPage(50)}>
                                50
                            </SelectItem>
                            <SelectItem value="100" onClick={() => setPerPage(100)}>
                                100
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Version</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Repo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="text-lg 2xl:text-xl">
                        {packages.map(pkg => (
                            <TableRow key={pkg.name + "-" + pkg.repo}>
                                <TableCell>
                                    <Link
                                        href={`/${pkg.repo}/${pkg.name}`}
                                        className="flex items-center space-x-2"
                                    >
                                        {pkg.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{pkg.version}</TableCell>
                                <TableCell>{pkg.description}</TableCell>
                                <TableCell>{pkg.repo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-400">
                        Showing {pageNumber * perPage - perPage + 1} to{" "}
                        {Math.min(pageNumber * perPage, totalPackages)} of {totalPackages} packages
                    </div>
                    <div className="text-sm text-gray-400">
                        Made with ❤️ by <a href="https://github.com/BRAVO68WEB">BRAVO68WEB</a>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={pageNumber === 1}
                            onClick={() => {
                                if (pageNumber > 1) setPageNumber(pageNumber - 1);
                            }}
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </Button>
                        <div className="text-sm">
                            Page <span className="font-medium">{pageNumber}</span>
                        </div>
                        <Button
                            variant="outline"
                            size="icon"
                            disabled={packages.length !== perPage}
                            onClick={() => {
                                if (packages.length == perPage) setPageNumber(pageNumber + 1);
                            }}
                        >
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
