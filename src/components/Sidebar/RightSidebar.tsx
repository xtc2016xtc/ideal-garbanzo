import {countTransactionCategories} from "@/lib/utils";

const RightSidebar = ({ user, transactions, banks }: RightSidebarProps) => {
    const categories: CategoryCount[] = countTransactionCategories(transactions);
    return (
        <aside>
            <section>
                {user.firstName[0]}
                {user.firstName}
                {user.lastName}
                {user.email}
            </section>
        </aside>
    )
}

export default RightSidebar