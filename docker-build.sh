#!/bin/bash

# Docker 构建和部署脚本
# 使用方法: ./docker-build.sh [command] [options]

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目信息
PROJECT_NAME="easiest-language"
IMAGE_NAME="easiest-language"
CONTAINER_NAME="easiest-language-app"

# 显示帮助信息
show_help() {
    echo -e "${BLUE}Docker 构建和部署脚本${NC}"
    echo ""
    echo "使用方法: $0 [command] [options]"
    echo ""
    echo "命令:"
    echo "  build         构建 Docker 镜像"
    echo "  run           运行容器"
    echo "  dev           运行开发环境"
    echo "  stop          停止容器"
    echo "  restart       重启容器"
    echo "  logs          查看日志"
    echo "  shell         进入容器 shell"
    echo "  clean         清理镜像和容器"
    echo "  deploy        完整部署流程"
    echo "  help          显示帮助信息"
    echo ""
    echo "选项:"
    echo "  -p, --port    指定端口 (默认: 3000)"
    echo "  -t, --tag     指定镜像标签 (默认: latest)"
    echo "  -e, --env     指定环境 (dev/prod, 默认: prod)"
    echo ""
    echo "示例:"
    echo "  $0 build                    # 构建镜像"
    echo "  $0 run -p 8080             # 在端口 8080 运行"
    echo "  $0 dev                     # 运行开发环境"
    echo "  $0 deploy -e prod          # 生产环境部署"
}

# 构建镜像
build_image() {
    local tag=${1:-latest}
    echo -e "${YELLOW}🏗️ 构建 Docker 镜像...${NC}"
    echo -e "${BLUE}📁 构建上下文: $(pwd)${NC}"
    echo -e "${BLUE}📂 项目目录: easiest-language/${NC}"
    docker build -t ${IMAGE_NAME}:${tag} .
    echo -e "${GREEN}✅ 镜像构建完成: ${IMAGE_NAME}:${tag}${NC}"
}

# 运行容器
run_container() {
    local port=${1:-3000}
    local env=${2:-prod}
    
    echo -e "${YELLOW}🚀 启动容器...${NC}"
    
    # 停止现有容器
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    
    if [ "$env" = "dev" ]; then
        echo -e "${BLUE}🔧 启动开发环境...${NC}"
        docker run -d \
            --name ${CONTAINER_NAME} \
            -p ${port}:3000 \
            -v $(pwd)/easiest-language:/app \
            -v /app/node_modules \
            -v /app/.next \
            -e NODE_ENV=development \
            ${IMAGE_NAME}:latest
    else
        echo -e "${BLUE}🏭 启动生产环境...${NC}"
        docker run -d \
            --name ${CONTAINER_NAME} \
            -p ${port}:3000 \
            -e NODE_ENV=production \
            ${IMAGE_NAME}:latest
    fi
    
    echo -e "${GREEN}✅ 容器启动成功${NC}"
    echo -e "${GREEN}🌐 访问地址: http://localhost:${port}${NC}"
}

# 运行开发环境
run_dev() {
    local port=${1:-3001}
    echo -e "${YELLOW}🔧 启动开发环境...${NC}"
    docker-compose --profile dev up -d app-dev
    echo -e "${GREEN}✅ 开发环境启动成功${NC}"
    echo -e "${GREEN}🌐 访问地址: http://localhost:${port}${NC}"
}

# 停止容器
stop_container() {
    echo -e "${YELLOW}⏹️ 停止容器...${NC}"
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    echo -e "${GREEN}✅ 容器已停止${NC}"
}

# 重启容器
restart_container() {
    echo -e "${YELLOW}🔄 重启容器...${NC}"
    stop_container
    run_container $1 $2
}

# 查看日志
show_logs() {
    echo -e "${YELLOW}📋 查看容器日志...${NC}"
    docker logs -f ${CONTAINER_NAME}
}

# 进入容器 shell
enter_shell() {
    echo -e "${YELLOW}🐚 进入容器 shell...${NC}"
    docker exec -it ${CONTAINER_NAME} /bin/sh
}

# 清理镜像和容器
clean_all() {
    echo -e "${YELLOW}🧹 清理 Docker 资源...${NC}"
    
    # 停止并删除容器
    docker stop ${CONTAINER_NAME} 2>/dev/null || true
    docker rm ${CONTAINER_NAME} 2>/dev/null || true
    docker-compose down 2>/dev/null || true
    
    # 删除镜像
    docker rmi ${IMAGE_NAME}:latest 2>/dev/null || true
    
    # 清理未使用的资源
    docker system prune -f
    
    echo -e "${GREEN}✅ 清理完成${NC}"
}

# 完整部署流程
deploy() {
    local env=${1:-prod}
    local port=${2:-3000}
    
    echo -e "${GREEN}🚀 开始完整部署流程...${NC}"
    echo -e "${BLUE}📁 当前目录: $(pwd)${NC}"
    echo -e "${BLUE}📂 项目目录: easiest-language/${NC}"
    
    # 1. 构建镜像
    build_image latest
    
    # 2. 停止现有容器
    stop_container
    
    # 3. 运行新容器
    run_container $port $env
    
    # 4. 等待服务启动
    echo -e "${YELLOW}⏳ 等待服务启动...${NC}"
    sleep 10
    
    # 5. 健康检查
    echo -e "${YELLOW}🔍 执行健康检查...${NC}"
    if curl -f http://localhost:${port} > /dev/null 2>&1; then
        echo -e "${GREEN}✅ 服务健康检查通过${NC}"
    else
        echo -e "${RED}❌ 服务健康检查失败${NC}"
        show_logs
        exit 1
    fi
    
    echo -e "${GREEN}🎉 部署完成！${NC}"
    echo -e "${GREEN}🌐 访问地址: http://localhost:${port}${NC}"
}

# 解析命令行参数
COMMAND=""
PORT="3000"
TAG="latest"
ENV="prod"

while [[ $# -gt 0 ]]; do
    case $1 in
        build|run|dev|stop|restart|logs|shell|clean|deploy|help)
            COMMAND="$1"
            shift
            ;;
        -p|--port)
            PORT="$2"
            shift 2
            ;;
        -t|--tag)
            TAG="$2"
            shift 2
            ;;
        -e|--env)
            ENV="$2"
            shift 2
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            echo -e "${RED}❌ 未知参数: $1${NC}"
            show_help
            exit 1
            ;;
    esac
done

# 执行命令
case $COMMAND in
    build)
        build_image $TAG
        ;;
    run)
        run_container $PORT $ENV
        ;;
    dev)
        run_dev $PORT
        ;;
    stop)
        stop_container
        ;;
    restart)
        restart_container $PORT $ENV
        ;;
    logs)
        show_logs
        ;;
    shell)
        enter_shell
        ;;
    clean)
        clean_all
        ;;
    deploy)
        deploy $ENV $PORT
        ;;
    help|"")
        show_help
        ;;
    *)
        echo -e "${RED}❌ 未知命令: $COMMAND${NC}"
        show_help
        exit 1
        ;;
esac
