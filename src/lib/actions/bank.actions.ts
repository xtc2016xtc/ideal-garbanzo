"use server"

import {plaidClient} from "@/lib/plaid";
import {getBank, getBanks} from "@/lib/actions/user.action";
import {parseStringify} from "@/lib/utils";
import {CountryCode} from "plaid";
import {getTransactionsByBankId} from "@/lib/actions/transaction.actions";
import {createAdminClient} from "@/lib/appwrite";
import {ID} from "node-appwrite";
/*重新获取token*/
/*const fetchAccessToken = async () => {
    const clientId = "g4lLOzeDPtEfsmYNQGW3ml0i80c2ikeqGtUSHrG0rFrUMmXtnr";
    const clientSecret = "kpuoRTEviEtiDO97hX3NCRzcwarP0VQ56iRIuTaREmoBZat0tE";

    const response = await fetch("https://api-sandbox.dwolla.com/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            grant_type: "client_credentials",
            client_id: clientId,
            client_secret: clientSecret,
        }),
    });

    const data = await response.json();
    if (response.ok) {
        console.log("New access token:", data.access_token);
        return data.access_token;
    } else {
        console.error("Failed to generate access token:", data);
        return null;
    }
};

// 调用函数获取新 token
const accessToken = await fetchAccessToken();*/

// 使用老 Token 验证
// const oldAccessToken = "J2vy2t3nnLjuoXEhJfgCiozAYWbR1huNnlJfoDwSRjK5tLTgL1"; // 替换为老 Token
// const validateToken = async (accessToken: string) => {
//     const url = "https://api-sandbox.dwolla.com/funding-sources/bbc16127-38eb-4810-9d93-a13282eb006f"; // 替换为受保护资源的 URL
//
//     try {
//         const response = await fetch(url, {
//             method: "GET",
//             headers: {
//                 Authorization: `Bearer ${accessToken}`,
//                 Accept: "application/vnd.dwolla.v1.hal+json",
//             },
//         });
//
//         if (response.ok) {
//             const data = await response.json();
//             console.log("Token is valid. Response data:", data);
//             return true;
//         } else {
//             const error = await response.json();
//             console.error("Token validation failed:", error);
//             return false;
//         }
//     } catch (error) {
//         console.error("Error validating token:", error);
//         return false;
//     }
// };
//
//
// validateToken(oldAccessToken);



export const getAccounts = async ({ userId }: getAccountsProps) => {
    try {
        const banks = await getBanks({userId});

        const accounts = await Promise.all(
            // @ts-ignore
            banks?.map(async (bank:Bank)=> {
                const accountsResponse = await plaidClient.accountsGet({
                    access_token:bank.accessToken
                });

                const accountData = accountsResponse.data.accounts[0];
                const institution = await getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                return {
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
                    shareableId: bank.shareableId,
                };
            })
        )
        const totalBanks = accounts.length;
        const totalCurrentBalance = accounts.reduce((total, account) => {
            return total + account.currentBalance;
        }, 0);

        return parseStringify({ data: accounts, totalBanks, totalCurrentBalance });

    }catch (error) {
        console.error("获取账户异常",error);
    }
};


export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
    try {
        const bank = await getBank({ documentId: appwriteItemId })

        // console.log("bank",bank)

        if (!bank) {
            console.error("No account found for appwriteItemId", appwriteItemId);
        }

        const accountsResponse = await plaidClient.accountsGet({
            access_token: bank?.accessToken
        });

        console.log("access_token ", bank?.accessToken);

        const accountData = accountsResponse.data.accounts[0];

        if (!accountData) {
            console.error("No account found for appwriteItemId", appwriteItemId);
        }


        const transferTransactionsData = await getTransactionsByBankId({
            bankId: bank.$id,
        });


        console.log("传递的 bankId:", bank.$id);
        console.log("返回的 transferTransactionsData:",typeof transferTransactionsData);
        // 确保是字符串或与数据库字段类型一致


        if(!transferTransactionsData || transferTransactionsData.documents === null){
            console.log("数据库，没有交易数据或者用户账户授权")
        }

        if(transferTransactionsData.documents.length === 0){
            return parseStringify(transferTransactionsData.documents);
        }

        /*数据库如未有交易记录将不会执行便利交集数据*/
        const transferTransactions = transferTransactionsData.documents.map(
            // @ts-ignore
            (transferData: Transaction) => ({
                id: transferData.$id,
                name: transferData.name!,
                amount: transferData.amount!,
                date: transferData.$createdAt,
                paymentChannel: transferData.channel,
                category: transferData.category,
                // 使用金额和银行ID来判断交易类型
                type: transferData.amount < 0 ? "debit" : "credit",
            })
        );
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

        /*@ts-ignore*/
        const allTransactions = [...transactions, ...transferTransactions].sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );


        return parseStringify({
            data: account,
            transactions: allTransactions,
        });

    }catch (error){
        console.error(error)
    }
}

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

            console.log("交易数据",data)

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



