import type { Metadata } from "next";

import PackageInfo from "@/components/PackageInfo";

import getPkgsInfo from "@/libs/get_package_info";

import Link from "next/link";

type Props = {
    params: {
        repo: string;
        pkg: string;
    };
};

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const pkg = params.pkg;
    const repo = params.repo;

    const pkgData = await getPkgsInfo({ pkgName: pkg, repoName: repo });

    if (!pkgData.packages[0]) {
        return {
            title: `No package found`,
        };
    }

    return {
        title: `${pkg} | ${repo}`,
        description: pkgData.packages[0].description,
        authors: [
            {
                name: pkgData.packages[0].packager ?? pkgData.packages[0].repo,
            },
        ],
        openGraph: {
            title: `${pkg} | ${repo}`,
            description: pkgData.packages[0].description,
            type: "website",
            images: [
                {
                    url: "https://pacsearch-assets.b68.dev/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "pacsearch",
                },
            ],
        },
    };
}

export default function Page({ params }: Readonly<{ params: { repo: string; pkg: string } }>) {
    return (
        <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20 sm:pt-8">
            <div className="flex flex-col gap-12 ">
                <div className="flex flex-col justify-items-center">
                    <div className="items-center justify-items-center text-2xl text-rp-moon-iris">
                        <Link href={`/`}>&#8592; Go back</Link>
                    </div>
                </div>
                <div className="flex gap-4 flex-col border-rp-moon-subtle">
                    <PackageInfo repoName={params.repo} pkgName={params.pkg} />
                </div>
            </div>
        </div>
    );
}
