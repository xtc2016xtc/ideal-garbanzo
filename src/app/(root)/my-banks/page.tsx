import {getLoggedInUser} from "@/lib/actions/user.action";
import {getAccounts} from "@/lib/actions/bank.actions";
import HeaderBox from "@/components/Box/HeaderBox";
import BankCard from "@/components/card/BankCard";

const MyBanks = async () => {

    const loggedIn = await getLoggedInUser();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    })

    if(!accounts){
        return <div>没有任何信息</div>
    }

    return (
        <section className="flex">
            <div className="my-banks">
                <HeaderBox
                    title="我的账户"
                    subtext="查看银行卡等信息"
                />

                <div className="space-y-4">
                    <h2 className="header-2">
                        银行卡账户
                    </h2>
                    <div className="flex flex-wrap gap-6">
                        {accounts && accounts.data.map((a: Account) => (
                            <BankCard
                                key={a.id}
                                account={a}
                                userName={loggedIn?.firstName}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MyBanks