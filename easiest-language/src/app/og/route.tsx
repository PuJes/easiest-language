import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

/**
 * 简化的语言数据映射，专门用于OG图片生成
 * 避免在Edge Runtime中使用复杂的数据适配器
 */
const SIMPLE_LANGUAGE_DATA: Record<string, {
  name: string;
  nativeName: string;
  fsiCategory: number;
  hours: number;
  family: string;
  gradient: string;
  difficulty: string;
}> = {
  'spanish': { 
    name: 'Spanish', 
    nativeName: 'Español', 
    fsiCategory: 1, 
    hours: 600, 
    family: 'Romance',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    difficulty: 'Easiest'
  },
  'es': { 
    name: 'Spanish', 
    nativeName: 'Español', 
    fsiCategory: 1, 
    hours: 600, 
    family: 'Romance',
    gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    difficulty: 'Easiest'
  },
  'french': { 
    name: 'French', 
    nativeName: 'Français', 
    fsiCategory: 2, 
    hours: 900, 
    family: 'Romance',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    difficulty: 'Relatively Easy'
  },
  'fr': { 
    name: 'French', 
    nativeName: 'Français', 
    fsiCategory: 2, 
    hours: 900, 
    family: 'Romance',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    difficulty: 'Relatively Easy'
  },
  'german': { 
    name: 'German', 
    nativeName: 'Deutsch', 
    fsiCategory: 2, 
    hours: 900, 
    family: 'Germanic',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    difficulty: 'Relatively Easy'
  },
  'de': { 
    name: 'German', 
    nativeName: 'Deutsch', 
    fsiCategory: 2, 
    hours: 900, 
    family: 'Germanic',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    difficulty: 'Relatively Easy'
  },
  'chinese': { 
    name: 'Mandarin Chinese', 
    nativeName: '中文', 
    fsiCategory: 5, 
    hours: 2200, 
    family: 'Sino-Tibetan',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    difficulty: 'Very Challenging'
  },
  'mandarin': { 
    name: 'Mandarin Chinese', 
    nativeName: '中文', 
    fsiCategory: 5, 
    hours: 2200, 
    family: 'Sino-Tibetan',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    difficulty: 'Very Challenging'
  },
  'zh': { 
    name: 'Mandarin Chinese', 
    nativeName: '中文', 
    fsiCategory: 5, 
    hours: 2200, 
    family: 'Sino-Tibetan',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    difficulty: 'Very Challenging'
  },
  'japanese': { 
    name: 'Japanese', 
    nativeName: '日本語', 
    fsiCategory: 5, 
    hours: 2200, 
    family: 'Japonic',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    difficulty: 'Very Challenging'
  },
  'ja': { 
    name: 'Japanese', 
    nativeName: '日本語', 
    fsiCategory: 5, 
    hours: 2200, 
    family: 'Japonic',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
    difficulty: 'Very Challenging'
  },
  'arabic': { 
    name: 'Arabic', 
    nativeName: 'العربية', 
    fsiCategory: 4, 
    hours: 1800, 
    family: 'Semitic',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    difficulty: 'Challenging'
  },
  'ar': { 
    name: 'Arabic', 
    nativeName: 'العربية', 
    fsiCategory: 4, 
    hours: 1800, 
    family: 'Semitic',
    gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
    difficulty: 'Challenging'
  },
};

/**
 * 创建语言详情页OG图片
 */
function createLanguageOGImage(languageData: (typeof SIMPLE_LANGUAGE_DATA)[string]) {
  return (
    <div
      style={{
        background: languageData.gradient,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'system-ui, sans-serif',
        position: 'relative',
      }}
    >
      {/* 背景装饰效果 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
        }}
      />
      
      {/* 主要内容容器 */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '40px',
          maxWidth: '1000px',
          zIndex: 1,
        }}
      >
        {/* 语言名称 */}
        <div
          style={{
            fontSize: '72px',
            fontWeight: 'bold',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            lineHeight: 1.1,
          }}
        >
          Learn {languageData.name}
        </div>
        
        {/* 本地语言名称 */}
        <div
          style={{
            fontSize: '36px',
            fontWeight: '500',
            marginBottom: '30px',
            opacity: 0.9,
            fontStyle: 'italic',
          }}
        >
          {languageData.nativeName}
        </div>

        {/* 信息卡片容器 */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '40px',
            marginBottom: '30px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {/* FSI类别卡片 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'rgba(255,255,255,0.2)',
                padding: '20px 30px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              FSI Category {languageData.fsiCategory}
            </div>
            <div style={{ fontSize: '24px', marginTop: '10px', opacity: 0.9 }}>
              {languageData.difficulty}
            </div>
          </div>

          {/* 学习时间卡片 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '48px',
                fontWeight: 'bold',
                background: 'rgba(255,255,255,0.2)',
                padding: '20px 30px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
              }}
            >
              {languageData.hours}h
            </div>
            <div style={{ fontSize: '24px', marginTop: '10px', opacity: 0.9 }}>
              Study Time
            </div>
          </div>

          {/* 语言家族卡片 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '32px',
                fontWeight: 'bold',
                background: 'rgba(255,255,255,0.2)',
                padding: '20px 25px',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.3)',
                textAlign: 'center',
              }}
            >
              {languageData.family}
            </div>
            <div style={{ fontSize: '20px', marginTop: '10px', opacity: 0.9 }}>
              Language Family
            </div>
          </div>
        </div>

        {/* 网站标识 */}
        <div
          style={{
            fontSize: '28px',
            fontWeight: '600',
            opacity: 0.8,
            marginTop: '20px',
            background: 'rgba(255,255,255,0.1)',
            padding: '15px 30px',
            borderRadius: '15px',
            backdropFilter: 'blur(10px)',
          }}
        >
          easiestlanguage.site
        </div>
      </div>
    </div>
  );
}

/**
 * 主要OG图片生成器
 * 支持首页、语言列表页和语言详情页
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'homepage';
    
    // 支持多种语言参数格式
    const languageParam = searchParams.get('language') || searchParams.get('lang') || searchParams.get('id');

    // 语言列表页OG图片
    if (type === 'languages') {
      return new ImageResponse(
        (
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontFamily: 'system-ui, sans-serif',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background:
                  'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
              }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                padding: '40px',
                maxWidth: '1000px',
              }}
            >
              <div
                style={{
                  fontSize: '80px',
                  fontWeight: 'bold',
                  marginBottom: '30px',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                  lineHeight: 1.1,
                }}
              >
                All Languages
              </div>
              <div
                style={{
                  fontSize: '36px',
                  fontWeight: '500',
                  marginBottom: '40px',
                  opacity: 0.9,
                  maxWidth: '800px',
                  lineHeight: 1.3,
                }}
              >
                Complete Language Database
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '60px',
                  marginBottom: '30px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      fontWeight: 'bold',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '20px 30px',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    50+
                  </div>
                  <div style={{ fontSize: '24px', marginTop: '10px' }}>Languages</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      fontWeight: 'bold',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '20px 30px',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    FSI
                  </div>
                  <div style={{ fontSize: '24px', marginTop: '10px' }}>Ratings</div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <div
                    style={{
                      fontSize: '48px',
                      fontWeight: 'bold',
                      background: 'rgba(255,255,255,0.2)',
                      padding: '20px 30px',
                      borderRadius: '20px',
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Compare
                  </div>
                  <div style={{ fontSize: '24px', marginTop: '10px' }}>Languages</div>
                </div>
              </div>
              <div
                style={{
                  fontSize: '32px',
                  fontWeight: '600',
                  opacity: 0.9,
                  marginTop: '20px',
                }}
              >
                Easiest Language to Learn
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // 语言详情页OG图片（通过查询参数）
    if (type === 'language' && languageParam) {
      const languageKey = languageParam.toLowerCase();
      const languageData = SIMPLE_LANGUAGE_DATA[languageKey];
      
      if (!languageData) {
        return new Response(`Language not found: ${languageParam}`, { status: 404 });
      }

      return new ImageResponse(createLanguageOGImage(languageData), {
        width: 1200,
        height: 630,
      });
    }

    // 默认首页OG图片
    return new ImageResponse(
      (
        <div
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontFamily: 'system-ui, sans-serif',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
            }}
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              padding: '40px',
              maxWidth: '1000px',
            }}
          >
            <div
              style={{
                fontSize: '80px',
                fontWeight: 'bold',
                marginBottom: '30px',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                lineHeight: 1.1,
              }}
            >
              Easiest Language to Learn
            </div>
            <div
              style={{
                fontSize: '36px',
                fontWeight: '500',
                marginBottom: '40px',
                opacity: 0.9,
                maxWidth: '800px',
                lineHeight: 1.3,
              }}
            >
              FSI Data Guide for English Speakers
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '60px',
                marginBottom: '30px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '20px 30px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  50+
                </div>
                <div style={{ fontSize: '24px', marginTop: '10px' }}>Languages</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '20px 30px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  FSI
                </div>
                <div style={{ fontSize: '24px', marginTop: '10px' }}>Standards</div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <div
                  style={{
                    fontSize: '48px',
                    fontWeight: 'bold',
                    background: 'rgba(255,255,255,0.2)',
                    padding: '20px 30px',
                    borderRadius: '20px',
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  600-2200h
                </div>
                <div style={{ fontSize: '24px', marginTop: '10px' }}>Study Time</div>
              </div>
            </div>
            <div
              style={{
                fontSize: '28px',
                fontWeight: '600',
                opacity: 0.8,
                marginTop: '20px',
              }}
            >
              easiestlanguage.site
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate the image', {
      status: 500,
    });
  }
}