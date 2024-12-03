import {Sheet, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Image from "next/image";
import {hamburgerIcon} from "@/utils";

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
                        缩放导航栏
                    </SheetTitle>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav