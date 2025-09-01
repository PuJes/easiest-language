#!/bin/bash

# 腾讯云托管部署脚本
# 使用方法: ./scripts/deploy-cloudbase.sh [env-id]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 开始腾讯云托管部署流程${NC}"

# 检查参数
if [ -z "$1" ]; then
    echo -e "${RED}❌ 错误：请提供环境ID${NC}"
    echo "使用方法: $0 <env-id>"
    exit 1
fi

ENV_ID=$1
echo -e "${YELLOW}📝 使用环境ID: $ENV_ID${NC}"

# 检查必要工具
echo -e "${YELLOW}🔧 检查必要工具...${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js 未安装${NC}"
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm 未安装${NC}"
    exit 1
fi

if ! command -v cloudbase &> /dev/null; then
    echo -e "${YELLOW}📦 安装 CloudBase CLI...${NC}"
    npm install -g @cloudbase/cli
fi

echo -e "${GREEN}✅ 工具检查完成${NC}"

# 更新环境ID配置
echo -e "${YELLOW}📝 更新配置文件...${NC}"
sed -i "" "s/your-env-id/$ENV_ID/g" cloudbase.json
sed -i "" "s/your-env-id/$ENV_ID/g" cloudbaserc.json
sed -i "" "s/your-env-id/$ENV_ID/g" .env.cloudbase

# 安装依赖
echo -e "${YELLOW}📦 安装项目依赖...${NC}"
npm ci

# 运行测试
echo -e "${YELLOW}🧪 运行测试...${NC}"
npm run test

# 构建项目
echo -e "${YELLOW}🏗️ 构建项目...${NC}"
npm run build

# 部署到腾讯云托管
echo -e "${YELLOW}🚀 部署到腾讯云托管...${NC}"
cloudbase framework deploy

echo -e "${GREEN}✅ 部署完成！${NC}"
echo -e "${GREEN}🌐 访问地址: https://$ENV_ID.tcloudbaseapp.com${NC}"

# 清理临时文件
echo -e "${YELLOW}🧹 清理临时文件...${NC}"
# 这里可以添加清理逻辑，如果需要的话

echo -e "${GREEN}🎉 部署流程完成！${NC}"