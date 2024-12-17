"use server"

import {createAdminClient} from "@/lib/appwrite";
import {Query} from "node-appwrite";
import {parseStringify} from "@/lib/utils";

const {APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_TRANSACTION_COLLECTION_ID: TRANSACTION_COLLECTION_ID,} = process.env;


export const getTransactionsByBankId = async ({bankId}: getTransactionsByBankIdProps) => {
    try {
        const { database } = await createAdminClient();

        const senderTransactions = await database.listDocuments(
            DATABASE_ID!,
            TRANSACTION_COLLECTION_ID!,
            [Query.equal('senderBankId', bankId)],
        )
        const receiverTransactions = await database.listDocuments(
            DATABASE_ID!,
            TRANSACTION_COLLECTION_ID!,
            [Query.equal('receiverBankId', bankId)],
        );


        const transactions = {
            total: senderTransactions.total + receiverTransactions.total,
            documents: [
                ...senderTransactions.documents,
                ...receiverTransactions.documents,
            ]
        }

        return parseStringify(transactions);
    } catch (error) {
        console.log(error);
    }
}
