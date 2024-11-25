import {Button} from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
    return (
        <Button className="bg-red-300">
            <Link href={`web?/not-found`} className="text-gray-900">
                首页
            </Link>
        </Button>
    )
}

export default Home;
