# Railway Docker 部署指南

## 🚂 为什么选择 Railway？

- ✅ **原生支持 Docker** - 完美支持您的 Dockerfile
- ✅ **自动部署** - 连接 GitHub 自动部署
- ✅ **内置数据库** - 支持 PostgreSQL、MySQL、Redis
- ✅ **免费额度** - 每月 $5 免费额度
- ✅ **简单配置** - 无需复杂配置
- ✅ **全球 CDN** - 自动加速
- ✅ **自动 SSL** - HTTPS 自动配置

## 📋 部署步骤

### 1. 准备项目

确保您的项目根目录有：
- ✅ `Dockerfile` (已有)
- ✅ `docker-compose.yml` (已有)
- ✅ `package.json` (已有)
- ✅ `.dockerignore` (建议添加)

### 2. 创建 .dockerignore 文件

```bash
# 创建 .dockerignore 文件
cat > .dockerignore << 'EOF'
# 依赖
node_modules
npm-debug.log*

# 构建输出
.next
out
dist

# 环境文件
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# 日志
*.log

# 运行时数据
pids
*.pid
*.seed
*.pid.lock

# 覆盖率目录
coverage
.nyc_output

# 依赖目录
jspm_packages/

# 可选 npm 缓存目录
.npm

# 可选 eslint 缓存
.eslintcache

# 输出目录
out

# Next.js 构建输出
.next

# Nuxt.js 构建/生成输出
.nuxt

# Gatsby 文件
.cache/
public

# Storybook 构建输出
.out
.storybook-out

# 临时文件夹
tmp/
temp/

# 编辑器目录和文件
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?

# Git
.git
.gitignore

# Docker
Dockerfile*
docker-compose*
.dockerignore

# 文档
README.md
docs/
*.md

# 测试
cypress/
__tests__/
*.test.*
*.spec.*

# 备份文件
backups/
*.backup
EOF
```

### 3. 注册 Railway 账号

1. 访问 [railway.app](https://railway.app)
2. 使用 GitHub 账号登录
3. 连接您的 GitHub 仓库

### 4. 创建新项目

1. 点击 "New Project"
2. 选择 "Deploy from GitHub repo"
3. 选择您的 `Easiest_Language` 仓库
4. 选择 `easiest-language` 目录作为根目录

### 5. 配置环境变量

在 Railway 项目设置中添加：

```bash
# 必需的环境变量
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# 可选的环境变量
NEXT_PUBLIC_APP_URL=https://your-app.railway.app
```

### 6. 部署配置

Railway 会自动检测到您的 Dockerfile 并开始构建：

```dockerfile
# 您的 Dockerfile 已经完美配置
FROM node:20-alpine AS base
# ... 其他配置
```

### 7. 自定义域名（可选）

1. 在 Railway 项目设置中
2. 点击 "Settings" → "Domains"
3. 添加您的自定义域名
4. Railway 会自动配置 SSL 证书

## 🔧 高级配置

### 数据库集成

如果需要数据库，Railway 提供：

```bash
# 添加 PostgreSQL 数据库
railway add postgresql

# 添加 Redis 缓存
railway add redis
```

### 环境变量管理

```bash
# 安装 Railway CLI
npm install -g @railway/cli

# 登录
railway login

# 设置环境变量
railway variables set NODE_ENV=production
railway variables set PORT=3000
```

### 监控和日志

Railway 提供：
- 📊 **实时监控** - CPU、内存、网络使用情况
- 📝 **日志查看** - 实时应用日志
- 🔔 **告警通知** - 异常情况自动通知

## 💰 价格说明

### 免费额度
- 💵 **$5/月免费额度**
- 🚀 **512MB RAM**
- 💾 **1GB 存储**
- 🌐 **100GB 带宽**

### 付费计划
- 💵 **$5/月** - 1GB RAM, 10GB 存储
- 💵 **$20/月** - 8GB RAM, 100GB 存储
- 💵 **$99/月** - 32GB RAM, 1TB 存储

## 🚀 一键部署脚本

创建部署脚本：

```bash
# 创建 railway-deploy.sh
cat > railway-deploy.sh << 'EOF'
#!/bin/bash

echo "🚂 Railway 部署脚本"
echo "=================="

# 检查 Railway CLI
if ! command -v railway &> /dev/null; then
    echo "📦 安装 Railway CLI..."
    npm install -g @railway/cli
fi

# 登录 Railway
echo "🔐 登录 Railway..."
railway login

# 初始化项目
echo "🚀 初始化 Railway 项目..."
railway init

# 设置环境变量
echo "⚙️ 设置环境变量..."
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set HOSTNAME=0.0.0.0

# 部署
echo "🚀 开始部署..."
railway up

echo "✅ 部署完成！"
echo "🌐 访问您的应用："
railway domain
EOF

chmod +x railway-deploy.sh
```

## 🔄 持续部署

### GitHub Actions 集成

创建 `.github/workflows/railway.yml`：

```yaml
name: Deploy to Railway

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to Railway
        uses: railwayapp/railway-deploy@v1
        with:
          railway-token: ${{ secrets.RAILWAY_TOKEN }}
          service: your-service-name
```

## 🐛 故障排除

### 常见问题

1. **构建失败**
   ```bash
   # 检查 Dockerfile 语法
   docker build -t test .
   
   # 查看构建日志
   railway logs
   ```

2. **内存不足**
   ```bash
   # 升级到付费计划
   # 或优化 Dockerfile
   ```

3. **端口问题**
   ```bash
   # 确保使用 Railway 分配的端口
   PORT=$PORT node server.js
   ```

### 调试命令

```bash
# 查看实时日志
railway logs --follow

# 查看服务状态
railway status

# 进入容器调试
railway shell
```

## 📊 性能优化

### Dockerfile 优化

您的 Dockerfile 已经很好，但可以进一步优化：

```dockerfile
# 使用多阶段构建（已有）
FROM node:20-alpine AS base

# 使用 .dockerignore（建议添加）
# 清理缓存
RUN npm cache clean --force

# 使用非 root 用户（已有）
USER nextjs
```

### 应用优化

```typescript
// next.config.ts 优化
const nextConfig: NextConfig = {
  // 启用压缩
  compress: true,
  
  // 优化图片
  images: {
    unoptimized: false,
  },
  
  // 启用 SWC
  swcMinify: true,
}
```

## 🔗 相关链接

- [Railway 官方文档](https://docs.railway.app/)
- [Railway CLI 文档](https://docs.railway.app/develop/cli)
- [Docker 部署指南](https://docs.railway.app/deploy/dockerfile)
- [环境变量配置](https://docs.railway.app/deploy/variables)

---

**部署状态**: ✅ 准备就绪  
**推荐指数**: ⭐⭐⭐⭐⭐  
**最后更新**: 2025年1月2日
