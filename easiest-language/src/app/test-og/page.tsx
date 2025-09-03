import Link from 'next/link';

export default function TestOGPage() {
  // 主要语言的测试数据
  const testLanguages = [
    { id: 'es', name: 'Spanish', nativeName: 'Español', category: 1, hours: 600 },
    { id: 'fr', name: 'French', nativeName: 'Français', category: 1, hours: 600 },
    { id: 'pt', name: 'Portuguese', nativeName: 'Português', category: 1, hours: 600 },
    { id: 'it', name: 'Italian', nativeName: 'Italiano', category: 1, hours: 600 },
    { id: 'de', name: 'German', nativeName: 'Deutsch', category: 2, hours: 750 },
    { id: 'nl', name: 'Dutch', nativeName: 'Nederlands', category: 1, hours: 600 },
    { id: 'sv', name: 'Swedish', nativeName: 'Svenska', category: 1, hours: 600 },
    { id: 'no', name: 'Norwegian', nativeName: 'Norsk', category: 1, hours: 600 },
    { id: 'da', name: 'Danish', nativeName: 'Dansk', category: 1, hours: 600 },
    { id: 'ru', name: 'Russian', nativeName: 'Русский', category: 3, hours: 1100 },
    { id: 'pl', name: 'Polish', nativeName: 'Polski', category: 3, hours: 1100 },
    { id: 'cs', name: 'Czech', nativeName: 'Čeština', category: 3, hours: 1100 },
    { id: 'hu', name: 'Hungarian', nativeName: 'Magyar', category: 4, hours: 1100 },
    { id: 'fi', name: 'Finnish', nativeName: 'Suomi', category: 4, hours: 1100 },
    { id: 'tr', name: 'Turkish', nativeName: 'Türkçe', category: 3, hours: 1100 },
    { id: 'ar', name: 'Arabic', nativeName: 'العربية', category: 4, hours: 2200 },
    { id: 'zh', name: 'Chinese', nativeName: '中文', category: 4, hours: 2200 },
    { id: 'ja', name: 'Japanese', nativeName: '日本語', category: 5, hours: 2200 },
    { id: 'ko', name: 'Korean', nativeName: '한국어', category: 4, hours: 2200 },
    { id: 'hi', name: 'Hindi', nativeName: 'हिन्दी', category: 3, hours: 1100 },
  ];

  // 根据FSI类别获取颜色
  const getCategoryColor = (category: number) => {
    switch (category) {
      case 1:
        return 'bg-green-100 border-green-300';
      case 2:
        return 'bg-yellow-100 border-yellow-300';
      case 3:
        return 'bg-orange-100 border-orange-300';
      case 4:
        return 'bg-red-100 border-red-300';
      case 5:
        return 'bg-purple-100 border-purple-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  // 根据FSI类别获取难度描述
  const getDifficultyText = (category: number) => {
    switch (category) {
      case 1:
        return '最容易';
      case 2:
        return '相对容易';
      case 3:
        return '中等难度';
      case 4:
        return '困难';
      case 5:
        return '非常困难';
      default:
        return '未知';
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">OG图片测试页面</h1>

        {/* 基础页面OG图片 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">基础页面OG图片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">首页OG图片</h3>
              <p className="text-gray-600 mb-4">测试首页的OG图片生成，包含网站主标题和特色信息</p>
              <Link
                href="/og?type=homepage"
                target="_blank"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                查看首页OG图片 →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">语言列表页OG图片</h3>
              <p className="text-gray-600 mb-4">测试语言列表页的OG图片生成，显示所有语言概览</p>
              <Link
                href="/og?type=languages"
                target="_blank"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                查看语言列表OG图片 →
              </Link>
            </div>
          </div>
        </div>

        {/* 语言详情页OG图片 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">语言详情页OG图片</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {testLanguages.map((lang) => (
              <div
                key={lang.id}
                className={`bg-white p-4 rounded-lg shadow border-2 ${getCategoryColor(lang.category)}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{lang.name}</h3>
                  <span className="text-xs bg-gray-200 px-2 py-1 rounded">FSI {lang.category}</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{lang.nativeName}</p>
                <p className="text-xs text-gray-500 mb-3">
                  {getDifficultyText(lang.category)} • {lang.hours}h
                </p>
                <div className="flex gap-2">
                  <Link
                    href={`/og/${lang.id}`}
                    target="_blank"
                    className="inline-flex items-center text-xs px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    路径参数
                  </Link>
                  <Link
                    href={`/og?type=language&language=${lang.name}&fsiCategory=${lang.category}&hours=${lang.hours}`}
                    target="_blank"
                    className="inline-flex items-center text-xs px-2 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                  >
                    查询参数
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 社交媒体测试工具 */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">社交媒体测试工具</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Facebook调试器</h3>
              <p className="text-gray-600 mb-4">测试Facebook分享效果</p>
              <a
                href="https://developers.facebook.com/tools/debug/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                打开Facebook调试器 →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Twitter卡片验证器</h3>
              <p className="text-gray-600 mb-4">测试Twitter分享效果</p>
              <a
                href="https://cards-dev.twitter.com/validator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                打开Twitter验证器 →
              </a>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">LinkedIn帖子检查器</h3>
              <p className="text-gray-600 mb-4">测试LinkedIn分享效果</p>
              <a
                href="https://www.linkedin.com/post-inspector/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                打开LinkedIn检查器 →
              </a>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
          <h3 className="text-2xl font-semibold mb-4 text-blue-800">使用说明</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-700">预览方法</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• 点击上面的链接可以预览OG图片</li>
                <li>• 图片尺寸为1200x630像素，符合社交媒体标准</li>
                <li>• 每种语言都有独特的颜色主题</li>
                <li>• 颜色根据FSI难度类别自动选择</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-blue-700">技术特点</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• 动态生成，无需手动创建图片文件</li>
                <li>• 自动适配不同社交媒体平台</li>
                <li>• 包含语言关键信息（难度、学习时间）</li>
                <li>• 现代化的视觉设计</li>
              </ul>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h4 className="font-semibold mb-2 text-blue-800">当前服务器地址</h4>
            <p className="text-blue-700 font-mono">http://localhost:3001</p>
            <p className="text-sm text-blue-600 mt-1">
              请将上述地址替换为您的实际域名进行社交媒体测试
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
