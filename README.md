# 在线计数器 (Online Counter)

> 一个开箱即用的网页版计数器 / 点数器工具,支持键盘快捷计数、全屏大字模式、增量记录与 CSV 导出。

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

## 📢 站点升级公告

本项目的原始线上站点 **jishuqi.fengjun.wang 已全面升级为 [https://counter.best/zh](https://counter.best/zh)**。

原域名将不再维护,欢迎访问新站点体验最新版本的在线计数器,也欢迎对本项目提出 Issue 和 PR。

## ✨ 功能特性

- **一键计数**:点击大号「+ / -」按钮即可加减计数,界面直观、适配手机和电脑端
- **键盘快捷操作**:
  - `空格` 或 `↑` 增加
  - `-` 或 `↓` 减少
  - `ESC` 退出全屏
- **可调步长**:支持每次 +1 / +2 / +5 / +10 的增量设置,适配不同统计场景
- **全屏模式**:全屏超大数字显示,适合会议签到、活动现场、直播间等需要远距离看清数字的场合
- **计数记录**:自动记录每次操作的时间、原始值、增量和新值,可随时展开/收起
- **CSV 导出**:一键导出完整计数记录,方便事后统计与归档
- **一键重置**:快速归零并清空记录,开始新一轮计数
- **相关工具推荐**:内置基于 `tools-data.json` 的相关工具推荐模块(带固定种子伪随机排序,SSR 稳定不闪烁)
- **SEO 友好**:完善的中文 `metadata`(标题/描述/关键词)、语义化结构,并集成百度统计组件
- **深色模式支持**:基于 `next-themes`,主题切换开箱即用

## 🛠 技术栈

| 类别 | 技术 |
| --- | --- |
| 框架 | [Next.js 15](https://nextjs.org/) (App Router) + [React 18](https://react.dev/) |
| 语言 | [TypeScript 5](https://www.typescriptlang.org/) |
| 样式 | [Tailwind CSS 3](https://tailwindcss.com/) |
| 组件库 | [shadcn/ui](https://ui.shadcn.com/) + [Radix UI](https://www.radix-ui.com/) |
| 图标 | [Font Awesome 6](https://fontawesome.com/) (CDN) + [lucide-react](https://lucide.dev/) |
| 主题 | [next-themes](https://github.com/pacocoursey/next-themes) |
| 包管理 | npm / pnpm 均可(仓库同时保留了 `package-lock.json` 与 `pnpm-lock.yaml`) |

## 🚀 快速开始

### 环境要求

- Node.js >= 18.17(推荐 18 / 20 / 22 LTS)
- npm、pnpm 或 yarn 任一包管理器

### 本地开发

```bash
# 1. 克隆仓库
git clone https://github.com/<你的用户名>/jishuqi.git
cd jishuqi

# 2. 安装依赖
npm install        # 或 pnpm install

# 3. 启动开发服务器
npm run dev        # 或 pnpm dev
```

打开浏览器访问 [http://localhost:3000](http://localhost:3000) 即可看到计数器页面。

### 生产构建

```bash
# 构建
npm run build

# 启动(默认监听 3013 端口)
npm run start
```

> 如需修改启动端口,可编辑 `package.json` 中的 `start` 脚本(`next start -p 3013`)。

## ☁️ 部署

### 部署到 Vercel(推荐)

1. 将本仓库推送到 GitHub
2. 在 [Vercel](https://vercel.com/) 导入该仓库
3. 框架会被自动识别为 Next.js,直接点击 Deploy 即可

### 自托管服务器

```bash
npm install
npm run build
# 使用 pm2 常驻运行
pm2 start npm --name jishuqi -- run start
```

配合 Nginx 反向代理到 `3013` 端口即可对外服务。

### Docker(可选)

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3013
CMD ["npm", "run", "start"]
```

```bash
docker build -t jishuqi .
docker run -d -p 3013:3013 --name jishuqi jishuqi
```

## 📁 项目结构

```
jishuqi/
├── app/                      # Next.js App Router 入口
│   ├── layout.tsx            # 根布局(SEO metadata、字体、主题)
│   ├── page.tsx              # 首页(挂载计数器 + 统计组件)
│   └── globals.css           # 全局样式
├── online-counter.tsx        # 计数器核心组件(计数/快捷键/全屏/记录/导出)
├── components/
│   ├── related-tools.tsx     # 相关工具推荐模块
│   ├── baidu-analytics.tsx   # 百度统计
│   ├── fa-icons.tsx          # Font Awesome 图标封装
│   ├── theme-provider.tsx    # 主题提供者
│   └── ui/                   # shadcn/ui 组件
├── hooks/                    # 通用 hooks
├── lib/utils.ts              # cn() 等工具函数
├── public/                   # 静态资源
├── styles/                   # 补充样式
├── tools-data.json           # 相关工具数据源(URL/分类/锚文本)
├── next.config.mjs           # Next.js 配置
└── tailwind.config.ts        # Tailwind 配置
```

## 🎯 适用场景

- 活动人数统计:会议、讲座、课程签到点名计数
- 库存清点:商店、仓库货物快速盘点
- 运动计数:跳绳、俯卧撑、挥拍次数记录
- 生产线计数:工厂流水线产品计数
- 交通流量统计:统计通过某一点的车辆或行人数量
- 诵念记数:念佛、诵经等宗教修持记数

## 🔧 自定义

- **修改工具推荐**:编辑根目录下的 `tools-data.json`,按 `{ id, url, category, anchors }` 格式增删工具即可
- **修改 SEO 信息**:编辑 `app/layout.tsx` 中的 `metadata` 导出
- **开关统计**:在 `app/page.tsx` 中移除 `<BaiduAnalytics />` 即可关闭百度统计
- **增量选项**:在 `online-counter.tsx` 的 `SelectContent` 中修改可选步长

## 🌐 更多作品

以下是作者维护的其他免费在线工具网站,欢迎体验:

### 📥 Downloader / 下载工具

| 网站 | 说明 |
| --- | --- |
| [DownloadAll](https://downloadall.app) | Downloader |

### 🛡️ 网络安全 / IT

| 网站 | 说明 |
| --- | --- |
| [EvaluationCat](https://evaluationcat.com) | Cyber Security |
| [Password Remover](https://passwordremover.org) | Password Removal |
| [Email Toolbox](https://emailtoolbox.io) | Email / DNS |
| [PDF 工具](https://pdf.fj.cn) | PDF |

### 🧮 Calculator / 计算器

| 网站 | 说明 |
| --- | --- |
| [Bitumen Calculator](https://bitumencalculator.world) | Bitumen |
| [CPM Calculator](https://cpmcalculator.world) | CPM |
| [Wattly](https://wattly.world) | Electricity |
| [Subway Calculator](https://subwaycalculator.com) | Subway Calories |
| [Starbucks Nutrition Calculator](https://starbucksnutritioncalculator.app) | Starbucks Nutrition |
| [Cooking Calculator](https://cookingcalculator.app) | Cooking |
| [Market Hours](https://markethours.io) | Market Hours |

### 🗺️ 国家 / 地理 / 旅行

| 网站 | 说明 |
| --- | --- |
| [National Flag](https://nationalflag.io) | National Flags |
| [Country Drawing](https://countrydrawing.com) | Country Drawing |

## 📄 License

本项目基于 [MIT License](./LICENSE) 开源,可自由用于学习和商业用途。

---

如果这个项目对你有帮助,欢迎点一个 ⭐ Star 支持!
