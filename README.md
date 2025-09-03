# Easiest Language - 语言学习难度分析平台

## 🌍 项目简介

Easiest Language 是一个基于 FSI (Foreign Service Institute) 标准的语言学习难度分析平台，帮助英语使用者找到最适合学习的语言。

## ✨ 核心功能

- 🌍 **50+ 种语言**的 FSI 难度评级展示
- 🔍 **智能搜索**：支持语言名称、家族、地区搜索
- ⚖️ **语言对比**：最多3种语言同时对比分析
- 🎯 **个性化推荐**：基于用户偏好的智能推荐
- 📊 **数据可视化**：丰富的图表展示
- 🛠️ **管理员后台**：完整的数据管理功能

## 🏗️ 项目结构

```
Easiest_Language/              # Git 根目录
├── docs/                      # 项目文档
├── demo_map/                  # 演示文件
├── easiest-language/          # 实际项目目录
│   ├── src/                   # 源代码
│   ├── package.json           # 项目依赖
│   └── ...
├── Dockerfile                 # Docker 配置
├── docker-compose.yml         # Docker Compose 配置
├── docker-build.sh            # Docker 构建脚本
└── package.json               # 根目录脚本
```

## 🚀 快速开始

### 方式一：Docker 部署（推荐）

```bash
# 1. 安装 Docker（如果未安装）
# 参考 DOCKER_INSTALLATION_GUIDE.md

# 2. 一键部署
npm run deploy:docker

# 3. 访问应用
# http://localhost:3000
```

### 方式二：本地开发

```bash
# 1. 进入项目目录
cd easiest-language

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev

# 4. 访问应用
# http://localhost:3000
```

## 🐳 Docker 命令

```bash
# 构建镜像
npm run docker:build

# 运行生产环境
npm run docker:run

# 运行开发环境
npm run docker:dev

# 查看日志
npm run docker:logs

# 停止容器
npm run docker:stop

# 清理资源
npm run docker:clean
```

## 🛠️ 开发命令

```bash
# 安装依赖
cd easiest-language && npm install

# 启动开发服务器
npm run dev

# 构建项目
npm run build

# 运行测试
npm run test

# 代码格式化
npm run format

# 代码检查
npm run lint
```

## 📚 技术栈

- **前端**: Next.js 15 + React 19 + TypeScript
- **样式**: Tailwind CSS 4
- **动画**: Framer Motion
- **图表**: ECharts
- **部署**: Docker + 腾讯云托管

## 📖 文档

- [Docker 部署指南](DOCKER_DEPLOYMENT_GUIDE.md)
- [Docker 安装指南](DOCKER_INSTALLATION_GUIDE.md)
- [部署方案总结](DEPLOYMENT_SUMMARY.md)
- [项目详细总结](easiest-language/PROJECT_SUMMARY.md)

## 🔧 环境要求

- Node.js 18+
- Docker 20.10+ (Docker 部署)
- 2GB+ 内存
- 1GB+ 磁盘空间

## 📊 项目状态

- ✅ 构建成功
- ✅ Docker 配置完成
- ✅ 部署脚本就绪
- ✅ 文档完整

## 🎯 部署选项

### Docker 部署
- **优势**: 环境一致、易于扩展、支持多平台
- **适用**: 生产环境、团队协作、云服务器
- **命令**: `npm run deploy:docker`

### 腾讯云托管
- **优势**: 无需管理服务器、自动扩缩容、成本低
- **适用**: 快速原型、中小型应用
- **命令**: `cd easiest-language && npm run deploy:quick <env-id>`

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 联系方式

- 项目链接: [https://github.com/your-username/easiest-language](https://github.com/your-username/easiest-language)
- 问题反馈: [Issues](https://github.com/your-username/easiest-language/issues)

---

**开始使用**: `npm run deploy:docker` 🚀
