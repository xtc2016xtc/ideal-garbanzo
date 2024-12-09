/*问候语*/
import HeaderBox from "@/components/Box/HeaderBox";
import {getLoggedInUser} from "@/lib/actions/user.action";
import TotalBalanceBox from "@/components/Box/TotalBalanceBox";
import {getAccounts} from "@/lib/actions/bank.actions";


function Timeauto(): string {
    const date = new Date();
    const hours = date.getHours();

    if(hours >=7 && hours <= 11){
        return "早上好"
    }else if(hours >=12 && hours <= 13){
        return "中午好"
    }else if(hours >=14 && hours <= 17){
        return "下午好"
    }else {
        return "晚上好"
    }
}

const Home = async () => {
    const loggedIn = await getLoggedInUser();

    // 检查用户是否登录
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

    const title = Timeauto();
    const accounts = await getAccounts({
        userId: loggedIn.$id
    });

    /*检测账户信息是否存在*/
    if (!accounts || accounts.length === 0) {
        return (
            <section className="home">
                <header className="home-content">
                    <HeaderBox
                        type="greeting"
                        title={title}
                        user={loggedIn?.firstName || "后端数据遇到问题,请检查后端bug日志"}
                        subtext="后台金融管理系统"
                    />
                    <p>没有找到任何账户信息。</p>
                </header>
            </section>
        )
    }

    return (
        <section className="home">
            <header className="home-content">
                <HeaderBox
                    type="greeting"
                    title={title}
                    user={loggedIn?.firstName || "后端数据遇到问题,请检查后端bug日志"}
                    subtext="后台金融管理系统"
                />

                <TotalBalanceBox
                    accounts={accounts.map(account =>({
                        ...account,
                        officialName:account.officialName ?? "未知"
                    }))}
                />
            </header>
        </section>
    );
}

export default Home;
