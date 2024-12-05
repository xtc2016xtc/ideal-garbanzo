"use client"

import {Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger} from "@/components/ui/sheet";
import Image from "next/image";
import {hamburgerIcon, logoIcon} from "@/utils";
import Link from "next/link";
import {sidebarLinks} from "@/constants";
import {cn} from "@/lib/utils";
import { usePathname } from "next/navigation"
import PlaidLink from "@/components/link/PlaidLink";
import Footer from "@/components/footer/Footer";

const MobileNav = ({user}:MobileNavProps) => {
    const pathname = usePathname();

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

                <SheetContent side="left" className="border-none bg-white max-w-[355px]">
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
                    <div className="mobilenav-sheet">
                        <SheetClose asChild>
                            <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                                {sidebarLinks.map((item) => {
                                    const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                                    return (
                                        <SheetClose asChild key={item.route}>
                                            <Link href={item.route} key={item.label}
                                                  className={cn('mobilenav-sheet_close w-full', {'bg-bank-gradient': isActive})}
                                            >
                                                <Image
                                                    src={item.imgURL}
                                                    alt={item.label}
                                                    width={20}
                                                    height={20}
                                                    className={cn({
                                                        'brightness-[3] invert-0': isActive
                                                    })}
                                                />
                                                <p className={cn("text-16 font-semibold text-black-2", {"text-white": isActive})}>
                                                    {item.label}
                                                </p>
                                            </Link>
                                        </SheetClose>
                                    )
                                })}

                                <PlaidLink user={user}  />
                            </nav>
                        </SheetClose>

                        <Footer user={user} type="mobile"/>
                    </div>
                </SheetContent>
            </Sheet>
        </section>
    )
}

export default MobileNav