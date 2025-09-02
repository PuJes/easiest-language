# 腾讯云托管部署指南

## 部署前准备

### 1. 环境要求
- Node.js 18+ 
- npm 或 yarn
- 腾讯云账号
- CloudBase CLI 工具

### 2. 安装 CloudBase CLI
```bash
npm install -g @cloudbase/cli
```

### 3. 登录腾讯云
```bash
cloudbase login
```

## 部署步骤

### 1. 创建环境
在腾讯云控制台创建 CloudBase 环境，记录环境ID。

### 2. 更新配置
编辑 `cloudbaserc.json` 文件，将 `your-env-id` 替换为实际的环境ID：

```json
{
  "envId": "your-actual-env-id",
  "framework": {
    "name": "@cloudbase/framework-plugin-nextjs",
    "plugins": {
      "client": {
        "use": "@cloudbase/framework-plugin-nextjs",
        "inputs": {
          "buildCommand": "npm run build",
          "outputPath": ".next",
          "installCommand": "npm ci",
          "runtime": "Nodejs18.15",
          "entry": "server.js"
        }
      }
    }
  },
  "region": "ap-shanghai"
}
```

### 3. 执行部署
```bash
# 使用部署脚本
npm run deploy:cloudbase your-env-id

# 或直接使用 CloudBase CLI
cloudbase framework deploy
```

### 4. 访问应用
部署成功后，访问地址为：`https://your-env-id.tcloudbaseapp.com`

## 部署脚本说明

项目包含自动化部署脚本 `scripts/deploy-cloudbase.sh`，功能包括：

1. ✅ 检查必要工具（Node.js, npm, CloudBase CLI）
2. ✅ 自动安装 CloudBase CLI（如果未安装）
3. ✅ 更新配置文件中的环境ID
4. ✅ 安装项目依赖
5. ✅ 运行测试
6. ✅ 构建项目
7. ✅ 部署到腾讯云托管
8. ✅ 显示访问地址

## 故障排除

### 常见问题

1. **构建失败**
   - 检查 Node.js 版本是否为 18+
   - 确保所有依赖已正确安装
   - 查看构建日志中的具体错误信息

2. **部署失败**
   - 确认环境ID正确
   - 检查腾讯云账号权限
   - 确认 CloudBase CLI 已正确登录

3. **访问异常**
   - 检查域名配置
   - 确认环境状态正常
   - 查看 CloudBase 控制台日志

### 环境配置

- **运行时**: Node.js 18.15
- **构建命令**: `npm run build`
- **输出目录**: `.next`
- **安装命令**: `npm ci`
- **区域**: 上海 (ap-shanghai)

## 项目特性

- ✅ Next.js 15 + React 19
- ✅ TypeScript 支持
- ✅ Tailwind CSS 样式
- ✅ 响应式设计
- ✅ 多语言支持
- ✅ 数据可视化
- ✅ 管理员后台
- ✅ 数据导入导出

## 性能优化

- 静态页面预渲染
- 图片优化
- 代码分割
- 缓存策略
- CDN 加速

## 监控和维护

- 定期检查应用状态
- 监控性能指标
- 备份重要数据
- 更新依赖版本
- 安全漏洞扫描
