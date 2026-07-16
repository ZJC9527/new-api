# NovAPI 开发规划文档

> 每次新会话时请先阅读此文件，确保无缝衔接继续开发。

## 项目概述

- **品牌名**: NovAPI
- **域名**: novapi.io（待注册）
- **定位**: 国内 AI 模型 API 聚合，面向全球开发者
- **商业模式**: 按 token 加价转售
- **目标用户**: 开发者（前期），后续平台化
- **目标规模**: 1000 用户起步，架构需支持水平扩展
- **支付方式**: 先 USDT，后续扩展更多
- **部署**: 海外服务器（待定）

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

- **主题**: 暗色模式（默认强制 dark）
- **配色**: 蓝紫渐变科技风（oklch 色彩空间）
  - 背景: `oklch(0.145 0.02 270)` 深空蓝紫
  - 主色: `oklch(0.65 0.2 275)` 蓝紫
  - 渐变: indigo → violet → purple → sky blue
- **圆角**: 0.75rem 基础
- **字体**: Public Sans（默认）
- **动效**: 入场动画 1.2s，柔和缓动
- **背景特效**: 三个大尺寸模糊光斑，30-40s 不规则飘动+形变

## 已完成的工作

### 第一阶段：UI 改造（2026-07-14）

1. ✅ **设计系统** — theme.css 全套 CSS 变量更新为蓝紫科技风
2. ✅ **品牌替换** — NovAPI logo（SVG）、favicon、站名硬编码
3. ✅ **首页重设计** — Hero（渐变标题+按钮）、模型跑马灯、Why NovAPI 卡片、代码示例、CTA、简化 Footer
4. ✅ **登录/注册** — 左右分栏（品牌面板+玻璃表单卡片）、动态光斑背景、顶部导航
5. ✅ **控制台** — CSS 变量自动适配暗色主题、body 微弱紫色渐变底色
6. ✅ **导航栏** — PublicHeader/SystemBrand 品牌硬编码
7. ✅ **国际化** — 新增文案全部有中文翻译（zh.json）
8. ✅ **构建验证** — `bun run build` 无报错

### 关键改动的文件

```
web/default/index.html                          — 标题、favicon、dark class
web/default/public/logo.svg                     — NovAPI SVG logo
web/default/src/styles/theme.css                — 全套暗色/亮色 CSS 变量
web/default/src/styles/index.css                — 动效 CSS（光斑、跑马灯、渐变文字）
web/default/src/context/theme-provider.tsx       — 默认 dark 模式
web/default/src/components/layout/components/
  ├── footer.tsx                                — 简化 footer、品牌硬编码
  ├── system-brand.tsx                          — 品牌名/logo 硬编码
  └── public-header.tsx                         — 导航栏品牌硬编码
web/default/src/features/home/
  ├── index.tsx                                 — 首页结构（Hero+Features+CTA+Footer）
  └── components/sections/
      ├── hero.tsx                              — 极简 Hero
      ├── features.tsx                          — 跑马灯+卡片+代码示例
      └── cta.tsx                               — CTA 区域
web/default/src/features/auth/auth-layout.tsx    — 登录页左右分栏布局
web/default/src/i18n/locales/zh.json            — 中文翻译
```

## 待完成的工作

### 第二阶段：功能完善与上线准备
- [ ] 模型限时折扣功能（后端字段 + 前端卡片展示原价/折后价/倒计时）

- [ ] 响应式适配检查（手机端各页面）
- [ ] Pricing 定价页面定制
- [ ] 控制台内页面细节微调（如果需要）
- [ ] USDT 支付集成
- [ ] 注册域名 novapi.io
- [ ] 购买海外服务器
- [ ] 部署（Caddy + HTTPS + Cloudflare）
- [ ] Go 后端完整打包测试
- [ ] 正式上线

### 第三阶段：运营与迭代

- [ ] 接入更多支付方式（Stripe、PayPal）
- [ ] 用户推广
- [ ] 更多 AI 模型接入
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
