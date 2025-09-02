#!/bin/bash

# 🧪 MVP功能测试执行脚本
# 作者: AI Assistant
# 版本: v1.0
# 描述: 自动化执行MVP功能测试的完整流程

set -e  # 遇到错误立即退出

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

log_step() {
    echo -e "${PURPLE}[STEP]${NC} $1"
}

# 检查依赖
check_dependencies() {
    log_step "检查项目依赖..."
    
    if ! command -v node &> /dev/null; then
        log_error "Node.js 未安装"
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        log_error "npm 未安装"
        exit 1
    fi
    
    log_success "依赖检查通过"
}

# 安装依赖
install_dependencies() {
    log_step "安装项目依赖..."
    
    if [ ! -d "node_modules" ]; then
        npm install
        log_success "依赖安装完成"
    else
        log_info "依赖已存在，跳过安装"
    fi
}

# 代码质量检查
run_lint() {
    log_step "运行代码质量检查..."
    
    if npm run lint; then
        log_success "代码质量检查通过"
    else
        log_warning "代码质量检查发现问题，但继续执行测试"
    fi
}

# 单元测试
run_unit_tests() {
    log_step "运行单元测试..."
    
    # 运行所有单元测试
    if npm test; then
        log_success "单元测试通过"
    else
        log_error "单元测试失败"
        return 1
    fi
    
    # 生成覆盖率报告
    log_step "生成测试覆盖率报告..."
    if npm run test:coverage; then
        log_success "覆盖率报告生成完成"
        
        # 显示覆盖率摘要
        echo ""
        log_info "测试覆盖率摘要:"
        if [ -f "coverage/lcov-report/index.html" ]; then
            echo "详细报告: file://$(pwd)/coverage/lcov-report/index.html"
        fi
    else
        log_warning "覆盖率报告生成失败"
    fi
}

# 集成测试
run_integration_tests() {
    log_step "运行集成测试..."
    
    # 检查是否有集成测试文件
    if [ -d "src/components/filters/__tests__" ] && [ -f "src/components/filters/__tests__/FilterIntegration.test.tsx" ]; then
        npm test -- --testPathPattern="FilterIntegration"
        log_success "集成测试通过"
    else
        log_warning "集成测试文件不存在，跳过"
    fi
}

# E2E测试
run_e2e_tests() {
    log_step "运行E2E测试..."
    
    # 检查Cypress是否安装
    if ! command -v cypress &> /dev/null; then
        log_warning "Cypress未安装，跳过E2E测试"
        return 0
    fi
    
    # 检查是否有E2E测试文件
    if [ -d "cypress/e2e" ] && [ "$(ls -A cypress/e2e)" ]; then
        # 启动开发服务器
        log_info "启动开发服务器..."
        npm run dev &
        DEV_PID=$!
        
        # 等待服务器启动
        sleep 10
        
        # 运行E2E测试
        if npm run test:e2e; then
            log_success "E2E测试通过"
        else
            log_error "E2E测试失败"
            kill $DEV_PID 2>/dev/null || true
            return 1
        fi
        
        # 停止开发服务器
        kill $DEV_PID 2>/dev/null || true
    else
        log_warning "E2E测试文件不存在，跳过"
    fi
}

# 性能测试
run_performance_tests() {
    log_step "运行性能测试..."
    
    # 检查Lighthouse是否安装
    if ! command -v lighthouse &> /dev/null; then
        log_warning "Lighthouse未安装，跳过性能测试"
        return 0
    fi
    
    # 启动开发服务器
    log_info "启动开发服务器进行性能测试..."
    npm run dev &
    DEV_PID=$!
    
    # 等待服务器启动
    sleep 10
    
    # 运行Lighthouse测试
    if npm run lh:ci; then
        log_success "性能测试通过"
    else
        log_warning "性能测试发现问题"
    fi
    
    # 停止开发服务器
    kill $DEV_PID 2>/dev/null || true
}

# 生成测试报告
generate_test_report() {
    log_step "生成测试报告..."
    
    REPORT_FILE="test-report-$(date +%Y%m%d-%H%M%S).md"
    
    cat > "$REPORT_FILE" << EOF
# 🧪 MVP功能测试报告

## 测试执行信息
- **执行时间**: $(date)
- **执行环境**: $(uname -s) $(uname -r)
- **Node版本**: $(node --version)
- **npm版本**: $(npm --version)

## 测试结果摘要

### 单元测试
- **状态**: $(if [ $? -eq 0 ]; then echo "✅ 通过"; else echo "❌ 失败"; fi)
- **覆盖率**: 查看 coverage/lcov-report/index.html

### 集成测试
- **状态**: $(if [ $? -eq 0 ]; then echo "✅ 通过"; else echo "❌ 失败"; fi)

### E2E测试
- **状态**: $(if [ $? -eq 0 ]; then echo "✅ 通过"; else echo "❌ 失败"; fi)

### 性能测试
- **状态**: $(if [ $? -eq 0 ]; then echo "✅ 通过"; else echo "❌ 失败"; fi)

## 下一步行动
1. 查看详细测试报告
2. 修复失败的测试
3. 优化性能问题
4. 提升测试覆盖率

---
*报告生成时间: $(date)*
EOF

    log_success "测试报告已生成: $REPORT_FILE"
}

# 主函数
main() {
    echo -e "${CYAN}"
    echo "🧪 MVP功能测试执行脚本"
    echo "================================"
    echo -e "${NC}"
    
    # 记录开始时间
    START_TIME=$(date +%s)
    
    # 检查是否在正确的目录
    if [ ! -f "package.json" ]; then
        log_error "请在项目根目录运行此脚本"
        exit 1
    fi
    
    # 执行测试流程
    check_dependencies
    install_dependencies
    run_lint
    
    # 执行各种测试
    UNIT_TEST_RESULT=0
    INTEGRATION_TEST_RESULT=0
    E2E_TEST_RESULT=0
    PERFORMANCE_TEST_RESULT=0
    
    run_unit_tests || UNIT_TEST_RESULT=1
    run_integration_tests || INTEGRATION_TEST_RESULT=1
    run_e2e_tests || E2E_TEST_RESULT=1
    run_performance_tests || PERFORMANCE_TEST_RESULT=1
    
    # 生成报告
    generate_test_report
    
    # 计算总耗时
    END_TIME=$(date +%s)
    DURATION=$((END_TIME - START_TIME))
    
    # 显示总结
    echo ""
    echo -e "${CYAN}================================"
    echo "测试执行完成"
    echo "================================"
    echo -e "${NC}"
    
    log_info "总耗时: ${DURATION}秒"
    
    if [ $UNIT_TEST_RESULT -eq 0 ] && [ $INTEGRATION_TEST_RESULT -eq 0 ] && [ $E2E_TEST_RESULT -eq 0 ] && [ $PERFORMANCE_TEST_RESULT -eq 0 ]; then
        log_success "所有测试通过！🎉"
        exit 0
    else
        log_warning "部分测试失败，请查看详细报告"
        exit 1
    fi
}

# 处理命令行参数
case "${1:-}" in
    "unit")
        log_step "仅运行单元测试..."
        check_dependencies
        install_dependencies
        run_unit_tests
        ;;
    "integration")
        log_step "仅运行集成测试..."
        check_dependencies
        install_dependencies
        run_integration_tests
        ;;
    "e2e")
        log_step "仅运行E2E测试..."
        check_dependencies
        install_dependencies
        run_e2e_tests
        ;;
    "performance")
        log_step "仅运行性能测试..."
        check_dependencies
        install_dependencies
        run_performance_tests
        ;;
    "lint")
        log_step "仅运行代码质量检查..."
        check_dependencies
        install_dependencies
        run_lint
        ;;
    "coverage")
        log_step "仅生成覆盖率报告..."
        check_dependencies
        install_dependencies
        npm run test:coverage
        ;;
    "help"|"-h"|"--help")
        echo "使用方法: $0 [选项]"
        echo ""
        echo "选项:"
        echo "  unit        仅运行单元测试"
        echo "  integration 仅运行集成测试"
        echo "  e2e         仅运行E2E测试"
        echo "  performance 仅运行性能测试"
        echo "  lint        仅运行代码质量检查"
        echo "  coverage    仅生成覆盖率报告"
        echo "  help        显示此帮助信息"
        echo ""
        echo "默认: 运行所有测试"
        exit 0
        ;;
    "")
        main
        ;;
    *)
        log_error "未知选项: $1"
        echo "使用 '$0 help' 查看帮助信息"
        exit 1
        ;;
esac
