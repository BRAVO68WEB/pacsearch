import NameContext from "@/components/NameContext";
import { PacSearch } from "@/components/pac-search";

export default function Home() {
    return (
        <NameContext>
            <PacSearch />
        </NameContext>
    );
}
