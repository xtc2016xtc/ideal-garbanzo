import {Button} from "@/components/ui/button";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useState} from "react";
import {createLinkToken, exchangePublicToken} from "@/lib/actions/user.action";
import {PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink} from "react-plaid-link";


const PlaidLink = ({ user,variant }:PlaidLinkProps) => {
    const router = useRouter();

    const [token, setToken] = useState('');

    useEffect(() => {
        const getLinkToken = async () => {
            const data = await createLinkToken(user);

            // 确保 data.linkToken 存在
            if (data && data.linkToken) {
                setToken(data.linkToken);
            } else {
                setToken(''); // 提供默认值
            }
        }

        // 使用 .then/.catch 处理 getLinkToken 的返回值
        getLinkToken().then(() => {
            // 成功处理
        }).catch((error) => {
            console.error('获取链接令牌时出错:', error);
            setToken(''); // 提供默认值
        });
    }, [user]);

    const onSuccess = useCallback<PlaidLinkOnSuccess>(async (public_token: string) => {
        await exchangePublicToken({
            publicToken: public_token,
            user,
        })

        router.push('/');
    }, [router, user])

    const config: PlaidLinkOptions = {
        token,
        onSuccess
    }

    const { open, ready } = usePlaidLink(config);

    return (
       <>
           {variant === 'primary' ? (
               <Button
                   onClick={() => open()}
                   disabled={!ready}
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