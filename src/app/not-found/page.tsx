"use client"

import { Loader } from "lucide-react";

const Notfound = () => {
    return (
        <div className="flex flex-col bg-black text-white">
            {/* eslint-disable-next-line react/jsx-no-undef */}
            正在检测网络...请稍后...<Loader className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900" />
        </div>
    )
}
export default Notfound