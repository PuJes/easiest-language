# Docker 安装指南

## 🐳 安装 Docker

### macOS 安装

#### 方法一：使用 Docker Desktop（推荐）

1. **下载 Docker Desktop**
   - 访问 [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
   - 下载适合您 Mac 的版本（Intel 或 Apple Silicon）

2. **安装 Docker Desktop**
   ```bash
   # 下载后双击 .dmg 文件
   # 将 Docker 拖拽到 Applications 文件夹
   # 启动 Docker Desktop
   ```

3. **验证安装**
   ```bash
   docker --version
   docker-compose --version
   ```

#### 方法二：使用 Homebrew

```bash
# 安装 Homebrew（如果未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Docker
brew install --cask docker

# 启动 Docker Desktop
open /Applications/Docker.app
```

### Linux 安装

#### Ubuntu/Debian

```bash
# 更新包索引
sudo apt-get update

# 安装必要的包
sudo apt-get install \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# 添加 Docker 官方 GPG 密钥
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg

# 设置稳定版仓库
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# 更新包索引
sudo apt-get update

# 安装 Docker Engine
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录或运行
newgrp docker
```

#### CentOS/RHEL

```bash
# 安装必要的包
sudo yum install -y yum-utils

# 添加 Docker 仓库
sudo yum-config-manager \
    --add-repo \
    https://download.docker.com/linux/centos/docker-ce.repo

# 安装 Docker Engine
sudo yum install docker-ce docker-ce-cli containerd.io docker-compose-plugin

# 启动 Docker 服务
sudo systemctl start docker
sudo systemctl enable docker

# 将当前用户添加到 docker 组
sudo usermod -aG docker $USER
```

### Windows 安装

#### 方法一：使用 Docker Desktop（推荐）

1. **下载 Docker Desktop**
   - 访问 [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
   - 下载并运行安装程序

2. **安装要求**
   - Windows 10 64-bit: Pro, Enterprise, or Education (Build 15063 or later)
   - 启用 Hyper-V 和容器功能
   - 启用 WSL 2 功能

3. **安装步骤**
   - 运行下载的安装程序
   - 按照安装向导完成安装
   - 重启计算机
   - 启动 Docker Desktop

#### 方法二：使用 WSL 2

```bash
# 在 WSL 2 中安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# 启动 Docker 服务
sudo service docker start
```

## 🔧 配置 Docker

### 基本配置

```bash
# 验证 Docker 安装
docker --version
docker-compose --version

# 测试 Docker 运行
docker run hello-world

# 查看 Docker 信息
docker info
```

### 配置 Docker 镜像加速（中国用户）

#### macOS/Windows (Docker Desktop)

1. 打开 Docker Desktop
2. 进入 Settings > Docker Engine
3. 添加镜像加速器配置：

```json
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
```

4. 点击 "Apply & Restart"

#### Linux

```bash
# 创建或编辑 daemon.json
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  "registry-mirrors": [
    "https://docker.mirrors.ustc.edu.cn",
    "https://hub-mirror.c.163.com",
    "https://mirror.baidubce.com"
  ]
}
EOF

# 重启 Docker 服务
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 🚀 验证安装

### 运行测试容器

```bash
# 运行 Hello World 容器
docker run hello-world

# 运行 Nginx 测试
docker run -d -p 8080:80 --name test-nginx nginx
curl http://localhost:8080
docker stop test-nginx
docker rm test-nginx
```

### 测试 Docker Compose

```bash
# 创建测试文件
cat > docker-compose.test.yml << EOF
version: '3.8'
services:
  web:
    image: nginx
    ports:
      - "8080:80"
EOF

# 运行测试
docker-compose -f docker-compose.test.yml up -d
curl http://localhost:8080
docker-compose -f docker-compose.test.yml down

# 清理测试文件
rm docker-compose.test.yml
```

## 🛠️ 常见问题

### 权限问题

```bash
# 将用户添加到 docker 组
sudo usermod -aG docker $USER

# 重新登录或运行
newgrp docker

# 或者使用 sudo 运行 Docker 命令
sudo docker --version
```

### 启动问题

```bash
# 检查 Docker 服务状态
sudo systemctl status docker

# 启动 Docker 服务
sudo systemctl start docker

# 设置开机自启
sudo systemctl enable docker
```

### 网络问题

```bash
# 检查 Docker 网络
docker network ls

# 重启 Docker 网络
sudo systemctl restart docker
```

## 📚 学习资源

- [Docker 官方文档](https://docs.docker.com/)
- [Docker 入门教程](https://docs.docker.com/get-started/)
- [Docker Compose 文档](https://docs.docker.com/compose/)
- [Docker 最佳实践](https://docs.docker.com/develop/dev-best-practices/)

## 🎯 下一步

安装完成后，您可以：

1. **构建项目镜像**
   ```bash
   npm run docker:build
   ```

2. **运行项目**
   ```bash
   npm run docker:run
   ```

3. **查看部署指南**
   ```bash
   cat DOCKER_DEPLOYMENT_GUIDE.md
   ```

---

**安装完成后，请运行 `docker --version` 验证安装是否成功！**
