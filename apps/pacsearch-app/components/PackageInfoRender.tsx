import React from 'react'
import { IPkgInfoData } from "@/libs/get_package_info";

function PackageInfoRender({
    data
    }: Readonly<{ data: IPkgInfoData}>
) {
    if(!data.packages) {
        return <div className='text-xl'>No package found</div>
    }
    const  {
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
        sha256_sum
    } = data.packages[0];
    return (
        <div className='flex flex-col p-2'>
            <div
                className='flex flex-col p-2'
            >
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Name</div>
                        <div className='text-xl'>{name}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Version</div>
                        <div className='text-xl'>{version}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Description</div>
                        <div className='text-xl'>{description}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Repo</div>
                        <div className='text-xl'>{repo}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Arch</div>
                        <div className='text-xl'>{arch}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>License</div>
                        <div className='text-xl'>{license}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Base</div>
                        <div className='text-xl'>{base}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>File Name</div>
                        <div className='text-xl'>{file_name}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Build Date</div>
                        <div className='text-xl'>{build_date}</div>
                    </div>
                </div>
                <div 
                    className='flex flex-row p-2'
                >
                    
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Groups</div>
                        <div className='text-xl'>{groups}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Packager</div>
                        <div className='text-xl'>{packager}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Home URL</div>
                        <div className='text-xl'>{home_url}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Installed Size</div>
                        <div className='text-xl'>{installed_size}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Compressed Size</div>
                        <div className='text-xl'>{compressed_size}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>MD5 Sum</div>
                        <div className='text-xl'>{md5_sum}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>SHA256 Sum</div>
                        <div className='text-xl'>{sha256_sum}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>PGP Signature</div>
                        <div className='text-xl'>{pgp_signature}</div>
                    </div>
                </div>
                <div
                    className='flex flex-row p-2'
                >
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Provides</div>
                        <div className='text-xl'>{provides}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Replaces</div>
                        <div className='text-xl'>{replaces}</div>
                    </div>
                    <div
                        className='flex flex-col p-2'
                    >
                        <div className='text-lg text-sky-500'>Conflicts</div>
                        <div className='text-xl'>{conflicts}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PackageInfoRender