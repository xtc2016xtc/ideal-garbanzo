import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {transactionCategoryStyles} from "@/constants";
import {cn, formatAmount, getTransactionStatus, removeSpecialCharacters} from "@/lib/utils";


const CategoryBadge = ({category}:CategoryBadgeProps) => {
    const {
        borderColor,
        backgroundColor,
        textColor,
        chipBackgroundColor,
    } = transactionCategoryStyles[category as keyof typeof transactionCategoryStyles] || transactionCategoryStyles.default


    return (
        <div className={cn('category-badge', borderColor, chipBackgroundColor)}>
            <div className={cn('size-2 rounded-full', backgroundColor)}/>
            <p className={cn('text-[12px] font-medium', textColor)}>{category}</p>
        </div>
    )
}


const TransactionsTable = ({transactions}: TransactionTableProps) => {
    if (!transactions || transactions.length === 0) {
        return <div>没有交易记录。</div>;
    }

    return (
        <Table>
            <TableHeader className="bg-[#f9fafb]">
                <TableRow>
                    <TableHead className="px-2">交易</TableHead>
                    <TableHead className="px-2">金额</TableHead>
                    <TableHead className="px-2">状态</TableHead>
                    <TableHead className="px-2">时间</TableHead>
                    <TableHead className="px-2 max-md:hidden">渠道</TableHead>
                    <TableHead className="px-2 max-md:hidden">类型</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {Array.isArray(transactions) ? (
                    transactions.map((t: Transaction) => {
                        const status = getTransactionStatus(new Date(t.date));
                        const amount = formatAmount(t.amount);
                        const isDebit = t.type === 'debit';
                        const isCredit = t.type === 'credit';

                        return (
                            <TableRow key={t.id} className={`${isDebit || amount[0] === '-' ? 'bg-[#FFFBFA]' : 'bg-[#F6FEF9]'} !over:bg-one !border-b`}>
                                <TableCell className="max-2-[250px] pl-2 pr-10">
                                    <div className="flex items-center gap-3">
                                        <h1 className="text-14-truncate font-semibold text-[#344054]">
                                            {removeSpecialCharacters(t.name)}
                                        </h1>
                                    </div>
                                </TableCell>
                                <TableCell className={`pl-2 pr-10 font-semibold ${isDebit || amount[0] === '-' ? 'text-[#f04438]' : 'text-[#039855]'}`}>
                                    {isDebit ? `-${amount}` : isCredit ? amount : amount}
                                </TableCell>
                                <TableCell className="pl-2 pr-10">
                                    <CategoryBadge category={status} />
                                </TableCell>
                                <TableCell className="min-w-32 pl-2 pr-10">
                                    {new Date(t.date).toLocaleDateString()}
                                </TableCell>
                                <TableCell className="pl-2 pr-10 capitalize min-w-24">
                                    {t.paymentChannel}
                                </TableCell>
                                <TableCell className="pl-2 pr-10 max-md:hidden">
                                    <CategoryBadge category={t.category} />
                                </TableCell>
                            </TableRow>
                        );
                    })
                ) : (
                    <tr>
                        <td colSpan={6}>No transactions available</td>
                    </tr>
                )}
            </TableBody>
        </Table>
    )
}

export default TransactionsTable