import {Button} from "@/components/ui/button";
import Image from "next/image";


const PlaidLink = ({ user,variant }:PlaidLinkProps) => {
    console.log(variant,user);
    return (
       <>
            <Button className="plaidlink-primary">
                链接银行
            </Button>
           <Button className="plaidlink-ghost">
               <Image
                src="/icons/connect-bank.svg"
                alt="connect-bank"
                width={24}
                height={24}
               />
               <p className="hidden text-[16px] font-semibold text-black-2 xl:block">
                    链接银行
               </p>
           </Button>
           <Button onClick={() => open()} className="plaidlink-default">
               <Image
                   src="/icons/connect-bank.svg"
                   alt="connect bank"
                   width={24}
                   height={24}
               />
               <p className='text-[16px] font-semibold text-black-2'>链接银行</p>
           </Button>
       </>
    )
}

export default PlaidLink