"use server"

import {plaidClient} from "@/lib/plaid";
import {getBanks} from "@/lib/actions/user.action";
import {parseStringify} from "@/lib/utils";
import {CountryCode} from "plaid";

export const getAccounts = async ({ userId }: getAccountsProps) => {
    try {
        // 获取用户的银行信息
        const banks = await getBanks({ userId });

        // 使用 Promise.all 处理每个银行的账户信息
        // @ts-ignore
        const accountPromises = (banks || []).map(async (bank: Bank) => {
            try {
                // 获取每个银行的账户信息
                // @ts-ignore
                const accountsResponse: AccountsResponse = await plaidClient.accountsGet({
                    access_token: bank.accessToken,
                });

                // 检查 accountsResponse.data.accounts 是否存在并且不为空
                if (!Array.isArray(accountsResponse.data.accounts) || accountsResponse.data.accounts.length === 0) {
                    console.warn(`账户不存在: ${bank.$id}`);
                    return null;
                }

                // 获取机构信息
                const institution = await getInstitution({
                    institutionId: accountsResponse.data.item.institution_id!,
                });

                // 映射账户信息
                return accountsResponse.data.accounts.map((accountData) => ({
                    id: accountData.account_id,
                    availableBalance: accountData.balances.available ?? 0, // 使用空值合并运算符处理可能的 null
                    currentBalance: accountData.balances.current,
                    /*@ts-ignore*/
                    institutionId: institution.institution_id,
                    name: accountData.name,
                    officialName: accountData.official_name,
                    mask: accountData.mask,
                    type: accountData.type,
                    subtype: accountData.subtype,
                    appwriteItemId: bank.$id,
                    shareableId: bank.shareableId,
                }));
            } catch (error) {
                console.error(`Error fetching accounts for bank with ID: ${bank.$id}`, error);
                return null;
            }
        });

        // 等待所有 Promise 完成
        const results = await Promise.all(accountPromises);

        // 过滤掉 null 值（即那些没有成功获取账户信息的银行）
        const flattenedAccounts = results
            .filter(result => result !== null)
            .flatMap(result => result); // 将嵌套的数组展平

        return flattenedAccounts;
    } catch (error) {
        console.error("获取账户发送错误:", error);
        throw error; // 重新抛出错误，以便调用者可以处理
    }
};

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
