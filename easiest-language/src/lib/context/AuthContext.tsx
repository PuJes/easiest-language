/**
 * 身份验证上下文 - 管理admin页面的登录状态
 */

'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// 定义身份验证上下文的类型
interface AuthContextType {
  isAuthenticated: boolean; // 是否已通过身份验证
  login: (password: string) => boolean; // 登录函数
  logout: () => void; // 登出函数
  checkAuth: () => boolean; // 检查身份验证状态
}

// 创建身份验证上下文
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 默认密码配置（实际项目中应该使用环境变量）
const ADMIN_PASSWORD = 'admin123'; // 默认密码
const AUTH_STORAGE_KEY = 'easiest_language_admin_auth'; // 本地存储键名
const AUTH_EXPIRY_HOURS = 24; // 认证有效期（小时）

/**
 * 身份验证提供者组件
 * 为子组件提供身份验证功能
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // 检查身份验证状态
  const checkAuth = (): boolean => {
    try {
      // 从本地存储获取认证信息
      const authData = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!authData) return false;

      const { timestamp, authenticated } = JSON.parse(authData);
      const now = new Date().getTime();
      const expiryTime = timestamp + AUTH_EXPIRY_HOURS * 60 * 60 * 1000; // 24小时后过期

      // 检查是否在有效期内
      if (now > expiryTime) {
        localStorage.removeItem(AUTH_STORAGE_KEY); // 清除过期的认证
        return false;
      }

      return authenticated === true;
    } catch (error) {
      console.error('检查身份验证时出错:', error);
      return false;
    }
  };

  // 登录函数
  const login = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      const authData = {
        authenticated: true,
        timestamp: new Date().getTime(),
      };

      // 保存认证信息到本地存储
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  // 登出函数
  const logout = (): void => {
    localStorage.removeItem(AUTH_STORAGE_KEY); // 清除认证信息
    setIsAuthenticated(false);
  };

  // 组件初始化时检查身份验证状态
  useEffect(() => {
    const authStatus = checkAuth();
    setIsAuthenticated(authStatus);
  }, []);

  // 提供身份验证上下文值
  const value: AuthContextType = {
    isAuthenticated,
    login,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * 使用身份验证的Hook
 * 供其他组件使用身份验证功能
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth必须在AuthProvider内部使用');
  }
  return context;
}

/**
 * 身份验证检查的高阶组件
 * 包装需要身份验证的组件
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.ComponentType<P> {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
      return <LoginForm />; // 如果未认证，显示登录表单
    }

    return <WrappedComponent {...props} />; // 如果已认证，显示原组件
  };
}

/**
 * 登录表单组件
 * 处理用户登录界面和逻辑
 */
function LoginForm(): JSX.Element {
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // 模拟登录延迟
    await new Promise((resolve) => setTimeout(resolve, 500));

    const success = login(password);
    if (!success) {
      setError('密码错误，请重试');
      setPassword(''); // 清空密码输入
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
            <svg
              className="h-6 w-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">管理员登录</h2>
          <p className="mt-2 text-center text-sm text-gray-600">请输入密码访问语言数据管理系统</p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="password" className="sr-only">
              密码
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="请输入管理员密码"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-3">
              <div className="flex">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="ml-2 text-sm text-red-700">{error}</span>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  验证中...
                </div>
              ) : (
                '登录'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className="text-xs text-gray-400">登录状态将保持24小时</p>
          </div>
        </form>
      </div>
    </div>
  );
}
