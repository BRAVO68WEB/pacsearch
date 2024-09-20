"use client";

import { IRepoData, IRepoListData } from "@/libs/get_repos";
import { getRepoColor, getRepoColorTag } from "@/helpers/repoColorTags";
import { useRepoName } from "./NameContext";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";

function RepoRender({ data }: Readonly<{ data: IRepoListData }>) {
    const { setName, name } = useRepoName();

    const columnHelper = createColumnHelper<IRepoData>();

    const columns = [
        columnHelper.accessor("name", {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    ];

    const table = useReactTable({
        data: data.repos,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex flex-col border-solid w-full">
            {table.getRowModel().rows.map(row => (
                <div key={row.id} className={`border-collapse border-t border-rp-moon-muted cursor-pointer p-5
                    ${row.getVisibleCells().some(cell => cell.row.original.name === name) ? "bg-rp-moon-text" : ""}
                `}>
                    {row.getVisibleCells().map(cell => (
                        <div
                            key={cell.id}
                            onClick={() => {
                                if (cell.row.original.name === name) {
                                    setName("");
                                    return;
                                }
                                setName(cell.row.original.name);
                            }}
                            className={`${
                                getRepoColor(cell.row.original.name)}
                                p-2 rounded-md text-rp-moon-text
                                ${cell.row.original.name === name ? "bg-rp-moon-base" : ""}
                            `}
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default RepoRender;
