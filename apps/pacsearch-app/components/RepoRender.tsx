"use client";

import { IRepoData, IRepoListData } from "@/libs/get_repos";
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
                <div key={row.id} className="border-collapse border-y border-blue-400 hover:bg-blue-400 cursor-pointer p-5">
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
                            // className={
                            //     cell.row.original.name === name
                            //         ? "bg-blue-500 text-white"
                            //         : "bg-black"
                            // }
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
