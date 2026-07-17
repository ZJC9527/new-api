# NovAPI 开发规划文档

> 每次新会话时请先阅读此文件，确保无缝衔接继续开发。

## 项目概述

- **品牌名**: NovAPI
- **域名**: novapi.org（已选定，待付款注册，Cloudflare）
- **定位**: 国内 AI 模型 API 聚合，面向全球开发者
- **商业模式**: 按 token 加价转售
- **目标用户**: 开发者（前期），后续平台化
- **目标规模**: 1000 用户起步，架构需支持水平扩展
- **支付方式**: 先 USDT，后续扩展更多
- **部署**: 海外服务器（待购买）

## 技术架构

- **基础项目**: Fork 自 [Calcium-Ion/new-api](https://github.com/Calcium-Ion/new-api)
- **我们的仓库**: [ZJC9527/new-api](https://github.com/ZJC9527/new-api)
- **本地代码路径**: `/home/mi/projects/llm-api-gateway/my-api/`
- **Git remote**:
  - `origin` → `https://github.com/ZJC9527/new-api.git`（我们的，推代码到这里）
  - `upstream` → `https://github.com/Calcium-Ion/new-api.git`（原作者，拉更新用）
- **后端**: Go + Gin，API 端口 3000
- **前端**: React 19 + Tailwind 4 + Rsbuild，dev 端口 3002
- **前端路径**: `web/default/`
- **包管理器**: bun
- **数据库**: MySQL（本机 127.0.0.1:3306）
- **缓存**: Redis（本机）
- **部署方式**: 前端 build 产物通过 `go:embed` 嵌入 Go 二进制，单文件部署

## UI 设计风格

- **主题**: 暗色模式（默认）+ 浅色模式（标准白底）
- **暗色模式配色**: 深色背景 + 青绿极光色系点缀
  - 背景: `oklch(0.14 0.025 265)` 深蓝黑
  - 主色（按钮）: `oklch(0.65 0.2 275)` 蓝紫
  - 价格/强调: emerald-400 青绿色
  - 光斑: 6个动态变形光斑，青绿+紫色交替变化
- **浅色模式配色**: 白底 + 青绿点缀，无动效
  - 主色: `oklch(0.55 0.16 170)` 深青绿
  - 背景: 接近纯白
  - 所有光斑/波浪/渐变动画隐藏
- **圆角**: 0.75rem 基础
- **字体**: Public Sans（默认）
- **动效**: 入场动画 1.2s，柔和缓动
- **滚动条**: thin 样式

## 已完成的工作

### UI 改造（2026-07-14 ~ 07-16）

1. ✅ **设计系统** — theme.css 全套 CSS 变量（暗色+浅色双模式）
2. ✅ **品牌替换** — NovAPI logo（SVG）、favicon、站名硬编码
3. ✅ **首页** — Hero（渐变标题）、模型跑马灯、Why NovAPI 卡片、代码示例、CTA、简化 Footer
4. ✅ **登录/注册** — 左右分栏（品牌面板+玻璃表单卡片）、动态光斑背景、顶部导航
5. ✅ **模型广场** — 卡片重设计（hover 上浮+光晕）、sidebar 精简为供应商列表、搜索框优化
6. ✅ **控制台布局** — 改为 grid 布局（跟模型广场一致）、PublicHeader 统一导航、sticky sidebar
7. ✅ **控制台内容** — 卡片半透明背景、统一边框、标题竖杠装饰、去除性能面板
8. ✅ **全局背景** — 6 个动态光斑（青绿+紫色颜色变化），放在 __root.tsx
9. ✅ **浅色模式** — 标准白底设计，所有暗色特效隐藏，组件用 dark: 前缀区分
10. ✅ **国际化** — 新增文案全部有中文翻译（zh.json）
11. ✅ **构建验证** — `bun run build` 无报错

### 域名注册（2026-07-17）

- ✅ 确定域名：**novapi.org**（$8.5/年注册，$11.2/年续费）
- ✅ 注册平台：Cloudflare
- ✅ 已注册 Cloudflare 账号（Google 邮箱登录）
- ⏳ 待付款（需要实体信用卡的安全码）

### 关键改动的文件

```
web/default/index.html                          — 标题、favicon、dark class
web/default/public/logo.svg                     — NovAPI SVG logo
web/default/src/styles/theme.css                — 全套暗色/亮色 CSS 变量
web/default/src/styles/index.css                — 动效 CSS（光斑、跑马灯、渐变文字、滚动条）
web/default/src/context/theme-provider.tsx       — 默认 dark 模式
web/default/src/routes/__root.tsx               — 全局动态光斑背景
web/default/src/components/layout/components/
  ├── footer.tsx                                — 简化 footer、品牌硬编码
  ├── system-brand.tsx                          — 品牌名/logo 硬编码
  ├── public-header.tsx                         — 导航栏品牌硬编码 + alwaysCompact prop
  ├── header.tsx                                — 控制台 header 样式
  ├── authenticated-layout.tsx                  — 控制台 grid 布局
  ├── app-sidebar.tsx                           — 改为普通 aside 元素
  ├── public-layout.tsx                         — 浅色/暗色背景切换
  └── section-page-layout.tsx                   — 标题竖杠装饰
web/default/src/features/home/
  ├── index.tsx                                 — 首页结构
  └── components/sections/
      ├── hero.tsx                              — Hero（青绿色系）
      ├── features.tsx                          — 跑马灯+卡片+代码示例
      └── cta.tsx                               — CTA 区域
web/default/src/features/auth/auth-layout.tsx    — 登录页左右分栏布局
web/default/src/features/pricing/components/
  ├── model-card.tsx                            — 模型卡片重设计
  ├── pricing-sidebar.tsx                       — 供应商列表
  └── search-bar.tsx                            — 搜索框样式
web/default/src/features/dashboard/components/overview/
  └── overview-dashboard.tsx                    — 去除装饰代码、性能面板
web/default/src/features/about/index.tsx         — About 空状态
web/default/src/i18n/locales/zh.json            — 中文翻译
DEVELOPMENT.md                                  — 本文件
```

## 待完成的工作

### 域名与部署（下一步）

- [ ] 注册域名 novapi.org（等拿到信用卡实体卡）
- [ ] 购买海外服务器（Hetzner/Vultr/DigitalOcean）
- [ ] 部署流程：前端 build → Go build → 上传 → Caddy HTTPS → Cloudflare DNS
- [ ] 配置 Cloudflare CDN/防护

### 功能完善

- [ ] USDT 支付集成
- [ ] 模型接入（更多供应商）
- [ ] 模型定价配置
- [ ] 模型限时折扣功能（后端字段 + 前端卡片展示原价/折后价/倒计时）
- [ ] 排行榜刷量（接入模型后用脚本生成初始数据）
- [ ] 响应式适配检查（手机端）

### 运营与迭代

- [ ] 接入更多支付方式（Stripe、PayPal）
- [ ] 用户推广
- [ ] 平台化功能（集成化 AI 服务）

## 开发环境命令

```bash
# 进入项目
cd /home/mi/projects/llm-api-gateway/my-api

# 启动前端 dev server（端口 3002，自动代理 API 到 3000）
export BUN_INSTALL="/home/mi/.bun" && export PATH="$BUN_INSTALL/bin:$PATH"
cd web/default && bun run dev

# 构建前端
bun run build

# 从上游拉取更新
git fetch upstream
git merge upstream/main

# 推送到我们的仓库
git push origin main
```

## 注意事项

- 前端品牌信息（NovAPI）已硬编码，不再读后端 API 返回的 system_name/logo/footer_html
- 后端当前运行的是旧版本（进程 PID 3280），改造完前端后需要重新打包 Go 二进制部署
- 原项目的 `web/classic/` 主题我们不使用
- 上游更新时主要关注后端逻辑（relay/model/controller），前端改动需谨慎合并
- 控制台 AppSidebar 已改为普通 aside 元素，但仍需要 SidebarProvider 上下文（NavGroup 依赖 useSidebar hook）
- 暗色模式：--card 变量是半透明的（15%），--border/--input 统一为 oklch(0.45 0.03 200 / 60%)
- 浅色模式：所有动效隐藏，PublicLayout 有 bg-background，组件用 dark: 前缀区分双模式样式
