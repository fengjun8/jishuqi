"use client"

import { useEffect } from "react"

export default function BaiduAnalytics() {
  useEffect(() => {
    // 百度统计代码
    window._hmt = window._hmt || []
    const hm = document.createElement("script")
    hm.src = "https://hm.baidu.com/hm.js?1ed1451775a140fc3f977bec4298364e" // 替换为您的百度统计跟踪ID
    const s = document.getElementsByTagName("script")[0]
    s.parentNode?.insertBefore(hm, s)
  }, [])

  return null
}
