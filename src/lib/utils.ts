import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {z} from "zod";
import qs from 'query-string'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
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