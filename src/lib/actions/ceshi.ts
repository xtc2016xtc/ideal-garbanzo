"use server"

import {parseStringify} from "@/lib/utils";
import {Query} from "node-appwrite";
import {createAdminClient} from "@/lib/appwrite";
import {plaidClient} from "@/lib/plaid";

const {APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,} = process.env;

export const getBank = async ({ documentId }: getBankProps) => {
    try {
        const { database } = await createAdminClient();

        const bank = await database.listDocuments(
            DATABASE_ID!,
            BANK_COLLECTION_ID!,
            [Query.equal('$id', [documentId])]
        )

        return parseStringify(bank.documents[0]);
    } catch (error) {
        console.log(error)
    }
}


export const getAccount = async ({ appwriteItemId }: getAccountProps) => {
    try {
        const bank = await getBank({ documentId: appwriteItemId })

        if (!bank) {
            console.error("No account found for appwriteItemId", appwriteItemId);
        }

        const accountsResponse = await plaidClient.accountsGet({
            access_token: bank?.accessToken
        });

       const accountData = accountsResponse.data.accounts[0];

       if (!accountData) {
           console.error("No account found for appwriteItemId", appwriteItemId);
       }


    }catch (error){
        console.error(error)
    }
}