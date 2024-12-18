import HeaderBox from "@/components/Box/HeaderBox";
import {getLoggedInUser} from "@/lib/actions/user.action";
import TotalBalanceBox from "@/components/Box/TotalBalanceBox";
import {getAccount, getAccounts} from "@/lib/actions/bank.actions";
import RecentTransactions from "@/components/Transaction/RecentTransactions";
import RightSidebar from "@/components/Sidebar/RightSidebar";

/*问候语*/
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


const Home = async ({ searchParams }: SearchParamProps) => {

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

    const title = Timeauto();
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
                        title={title}
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
        // const appwriteItemId = (id as string) || (accountsData[0] as any).appwriteItemId;
        console.log("获取成功")
    } else {
        console.error("appwriteItemId获取错误.");
    }

    const appwriteItemId = (id as string) || (accountsData[0] as any).appwriteItemId;
    
    const account = await getAccount({ appwriteItemId })

    console.log("数据api已过期",account)

    /*测试数据*/
    // const transactions: Transaction = {
    //     id: "1234567890",
    //     $id: "transaction_001",
    //     name: "John Doe",
    //     paymentChannel: "online_bank_transfer",
    //     accountId: "account_9876543210",
    //     amount: 150.00,
    //     pending: true,
    //     category: "Utilities",
    //     date: "2024-12-15T14:48:00Z",
    //     image: "https://example.com/images/receipt.jpg",
    //     type: "debit",
    //     $createdAt: "2024-12-15T14:48:00Z",
    //     channel: "mobile_app",
    //     senderBankId: "bank_sender_123",
    //     receiverBankId: "bank_receiver_456"
    // };

    /* 多条测试数据 */
    // const transactions: Transaction[] = [
    //     {
    //         id: "1234567890",
    //         $id: "transaction_001",
    //         name: "John Doe",
    //         paymentChannel: "online_bank_transfer",
    //         accountId: "account_9876543210",
    //         amount: 150.00,
    //         pending: true,
    //         category: "Utilities",
    //         date: "2024-12-15T14:48:00Z",
    //         image: "https://example.com/images/receipt.jpg",
    //         type: "debit",
    //         $createdAt: "2024-12-15T14:48:00Z",
    //         channel: "mobile_app",
    //         senderBankId: "bank_sender_123",
    //         receiverBankId: "bank_receiver_456"
    //     },
    //     {
    //         id: "0987654321",
    //         $id: "transaction_002",
    //         name: "Jane Smith",
    //         paymentChannel: "credit_card",
    //         accountId: "account_0987654321",
    //         amount: 200.00,
    //         pending: false,
    //         category: "Shopping",
    //         date: "2024-12-14T10:30:00Z",
    //         image: "https://example.com/images/receipt2.jpg",
    //         type: "credit",
    //         $createdAt: "2024-12-14T10:30:00Z",
    //         channel: "web",
    //         senderBankId: "bank_sender_456",
    //         receiverBankId: "bank_receiver_789"
    //     },
    //     {
    //         id: "1122334455",
    //         $id: "transaction_003",
    //         name: "Alice Johnson",
    //         paymentChannel: "paypal",
    //         accountId: "account_1122334455",
    //         amount: 75.50,
    //         pending: false,
    //         category: "Entertainment",
    //         date: "2024-12-13T08:15:00Z",
    //         image: "https://example.com/images/receipt3.jpg",
    //         type: "debit",
    //         $createdAt: "2024-12-13T08:15:00Z",
    //         channel: "desktop_app",
    //         senderBankId: "bank_sender_789",
    //         receiverBankId: "bank_receiver_123"
    //     },
    //     // 你可以继续添加更多的交易记录
    // ];

    /*动态生成*/
    function generateTransactions(count: number): Transaction[] {
        const transactions: Transaction[] = [];

        for (let i = 0; i < count; i++) {
            transactions.push({
                id: `${i + 1}`,
                $id: `transaction_${i + 1}`,
                name: `user ${i + 1}`,
                paymentChannel: ["online_bank_transfer", "credit_card", "paypal"][i % 3],
                accountId: `account_${i + 1}`,
                amount: Math.random() * 500, // 随机金额
                pending: i % 2 === 0, // 每隔一条记录设置为 pending
                category: ["Utilities", "Shopping", "Entertainment"][i % 3],
                date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(), // 逐天递减的日期
                image: `https://example.com/images/receipt${i + 1}.jpg`,
                type: i % 2 === 0 ? "debit" : "credit",
                $createdAt: new Date().toISOString(),
                channel: ["mobile_app", "web", "desktop_app"][i % 3],
                senderBankId: `bank_sender_${i + 1}`,
                receiverBankId: `bank_receiver_${i + 1}`
            });
        }

        return transactions;
    }

    const transactions = generateTransactions(10); // 生成多条测试数据

    /*缺保符合要求*/
    const user: User = {
        $id: loggedIn.$id || "",
        email: loggedIn.email || "",
        userId: loggedIn.userId || "",
        dwollaCustomerUrl: loggedIn.dwollaCustomerUrl || "",
        dwollaCustomerId: loggedIn.dwollaCustomerId || "",
        firstName: loggedIn.firstName || "",
        lastName: loggedIn.lastName || "",
        name: loggedIn.name || "",
        address1: loggedIn.address1 || "",
        city: loggedIn.city || "",
        state: loggedIn.state || "",
        postalCode: loggedIn.postalCode || "",
        dateOfBirth: loggedIn.dateOfBirth || "",
        ssn: loggedIn.ssn || ""
    };

    return (
        <section className="home">
            <div className="home-content">
                <header className="home-header">
                    <HeaderBox
                        type="greeting"
                        title={title}
                        user={loggedIn?.firstName || "后端数据遇到问题,请检查后端bug日志"}
                        subtext="后台金融管理系统"
                    />
                    {/*显示资金*/}
                    <TotalBalanceBox
                        accounts={accountsData}
                        totalBanks={accounts?.totalBanks}
                        totalCurrentBalance={accounts?.totalCurrentBalance as number}
                    />
                </header>

                {/*显示交易*/}
                <RecentTransactions
                    accounts={accountsData}
                    appwriteItemId={appwriteItemId}
                    page={currentPage}
                    transactions={transactions}
                />
            </div>

            {/*基础信息显示*/}
            <RightSidebar
                user={user}
                transactions={transactions}
                banks={accountsData?.slice(0, 2) as any}
            />
        </section>
    );
}

export default Home;
