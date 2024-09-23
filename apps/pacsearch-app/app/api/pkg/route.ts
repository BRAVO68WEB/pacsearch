import { getPkgCount} from "@/libs/get_package_count";

export async function GET() {
    const data = await getPkgCount();

    return Response.json({
        count: data.packages_aggregate.aggregate.count
    });
}