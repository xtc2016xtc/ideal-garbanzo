"use client"

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {authFormSchema} from "@/lib/utils";

const AuthForm = ({type}:{type:string}) => {

    const [user, setUser] = useState(null)

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
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
                    <h1 className={`text-26 font-ibm-plex-serif font-bold text-black-1`}>银行收款</h1>
                </Link>

                {/*连接账户*/}
                <div className={`flex flex-col gap-1 md:gap-3`}>
                    <h1 className={`text-24 lg:text-36 font-semibold text-gray-900`}>
                        {user
                            ? '连接中'
                            : type === 'sign-in'
                                ? '登录'
                                : '注册'
                        }
                        <p className={`text-16 font-normal text-gray-600`}>
                            {user
                                ? '连接你的账户'
                                : '请输入你的账户密码'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-8`}>

                    </form>
                </Form>
            </>
            {type === 'sign-in' && (
                <>
                    sign-in
                </>
            )}
            {type === 'sign-up' && (
                <>
                注册
                </>
            )}
        </section>
    )
}

export default AuthForm