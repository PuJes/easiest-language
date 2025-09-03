# 使用官方 Node.js 20 Alpine 镜像作为基础镜像
FROM node:20.17-alpine AS base

# 安装必要的系统依赖
RUN apk add --no-cache libc6-compat

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY easiest-language/package*.json ./

# 清理并配置npm设置，使用淘宝镜像源提高稳定性
RUN npm config delete registry && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retries 10 && \
    npm config set maxsockets 5 && \
    npm cache clean --force && \
    npm ci --omit=dev --ignore-scripts --no-audit --no-fund

# 开发阶段
FROM base AS dev
# 配置npm网络设置并安装所有依赖（包括开发依赖）
RUN npm config delete registry && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retries 10 && \
    npm config set maxsockets 5 && \
    npm ci --ignore-scripts --no-audit --no-fund
COPY easiest-language/ .
EXPOSE 3000
CMD ["npm", "run", "dev"]

# 构建阶段
FROM base AS builder
WORKDIR /app
COPY easiest-language/package*.json ./
# 配置npm网络设置并安装所有依赖（包括开发依赖）
RUN npm config delete registry && \
    npm config set registry https://registry.npmmirror.com/ && \
    npm config set fetch-retry-mintimeout 30000 && \
    npm config set fetch-retry-maxtimeout 300000 && \
    npm config set fetch-retries 10 && \
    npm config set maxsockets 5 && \
    npm ci --ignore-scripts --no-audit --no-fund
COPY easiest-language/ .

# 构建应用
RUN npm run build

# 生产阶段
FROM node:20.17-alpine AS runner
WORKDIR /app

# 创建非 root 用户
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 复制构建产物
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 切换到非 root 用户
USER nextjs

# 暴露端口
EXPOSE 3000

# 设置环境变量
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# 启动应用
CMD ["node", "server.js"]
