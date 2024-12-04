import React from "react";
import {getLoggedInUser} from "@/lib/actions/user.action";
import {redirect} from "next/navigation";
import Sidebar from "@/components/Bar/Sidebar";
import Image from "next/image";
import MobileNav from "@/components/mobile/MobileNav";


export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const loggedIn = await getLoggedInUser()

    if(!loggedIn) redirect('/sign-in');

    const user:User = loggedIn as unknown as User;


    return (
            <main className="flex h-screen w-full font-inter">
                <Sidebar user={user} />

                <div className="flex size-full flex-col">
                    {/*缩放导航栏*/}
                    <div className="root-layout">
                            <Image src="/icons/logo.svg" width={30} height={30} alt="logo"/>
                        <div>
                            <MobileNav user={user}/>
                        </div>
                    </div>
                    {children}
                </div>
            </main>
);
}
