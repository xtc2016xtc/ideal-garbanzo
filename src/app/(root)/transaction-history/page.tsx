import {getLoggedInUser} from "@/lib/actions/user.action";
import HeaderBox from "@/components/Box/HeaderBox";
import {getAccounts} from "@/lib/actions/bank.actions";
/*类型守卫*/
function isAccount(item: any): item is Account {
    return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'string' &&
        typeof item.availableBalance === 'number' &&
        typeof item.currentBalance === 'number' &&
        typeof item.officialName === 'string' &&
        typeof item.mask === 'string' &&
        typeof item.institutionId === 'string' &&
        typeof item.name === 'string' &&
        typeof item.type === 'string' &&
        typeof item.subtype === 'string' &&
        typeof item.appwriteItemId === 'string' &&
        typeof item.shareableId === 'string'
    );
}

function isAccountArray(value: unknown[]): value is Account[] {
    return Array.isArray(value) && value.every(isAccount);
}

const TransactionHistory = async ({ searchParams }: SearchParamProps) => {

    const [resolvedSearchParams] = await Promise.all([Promise.resolve(searchParams)])

    const id = resolvedSearchParams.id;
    const page = resolvedSearchParams.page;
    const currentPage = Number(page as string) || 1;
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

    const accounts = await getAccounts({
        userId: loggedIn.$id,
    });

    /*检测账户信息是否存在*/
    if (!accounts || accounts.totalBanks === 0) {
        return (
            <section className="home">
                <header className="home-content">
                    <HeaderBox
                        type="greeting"
                        title="不存在"
                        user={loggedIn?.firstName || "后端数据遇到问题,请检查后端bug日志"}
                        subtext="后台金融管理系统"
                    />
                    <p>没有找到任何账户信息。</p>
                </header>
            </section>
        )
    }

    const accountsData = (accounts?.data as Account[]);

    if(isAccountArray(accountsData)){
        console.log("类型正确")
    }else {
        console.log("类型错误")
    }

    if (
        accountsData &&
        Array.isArray(accountsData) &&
        accountsData[0] &&
        typeof accountsData[0] === "object" &&
        accountsData[0] !== null &&
        "appwriteItemId" in accountsData[0]
    ) {
        const appwriteItemId = (id as string) || (accountsData[0] as any).appwriteItemId;
        console.log("获取成功",appwriteItemId)
    } else {
        console.error("appwriteItemId获取错误.");
    }

    const appwriteItemId = (id as string) || (accountsData[0] as any).appwriteItemId;

    /*测试数据*/
    const historyData = {
        name:"银行",
        officialname:"详细信息",
        mask:"0000"
    }

    return (
        <div className="transactions">
            <div className="transactions-header">
                <HeaderBox
                    title="交易历史"
                    subtext="查询银行的详细和历史"
                />
            </div>

            <div className="space-y-6">
                <div className="transactions-account">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-18 font-bold text-white">{historyData.name}</h2>
                        <p className="text-14 text-blue-25">
                            {historyData.officialname}
                        </p>
                        <p className="text-14 font-semibold tracking-[1.1px] text-white">
                            ●●●● ●●●● ●●●● {historyData.mask}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TransactionHistory