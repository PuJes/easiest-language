# Docker 部署说明

## 🎯 问题解决

您遇到的问题是：项目在 `easiest-language/` 子目录中，但 Docker 构建需要在根目录执行。

## ✅ 解决方案

我已经为您在根目录创建了完整的 Docker 配置文件：

### 📁 文件结构
```
Easiest_Language/              # Git 根目录
├── Dockerfile                 # ✅ 新建 - 支持子目录构建
├── docker-compose.yml         # ✅ 新建 - 容器编排配置
├── .dockerignore              # ✅ 新建 - 构建忽略文件
├── docker-build.sh            # ✅ 新建 - 构建脚本
├── package.json               # ✅ 新建 - 根目录脚本
├── README.md                  # ✅ 新建 - 项目说明
└── easiest-language/          # 实际项目目录
    ├── src/
    ├── package.json
    └── ...
```

### 🔧 关键配置

#### Dockerfile 配置
```dockerfile
# 关键：从子目录复制文件
COPY easiest-language/package*.json ./
COPY easiest-language/ .
```

#### docker-compose.yml 配置
```yaml
# 关键：挂载子目录
volumes:
  - ./easiest-language:/app
```

## 🚀 使用方法

### 1. 在根目录执行命令

```bash
# 确保在根目录
pwd
# 应该显示: /Users/jesspu/codes/Easiest_Language

# 一键部署
npm run deploy:docker
```

### 2. 分步执行

```bash
# 构建镜像
npm run docker:build

# 运行容器
npm run docker:run

# 查看日志
npm run docker:logs
```

### 3. 开发环境

```bash
# 启动开发环境
npm run docker:dev

# 访问开发服务器
# http://localhost:3001
```

## 🔍 构建过程说明

### 1. 构建上下文
- **构建目录**: `/Users/jesspu/codes/Easiest_Language` (根目录)
- **项目目录**: `easiest-language/` (子目录)
- **Docker 会**: 从根目录复制 `easiest-language/` 到容器中

### 2. 文件复制
```dockerfile
# 复制 package.json
COPY easiest-language/package*.json ./

# 复制整个项目
COPY easiest-language/ .
```

### 3. 构建优化
- 使用 `.dockerignore` 排除不必要文件
- 多阶段构建减少镜像大小
- 只复制 `easiest-language/` 目录

## 🛠️ 可用命令

### 根目录命令
```bash
npm run deploy:docker          # 完整部署
npm run docker:build          # 构建镜像
npm run docker:run            # 运行容器
npm run docker:dev            # 开发环境
npm run docker:stop           # 停止容器
npm run docker:logs           # 查看日志
npm run docker:clean          # 清理资源
```

### 项目目录命令
```bash
cd easiest-language
npm run dev                   # 本地开发
npm run build                 # 构建项目
npm run test                  # 运行测试
```

## 🔧 故障排除

### 问题 1: 构建失败
```bash
# 检查是否在根目录
pwd

# 检查 Docker 是否运行
docker --version

# 查看构建日志
npm run docker:build
```

### 问题 2: 容器启动失败
```bash
# 查看容器日志
npm run docker:logs

# 检查端口占用
lsof -ti:3000
```

### 问题 3: 文件未找到
```bash
# 检查项目目录是否存在
ls -la easiest-language/

# 检查 package.json
cat easiest-language/package.json
```

## 📊 验证部署

### 1. 健康检查
```bash
# 检查容器状态
docker ps

# 检查应用响应
curl http://localhost:3000/api/health
```

### 2. 访问应用
- **生产环境**: http://localhost:3000
- **开发环境**: http://localhost:3001

### 3. 功能测试
- 访问首页
- 测试语言搜索
- 检查管理员后台

## 🎉 总结

现在您可以：

1. **在根目录执行 Docker 命令**
2. **Docker 会自动处理子目录项目**
3. **享受完整的容器化部署体验**

### 快速开始
```bash
# 在根目录执行
npm run deploy:docker
```

---

**部署状态**: ✅ 问题已解决，可以正常部署  
**最后更新**: 2025年1月2日
