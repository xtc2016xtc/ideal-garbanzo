import DoughnutChart from "@/components/Chart/DoughnutChart";
import AnimatedCounter from "@/components/Animated/AnimatedCounter";

const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance}:TotalBalanceBoxProps) => {

    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                {/*圆形图*/}
                <DoughnutChart accounts={accounts}/>
            </div>

            <div className="flex flex-col gap-6">
                <h2 className="header-2">
                    {/*银行账户*/}
                    银行账户: {totalBanks}
                </h2>
                <div className="flex flex-col gap-2">
                    <p className="total-balance-label">
                        {/*流动资金*/}
                        流动资金
                    </p>

                    <div className="total-balance-amount flex-center gap-2">
                        {/*余额*/}
                        <AnimatedCounter amount={totalCurrentBalance}/>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TotalBalanceBox