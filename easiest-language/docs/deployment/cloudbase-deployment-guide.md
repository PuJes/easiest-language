# 腾讯云托管部署指南

## 📋 部署准备

### 前置条件

1. 拥有腾讯云账户
2. 开通腾讯云托管服务
3. 安装腾讯云CLI工具

### 必需环境

- Node.js 18+
- npm 或 yarn
- @cloudbase/cli

## 🛠️ 快速部署

### 1. 安装腾讯云CLI

```bash
npm install -g @cloudbase/cli
```

### 2. 登录腾讯云

```bash
cloudbase login
```

### 3. 创建环境（如果还没有）

```bash
cloudbase env create --envId your-env-id --region ap-shanghai
```

### 4. 配置环境ID

编辑配置文件，将`your-env-id`替换为实际的环境ID：

- `cloudbase.json`
- `cloudbaserc.json`
- `.env.cloudbase`

### 5. 执行部署

```bash
# 使用部署脚本
npm run deploy:cloudbase your-env-id

# 或直接使用框架部署
npm run build:cloudbase
```

## ⚙️ 配置说明

### cloudbase.json

腾讯云托管主配置文件，定义了：

- 环境ID (`envId`)
- 框架类型 (`framework`)
- 插件配置 (`plugins`)
- 区域设置 (`region`)

### cloudbaserc.json

Next.js专用配置文件，针对Next.js应用优化：

- 构建命令 (`buildCommand`)
- 输出路径 (`outputPath`)
- 运行时版本 (`runtime`)
- 入口文件 (`entry`)

### .env.cloudbase

腾讯云托管环境变量配置：

- 应用基本信息
- 数据库连接
- API配置
- 第三方服务配置

## 🚀 部署流程

### 自动部署脚本

使用 `scripts/deploy-cloudbase.sh` 进行一键部署：

1. **环境检查** - 验证Node.js、npm、cloudbase CLI
2. **配置更新** - 自动替换环境ID
3. **依赖安装** - 安装项目依赖
4. **测试运行** - 执行单元测试
5. **项目构建** - 构建生产版本
6. **云端部署** - 部署到腾讯云托管
7. **清理操作** - 清理临时文件

### 手动部署步骤

如果需要手动控制部署过程：

1. **安装依赖**

```bash
npm ci
```

2. **运行测试**

```bash
npm run test:ci
```

3. **构建项目**

```bash
npm run build
```

4. **部署到云端**

```bash
cloudbase framework deploy
```

## 📊 环境变量配置

### 必需环境变量

```bash
CLOUDBASE_ENV_ID=your-env-id
CLOUDBASE_REGION=ap-shanghai
NODE_ENV=production
```

### 可选环境变量

```bash
# 数据库
DATABASE_URL=your-database-url

# API配置
NEXT_PUBLIC_API_URL=https://your-env-id.tcloudbaseapp.com
API_SECRET_KEY=your-secret-key

# 第三方服务
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 🔍 部署验证

### 部署成功检查

1. **访问应用** - `https://your-env-id.tcloudbaseapp.com`
2. **功能测试** - 验证核心功能正常
3. **性能检查** - 检查页面加载速度
4. **SEO检查** - 验证meta信息正确

### 常见问题排查

1. **构建失败** - 检查依赖版本和构建配置
2. **环境变量** - 确认所有必需变量已设置
3. **权限问题** - 检查腾讯云账户权限
4. **网络问题** - 检查域名和DNS配置

## 🔄 持续部署

### GitHub Actions集成

创建 `.github/workflows/deploy.yml`：

```yaml
name: Deploy to Tencent CloudBase
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
      - name: Install CloudBase CLI
        run: npm install -g @cloudbase/cli
      - name: Deploy
        run: npm run deploy:cloudbase ${{ secrets.CLOUDBASE_ENV_ID }}
        env:
          CLOUDBASE_SECRET_ID: ${{ secrets.CLOUDBASE_SECRET_ID }}
          CLOUDBASE_SECRET_KEY: ${{ secrets.CLOUDBASE_SECRET_KEY }}
```

### 环境管理

建议配置多个环境：

- **开发环境** (`dev`) - 用于开发测试
- **预发环境** (`staging`) - 用于预发布验证
- **生产环境** (`prod`) - 用于正式发布

## 📝 注意事项

### 安全配置

1. 不要在代码中硬编码敏感信息
2. 使用环境变量管理配置
3. 定期更新依赖包
4. 启用HTTPS和安全头

### 性能优化

1. 启用静态资源CDN
2. 配置缓存策略
3. 压缩静态资源
4. 使用Next.js优化功能

### 监控配置

1. 配置错误监控
2. 设置性能监控
3. 启用日志收集
4. 配置告警通知

## 🆘 故障排除

### 部署失败

```bash
# 检查构建日志
cloudbase functions log --envId your-env-id

# 重新部署
cloudbase framework deploy --force
```

### 访问问题

```bash
# 检查域名配置
cloudbase hosting domain list --envId your-env-id

# 检查部署状态
cloudbase hosting deploy list --envId your-env-id
```

### 回滚操作

```bash
# 查看历史版本
cloudbase hosting deploy list --envId your-env-id

# 回滚到指定版本
cloudbase hosting deploy rollback --envId your-env-id --versionId version-id
```

## 📞 技术支持

- [腾讯云托管官方文档](https://cloud.tencent.com/document/product/876)
- [腾讯云CLI文档](https://docs.cloudbase.net/cli-v1/intro)
- [Next.js部署指南](https://nextjs.org/docs/deployment)
