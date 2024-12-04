import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Image from "next/image";
import {hamburgerIcon, logoIcon} from "@/utils";
import Link from "next/link";

const MobileNav = () => {
    return (
        <section className="w-full max-w-[264px]">
            <Sheet>
                <SheetTrigger>
                    <Image
                        src={hamburgerIcon}
                        alt="menu"
                        width={30}
                        height={30}
                        className="cursor-pointer"
                    />
                </SheetTrigger>

                <SheetContent side="left" className="border-none bg-white">
                    <SheetTitle>
                        <Link href="/" className="cursor-pointer flex items-center gap-1 px-4">
                            <Image
                                src={logoIcon}
                                width={34}
                                height={34}
                                alt="Horizon logo"
                            />
                            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">银行收款</h1>
                        </Link>
                    </SheetTitle>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav