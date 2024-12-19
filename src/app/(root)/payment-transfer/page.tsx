import {getLoggedInUser} from "@/lib/actions/user.action";
import HeaderBox from "@/components/Box/HeaderBox";
import {getAccounts} from "@/lib/actions/bank.actions";
import PaymentTransferForm from "@/components/Form/PaymentTransferForm";

const Transfer = async ()  => {

    const loggedIn = await getLoggedInUser();

    if (!loggedIn) {
        return (
            <section className="home">
                <header className="home-content">
                    <HeaderBox
                        type="greeting"
                        title="未登录"
                        user="请先登录"
                        subtext="后台金融管理系统"
                    />
                </header>
            </section>
        )
    }

    const accounts = await getAccounts({
        userId: loggedIn.$id,
    });

    if (!accounts || accounts.totalBanks === 0) {
        return (
            <section className="home">
                <header className="home-content">
                    <HeaderBox
                        type="greeting"
                        title="未知"
                        user={loggedIn?.firstName || "后端数据遇到问题,请检查后端bug日志"}
                        subtext="后台金融管理系统"
                    />
                    <p>没有找到任何账户信息。</p>
                </header>
            </section>
        )
    }

    const accountsData = (accounts?.data as Account[]);


    return (
        <section className="payment-transfer">
            <HeaderBox
                title="转账"
                subtext="转账操作"
            />

            <section className="size-full pt-5">
                <PaymentTransferForm accounts={accountsData} />
            </section>
        </section>
    )
}

export default Transfer