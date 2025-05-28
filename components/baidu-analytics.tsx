"use client"

import { useEffect } from "react"

export default function BaiduAnalytics() {
  useEffect(() => {
    // 百度统计代码
    window._hmt = window._hmt || []
    const hm = document.createElement("script")
    hm.src = "https://hm.baidu.com/hm.js?fe9440bb9ea47ce70692e6675ab4fad5"
    const s = document.getElementsByTagName("script")[0]
    s.parentNode?.insertBefore(hm, s)
  }, [])

  return null
}
