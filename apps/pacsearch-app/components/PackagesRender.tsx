"use client";
import React from "react";
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { IRepoPkgsData, IMiniPkgInfoData } from "@/libs/get_packages";
import Link from "next/link";
import { getRepoColor, getRepoColorTag } from "@/helpers/repoColorTags";

function PackageRender({ data }: Readonly<{ data: IRepoPkgsData }>) {
    const columnHelper = createColumnHelper<IMiniPkgInfoData>();
    const columns = [
        columnHelper.accessor("name", {
            cell: info => {
                return (
                    <Link href={`/${info.row.original.repo}/${info.row.original.name}`} className="text-rp-moon-iris">
                        {info.getValue()}
                    </Link>
                );
            },
            footer: info => info.column.id,
        }),
        columnHelper.accessor("version", {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("description", {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor("repo", {
            cell: info => {
                return <div
                        className={`
                            ${getRepoColorTag(info.getValue())}
                            ${getRepoColor(info.getValue())}
                            p-2 rounded-md text-rp-moon-base
                        `}
                    >
                    {info.getValue()}
                </div>
            },
            footer: info => info.column.id,
        }),
    ];

    const table = useReactTable({
        data: data.packages,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="flex flex-col p-2">
            <table className="table-auto border-collapse border border-rp-moon-subtle p-5">
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className="w-1/4 text-left p-3" key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="border-collapse border border-rp-moon-subtle p-5 text-lg">
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="border-collapse border border-rp-moon-subtle hover:bg-rp-base">
                            {row.getVisibleCells().map(cell => (
                                <td 
                                    className={`
                                        p-3 text-start align-top
                                    `}
                                    key={cell.id}
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

export default PackageRender;
