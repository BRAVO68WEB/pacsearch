"use client";
import { useEffect, useState } from "react";
import { useRepoName } from "./NameContext";
import Select from "react-dropdown-select";

function Pagination() {
    const { setPageNumber, setPerPage, pageNumber, perPage, totalPackages } = useRepoName();
    const [totalPages, setTotalPages] = useState(0);
    useEffect(() => {
        setTotalPages(Math.ceil(totalPackages / perPage));
    }, [totalPackages, perPage]);

    return (
        <div className="flex justify-center">
            <Select
                options={[
                    {
                        label: "25",
                        value: 25,
                    },
                    {
                        label: "50",
                        value: 50,
                    },
                    {
                        label: "100",
                        value: 100,
                    },
                ]}
                values={[
                    {
                        label: perPage.toString(),
                        value: perPage,
                    },
                ]}
                valueField="value"
                labelField="label"
                className="border-2 border-rp-moon-highlight-med text-white p-3 h-full px-8"
                color="#3182ce"
                onChange={values => setPerPage(values[0].value)}
            />
            <button
                className="border border-rp-moon-highlight-med text-white p-3"
                onClick={() => {
                    // if pageNumber is 1, do nothing
                    if (pageNumber === 1) return;
                    setPageNumber(pageNumber - 1);
                }}
            >
                Previous
            </button>
            <span className="border border-rp-highlight-med text-white p-3">
                {pageNumber}/{totalPages}
            </span>
            <button
                className="border border-rp-highlight-med text-white p-3"
                onClick={() => {
                    // if pageNumber is the last page, do nothing
                    if (pageNumber === totalPages) return;
                    setPageNumber(pageNumber + 1);
                }}
            >
                Next
            </button>
            <span className="border border-rp-highlight-med text-white p-3">
                Total Packages: {totalPackages}
            </span>
        </div>
    );
}

export default Pagination;
