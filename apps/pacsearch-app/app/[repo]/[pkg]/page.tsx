import NameContext from "@/components/NameContext";
import PackageInfo from "@/components/PackageInfo";

import Link from "next/link";

export default function Page({ params }: Readonly<{ params: { repo: string, pkg: string } }>) {
    return (
        <NameContext>
            <div className="font-sans min-h-screen p-8 pb-20 gap-16 sm:p-20">
                <div className="flex gap-16 flex-row sm:flex-row">
                    <div className="flex flex-col items-center justify-items-center">
                        <div className="items-center justify-items-center text-2xl pt-2 border-2 border-sky-500">
                            <Link href={`/`}>
                                Go back
                            </Link>
                        </div>
                    </div>
                    <div className="flex gap-4 flex-col border-sky-500 border-2">
                        <PackageInfo repoName={params.repo} pkgName={params.pkg} />
                    </div>
                </div>
            </div>
        </NameContext>
    );
}
