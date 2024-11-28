"use client"

import Link from "next/link";
import Image from "next/image";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import React, { useState } from "react";
import {Form} from "@/components/ui/form"
import {Button} from "@/components/ui/button";
import CustomInput from "@/components/input/CustomInput";
import {authFormSchema} from "@/lib/utils";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import PlaidLink from "@/components/link/PlaidLink";
import {signIn} from "@/lib/actions/user.action";

const AuthForm = ({type}:{type:string}) => {

    /*路由*/
    const router = useRouter();

    /*链接银行*/
    const [user, setUser] = useState()

    /*注册加载*/
    const [isLoading, setIsLoading] = useState(false);

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: '',
            firstName: '',
            lastName: '',
            address1: '',
            city: '',
            state: '',
            postalCode: '',
            dateOfBirth: '',
            ssn: '',
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data);
        setIsLoading(true);


        if(type === 'sign-in'){
            const response = await signIn({
                email: data.email,
                password: data.password,
            })

            if(response) router.push('/')
        }
    };

    
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
                <PlaidLink user={user} variant="primary" />
            </div>
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-up' && (
                            <>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} name="firstName" label="姓名"
                                                 placeholder="姓名"/>
                                    <CustomInput control={form.control} name='lastName' label="职称"
                                                 placeholder='职称'/>
                                </div>
                                <CustomInput control={form.control} name='address1' label="地址"
                                             placeholder='确认地址'/>
                                <CustomInput control={form.control} name='city' label="城市" placeholder='城市'/>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} name='state' label="城市缩写"
                                                 placeholder='城市缩写：NY'/>
                                    <CustomInput control={form.control} name='postalCode' label="邮政编码"
                                                 placeholder='邮政编码：12345'/>
                                </div>
                                <div className="flex gap-4">
                                    <CustomInput control={form.control} name='dateOfBirth' label="出生日期"
                                                 placeholder='YYYY-MM-DD'/>
                                    <CustomInput control={form.control} name='ssn' label="注册许可安全验证码"
                                                 placeholder='Example: 1234'/>
                                </div>
                            </>
                        )}

                        <CustomInput control={form.control} name='email' label="账户"
                                     placeholder='确认你的账号@example.com'/>

                        <CustomInput control={form.control} name='password' label="密码" placeholder='确认密码'/>

                        <div className="flex flex-col gap-4">
                            <Button type="submit" disabled={isLoading} className="form-btn">
                                {isLoading ? (
                                    <>
                                        <Loader2 size={20} className="animate-spin" /> &nbsp;
                                        加载中...请稍后...
                                    </>
                                ):type === "sign-in"
                                    ? '登录':'注册'}
                            </Button>
                        </div>
                    </form>
                </Form>
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