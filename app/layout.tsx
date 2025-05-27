import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "计数器-电子计数器在线-免费实时数字统计工具",
  description:
    "计数器无需下载，在线免费使用多功能计数器！适配手机/电脑端，适用于活动签到、健身计数、库存管理等场景，精准统计，实时反馈，助您高效完成数据记录！",
  keywords: "计数器, 电子计数器, 实时计数工具, 免费数字统计, 多功能计数器, 网页计数器, 人数统计在线, 数据记录工具",
  icons: {
    icon: "/favicon.ico",
  },
    generator: 'fengjun.wang'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <head>
        {/* 添加Font Awesome的CDN链接 */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
