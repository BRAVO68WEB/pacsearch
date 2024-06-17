'use client'
import React from 'react'
import { 
    createColumnHelper,
    flexRender,
    getCoreRowModel, 
    useReactTable 
} from '@tanstack/react-table';

function PackageRender({ data }: Readonly<{ data: { packages: [{ name: string, version: string, description: string, repo: string }] } }>) {
    const columnHelper = createColumnHelper<{name: string, version: string, description: string, repo: string}>()
    const columns = [
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('version', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('description', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
        columnHelper.accessor('repo', {
            cell: info => info.getValue(),
            footer: info => info.column.id,
        }),
    ];
    
    const table = useReactTable({
        data: data.packages,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })
    
    return (
        <div className="flex flex-col p-2">
            <table 
                className='table-auto border-collapse border border-blue-400 p-5'
            >
                <thead>
                  {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map(header => (
                        <th key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody 
                  className='border-collapse border border-blue-400 p-5'
                >
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id} 
                        className='border-collapse border border-blue-400 p-5'
                    >
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    )
}

export default PackageRender