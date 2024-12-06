/*问候语*/
import HeaderBox from "@/components/Box/HeaderBox";
import {getLoggedInUser} from "@/lib/actions/user.action";

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
    const title = Timeauto()

    return (
        <section className="home">
            <div className="home-content">
                <HeaderBox
                    type="greeting"
                    title={title}
                    user={loggedIn?.firstName || "后端数据遇到问题,请检查后端bug日志"}
                    subtext="后台金融管理系统"
                />

                TotalBalanceBox
            </div>
        </section>
    )
}

export default Home;
