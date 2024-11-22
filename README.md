<div align="center">
  <div>
    <img src="https://img.shields.io/badge/-Next_JS-black?style=for-the-badge&logoColor=white&logo=nextdotjs&color=000000" alt="nextdotjs" />
    <img src="https://img.shields.io/badge/-TypeScript-black?style=for-the-badge&logoColor=white&logo=typescript&color=3178C6" alt="typescript" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-black?style=for-the-badge&logoColor=white&logo=tailwindcss&color=06B6D4" alt="tailwindcss" />
    <img src="https://img.shields.io/badge/-Appwrite-black?style=for-the-badge&logoColor=white&logo=appwrite&color=FD366E" alt="appwrite" />
  </div>

<h3 align="center">银行收款</h3>


</div>

## 📋 <a name="table">目录</a>

1. 🤖 [介绍](#introduction)
2. ⚙️ [技术栈](#tech-stack)
3. 🔋 [功能](#features)
4. 🤸 [启动](#quick-start)
5. 🕸️ [个别代表片段](#snippets)
6. 🔗 [静态资源](#links)
7. 🚀 [更多](#more)


## <a name="introduction">🤖 介绍</a>

银行转账后台是一个由Nextjs构建的金融SaaS平台，可以连接多个银行账户，实时显示交易，允许用户向其他平台用户转账，并管理他们的财务
## <a name="tech-stack">⚙️ 技术栈</a>

- Next.js
- TypeScript
- Appwrite
- Plaid
- Dwolla
- React Hook Form
- Zod
- TailwindCSS
- Chart.js
- ShadCN

## <a name="features">🔋 功能</a>

👉 **身份验证**：具备适当验证和授权的超安全SSR身份验证

👉 **连接银行**：通过Plaid集成多个银行账户链接

👉 **首页**：显示用户账户的总体概览，包括所有已连接银行的总余额、最近交易记录、不同类别的支出等

👉 **我的银行**：查看所有已连接银行的完整列表及其各自的余额、账户详情

👉 **交易历史**：包含分页和过滤选项，以便查看不同银行的交易历史

👉 **实时更新**：在连接新的银行账户后，相关页面会反映变化

👉 **资金转账**：允许用户使用Dwolla向其他账户转账，并提供必要的字段和收款银行ID

👉 **响应式设计**：确保应用程序能够无缝适应各种屏幕尺寸和设备，为桌面、平板电脑和移动平台提供一致的用户体验

以及更多内容，包括代码架构和可重用性。

## <a name="quick-start">🤸 启动</a>

按照以下步骤完成项目本地搭建

**先决条件**

确保计算机安装了以下软件：

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (节点包管理器)

**克隆仓库**

```bash
git clone https://github.com/adrianhajdin/banking.git
cd banking
```

**安装**

使用npm完成项目包的安装：

```bash
npm install
```

**设置环境变量**

在根目录下创建 `.env` 并添加以下内容:

```env
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=
PLAID_PRODUCTS=
PLAID_COUNTRY_CODES=

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox

```
可以在这些平台注册获得秘钥 [Appwrite](https://appwrite.io/?utm_source=youtube&utm_content=reactnative&ref=JSmastery), [Plaid](https://plaid.com/) and [Dwolla](https://www.dwolla.com/)

**启动项目**

```bash
npm run dev
```

打开[http://localhost:3000](http://localhost:3000) 就可以看到本地项目预览

## <a name="snippets">🕸️ 个别片段代码展示</a>

<details>
<summary><code>.env.example</code></summary>

```env
#NEXT
NEXT_PUBLIC_SITE_URL=

#APPWRITE
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
NEXT_PUBLIC_APPWRITE_PROJECT=
APPWRITE_DATABASE_ID=
APPWRITE_USER_COLLECTION_ID=
APPWRITE_BANK_COLLECTION_ID=
APPWRITE_TRANSACTION_COLLECTION_ID=
APPWRITE_SECRET=

#PLAID
PLAID_CLIENT_ID=
PLAID_SECRET=
PLAID_ENV=sandbox
PLAID_PRODUCTS=auth,transactions,identity
PLAID_COUNTRY_CODES=US,CA

#DWOLLA
DWOLLA_KEY=
DWOLLA_SECRET=
DWOLLA_BASE_URL=https://api-sandbox.dwolla.com
DWOLLA_ENV=sandbox
```

</details>

<details>
<summary><code>exchangePublicToken</code></summary>

```typescript
// This function exchanges a public token for an access token and item ID
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharable ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("An error occurred while creating exchanging token:", error);
  }
};
```

</details>

<details>
<summary><code>user.actions.ts</code></summary>

```typescript
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { ID, Query } from "node-appwrite";
import {
  CountryCode,
  ProcessorTokenCreateRequest,
  ProcessorTokenCreateRequestProcessorEnum,
  Products,
} from "plaid";

import { plaidClient } from "@/lib/plaid.config";
import {
  parseStringify,
  extractCustomerIdFromUrl,
  encryptId,
} from "@/lib/utils";

import { createAdminClient, createSessionClient } from "../appwrite.config";

import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;

export const signUp = async ({ password, ...userData }: SignUpParams) => {
  let newUserAccount;

  try {
    // create appwrite user
    const { database, account } = await createAdminClient();
    newUserAccount = await account.create(
      ID.unique(),
      userData.email,
      password,
      `${userData.firstName} ${userData.lastName}`
    );

    if (!newUserAccount) throw new Error("Error creating user");

    // create dwolla customer
    const dwollaCustomerUrl = await createDwollaCustomer({
      ...userData,
      type: "personal",
    });

    if (!dwollaCustomerUrl) throw new Error("Error creating dwolla customer");
    const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);

    const newUser = await database.createDocument(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      ID.unique(),
      {
        ...userData,
        userId: newUserAccount.$id,
        dwollaCustomerUrl,
        dwollaCustomerId,
      }
    );

    const session = await account.createEmailPasswordSession(
      userData.email,
      password
    );

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);
  } catch (error) {
    console.error("Error", error);

    // check if account has been created, if so, delete it
    if (newUserAccount?.$id) {
      const { user } = await createAdminClient();
      await user.delete(newUserAccount?.$id);
    }

    return null;
  }
};

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    const user = await getUserInfo({ userId: session.userId });

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export const getLoggedInUser = async () => {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();

    const user = await getUserInfo({ userId: result.$id });

    return parseStringify(user);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

// CREATE PLAID LINK TOKEN
export const createLinkToken = async (user: User) => {
  try {
    const tokeParams = {
      user: {
        client_user_id: user.$id,
      },
      client_name: user.firstName + user.lastName,
      products: ["auth"] as Products[],
      language: "en",
      country_codes: ["US"] as CountryCode[],
    };

    const response = await plaidClient.linkTokenCreate(tokeParams);

    return parseStringify({ linkToken: response.data.link_token });
  } catch (error) {
    console.error(
      "An error occurred while creating a new Horizon user:",
      error
    );
  }
};

// EXCHANGE PLAID PUBLIC TOKEN
// This function exchanges a public token for an access token and item ID
export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
    // Exchange public token for access token and item ID
    const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;

    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse =
      await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

    // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
    const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

    // If the funding source URL is not created, throw an error
    if (!fundingSourceUrl) throw Error;

    // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and sharable ID
    await createBankAccount({
      userId: user.$id,
      bankId: itemId,
      accountId: accountData.account_id,
      accessToken,
      fundingSourceUrl,
      sharableId: encryptId(accountData.account_id),
    });

    // Revalidate the path to reflect the changes
    revalidatePath("/");

    // Return a success message
    return parseStringify({
      publicTokenExchange: "complete",
    });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("An error occurred while creating exchanging token:", error);
  }
};

export const getUserInfo = async ({ userId }: getUserInfoProps) => {
  try {
    const { database } = await createAdminClient();

    const user = await database.listDocuments(
      DATABASE_ID!,
      USER_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    if (user.total !== 1) return null;

    return parseStringify(user.documents[0]);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

export const createBankAccount = async ({
  accessToken,
  userId,
  accountId,
  bankId,
  fundingSourceUrl,
  sharableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        accessToken,
        userId,
        accountId,
        bankId,
        fundingSourceUrl,
        sharableId,
      }
    );

    return parseStringify(bankAccount);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

// get user bank accounts
export const getBanks = async ({ userId }: getBanksProps) => {
  try {
    const { database } = await createAdminClient();

    const banks = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(banks.documents);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

// get specific bank from bank collection by document id
export const getBank = async ({ documentId }: getBankProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("$id", [documentId])]
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};

// get specific bank from bank collection by account id
export const getBankByAccountId = async ({
  accountId,
}: getBankByAccountIdProps) => {
  try {
    const { database } = await createAdminClient();

    const bank = await database.listDocuments(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      [Query.equal("accountId", [accountId])]
    );

    if (bank.total !== 1) return null;

    return parseStringify(bank.documents[0]);
  } catch (error) {
    console.error("Error", error);
    return null;
  }
};
```

</details>

<details>
<summary><code>dwolla.actions.ts</code></summary>

```typescript
"use server";

import { Client } from "dwolla-v2";

const getEnvironment = (): "production" | "sandbox" => {
  const environment = process.env.DWOLLA_ENV as string;

  switch (environment) {
    case "sandbox":
      return "sandbox";
    case "production":
      return "production";
    default:
      throw new Error(
        "Dwolla environment should either be set to `sandbox` or `production`"
      );
  }
};

const dwollaClient = new Client({
  environment: getEnvironment(),
  key: process.env.DWOLLA_KEY as string,
  secret: process.env.DWOLLA_SECRET as string,
});

// Create a Dwolla Funding Source using a Plaid Processor Token
export const createFundingSource = async (
  options: CreateFundingSourceOptions
) => {
  try {
    return await dwollaClient
      .post(`customers/${options.customerId}/funding-sources`, {
        name: options.fundingSourceName,
        plaidToken: options.plaidToken,
      })
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Funding Source Failed: ", err);
  }
};

export const createOnDemandAuthorization = async () => {
  try {
    const onDemandAuthorization = await dwollaClient.post(
      "on-demand-authorizations"
    );
    const authLink = onDemandAuthorization.body._links;
    return authLink;
  } catch (err) {
    console.error("Creating an On Demand Authorization Failed: ", err);
  }
};

export const createDwollaCustomer = async (
  newCustomer: NewDwollaCustomerParams
) => {
  try {
    return await dwollaClient
      .post("customers", newCustomer)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Creating a Dwolla Customer Failed: ", err);
  }
};

export const createTransfer = async ({
  sourceFundingSourceUrl,
  destinationFundingSourceUrl,
  amount,
}: TransferParams) => {
  try {
    const requestBody = {
      _links: {
        source: {
          href: sourceFundingSourceUrl,
        },
        destination: {
          href: destinationFundingSourceUrl,
        },
      },
      amount: {
        currency: "USD",
        value: amount,
      },
    };
    return await dwollaClient
      .post("transfers", requestBody)
      .then((res) => res.headers.get("location"));
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};

export const addFundingSource = async ({
  dwollaCustomerId,
  processorToken,
  bankName,
}: AddFundingSourceParams) => {
  try {
    // create dwolla auth link
    const dwollaAuthLinks = await createOnDemandAuthorization();

    // add funding source to the dwolla customer & get the funding source url
    const fundingSourceOptions = {
      customerId: dwollaCustomerId,
      fundingSourceName: bankName,
      plaidToken: processorToken,
      _links: dwollaAuthLinks,
    };
    return await createFundingSource(fundingSourceOptions);
  } catch (err) {
    console.error("Transfer fund failed: ", err);
  }
};
```

</details>

<details>
<summary><code>bank.actions.ts</code></summary>

```typescript
"use server";

import {
  ACHClass,
  CountryCode,
  TransferAuthorizationCreateRequest,
  TransferCreateRequest,
  TransferNetwork,
  TransferType,
} from "plaid";

import { plaidClient } from "../plaid.config";
import { parseStringify } from "../utils";

import { getTransactionsByBankId } from "./transaction.actions";
import { getBanks, getBank } from "./user.actions";

// Get multiple bank accounts
export const getAccounts = async ({ userId }: getAccountsProps) => {
  try {
    // get banks from db
    const banks = await getBanks({ userId });

    const accounts = await Promise.all(
      banks?.map(async (bank: Bank) => {
        // get each account info from plaid
        const accountsResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });
        const accountData = accountsResponse.data.accounts[0];

        // get institution info from plaid
        const institution = await getInstitution({
          institutionId: accountsResponse.data.item.institution_id!,
        });

        const account = {
          id: accountData.account_id,
          availableBalance: accountData.balances.available!,
          currentBalance: accountData.balances.current!,
          institutionId: institution.institution_id,
          name: accountData.name,
          officialName: accountData.official_name,
          mask: accountData.mask!,
          type: accountData.type as string,
          subtype: accountData.subtype! as string,
          appwriteItemId: bank.$id,
          sharableId: bank.sharableId,
        };

        return account;
      })
    );

    const totalBanks = accounts.length;
    const totalCurrentBalance = accounts.reduce((total, account) => {
      return total + account.currentBalance;
    }, 0);

    return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get one bank account
export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
  try {
    // get bank from db
    const bank = await getBank({ documentId: appwriteItemId });

    // get account info from plaid
    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });
    const accountData = accountsResponse.data.accounts[0];

    // get transfer transactions from appwrite
    const transferTransactionsData = await getTransactionsByBankId({
      bankId: bank.$id,
    });

    const transferTransactions = transferTransactionsData.documents.map(
      (transferData: Transaction) => ({
        id: transferData.$id,
        name: transferData.name!,
        amount: transferData.amount!,
        date: transferData.$createdAt,
        paymentChannel: transferData.channel,
        category: transferData.category,
        type: transferData.senderBankId === bank.$id ? "debit" : "credit",
      })
    );

    // get institution info from plaid
    const institution = await getInstitution({
      institutionId: accountsResponse.data.item.institution_id!,
    });

    const transactions = await getTransactions({
      accessToken: bank?.accessToken,
    });

    const account = {
      id: accountData.account_id,
      availableBalance: accountData.balances.available!,
      currentBalance: accountData.balances.current!,
      institutionId: institution.institution_id,
      name: accountData.name,
      officialName: accountData.official_name,
      mask: accountData.mask!,
      type: accountData.type as string,
      subtype: accountData.subtype! as string,
      appwriteItemId: bank.$id,
    };

    // sort transactions by date such that the most recent transaction is first
    const allTransactions = [...transactions, ...transferTransactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return parseStringify({
      data: account,
      transactions: allTransactions,
    });
  } catch (error) {
    console.error("An error occurred while getting the account:", error);
  }
};

// Get bank info
export const getInstitution = async ({
  institutionId,
}: getInstitutionProps) => {
  try {
    const institutionResponse = await plaidClient.institutionsGetById({
      institution_id: institutionId,
      country_codes: ["US"] as CountryCode[],
    });

    const intitution = institutionResponse.data.institution;

    return parseStringify(intitution);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Get transactions
export const getTransactions = async ({
  accessToken,
}: getTransactionsProps) => {
  let hasMore = true;
  let transactions: any = [];

  try {
    // Iterate through each page of new transaction updates for item
    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        paymentChannel: transaction.payment_channel,
        type: transaction.payment_channel,
        accountId: transaction.account_id,
        amount: transaction.amount,
        pending: transaction.pending,
        category: transaction.category ? transaction.category[0] : "",
        date: transaction.date,
        image: transaction.logo_url,
      }));

      hasMore = data.has_more;
    }

    return parseStringify(transactions);
  } catch (error) {
    console.error("An error occurred while getting the accounts:", error);
  }
};

// Create Transfer
export const createTransfer = async () => {
  const transferAuthRequest: TransferAuthorizationCreateRequest = {
    access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
    account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
    funding_account_id: "442d857f-fe69-4de2-a550-0c19dc4af467",
    type: "credit" as TransferType,
    network: "ach" as TransferNetwork,
    amount: "10.00",
    ach_class: "ppd" as ACHClass,
    user: {
      legal_name: "Anne Charleston",
    },
  };
  try {
    const transferAuthResponse =
      await plaidClient.transferAuthorizationCreate(transferAuthRequest);
    const authorizationId = transferAuthResponse.data.authorization.id;

    const transferCreateRequest: TransferCreateRequest = {
      access_token: "access-sandbox-cddd20c1-5ba8-4193-89f9-3a0b91034c25",
      account_id: "Zl8GWV1jqdTgjoKnxQn1HBxxVBanm5FxZpnQk",
      description: "payment",
      authorization_id: authorizationId,
    };

    const responseCreateResponse = await plaidClient.transferCreate(
      transferCreateRequest
    );

    const transfer = responseCreateResponse.data.transfer;
    return parseStringify(transfer);
  } catch (error) {
    console.error(
      "An error occurred while creating transfer authorization:",
      error
    );
  }
};
```

</details>


<details>
<summary><code>BankTabItem.tsx</code></summary>

```typescript jsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { cn, formUrlQuery } from "@/lib/utils";

export const BankTabItem = ({ account, appwriteItemId }: BankTabItemProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div
      onClick={handleBankChange}
      className={cn(`banktab-item`, {
        " border-blue-600": isActive,
      })}
    >
      <p
        className={cn(`text-16 line-clamp-1 flex-1 font-medium text-gray-500`, {
          " text-blue-600": isActive,
        })}
      >
        {account.name}
      </p>
    </div>
  );
};
```

</details>

<details>
<summary><code>BankInfo.tsx</code></summary>

```typescript jsx
"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

import {
  cn,
  formUrlQuery,
  formatAmount,
  getAccountTypeColors,
} from "@/lib/utils";

const BankInfo = ({ account, appwriteItemId, type }: BankInfoProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isActive = appwriteItemId === account?.appwriteItemId;

  const handleBankChange = () => {
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: account?.appwriteItemId,
    });
    router.push(newUrl, { scroll: false });
  };

  const colors = getAccountTypeColors(account?.type as AccountTypes);

  return (
    <div
      onClick={handleBankChange}
      className={cn(`bank-info ${colors.bg}`, {
        "shadow-sm border-blue-700": type === "card" && isActive,
        "rounded-xl": type === "card",
        "hover:shadow-sm cursor-pointer": type === "card",
      })}
    >
      <figure
        className={`flex-center h-fit rounded-full bg-blue-100 ${colors.lightBg}`}
      >
        <Image
          src="/icons/connect-bank.svg"
          width={20}
          height={20}
          alt={account.subtype}
          className="m-2 min-w-5"
        />
      </figure>
      <div className="flex w-full flex-1 flex-col justify-center gap-1">
        <div className="bank-info_content">
          <h2
            className={`text-16 line-clamp-1 flex-1 font-bold text-blue-900 ${colors.title}`}
          >
            {account.name}
          </h2>
          {type === "full" && (
            <p
              className={`text-12 rounded-full px-3 py-1 font-medium text-blue-700 ${colors.subText} ${colors.lightBg}`}
            >
              {account.subtype}
            </p>
          )}
        </div>

        <p className={`text-16 font-medium text-blue-700 ${colors.subText}`}>
          {formatAmount(account.currentBalance)}
        </p>
      </div>
    </div>
  );
};

export default BankInfo;
```

</details>

<details>
<summary><code>Copy.tsx</code></summary>

```typescript jsx
"use client";
import { useState } from "react";

import { Button } from "./ui/button";

const Copy = ({ title }: { title: string }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(title);
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <Button
      data-state="closed"
      className="mt-3 flex max-w-[320px] gap-4"
      variant="secondary"
      onClick={copyToClipboard}
    >
      <p className="line-clamp-1 w-full max-w-full text-xs font-medium text-black-2">
        {title}
      </p>

      {!hasCopied ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="mr-2 size-4"
        >
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="mr-2 size-4"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </Button>
  );
};

export default Copy;
```

</details>

<details>
<summary><code>PaymentTransferForm.tsx</code></summary>

```typescript jsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { createTransfer } from "@/lib/actions/dwolla.actions";
import { createTransaction } from "@/lib/actions/transaction.actions";
import { getBank, getBankByAccountId } from "@/lib/actions/user.actions";
import { decryptId } from "@/lib/utils";

import { BankDropdown } from "./bank/BankDropdown";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(4, "Transfer note is too short"),
  amount: z.string().min(4, "Amount is too short"),
  senderBank: z.string().min(4, "Please select a valid bank account"),
  sharableId: z.string().min(8, "Please select a valid sharable Id"),
});

const PaymentTransferForm = ({ accounts }: PaymentTransferFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      amount: "",
      senderBank: "",
      sharableId: "",
    },
  });

  const submit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    try {
      const receiverAccountId = decryptId(data.sharableId);
      const receiverBank = await getBankByAccountId({
        accountId: receiverAccountId,
      });
      const senderBank = await getBank({ documentId: data.senderBank });

      const transferParams = {
        sourceFundingSourceUrl: senderBank.fundingSourceUrl,
        destinationFundingSourceUrl: receiverBank.fundingSourceUrl,
        amount: data.amount,
      };
      // create transfer
      const transfer = await createTransfer(transferParams);

      // create transfer transaction
      if (transfer) {
        const transaction = {
          name: data.name,
          amount: data.amount,
          senderId: senderBank.userId.$id,
          senderBankId: senderBank.$id,
          receiverId: receiverBank.userId.$id,
          receiverBankId: receiverBank.$id,
          email: data.email,
        };

        const newTransaction = await createTransaction(transaction);

        if (newTransaction) {
          form.reset();
          router.push("/");
        }
      }
    } catch (error) {
      console.error("Submitting create transfer request failed: ", error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)} className="flex flex-col">
        <FormField
          control={form.control}
          name="senderBank"
          render={() => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Select Source Bank
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Select the bank account you want to transfer funds from
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <BankDropdown
                      accounts={accounts}
                      setValue={form.setValue}
                      otherStyles="!w-full"
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-6 pt-5">
                <div className="payment-transfer_form-content">
                  <FormLabel className="text-14 font-medium text-gray-700">
                    Transfer Note (Optional)
                  </FormLabel>
                  <FormDescription className="text-12 font-normal text-gray-600">
                    Please provide any additional information or instructions
                    related to the transfer
                  </FormDescription>
                </div>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Textarea
                      placeholder="Write a short note here"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_form-details">
          <h2 className="text-18 font-semibold text-gray-900">
            Bank account details
          </h2>
          <p className="text-16 font-normal text-gray-600">
            Enter the bank account details of the recipient
          </p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Recipient&apos;s Email Address
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: johndoe@gmail.com"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="sharableId"
          render={({ field }) => (
            <FormItem className="border-t border-gray-200">
              <div className="payment-transfer_form-item pb-5 pt-6">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Receiver&apos;s Plaid Sharable Id
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="Enter the public account number"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem className="border-y border-gray-200">
              <div className="payment-transfer_form-item py-5">
                <FormLabel className="text-14 w-full max-w-[280px] font-medium text-gray-700">
                  Amount
                </FormLabel>
                <div className="flex w-full flex-col">
                  <FormControl>
                    <Input
                      placeholder="ex: 5.00"
                      className="input-class"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-12 text-red-500" />
                </div>
              </div>
            </FormItem>
          )}
        />

        <div className="payment-transfer_btn-box">
          <Button type="submit" className="payment-transfer_btn">
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" /> &nbsp; Sending...
              </>
            ) : (
              "Transfer Funds"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentTransferForm;
```

</details>

<details>
<summary><code>Missing from the video (top right on the transaction list page) BankDropdown.tsx</code></summary>

```typescript jsx
"use client";

import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
} from "@/components/ui/select";
import { formUrlQuery, formatAmount } from "@/lib/utils";

export const BankDropdown = ({
  accounts = [],
  setValue,
  otherStyles,
}: BankDropdownProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selected, setSeclected] = useState(accounts[0]);

  const handleBankChange = (id: string) => {
    const account = accounts.find((account) => account.appwriteItemId === id)!;

    setSeclected(account);
    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "id",
      value: id,
    });
    router.push(newUrl, { scroll: false });

    if (setValue) {
      setValue("senderBank", id);
    }
  };

  return (
    <Select
      defaultValue={selected.id}
      onValueChange={(value) => handleBankChange(value)}
    >
      <SelectTrigger
        className={`flex w-full gap-3 md:w-[300px] ${otherStyles}`}
      >
        <Image
          src="icons/credit-card.svg"
          width={20}
          height={20}
          alt="account"
        />
        <p className="line-clamp-1 w-full text-left">{selected.name}</p>
      </SelectTrigger>
      <SelectContent
        className={`w-full md:w-[300px] ${otherStyles}`}
        align="end"
      >
        <SelectGroup>
          <SelectLabel className="py-2 font-normal text-gray-500">
            Select a bank to display
          </SelectLabel>
          {accounts.map((account: Account) => (
            <SelectItem
              key={account.id}
              value={account.appwriteItemId}
              className="cursor-pointer border-t"
            >
              <div className="flex flex-col ">
                <p className="text-16 font-medium">{account.name}</p>
                <p className="text-14 font-medium text-blue-600">
                  {formatAmount(account.currentBalance)}
                </p>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
```

</details>

<details>
<summary><code>Pagination.tsx</code></summary>

```typescript jsx
"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { formUrlQuery } from "@/lib/utils";

export const Pagination = ({ page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams()!;

  const handleNavigation = (type: "prev" | "next") => {
    const pageNumber = type === "prev" ? page - 1 : page + 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: "page",
      value: pageNumber.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-between gap-3">
      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => handleNavigation("prev")}
        disabled={Number(page) <= 1}
      >
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="mr-2"
        />
        Prev
      </Button>
      <p className="text-14 flex items-center px-2">
        {page} / {totalPages}
      </p>
      <Button
        size="lg"
        variant="ghost"
        className="p-0 hover:bg-transparent"
        onClick={() => handleNavigation("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
        <Image
          src="/icons/arrow-left.svg"
          alt="arrow"
          width={20}
          height={20}
          className="ml-2 -scale-x-100"
        />
      </Button>
    </div>
  );
};
```

</details>

<details>
<summary><code>Category.tsx</code></summary>

```typescript jsx
import Image from "next/image";

import { topCategoryStyles } from "@/constants";
import { cn } from "@/lib/utils";

import { Progress } from "./ui/progress";

export const Category = ({ category }: CategoryProps) => {
  const {
    bg,
    circleBg,
    text: { main, count },
    progress: { bg: progressBg, indicator },
    icon,
  } = topCategoryStyles[category.name as keyof typeof topCategoryStyles] ||
  topCategoryStyles.default;

  return (
    <div className={cn("gap-[18px] flex p-4 rounded-xl", bg)}>
      <figure className={cn("flex-center size-10 rounded-full", circleBg)}>
        <Image src={icon} width={20} height={20} alt={category.name} />
      </figure>
      <div className="flex w-full flex-1 flex-col gap-2">
        <div className="text-14 flex justify-between">
          <h2 className={cn("font-medium", main)}>{category.name}</h2>
          <h3 className={cn("font-normal", count)}>{category.count}</h3>
        </div>
        <Progress
          value={(category.count / category.totalCount) * 100}
          className={cn("h-2 w-full", progressBg)}
          indicatorClassName={cn("h-2 w-full", indicator)}
        />
      </div>
    </div>
  );
};
```

</details>

## <a name="links">🔗 静态资源</a>

静态资源在这里-> [here](https://drive.google.com/file/d/1TVhdnD97LajGsyaiNa6sDs-ap-z1oerA/view?usp=sharing)

## <a name="more">🚀 更多</a>

**提高next-js应用能力**

今天又提升了！！


# 便捷阅读导航
<ui>
    <li><a href="#kj">框架安装教程</a></li>
    <li><a href="#jg">项目结构</a></li>
    <li><a href="#tailwindcss">项目主题配置</a></li>
    <li><a href="#css">ui组件样式</a></li>
    <li><a href="#lxxr">登录注册功能类型渲染</a></li>
</ui>


```md
# 使用服务器端渲染路由嵌套布局以及使用ts的可重复的表单管理
# 使用zod中的React Hook表单用于付款
# 完全移动响应式的ui和sentry监控软件，可分析性能，通过改进方法让银行收款转账更安全，注册完成必须链接银行
```

# <a href="https://ui.shadcn.com/" id="kj">安装shadcn/ui框架</a>

### 第一步
```bash
# 运行命令以创建新的Next.js项目或设置现有项目：init

npx shadcn@latest init

```
### 第二步
```bash
# 配置 components.json

# Which style would you like to use? › New York
# Which color would you like to use as base color? › Zinc
# Do you want to use CSS variables for colors? › no / yes

```
### 第三步
```bash
# 在可以开始向项目添加组件。
npx shadcn@latest add button

```
```tsx
/* 上面的命令会将组件添加到项目中。然后，可以像这样导入它：Button */
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div>
      <Button>Click me</Button>
    </div>
  )
}


```
# <a id="jg">项目结构</a>
## 顶级文件夹
### 顶级文件夹用于组织应用程序的代码和静态资产。

<img src="https://nextjs.org/_next/image?url=%2Fdocs%2Fdark%2Ftop-level-folders.png&w=3840&q=75&dpl=dpl_EUSaQqv3K9ZsXNUBDxWoZBJvSeHe" alt="顶部结构"/>

<ui>
    <li> app	应用程序路由器</li>
    <li> pages	Pages 路由器</li>
    <li> public	要提供的静态资产</li>
    <li>src	可选的应用程序源文件夹</li>
</ui>

## 顶部文件
### 顶级文件用于配置应用程序、管理依赖项、运行中间件、集成监控工具和定义环境变量。

## Next.js
<table>
    <tr>
        <th>文件名</th>
        <th>用途</th>
    </tr>
    <tr>
        <td>next.config.js</td>
        <td>Next.js 的配置文件</td>
    </tr>
    <tr>
        <td>package.json</td>
        <td>项目依赖项和脚本</td>
    </tr>
    <tr>
        <td>instrumentation.ts</td>
        <td>OpenTelemetry 和 Instrumentation 文件</td>
    </tr>
    <tr>
        <td>middleware.ts</td>
        <td>Next.js 请求中间件</td>
    </tr>
    <tr>
        <td>.env</td>
        <td>环境变量</td>
    </tr>
    <tr>
        <td>.env.local</td>
        <td>本地环境变量</td>
    </tr>
    <tr>
        <td>.env.production</td>
        <td>生产环境变量</td>
    </tr>
    <tr>
        <td>.env.development</td>
        <td>开发环境变量</td>
    </tr>
    <tr>
        <td>.eslintrc.json</td>
        <td>ESLint 的配置文件</td>
    </tr>
    <tr>
        <td>.gitignore</td>
        <td>要忽略的 Git 文件和文件夹</td>
    </tr>
    <tr>
        <td>next-env.d.ts</td>
        <td>Next.js 的 TypeScript 声明文件</td>
    </tr>
    <tr>
        <td>tsconfig.json</td>
        <td>TypeScript 的配置文件</td>
    </tr>
    <tr>
        <td>jsconfig.json</td>
        <td>JavaScript 的配置文件</td>
    </tr>
</table>

## 路由文件
<table>
    <tr>
        <th>文件名</th>
        <th>扩展名</th>
        <th>用途</th>
    </tr>
    <tr>
        <td>layout</td>
        <td>.js .jsx .tsx</td>
        <td>布局</td>
    </tr>
    <tr>
        <td>page</td>
        <td>.js .jsx .tsx</td>
        <td>页</td>
    </tr>
    <tr>
        <td>loading</td>
        <td>.js .jsx .tsx</td>
        <td>加载 UI</td>
    </tr>
    <tr>
        <td>not-found</td>
        <td>.js .jsx .tsx</td>
        <td>未找到 UI</td>
    </tr>
    <tr>
        <td>error</td>
        <td>.js .jsx .tsx</td>
        <td>错误 UI</td>
    </tr>
    <tr>
        <td>global-error</td>
        <td>.js .jsx .tsx</td>
        <td>全局错误 UI</td>
    </tr>
    <tr>
        <td>route</td>
        <td>.js .ts</td>
        <td>API 终端节点</td>
    </tr>
    <tr>
        <td>template</td>
        <td>.js .jsx .tsx</td>
        <td>重新渲染的布局</td>
    </tr>
    <tr>
        <td>default</td>
        <td>.js .jsx .tsx</td>
        <td>Parallel route fallback 页面</td>
    </tr>
</table>

## 嵌套路由
<table>
    <tr>
        <th>文件名</th>
        <th>用途</th>
    </tr>
    <tr>
        <td>folder</td>
        <td>路线段</td>
    </tr>
    <tr>
        <td>folder/folder</td>
        <td>嵌套路由段</td>
    </tr>
</table>

## 动态路由
<table>
    <tr>
        <th>文件名</th>
        <th>用途</th>
    </tr>
    <tr>
        <td>[folder]</td>
        <td>动态路由段</td>
    </tr>
    <tr>
        <td>[...folder]</td>
        <td>Catch-all 路由段</td>
    </tr>
    <tr>
        <td>[[...folder]]</td>
        <td>可选的 catch-all 路由段</td>
    </tr>
</table>

## 路由组和私有文件夹
<table>
    <tr>
        <th>文件夹名</th>
        <th>用途</th>
    </tr>
    <tr>
        <td>(folder)</td>
        <td>对路由进行分组而不影响路由</td>
    </tr>
    <tr>
        <td>_folder</td>
        <td>选择文件夹和所有子段退出路由</td>
    </tr>
</table>

## <a id="tailwindcss">添加tailwindcss配置</a>
<details>
<summary><code>tailwind.config.ts</code></summary>

```ts
import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
		"./constants/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				fill: {
					1: "rgba(255, 255, 255, 0.10)",
				},
				bankGradient: "#0179FE",
				indigo: {
					500: "#6172F3",
					700: "#3538CD",
				},
				success: {
					25: "#F6FEF9",
					50: "#ECFDF3",
					100: "#D1FADF",
					600: "#039855",
					700: "#027A48",
					900: "#054F31",
				},
				pink: {
					25: "#FEF6FB",
					100: "#FCE7F6",
					500: "#EE46BC",
					600: "#DD2590",
					700: "#C11574",
					900: "#851651",
				},
				blue: {
					25: "#F5FAFF",
					100: "#D1E9FF",
					500: "#2E90FA",
					600: "#1570EF",
					700: "#175CD3",
					900: "#194185",
				},
				sky: {
					1: "#F3F9FF",
				},
				black: {
					1: "#00214F",
					2: "#344054",
				},
				gray: {
					25: "#FCFCFD",
					200: "#EAECF0",
					300: "#D0D5DD",
					500: "#667085",
					600: "#475467",
					700: "#344054",
					900: "#101828",
				},
			},
			backgroundImage: {
				"bank-gradient": "linear-gradient(90deg, #0179FE 0%, #4893FF 100%)",
				"gradient-mesh": "url('/icons/gradient-mesh.svg')",
				"bank-green-gradient":
					"linear-gradient(90deg, #01797A 0%, #489399 100%)",
			},
			boxShadow: {
				form: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
				chart:
					"0px 1px 3px 0px rgba(16, 24, 40, 0.10), 0px 1px 2px 0px rgba(16, 24, 40, 0.06)",
				profile:
					"0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
				creditCard: "8px 10px 16px 0px rgba(0, 0, 0, 0.05)",
			},
			fontFamily: {
				inter: "var(--font-inter)",
				"ibm-plex-serif": "var(--font-ibm-plex-serif)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;

```

</details>

## <a id="css">增加项目所需样式</a>
<details>
<summary><code>globals.css</code></summary>

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
.glassmorphism {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}

.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
  height: 3px;
  border-radius: 2px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #dddddd;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #5c5c7b;
  border-radius: 50px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #7878a3;
}

@layer utilities {
  .input-class {
    @apply text-16 placeholder:text-16 rounded-lg border border-gray-300 text-gray-900 placeholder:text-gray-500;
  }

  .sheet-content button {
    @apply focus:ring-0 focus-visible:ring-transparent focus:ring-offset-0 focus-visible:ring-offset-0 focus-visible:outline-none focus-visible:border-none !important;
  }

  .text14_padding10 {
    @apply text-14 px-4 py-2.5 font-semibold;
  }

  .flex-center {
    @apply flex items-center justify-center;
  }

  .header-2 {
    @apply text-18 font-semibold text-gray-900;
  }

  .text-10 {
    @apply text-[10px] leading-[14px];
  }

  .text-12 {
    @apply text-[12px] leading-[16px];
  }

  .text-14 {
    @apply text-[14px] leading-[20px];
  }

  .text-16 {
    @apply text-[16px] leading-[24px];
  }

  .text-18 {
    @apply text-[18px] leading-[22px];
  }

  .text-20 {
    @apply text-[20px] leading-[24px];
  }

  .text-24 {
    @apply text-[24px] leading-[30px];
  }

  .text-26 {
    @apply text-[26px] leading-[32px];
  }

  .text-30 {
    @apply text-[30px] leading-[38px];
  }

  .text-36 {
    @apply text-[36px] leading-[44px];
  }

  /* Home */
  .home {
    @apply no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll;
  }

  .home-content {
    @apply no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 sm:px-8 py-7 lg:py-12 xl:max-h-screen xl:overflow-y-scroll;
  }

  .home-header {
    @apply flex flex-col justify-between gap-8;
  }

  .total-balance {
    @apply flex w-full items-center gap-4 rounded-xl border border-gray-200 p-4 shadow-chart sm:gap-6 sm:p-6;
  }

  .total-balance-chart {
    @apply flex size-full max-w-[100px] items-center sm:max-w-[120px];
  }

  .total-balance-label {
    @apply text-14 font-medium text-gray-600;
  }

  .total-balance-amount {
    @apply text-24 lg:text-30 flex-1 font-semibold text-gray-900;
  }

  .recent-transactions {
    @apply flex w-full flex-col gap-6;
  }

  .view-all-btn {
    @apply text-14 rounded-lg border border-gray-300 px-4 py-2.5 font-semibold text-gray-700;
  }

  .recent-transactions {
    @apply flex w-full flex-col gap-6;
  }

  .recent-transactions-label {
    @apply text-20 md:text-24 font-semibold text-gray-900;
  }

  .recent-transactions-tablist {
    @apply custom-scrollbar mb-8 flex w-full flex-nowrap;
  }

  /* Right sidebar */
  .right-sidebar {
    @apply no-scrollbar hidden h-screen max-h-screen flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll !important;
  }

  .profile-banner {
    @apply h-[120px] w-full bg-gradient-mesh bg-cover bg-no-repeat;
  }

  .profile {
    @apply relative flex px-6 max-xl:justify-center;
  }

  .profile-img {
    @apply flex-center absolute -top-8 size-24 rounded-full bg-gray-100 border-8 border-white p-2 shadow-profile;
  }

  .profile-details {
    @apply flex flex-col pt-24;
  }

  .profile-name {
    @apply text-24 font-semibold text-gray-900;
  }

  .profile-email {
    @apply text-16 font-normal text-gray-600;
  }

  .banks {
    @apply flex flex-col justify-between gap-8 px-6 py-8;
  }

  /* My Banks */
  .my-banks {
    @apply flex h-screen max-h-screen w-full flex-col gap-8 bg-gray-25 p-8 xl:py-12;
  }

  /* My Banks */
  .transactions {
    @apply flex max-h-screen w-full flex-col gap-8 overflow-y-scroll bg-gray-25 p-8 xl:py-12;
  }

  .transactions-header {
    @apply flex w-full flex-col items-start justify-between gap-8 md:flex-row;
  }

  .transactions-account {
    @apply flex flex-col justify-between gap-4 rounded-lg border-y bg-blue-600 px-4 py-5 md:flex-row;
  }

  .transactions-account-balance {
    @apply flex-center flex-col  gap-2 rounded-md bg-blue-25/20 px-4 py-2 text-white;
  }

  .header-box {
    @apply flex flex-col gap-1;
  }

  .header-box-title {
    @apply text-24 lg:text-30 font-semibold text-gray-900;
  }

  .header-box-subtext {
    @apply text-14 lg:text-16 font-normal text-gray-600;
  }

  /* Bank Card */
  .bank-card {
    @apply relative flex h-[190px] w-full max-w-[320px] justify-between rounded-[20px] border border-white bg-bank-gradient shadow-creditCard backdrop-blur-[6px];
  }

  .bank-card_content {
    @apply relative z-10 flex size-full max-w-[228px] flex-col justify-between rounded-l-[20px] bg-gray-700 bg-bank-gradient px-5 pb-4 pt-5;
  }

  .bank-card_icon {
    @apply flex size-full flex-1 flex-col items-end justify-between rounded-r-[20px] bg-bank-gradient bg-cover bg-center bg-no-repeat py-5 pr-5;
  }

  /* Bank Info */
  .bank-info {
    @apply gap-[18px] flex p-4 transition-all border bg-blue-25 border-transparent;
  }

  /* Category Badge */
  .category-badge {
    @apply flex-center truncate w-fit gap-1 rounded-2xl border-[1.5px] py-[2px] pl-1.5 pr-2;
  }

  .banktab-item {
    @apply gap-[18px] border-b-2 flex px-2 sm:px-4 py-2 transition-all;
  }

  /* Mobile nav */
  .mobilenav-sheet {
    @apply flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto;
  }

  .mobilenav-sheet_close {
    @apply flex gap-3 items-center p-4 rounded-lg w-full max-w-60;
  }

  /* PlaidLink */
  .plaidlink-primary {
    @apply text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form;
  }

  .plaidlink-ghost {
    @apply flex cursor-pointer items-center justify-center gap-3 rounded-lg px-3 py-7 hover:bg-white lg:justify-start;
  }

  .plaidlink-default {
    @apply flex !justify-start cursor-pointer gap-3 rounded-lg !bg-transparent flex-row;
  }

  /* Auth */
  .auth-asset {
    @apply flex h-screen w-full sticky top-0 items-center justify-end bg-sky-1 max-lg:hidden;
  }

  /* Auth Form */
  .auth-form {
    @apply flex min-h-screen w-full max-w-[420px] flex-col justify-center gap-5 py-10 md:gap-8;
  }

  .form-item {
    @apply flex flex-col gap-1.5;
  }

  .form-label {
    @apply text-14 w-full max-w-[280px] font-medium text-gray-700;
  }

  .form-message {
    @apply text-12 text-red-500;
  }

  .form-btn {
    @apply text-16 rounded-lg border border-bankGradient bg-bank-gradient font-semibold text-white shadow-form;
  }

  .form-link {
    @apply text-14 cursor-pointer font-medium text-bankGradient;
  }

  /* Payment Transfer */
  .payment-transfer {
    @apply no-scrollbar flex flex-col overflow-y-scroll bg-gray-25 p-8 md:max-h-screen xl:py-12;
  }

  .payment-transfer_form-item {
    @apply flex w-full max-w-[850px] flex-col gap-3 md:flex-row lg:gap-8;
  }

  .payment-transfer_form-content {
    @apply flex w-full max-w-[280px] flex-col gap-2;
  }

  .payment-transfer_form-details {
    @apply flex flex-col gap-1 border-t border-gray-200 pb-5 pt-6;
  }

  .payment-transfer_btn-box {
    @apply mt-5 flex w-full max-w-[850px] gap-3 border-gray-200 py-5;
  }

  .payment-transfer_btn {
    @apply text-14 w-full bg-bank-gradient font-semibold text-white shadow-form !important;
  }

  /* Root Layout */
  .root-layout {
    @apply flex h-16 items-center justify-between p-5 shadow-creditCard sm:p-8 md:hidden;
  }

  /* Bank Info */
  .bank-info_content {
    @apply flex flex-1 items-center justify-between gap-2 overflow-hidden;
  }

  /* Footer */
  .footer {
    @apply flex cursor-pointer items-center justify-between gap-2 py-6;
  }

  .footer_name {
    @apply flex size-10 items-center justify-center rounded-full bg-gray-200 max-xl:hidden;
  }

  .footer_email {
    @apply flex flex-1 flex-col justify-center max-xl:hidden;
  }

  .footer_name-mobile {
    @apply flex size-10 items-center justify-center rounded-full bg-gray-200;
  }

  .footer_email-mobile {
    @apply flex flex-1 flex-col justify-center;
  }

  .footer_image {
    @apply relative size-5 max-xl:w-full max-xl:flex max-xl:justify-center max-xl:items-center;
  }

  /* Sidebar */
  .sidebar {
    @apply sticky left-0 top-0 flex h-screen w-fit flex-col  justify-between border-r border-gray-200 bg-white pt-8 text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px];
  }

  .sidebar-logo {
    @apply 2xl:text-26 font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden;
  }

  .sidebar-link {
    @apply flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start;
  }

  .sidebar-label {
    @apply text-16 font-semibold text-black-2 max-xl:hidden;
  }
}


```
</details>

## 项目配置

<details>
<summary><code>next.config.ts</code></summary>

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true
    },
    eslint: {
        ignoreDuringBuilds: true
    }
};

export default nextConfig;
```

</details>

# 创建资源导入utils文件夹

```Plaintext
    src/
    |──utils/
        └──index.ts
```
<details>
<summary><code>index.ts</code></summary>

```ts
/*
* conins icon
* */
export const coninsIcon = '/icons/auth-image.svg'

/*
* logo svg
* */
export const logoIcon = '/icons/logo.svg'
export const plugin = '/icons/plus.svg'
export const PayIcon = '/icons/Paypass.svg'
export const RepayIcon = '/icons/mastercard.svg'
export const linesIcon = '/icons/lines.png'
/*
* SidebarIcon
* */
//首页
export const HomeIcon = '/icons/home.svg'

//我的银行
export const BanksIcon = '/icons/dollar-circle.svg'

//交易历史
export const transactionIcon = '/icons/transaction.svg'

//转账
export const moneyIcon = '/icons/money-send.svg'


/*
* MobileNav logo
* */
export const hamburgerIcon = '/icons/hamburger.svg'

export const logoutIcon = '/icons/logout.svg'

/*
* 公共样式
* */

```

</details>

## 创建文件
### 结构如下

```Plaintext
app/
    ├── (auth)/
    └── (root)/
```


### 将page.tsx移动到(root)
```Plaintext
    app/
    ├── (auth)/
    └── (root)/
         └── page.tsx
```
#### 说明
<ul> 
    <li>(auth): 用于并行路由的命名槽。</li> 
    <li>(root): 根路由文件夹，包含主页面文件 page.tsx。</li> 
</ul>

#### 示例路径

<ul> 
    <li>(.)folder: 截距相同级别</li> 
    <li>(..)folder: 截距 1 级以上</li>
    <li>(..)(..)folder: 截距以上两级</li>
    <li>(...): 从根截距</li> 
</ul>

### 编辑app目录下layout.tsx，完成基本布局信息

<details>
<summary><code>layout.tsx</code></summary>

```tsx
import React from "react";

export const dynamic = 'force-dynamic'

import type { Metadata } from "next";
import { Inter, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-ibm-plex-serif'
})

export const metadata: Metadata = {
  title: "银行交易",
  description: "银行交易.",
  icons: {
    icon:'/icons/logo.svg',
  }
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
      <body className={`${inter.variable} ${ibmPlexSerif.variable}`}>{children}</body>
      </html>
  );
}


```

</details>

## 在(auth)目录下创建sign-in与sign-up目录完成注册登录的组件创建，并创建样式布局组件
```Plaintext
app/
├── (auth)/
│   ├── sign-in/
│   │   ├── page.tsx
│   ├── sign-up/
│   │   ├── page.tsx
|   ├── layout.tsx
└──(root)

```

<details>
<summary><code>layout.tsx</code></summary>

```typescript jsx
import React from "react";
import Image from "next/image";
import {coninsIcon} from "@/utils";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex min-h-screen w-full justify-between font-inter">
            {children}
            <div className="auth-asset">
                <div>
                    <Image
                        src={coninsIcon}
                        alt="auth images"
                        width={500}
                        height={500}
                        className="rounded-l-xl object-contain"
                    />
                </div>
            </div>
        </main>
    )
}
```
</details>


# sign-in

<details>
<summary><code>page.tsx</code></summary>

```tsx
import AuthForm from "@/components/from/AuthForm";

const SignIn =  () => {
    return (
        <section className="flex-center size-full max-sm:px-6">
            <AuthForm type="sign-in" />
        </section>
    )
}

export default SignIn
```
</details>

# sign-up

<details>
<summary>page.tsx</summary>

```tsx
import AuthForm from "@/components/from/AuthForm";

const Signup =  () => {
    return (
        <section className="flex-center size-full max-sm:px-6">
            <AuthForm type="sign-in" />
        </section>
    )
}

export default Signup
```

</details>

# 定义类型

# <a id="lxxr">lib/utils</a>
```ts
/*根据类型决定渲染*/
export const authFormSchema = (type: string) => z.object({
    // sign up
    firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
    state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
    postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
    dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
    // both
    email: z.string().email(),
    password: z.string().min(8),
})

```

# AuthFrom组件[登录注册]
```md
# 在components组件下创建from文件[创建AuthForm.tsx]

```

<details>
<summary><code>AuthForm.tsx</code></summary>

```tsx
"use client"

import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import {Form} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {authFormSchema} from "@/lib/utils";

const AuthForm = ({type}:{type:string}) => {

    const [user, setUser] = useState(null)

    const formSchema = authFormSchema(type);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ''
        },
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        console.log(data)
    }

    return (
        <section className="auth-form">
            <header className="flex flex-col gap-5 md:gap-8">
                <Link href="/" className="cursor-pointer flex items-center gap-1">
                    <Image
                        src="/icons/logo.svg"
                        alt="Logo"
                        width={34}
                        height={34}
                    />
                    <h1 className={`text-26 font-ibm-plex-serif font-bold text-black-1`}>银行收款</h1>
                </Link>

                {/*连接账户*/}
                <div className={`flex flex-col gap-1 md:gap-3`}>
                    <h1 className={`text-24 lg:text-36 font-semibold text-gray-900`}>
                        {user
                            ? '连接中'
                            : type === 'sign-in'
                                ? '登录'
                                : '注册'
                        }
                        <p className={`text-16 font-normal text-gray-600`}>
                            {user
                                ? '连接你的账户'
                                : '请输入你的账户密码'
                            }
                        </p>
                    </h1>
                </div>
            </header>
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-8`}>

                    </form>
                </Form>
            </>
            {type === 'sign-in' && (
                <>
                    sign-in
                </>
            )}
            {type === 'sign-up' && (
                <>
                    注册
                </>
            )}
        </section>
    )
}

export default AuthForm

```
</details>



http://localhost:3000/sign-in