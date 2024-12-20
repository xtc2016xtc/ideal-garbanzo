import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';

const configuration = new Configuration({
    username: process.env.PLAID_USERNAME,
    password: process.env.PLAID_PASSWORD,
    accessToken: process.env.PLAID_ACCESS_TOKEN,
    basePath: PlaidEnvironments.sandbox,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
            'Plaid-Version': "2020-09-14",
        }
    }
})

// console.log("configurations", configuration)

export const plaidClient = new PlaidApi(configuration);