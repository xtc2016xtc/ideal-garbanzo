import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {z} from "zod";
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return formatter.format(amount);
}

export const removeSpecialCharacters = (value: string) => {
  return value.replace(/[^\w\s]/gi, "");
};

export const getTransactionStatus = (date: Date) => {
  const today = new Date();
  const twoDaysAgo = new Date(today);
  twoDaysAgo.setDate(today.getDate() - 2);

  return date > twoDaysAgo ? "Processing" : "Success";
};

export function countTransactionCategories(
    transactions: Transaction[]
): CategoryCount[] {
  const categoryCounts: { [category: string]: number } = {};
  let totalCount = 0;

  // Iterate over each transaction
  transactions &&
  transactions.forEach((transaction) => {
    // Extract the category from the transaction
    const category = transaction.category;

    // If the category exists in the categoryCounts object, increment its count
    if (categoryCounts.hasOwnProperty(category)) {
      categoryCounts[category]++;
    } else {
      // Otherwise, initialize the count to 1
      categoryCounts[category] = 1;
    }

    // Increment total count
    totalCount++;
  });

  // Convert the categoryCounts object to an array of objects
  const aggregatedCategories: CategoryCount[] = Object.keys(categoryCounts).map(
      (category) => ({
        name: category,
        count: categoryCounts[category],
        totalCount,
      })
  );

  // Sort the aggregatedCategories array by count in descending order
  aggregatedCategories.sort((a, b) => b.count - a.count);

  return aggregatedCategories;
}

export function getAccountTypeColors(type: AccountTypes) {
  switch (type) {
    case "depository":
      return {
        bg: "bg-blue-25",
        lightBg: "bg-blue-100",
        title: "text-blue-900",
        subText: "text-blue-700",
      };

    case "credit":
      return {
        bg: "bg-success-25",
        lightBg: "bg-success-100",
        title: "text-success-900",
        subText: "text-success-700",
      };

    default:
      return {
        bg: "bg-green-25",
        lightBg: "bg-green-100",
        title: "text-green-900",
        subText: "text-green-700",
      };
  }
}


/* 转码 */
export const parseStringify = <T>(value: T): T => {
  try {
    return JSON.parse(JSON.stringify(value));
  } catch (error) {
    console.error("错误:", error);
    throw error;
  }
};

interface UrlQueryParams {
  params: string;
  key: string;
  value: string;
}

export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
      {
        url: window.location.pathname,
        query: currentUrl,
      },
      { skipNull: true }
  );
}


export const authFormSchema = (type:string) => z.object({
  /*注册*/
  firstName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  lastName: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  address1: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  city: type === 'sign-in' ? z.string().optional() : z.string().max(50),
  state: type === 'sign-in' ? z.string().optional() : z.string().min(2).max(2),
  postalCode: type === 'sign-in' ? z.string().optional() : z.string().min(3).max(6),
  dateOfBirth: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  ssn: type === 'sign-in' ? z.string().optional() : z.string().min(3),
  /*登录*/
  email: z.string().email(),
  password: z.string().min(8),
})

export function extractCustomerIdFromUrl(url: string) {
  //  用 '/' 拆分字符串
  const parts = url.split("/");

  // 提取最后一部分当做 ID
  return parts[parts.length - 1];
}

export function encryptId(id: string) {
  return btoa(id);
}