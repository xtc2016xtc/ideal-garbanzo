"use client"

import Link from "next/link";
import Image from "next/image";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import React from "react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {Button} from "@/components/ui/button";

const AuthForm = ({type}:{type:string}) => {

    const formSchema = z.object({
        email:z.string().email(),
        password:z.string().min(8)
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    const onSubmit = async (date:z.infer<typeof formSchema>) => {
        console.log(date)
    }

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
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        {type === 'sign-in' && (
                          <>
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>账户邮件</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>密码</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                            </>
                        )}



                        <Button type="submit" className="text-gray-900 bg-red-300">注册</Button>
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