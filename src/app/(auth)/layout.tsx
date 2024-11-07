import React from "react";
import Image from "next/image";
import {coninsIcon} from "@/utils";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen w-full justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src={coninsIcon}
                        alt="auth images"
                        width={500}
                        height={500}
                        className="rounded-l-xl object-contain"
                    />
                </div>
            </div>
        </main>
    )
}