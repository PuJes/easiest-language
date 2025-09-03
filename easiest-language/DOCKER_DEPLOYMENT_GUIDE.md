# Docker 部署指南

## 🐳 概述

本项目支持使用 Docker 进行容器化部署，提供更好的环境一致性、可移植性和扩展性。

## 📋 前置要求

- Docker 20.10+
- Docker Compose 2.0+
- 至少 2GB 可用内存
- 至少 1GB 可用磁盘空间

## 🚀 快速开始

### 1. 构建和运行

```bash
# 完整部署（推荐）
npm run deploy:docker

# 或者分步执行
npm run docker:build    # 构建镜像
npm run docker:run      # 运行容器
```

### 2. 开发环境

```bash
# 启动开发环境
npm run docker:dev

# 访问开发服务器
# http://localhost:3001
```

### 3. 查看日志

```bash
npm run docker:logs
```

### 4. 停止服务

```bash
npm run docker:stop
```

## 🛠️ 详细配置

### Dockerfile 说明

项目使用多阶段构建优化镜像大小：

1. **base**: 基础 Node.js 环境
2. **dev**: 开发环境（包含开发依赖）
3. **builder**: 构建阶段（编译应用）
4. **runner**: 生产环境（最小化镜像）

### 环境变量

| 变量名 | 默认值 | 说明 |
|--------|--------|------|
| NODE_ENV | production | 运行环境 |
| PORT | 3000 | 应用端口 |
| HOSTNAME | 0.0.0.0 | 绑定地址 |

### 端口映射

- **生产环境**: `3000:3000`
- **开发环境**: `3001:3000`
- **Nginx**: `80:80`, `443:443`

## 🔧 高级用法

### 使用 Docker Compose

```bash
# 生产环境
docker-compose up -d

# 开发环境
docker-compose --profile dev up -d

# 包含 Nginx
docker-compose --profile nginx up -d
```

### 自定义配置

```bash
# 指定端口运行
./docker-build.sh run -p 8080

# 指定环境
./docker-build.sh run -e dev

# 指定镜像标签
./docker-build.sh build -t v1.0.0
```

### 数据持久化

```bash
# 挂载数据目录
docker run -d \
  --name easiest-language-app \
  -p 3000:3000 \
  -v $(pwd)/data:/app/data \
  easiest-language:latest
```

## 📊 监控和日志

### 健康检查

应用提供健康检查端点：

```bash
# 检查应用状态
curl http://localhost:3000/api/health

# 响应示例
{
  "status": "healthy",
  "timestamp": "2025-01-02T10:00:00.000Z",
  "uptime": 3600,
  "memory": {
    "rss": 123456789,
    "heapTotal": 98765432,
    "heapUsed": 87654321,
    "external": 1234567
  },
  "version": "1.0.0",
  "environment": "production"
}
```

### 日志管理

```bash
# 查看实时日志
docker logs -f easiest-language-app

# 查看最近 100 行日志
docker logs --tail 100 easiest-language-app

# 查看特定时间段的日志
docker logs --since "2025-01-02T09:00:00" easiest-language-app
```

## 🔒 安全配置

### 非 root 用户

容器使用非 root 用户运行：

```dockerfile
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
```

### 安全头

Nginx 配置包含安全头：

```nginx
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
```

## 🚀 生产部署

### 1. 服务器准备

```bash
# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### 2. 部署应用

```bash
# 克隆项目
git clone <repository-url>
cd easiest-language

# 构建和部署
npm run deploy:docker
```

### 3. 配置反向代理

```bash
# 使用 Nginx 反向代理
docker-compose --profile nginx up -d
```

### 4. SSL 证书（可选）

```bash
# 创建 SSL 目录
mkdir -p ssl

# 复制证书文件
cp your-cert.pem ssl/cert.pem
cp your-key.pem ssl/key.pem

# 启用 HTTPS
# 编辑 docker-compose.yml 取消注释 HTTPS 配置
```

## 🔄 更新和维护

### 更新应用

```bash
# 拉取最新代码
git pull

# 重新构建和部署
npm run deploy:docker
```

### 备份数据

```bash
# 备份数据目录
docker cp easiest-language-app:/app/data ./backup-$(date +%Y%m%d)
```

### 清理资源

```bash
# 清理未使用的镜像和容器
./docker-build.sh clean

# 或者手动清理
docker system prune -a
```

## 🐛 故障排除

### 常见问题

1. **容器启动失败**
   ```bash
   # 查看详细日志
   docker logs easiest-language-app
   
   # 检查端口占用
   netstat -tlnp | grep :3000
   ```

2. **内存不足**
   ```bash
   # 检查内存使用
   docker stats easiest-language-app
   
   # 增加内存限制
   docker run -m 1g easiest-language:latest
   ```

3. **网络问题**
   ```bash
   # 检查网络连接
   docker network ls
   docker network inspect bridge
   ```

### 调试模式

```bash
# 进入容器调试
./docker-build.sh shell

# 或者直接运行
docker exec -it easiest-language-app /bin/sh
```

## 📈 性能优化

### 镜像优化

- 使用 Alpine Linux 基础镜像
- 多阶段构建减少镜像大小
- 清理 npm 缓存
- 使用 .dockerignore 排除不必要文件

### 运行时优化

- 启用 Gzip 压缩
- 配置静态资源缓存
- 使用 CDN 加速
- 启用 HTTP/2

### 监控指标

- CPU 使用率
- 内存使用率
- 网络 I/O
- 磁盘 I/O
- 响应时间

## 🔗 相关链接

- [Docker 官方文档](https://docs.docker.com/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Nginx 配置指南](https://nginx.org/en/docs/)

---

**部署状态**: ✅ 准备就绪  
**最后更新**: 2025年1月2日  
**维护者**: 开发团队
