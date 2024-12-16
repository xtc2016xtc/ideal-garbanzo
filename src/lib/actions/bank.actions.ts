"use server"

import {plaidClient} from "@/lib/plaid";
import {getBanks} from "@/lib/actions/user.action";
import {parseStringify} from "@/lib/utils";
import {CountryCode} from "plaid";

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
