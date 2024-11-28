import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useState} from "react";


const PlaidLink = ({ user,variant }:PlaidLinkProps) => {
    const router = useRouter();

    const [token, setToken] = useState('')


    return (
       <>
           {variant === 'primary' ? (
               <Button
                   onClick={() => open()}
                   disabled
                   className="plaidlink-primary"
               >
                   链接银行
               </Button>
           ): variant === 'ghost' ? (
               <Button onClick={() => open()} variant="ghost" className="plaidlink-ghost">
                   <Image
                       src="/icons/connect-bank.svg"
                       alt="connect bank"
                       width={24}

                       height={24}
                   />
                   <p className='hiddenl text-[16px] font-semibold text-black-2 xl:block'>链接银行</p>
               </Button>
           ): (
               <Button onClick={() => open()} className="plaidlink-default">
                   <Image
                       src="/icons/connect-bank.svg"
                       alt="connect bank"
                       width={24}
                       height={24}
                   />
                   <p className='text-[16px] font-semibold text-black-2'>链接银行</p>
               </Button>
           )}
       </>
    )
}

export default PlaidLink