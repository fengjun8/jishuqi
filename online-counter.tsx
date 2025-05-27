"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  QQIcon,
  PlusIcon,
  ArrowUpIcon,
  RefreshIcon,
  DownloadIcon,
  ClockIcon,
  InfoIcon,
  HelpIcon,
  SettingsIcon,
  ListIcon,
  TargetIcon,
  BarChartIcon,
  CalculatorIcon,
  MessageIcon,
} from "@/components/fa-icons"

type CountRecord = {
  timestamp: string
  previousCount: number
  increment: number
  newCount: number
}

export default function OnlineCounter() {
  const [count, setCount] = useState(0)
  const [showRecord, setShowRecord] = useState(true)
  const [incrementAmount, setIncrementAmount] = useState("1")
  const [countHistory, setCountHistory] = useState<CountRecord[]>([])
  const [showBackToTop, setShowBackToTop] = useState(false)
  const topRef = useRef<HTMLDivElement>(null)

  // 网站首页链接
  const websiteUrl = "https://www.fengjun.wang"

  const formatTime = () => {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}:${now.getSeconds().toString().padStart(2, "0")}`
  }

  const handleIncrement = () => {
    const increment = Number.parseInt(incrementAmount)
    const newCount = count + increment

    setCountHistory([
      {
        timestamp: formatTime(),
        previousCount: count,
        increment: increment,
        newCount: newCount,
      },
      ...countHistory,
    ])

    setCount(newCount)
  }

  const resetCounter = () => {
    setCount(0)
    setCountHistory([])
  }

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  // 导出计数记录为CSV
  const exportToCSV = () => {
    if (countHistory.length === 0) return

    // CSV 表头
    let csvContent = "时间,原始值,增加值,新值\n"

    // 添加数据行
    countHistory.forEach((record) => {
      csvContent += `${record.timestamp},${record.previousCount},${record.increment},${record.newCount}\n`
    })

    // 创建下载链接
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `计数记录_${new Date().toLocaleDateString()}.csv`)
    link.style.visibility = "hidden"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle spacebar press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        handleIncrement()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [count, incrementAmount])

  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="max-w-3xl mx-auto bg-gradient-to-b from-slate-50 to-white min-h-screen shadow-xl relative">
      <div ref={topRef}></div>
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="bg-white text-blue-600 p-2 rounded-lg shadow-md">
          <CalculatorIcon className="text-2xl" />
        </div>
        <Link href={websiteUrl} className="text-2xl font-bold hover:text-blue-100 transition-colors">
          在线计数器
        </Link>
      </div>

      {/* Counter Display */}
      <div className="border-2 border-blue-100 p-6 m-4 rounded-xl bg-white shadow-sm">
        <div className="text-8xl text-center font-bold text-blue-700 py-4">{count}</div>
      </div>

      {/* Increment Button */}
      <div
        className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 m-4 rounded-xl cursor-pointer hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-lg transform hover:scale-[1.02] active:scale-[0.98]"
        onClick={handleIncrement}
      >
        <div className="text-6xl text-center font-bold flex items-center justify-center">
          <PlusIcon className="mr-2 text-4xl" />
          <span>{incrementAmount}</span>
        </div>
      </div>

      {/* Instructions */}
      <div className="text-center text-sm text-gray-600 my-3 flex items-center justify-center">
        <HelpIcon className="mr-1 text-blue-500" />
        <span>(您也可按"空格键"，进行添加。)</span>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl m-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="show-record"
              checked={showRecord}
              onCheckedChange={(checked) => setShowRecord(checked as boolean)}
              className="text-blue-500 border-blue-300"
            />
            <Label htmlFor="show-record" className="text-gray-700">
              显示记录
            </Label>
          </div>

          <div className="flex items-center gap-2 ml-4">
            <Label htmlFor="increment-amount" className="text-gray-700">
              增加数量
            </Label>
            <Select value={incrementAmount} onValueChange={setIncrementAmount}>
              <SelectTrigger id="increment-amount" className="w-16 border-blue-200">
                <SelectValue placeholder="1" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          className="bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm"
          onClick={resetCounter}
        >
          <RefreshIcon className="mr-2" />
          重置所有数据
        </Button>
      </div>

      {/* Count Records */}
      {showRecord && (
        <div className="p-4 m-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center">
              <ListIcon className="mr-2 text-xl text-blue-500" />
              <h2 className="text-lg font-medium text-gray-800">计数记录</h2>
            </div>

            {countHistory.length > 0 && (
              <Button
                variant="outline"
                size="sm"
                className="text-green-600 border-green-200 hover:bg-green-50"
                onClick={exportToCSV}
              >
                <DownloadIcon className="mr-1" />
                导出CSV
              </Button>
            )}
          </div>

          {countHistory.length > 0 ? (
            <div className="overflow-auto max-h-64 rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-50">
                    <TableHead className="w-1/4 text-blue-700">
                      <ClockIcon className="inline mr-1" /> 时间
                    </TableHead>
                    <TableHead className="text-blue-700">原始值</TableHead>
                    <TableHead className="text-blue-700">增加值</TableHead>
                    <TableHead className="text-right text-blue-700">新值</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {countHistory.map((record, index) => (
                    <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <TableCell className="font-medium">{record.timestamp}</TableCell>
                      <TableCell>{record.previousCount}</TableCell>
                      <TableCell>+{record.increment}</TableCell>
                      <TableCell className="text-right font-semibold text-blue-600">{record.newCount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 p-3 text-center">暂无记录</p>
          )}
        </div>
      )}

      <Separator className="my-6" />

      {/* About Section */}
      <Card className="m-4 border-none shadow-md bg-white">
        <CardHeader className="bg-gray-50 rounded-t-lg">
          <CardTitle className="flex items-center text-blue-700">
            <InfoIcon className="mr-2 text-xl" />
            关于在线计数器
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5 pt-5">
          <div>
            <p className="flex items-center font-medium text-gray-800 mb-2">
              <HelpIcon className="mr-2 text-blue-500" />
              为什么需使用在线计数器（在线点数器）？
            </p>
            <p className="text-gray-600 ml-6">
              有一些使用在线计数器的真实原因：要数点某些东西，比如清点人数、清点物品、念佛记数等。
            </p>
          </div>

          <div>
            <p className="flex items-center font-medium text-gray-800 mb-2">
              <SettingsIcon className="mr-2 text-blue-500" />
              我们的计数器（在线点数器）如何工作？
            </p>
            <p className="text-gray-600 ml-6">
              打开此页面，然后点击添加按钮，或按空格键，即可进行计数。要将计数器设置为更多，请单击"重置所有数据"按钮。
            </p>
          </div>

          <div>
            <h3 className="flex items-center font-medium text-gray-800 mb-2">
              <TargetIcon className="mr-2 text-blue-500" />
              计数器应用场景：
            </h3>
            <ul className="list-disc pl-10 space-y-1 text-gray-600">
              <li>活动人数统计：用于会议、讲座、活动等场合的人数统计</li>
              <li>库存清点：商店或仓库中物品的快速计数</li>
              <li>运动计数：跳绳、俯卧撑等运动次数的记录</li>
              <li>生产线计数：工厂生产线上产品的计数</li>
              <li>交通流量统计：统计通过某一点的车辆或行人数量</li>
            </ul>
          </div>

          <div>
            <h3 className="flex items-center font-medium text-gray-800 mb-2">
              <BarChartIcon className="mr-2 text-blue-500" />
              计数器优势：
            </h3>
            <ul className="list-disc pl-10 space-y-1 text-gray-600">
              <li>简单易用：直观的界面设计，无需复杂操作</li>
              <li>记录详细：自动记录每次计数的时间和数值变化</li>
              <li>随时可用：无需安装，随时打开浏览器即可使用</li>
              <li>多种增量：可根据需要选择不同的增加数量</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <footer className="mt-10 py-6 px-4 bg-black border-t border-gray-800 text-center text-sm text-white">
        <div className="mb-2">
          <a
            href="https://www.fengjun.wang/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:text-blue-200 transition-colors"
          >
            关于我们
          </a>
        </div>
        <div>
          © {new Date().getFullYear()}
          <Link href={websiteUrl} className="text-blue-300 hover:text-blue-200 transition-colors mx-1">
            在线计数器
          </Link>
          - 保留所有权利
        </div>
        <div className="mt-1">
          <a
            href="http://beian.miit.gov.cn/"
            rel="noreferrer external nofollow"
            target="_blank"
            className="text-gray-400 hover:text-gray-300 transition-colors"
          >
            粤ICP备2022149896号
          </a>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed right-4 bottom-20 flex flex-col gap-3 z-10">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="http://qm.qq.com/cgi-bin/qm/qr?_wv=1027&k=MXV4lbFjqckRUh3HKPkLLlWeVe2aYQFf&authKey=yrVBJboQzFqu%2FM6cHNzsM5JAXJwjRIgSdiaQdppyyHqrLH5utNkGbhNqSFP4ds7l&noverify=0&group_code=651856790"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
                style={{ width: "40px", height: "40px" }}
              >
                <QQIcon className="text-xl" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>QQ交流群</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://www.fengjun.wang/feedback"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
                style={{ width: "40px", height: "40px" }}
              >
                <MessageIcon className="text-xl" />
              </a>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>建议反馈</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {showBackToTop && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={scrollToTop}
                  className="bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg transition-colors flex items-center justify-center"
                  style={{ width: "40px", height: "40px" }}
                >
                  <ArrowUpIcon className="text-xl" />
                </button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>返回顶部</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
    </div>
  )
}
