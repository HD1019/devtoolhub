# SaaS从零到上线：个人开发者的实战指南

> 基于真实项目经验撰写。不是理论书，是踩坑复盘。

---

## 目录
1. 选型：技术栈与部署平台
2. 开发：MVP最小可行产品
3. 部署：从本地到生产
4. 支付：如何在网上收钱
5. 获客：第一批用户从哪来
6. 运营：监控、更新、客服
7. 教训：我们踩过的10个坑

---

## 1. 技术选型

### 原则
- 用你最熟的技术，别在选型上内耗
- 能免费就别花钱
- 能少维护就少维护

### 推荐组合

| 场景 | 前端 | 后端 | 数据库 | 部署 |
|------|------|------|--------|------|
| 工具站/博客 | HTML+JS | 不需要 | 不需要 | GitHub Pages |
| API服务 | - | FastAPI | PostgreSQL | Railway |
| 全栈应用 | Next.js | Next.js API | Supabase | Vercel |
| 小程序 | 原生 | 云开发 | 云数据库 | 微信云 |

### 不要做的事
- ❌ 一开始就上Kubernetes
- ❌ 自己搭服务器跑数据库
- ❌ 技术栈选没社区支持的冷门框架

---

## 2. MVP开发

### 核心原则：砍到只剩骨架

问自己三个问题：
1. 没有这个功能，产品还能用吗？
2. 前10个用户真的需要这个吗？
3. 这个功能一天能做完吗？

三个问题有一个答案是"不能等"——砍掉。

### 你不需要的
- ❌ 完美的UI设计（先用系统默认样式）
- ❌ 复杂的权限系统（先做单用户）
- ❌ 国际化/多语言
- ❌ 管理后台（直接操作数据库）
- ❌ 自动化测试（MVP阶段手工测）

### 你需要的
- ✅ 一个核心功能，能用
- ✅ 基本的错误提示
- ✅ 一个简单但清晰的产品页面
- ✅ 用户能联系到你的方式

---

## 3. 部署实战

### GitHub Pages（免费，适合静态站）
```
1. 创建GitHub仓库
2. 推代码
3. Settings → Pages → 选分支
4. 搞定
```

### Vercel（免费，适合Next.js）
```
1. 导入GitHub仓库
2. 自动检测框架
3. 自动部署
4. 免费域名 .vercel.app
```

### Railway（低费用，适合后端API）
```
1. 连接GitHub
2. 选仓库
3. 设置环境变量
4. 自动部署
费用：$5/月起
```

---

## 4. 支付接入

### 国内用户
- **微信支付**：需要营业执照（个体户可办）
- **支付宝**：同上

### 海外用户
- **Stripe**：最方便，API友好，支持个人
- **Gumroad**：零门槛，上传文件就能卖
- **Lemon Squeezy**：类似Gumroad，更便宜的手续费

### 推荐路径
1. 先上Gumroad卖数字产品（零门槛）
2. 验证有人愿意付钱
3. 再考虑接入Stripe做SaaS订阅

---

## 5. 第一批用户获取

### 免费渠道（按效果排序）
1. **Reddit**：r/SaaS, r/webdev, r/SideProject
2. **Product Hunt**：上线当天发布
3. **Hacker News**：Show HN
4. **Twitter/X**：build in public
5. **知乎/掘金**：写技术文章附带产品链接
6. **GitHub**：开源核心功能，README放产品链接

### 发布清单
- [ ] 产品页上线
- [ ] Product Hunt 发布
- [ ] Reddit 发帖
- [ ] Hacker News Show HN
- [ ] 技术博客写一篇发布文章
- [ ] GitHub README 写清楚

---

## 6. 日常运营

### 必做
- **监控**：UptimeRobot（免费），挂了第一时间知道
- **日志**：至少要能看到错误日志
- **备份**：数据库自动备份

### 可选
- **分析**：Google Analytics / Plausible
- **反馈**：页面加一个反馈入口
- **更新日志**：公开记录每次更新

---

## 7. 踩过的坑

1. **Dockerfile CMD 用了 shell form** → 信号传不到进程
2. **环境变量在镜像里硬编码** → 换环境就炸
3. **RapidAPI 的 API Key 校验逻辑写太严** → 用户抱怨
4. **没做请求限流** → 爬虫把你的免费额度刷爆
5. **数据库没加索引** → 用户多了查询超时
6. **前端没做 loading 状态** → 用户以为卡死了
7. **CORS 没配对** → 本地调得好好的，上线就报跨域
8. **文件名编码问题** → Windows 上跑得好好的，Linux 上乱码
9. **日志全用 print** → 出了问题找不到原因
10. **没做版本控制就改API** → 老用户的应用全挂

---

## 附录：常用工具清单

- 域名：Namecheap / Cloudflare Registrar
- DNS：Cloudflare（免费CDN+SSL）
- 部署：Vercel / Railway / GitHub Pages
- 数据库：Supabase / PlanetScale
- 支付：Stripe / Gumroad
- 监控：UptimeRobot / Sentry
- 分析：Plausible / Google Analytics
- 邮件：Resend / SendGrid
- 设计：Figma / Excalidraw

---

© 2026 Developer Launch Kit
