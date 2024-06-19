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
        <div className="flex flex-col border-solid border-cyan-500 w-auto p-6">
            <table className="table-auto border-collapse border border-blue-400 p-5">
                <tbody className="border-collapse border border-blue-400 p-5 text-center items-center justify-items-center">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-collapse border border-blue-400 p-5">
                            {row.getVisibleCells().map(cell => (
                                <td
                                    key={cell.id}
                                    onClick={() => {
                                        if (cell.row.original.name === name) {
                                            setName("");
                                            return;
                                        }
                                        setName(cell.row.original.name);
                                    }}
                                    className={
                                        cell.row.original.name === name
                                            ? "bg-blue-500 text-white"
                                            : "bg-black"
                                    }
                                >
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default RepoRender;
