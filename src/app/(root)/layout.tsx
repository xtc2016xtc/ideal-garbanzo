import React from "react";
import {getLoggedInUser} from "@/lib/actions/user.action";
import {redirect} from "next/navigation";
import Sidebar from "@/components/Bar/Sidebar";


export default async function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {

    const loggedIn = await getLoggedInUser()

    if(!loggedIn) redirect('/sign-in');

    console.log("Logged in", loggedIn);

    const user:User = loggedIn as unknown as User;


    return (
            <main className="flex h-screen w-full font-inter">
                <Sidebar user={user} />
                {children}
            </main>
    );
}
