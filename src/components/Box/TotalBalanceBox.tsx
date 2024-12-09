import DoughnutChart from "@/components/Chart/DoughnutChart";

const TotalBalanceBox = ({ accounts = [], totalBanks, totalCurrentBalance}:TotalBalanceBoxProps) => {
    return (
        <section className="total-balance">
            <div className="total-balance-chart">
                {/*圆形图*/}
                <DoughnutChart accounts={accounts} />
            </div>
            TotalBalanceBox
        </section>
    )
}

export default TotalBalanceBox