# 项目介绍
这是 [Next.js](https://nextjs.org) ,连接到多个银行账户的平台显示交易,实时资金转账给其他账户，使用超安全的ssr安全验证,展示账户交易列表和消费类别的主页,一个页面，可以在其中查看所有已链接的银行和交易列表,
以及付款页面，可以在其中转账

## 开始

运行开发服务器:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

打开 [http://localhost:3000](http://localhost:3000)

# 便捷阅读导航
<ui>
    <li><a href="#kj">框架安装教程</a></li>
    <li><a href="#jg">项目结构</a></li>
    <li><a href="#tailwindcss">项目主题配置</a></li>
    <li><a href="#css">ui组件样式</a></li>
    <li><a href="#lxxr">登录注册功能类型渲染</a></li>
</ui>





# 项目所有功能
<details>
<summary><code>汇总</code></summary>

```md
# 使用服务器端渲染路由嵌套布局以及使用ts的可重复的表单管理
```



</details>

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