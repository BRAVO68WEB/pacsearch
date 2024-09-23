import { getRepoCount} from "@/libs/get_package_count";

export async function GET() {
    const data = await getRepoCount();

    return Response.json({
        count: data.repos_aggregate.aggregate.count
    });
}