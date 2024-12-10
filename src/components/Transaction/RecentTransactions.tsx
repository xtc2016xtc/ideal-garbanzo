import Link from "next/link";

const RecentTransactions = ({accounts,transactions = [],appwriteItemId,page = 1}:RecentTransactionsProps) => {
    return (
        <section className="recent-transactions">
            <header className="flex items-center justify-between">
                <h2 className="recent-transactions-label">最近的交易</h2>
                <Link
                    href={`/transaction-history/?id=${appwriteItemId}`}
                    className="view-all-btn">
                    详情
                </Link>
            </header>
            <div>
                {}
            </div>
        </section>
    )
}

export default RecentTransactions