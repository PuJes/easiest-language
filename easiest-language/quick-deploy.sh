#!/bin/bash

# 快速部署脚本 - 腾讯云托管
# 使用方法: ./quick-deploy.sh [env-id]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 快速部署到腾讯云托管${NC}"

# 检查参数
if [ -z "$1" ]; then
    echo -e "${RED}❌ 错误：请提供环境ID${NC}"
    echo "使用方法: $0 <env-id>"
    echo "示例: $0 your-env-id"
    exit 1
fi

ENV_ID=$1
echo -e "${YELLOW}📝 使用环境ID: $ENV_ID${NC}"

# 检查 CloudBase CLI
if ! command -v cloudbase &> /dev/null; then
    echo -e "${YELLOW}📦 安装 CloudBase CLI...${NC}"
    npm install -g @cloudbase/cli
fi

# 更新环境ID配置
echo -e "${YELLOW}📝 更新配置文件...${NC}"
sed -i "" "s/your-env-id/$ENV_ID/g" cloudbaserc.json

# 构建项目
echo -e "${YELLOW}🏗️ 构建项目...${NC}"
npm run build

# 部署到腾讯云托管
echo -e "${YELLOW}🚀 部署到腾讯云托管...${NC}"
cloudbase framework deploy

echo -e "${GREEN}✅ 部署完成！${NC}"
echo -e "${GREEN}🌐 访问地址: https://$ENV_ID.tcloudbaseapp.com${NC}"
echo -e "${GREEN}🎉 部署流程完成！${NC}"
