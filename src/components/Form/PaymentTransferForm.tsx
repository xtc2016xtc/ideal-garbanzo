"use client"

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {Loader2} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import {zodResolver} from "@hookform/resolvers/zod";
import {Textarea} from "@/components/ui/textarea";
import {BankDropdown} from "@/components/card/BankDropdown";


const formSchema = z.object({
    email: z.string().email("无效的邮件"),
    name: z.string().min(4, "转账账单太短了"),
    amount: z.string().min(4, "金额太少了"),
    senderBank: z.string().min(4, "输入有限银行账户"),
    sharableId: z.string().min(8, "请选择一个可共享的账户编号"),
});

const  PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            amount: "",
            senderBank: "",
            sharableId: "",
        },
    });

    const submit = async (data: z.infer<typeof formSchema>) => {
        setIsLoading(true);



        setIsLoading(false);
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
                <FormField
                    control={form.control}
                    name="senderBank"
                    render={() => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item pb-6 pt-5">
                                <div className="payment-transfer_form-content">
                                    <FormLabel className="text-14 font-medium text-gray-700">
                                        选择银行
                                    </FormLabel>
                                    <FormDescription className="text-12 font-normal text-gray-600">
                                        选择要转入的银行
                                    </FormDescription>
                                </div>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <BankDropdown
                                            accounts={accounts}
                                            setValue={form.setValue}
                                            otherStyles="!w-full"
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item pb-6 pt-5">
                                <div className="payment-transfer_form-content">
                                    <FormLabel className="text-14 font-medium text-gray-700">
                                        转账账单(可选)
                                    </FormLabel>
                                    <FormDescription className="text-12 font-normal text-gray-600">
                                        请提供转账说明
                                    </FormDescription>
                                </div>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Textarea
                                            placeholder="简单的留言"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="payment-transfer_form-details">
                    <h2 className="text-18 font-semibold text-gray-900">
                        银行账户详情
                    </h2>
                    <p className="text-16 font-normal text-gray-600">
                        收款账号详细信息
                    </p>
                </div>

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item py-5">
                                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                    收件人&apos;账户
                                </FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="例如：xtc2016@qq.com"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="sharableId"
                    render={({ field }) => (
                        <FormItem className="border-t border-gray-200">
                            <div className="payment-transfer_form-item pb-5 pt-6">
                                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                    接收账户&apos;的编号
                                </FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="输入账号"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                        <FormItem className="border-y border-gray-200">
                            <div className="payment-transfer_form-item py-5">
                                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                                    金额
                                </FormLabel>
                                <div className="flex w-full flex-col">
                                    <FormControl>
                                        <Input
                                            placeholder="ex: 5.00"
                                            className="input-class"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="text-12 text-red-500" />
                                </div>
                            </div>
                        </FormItem>
                    )}
                />

                <div className="payment-transfer_btn-box">
                    <Button type="submit" className="payment-transfer_btn">
                        {isLoading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
                            </>
                        ) : (
                            "转账"
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
 }

 export default PaymentTransferForm