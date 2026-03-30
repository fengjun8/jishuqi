import type React from "react"

interface IconProps {
  className?: string
  style?: React.CSSProperties
}

// 社交媒体图标
export const QQIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fab fa-qq ${className}`} style={style} />
)

export const WeChatIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fab fa-weixin ${className}`} style={style} />
)

export const WeiboIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fab fa-weibo ${className}`} style={style} />
)

// 功能图标
export const PlusIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-plus ${className}`} style={style} />
)

export const ArrowUpIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-arrow-up ${className}`} style={style} />
)

export const RefreshIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-sync-alt ${className}`} style={style} />
)

export const DownloadIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-download ${className}`} style={style} />
)

export const ClockIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`far fa-clock ${className}`} style={style} />
)

export const InfoIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-info-circle ${className}`} style={style} />
)

export const HelpIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-question-circle ${className}`} style={style} />
)

export const SettingsIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-cog ${className}`} style={style} />
)

export const ListIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-list ${className}`} style={style} />
)

export const TargetIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-bullseye ${className}`} style={style} />
)

export const BarChartIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-chart-bar ${className}`} style={style} />
)

export const CalculatorIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-calculator ${className}`} style={style} />
)

export const MessageIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-comment ${className}`} style={style} />
)

export const UsersIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-users ${className}`} style={style} />
)

export const ExpandIcon: React.FC<IconProps> = ({ className = "", style }) => (
  <i className={`fas fa-expand ${className}`} style={style} />
)
