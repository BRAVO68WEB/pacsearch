import React from "react";
import { IPkgInfoData } from "@/libs/get_package_info";
import Link from "next/link";
import { bytesToibytes } from "@/helpers/units";

function PackageInfoRender({ data }: Readonly<{ data: IPkgInfoData }>) {
    if (!data.packages[0]) {
        return <div className="text-xl">No package found</div>;
    }
    const {
        name,
        version,
        description,
        repo,
        license,
        arch,
        base,
        build_date,
        compressed_size,
        conflicts,
        file_name,
        groups,
        home_url,
        installed_size,
        md5_sum,
        packager,
        pgp_signature,
        provides,
        replaces,
        sha256_sum,
        download_url,
    } = data.packages[0];
    return (
        <div className="flex flex-col p-2">
            <div className="flex flex-col p-2">
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Name</div>
                        <div className="text-xl">{name}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Version</div>
                        <div className="text-xl">{version}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Description</div>
                        <div className="text-xl">{description}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Repo</div>
                        <div className="text-xl">{repo}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Arch</div>
                        <div className="text-xl">{arch}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">License</div>
                        <div className="text-xl">{license}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Base</div>
                        <div className="text-xl">{base}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">File Name</div>
                        <div className="text-xl">
                            <Link href={download_url}>{file_name}</Link>
                        </div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Build Date</div>
                        <div className="text-xl">{build_date}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2"></div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Groups</div>
                        <div className="text-xl">{groups}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Packager</div>
                        <div className="text-xl">{packager}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Home URL</div>
                        <div className="text-xl">
                            <Link href={home_url}>{home_url}</Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Installed Size</div>
                        <div className="text-xl">{bytesToibytes(installed_size)}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Compressed Size</div>
                        <div className="text-xl">{bytesToibytes(compressed_size)}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">MD5 Sum</div>
                        <div className="text-xl">{md5_sum}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">SHA256 Sum</div>
                        <div className="text-xl">{sha256_sum}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">PGP Signature</div>
                        <div className="text-xl">{pgp_signature}</div>
                    </div>
                </div>
                <div className="flex flex-row p-2">
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Provides</div>
                        <div className="text-xl">{provides}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Replaces</div>
                        <div className="text-xl">{replaces}</div>
                    </div>
                    <div className="flex flex-col p-2">
                        <div className="text-lg font-medium text-rp-moon-subtle">Conflicts</div>
                        <div className="text-xl">{conflicts}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PackageInfoRender;
