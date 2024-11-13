import {Button} from "@/components/ui/button";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <Button>
          <Link href="/not-found">
              去404 Page Not Found
          </Link>
      </Button>
    </div>
  );
}
