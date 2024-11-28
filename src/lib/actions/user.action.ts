"use server"

import {Query} from "node-appwrite";
import {cookies} from "next/headers";
import {createAdminClient} from "@/lib/appwrite";
import {parseStringify} from "@/lib/utils";
import {CountryCode, Products} from "plaid";
import {plaidClient} from "@/lib/plaid";


const {APPWRITE_DATABASE_ID: DATABASE_ID, APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,} = process.env;

/*获取id*/
export const getUserInfo = async ({ userId }: getUserInfoProps) => {
    try {
        const { database } = await createAdminClient();

        const user = await database.listDocuments(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            [Query.equal('userId', [userId])]
        )
        return parseStringify(user.documents[0]);
    } catch (error) {
        console.log(error)
    }
}

/*登录*/
export const signIn = async ({ email, password }: signInProps) => {
    try {
        const { account } = await createAdminClient();
        const session = await account.createEmailPasswordSession(email, password);

        (await cookies()).set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });

        const user = await getUserInfo({ userId: session.userId })

        return parseStringify(user);
    } catch (error) {
        console.error('Error', error);
    }
}

/*注册*/
export const signUp = async ({ password, ...userData }: SignUpParams) => {
    const { email, firstName, lastName } = userData;

    let newUserAccount;

    try {

    }catch (error) {
        console.error('注册遇到错误', error);
    }
}

/*链接银行*/
export const createLinkToken = async (user: User) => {
    try {
        const tokenParams = {
            user: {
                client_user_id: user.$id
            },
            client_name: `${user.firstName} ${user.lastName}`,
            products: ['auth'] as Products[],
            language: 'en',
            country_codes: ['US'] as CountryCode[],
        }

        const response = await plaidClient.linkTokenCreate(tokenParams);

        return parseStringify({ linkToken: response.data.link_token })
    } catch (error) {
        console.log(error);
    }
}


