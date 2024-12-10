/* eslint-disable no-unused-vars */

declare type SearchParamProps = {
    params: { [key: string]: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

declare type User = {
    $id: string;
    email: string;
    userId: string;
    dwollaCustomerUrl: string;
    dwollaCustomerId: string;
    firstName: string;
    lastName: string;
    name: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};

declare type Bank = {
    $id: string;
    accountId: string;
    bankId: string;
    accessToken: string;
    fundingSourceUrl: string;
    userId: string;
    shareableId: string;
};

declare interface SiderbarProps {
    user: User;
}
/*链接银行*/
declare interface PlaidLinkProps {
    user: User;
    variant?: "primary" | "ghost";
    dwollaCustomerId?: string;
}

declare type Account = {
    id: string;
    availableBalance: number;
    currentBalance: number;
    officialName: string;
    mask: string;
    institutionId: string;
    name: string;
    type: string;
    subtype: string;
    appwriteItemId: string;
    shareableId: string;
};

declare interface TotalBalanceBoxProps {
    accounts: Account[];
    totalBanks: number;
    totalCurrentBalance: number;
}

/*图表*/
declare interface DoughnutChartProps {
    accounts: Account[];
}

declare type Transaction = {
    id: string;
    $id: string;
    name: string;
    paymentChannel: string;
    accountId: string;
    amount: number;
    pending: boolean;
    category: string;
    date: string;
    image: string;
    type: string;
    $createdAt: string;
    channel: string;
    senderBankId: string;
    receiverBankId: string;
};

declare interface RecentTransactionsProps {
    accounts: Account[];
    transactions: Transaction[];
    appwriteItemId: string;
    page: number;
}


declare interface HeaderBoxProps {
    type?: "title" | "greeting";
    title: string;
    subtext: string;
    user?: string;
}

declare interface FooterProps {
    user: User;
    type?: 'mobile' | 'desktop'
}
/*登录*/
declare interface signInProps {
    email: string;
    password: string;
}
declare interface getAccountsProps {
    userId: string;
}
declare interface MobileNavProps {
    user: User;
}
/*注册*/
declare type SignUpParams = {
    firstName: string;
    lastName: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
    email: string;
    password: string;
};


declare type NewDwollaCustomerParams = {
    firstName: string;
    lastName: string;
    email: string;
    type: string;
    address1: string;
    city: string;
    state: string;
    postalCode: string;
    dateOfBirth: string;
    ssn: string;
};

declare interface exchangePublicTokenProps {
    publicToken: string;
    user: User;
}

declare type AddFundingSourceParams = {
    dwollaCustomerId: string;
    processorToken: string;
    bankName: string;
};

/*获取id*/
declare interface getUserInfoProps {
    userId: string;
}

declare interface CreateFundingSourceOptions {
    customerId: string; // Dwolla Customer ID
    fundingSourceName: string; // Dwolla Funding Source Name
    plaidToken: string; // Plaid Account Processor Token
    _links: object; // Dwolla On Demand Authorization Link
}

declare interface createBankAccountProps {
    accessToken: string;
    userId: string;
    accountId: string;
    bankId: string;
    fundingSourceUrl: string;
    shareableId: string;
}
declare interface getBanksProps {
    userId: string;
}
declare interface getInstitutionProps {
    institutionId: string;
}

