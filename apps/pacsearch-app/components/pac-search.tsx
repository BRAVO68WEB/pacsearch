"use client";

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Github, FileText, ArrowLeft, ArrowRight } from 'lucide-react'
import { IRepoData } from '@/libs/get_repos'
import { IMiniPkgInfoData } from '@/libs/get_packages'
import Link from "next/link"
import { useRepoName } from "./NameContext"

export function PacSearch(
  {
    repos,
    setRepos,
    packages,
  } : Readonly<{
    repos: IRepoData[],
    setRepos: React.Dispatch<React.SetStateAction<IRepoData[]>>,
    setSelectedRepo: React.Dispatch<React.SetStateAction<string>>,
    packages: IMiniPkgInfoData[],
    perPage: number,
    setPerPage: React.Dispatch<React.SetStateAction<number>>,
  }>
) {
  const {
    name,
    setName,
    pageNumber,
    perPage,
    setPerPage,
    searchPkgName,
    setPageNumber,
    setSearchPkgName,
    totalPackages
  } = useRepoName();

  const totalPages = Math.ceil(totalPackages / perPage);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      <aside className="w-64 bg-gray-800 p-4">
        <div className="flex items-center mb-6">
          <Search className="w-6 h-6 mr-2 text-purple-400" />
          <h1 className="text-2xl font-bold text-purple-400">Pac-Search</h1>
        </div>
        <nav>
          <h2 className="text-lg font-semibold mb-2">Repo List</h2>
          <ScrollArea className="h-[calc(100vh-120px)]">
            {repos.map((repo) => (
              <Button
                key={repo.name}
                variant={repo.name === name ? "secondary" : "ghost"}
                className="w-full justify-start mb-1"
                onClick={() => setName(repo.name)}
              >
                {repo.name}
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
              value={searchPkgName ?? ""}
              onChange={(e) => setSearchPkgName(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          </div>
          <Select defaultValue="25">
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem
                value="25"
                onClick={() => setPerPage(25)}
              >
                25
              </SelectItem>
              <SelectItem
                value="50"
                onClick={() => setPerPage(50)}
              >
                50
              </SelectItem>
              <SelectItem
                value="100"
                onClick={() => setPerPage(100)}
              >
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
          <TableBody>
            {packages.map((pkg) => (
              <TableRow key={pkg.name}>
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
            Showing {pageNumber * perPage - perPage + 1} to {Math.min(pageNumber * perPage, totalPackages)} of {totalPackages} packages
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline"
              size="icon"
              disabled={pageNumber === 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page <span className="font-medium">
                {pageNumber}  
              </span> of{" "}
              <span className="font-medium">
                {totalPages}
              </span>
            </div>
            <Button
              variant="outline"
              size="icon"
              disabled={pageNumber === totalPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </div>
  )}