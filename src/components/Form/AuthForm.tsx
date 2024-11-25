import Link from "next/link";
import Image from "next/image";

const AuthForm = ({type}:{type:string}) => {
    return (
        <section className="auth-form">
           <header className="flex flex-col gap-5 md:gap-8">
               <Link href="/" className="cursor-pointer flex items-center gap-1">
                   <Image
                    src="/icons/logo.svg"
                    alt="Logo"
                    width={34}
                    height={34}
                   />
                   <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">银行收款</h1>
               </Link>

               <div className="flex flex-col gap-1 md:gap-3">
                 <h1 className="text-26 lg:text-36 font-semibold text-gray-900">
                     {/*{type == 'sign-up' && (*/}
                     {/*    <div>*/}
                     {/*        注册*/}
                     {/*        <p>链接你的账户</p>*/}
                     {/*    </div>*/}
                     {/*   )*/}
                     {/*}*/}
                     <p className="text-16 font-normal text-gray-600">
                         {/*{type == 'sign-in' && (*/}
                         {/*    <div>*/}
                         {/*       登录*/}
                         {/*    </div>*/}
                         {/*)*/}
                         {/*}*/}
                     </p>
                 </h1>
               </div>
           </header>
            {/*连接银行*/}
            <div className="flex flex-col gap-4">
                链接银行
            </div>
            <>
                <form className="space-y-8">
                    {type === 'sign-up' && (
                        <div>
                            账户密码
                        </div>
                    )}
                </form>
                <footer className="flex justify-center gap-1">
                    <p className="text-14 font-normal text-gray-600">
                        {type === 'sign-in'
                            ? "没有账户?"
                            : "已有账户?"}
                    </p>
                    <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="form-link">
                        {type === 'sign-in' ? '注册' : '登录'}
                    </Link>
                </footer>
            </>
        </section>
    )
}

export default AuthForm