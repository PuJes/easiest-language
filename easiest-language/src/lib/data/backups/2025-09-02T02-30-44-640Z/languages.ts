import type { LanguageData } from '../../../types';

/**
 * 根据FSI类别生成默认的难度评分
 */
function generateFSIDetails(category: number) {
  const baseScores = {
    1: { grammar: 2, vocabulary: 3, pronunciation: 2, writing: 1, cultural: 2 },    // 最容易
    2: { grammar: 3, vocabulary: 3, pronunciation: 3, writing: 2, cultural: 3 },    // 容易
    3: { grammar: 4, vocabulary: 4, pronunciation: 4, writing: 3, cultural: 4 },    // 中等
    4: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 },    // 困难
    5: { grammar: 5, vocabulary: 5, pronunciation: 5, writing: 5, cultural: 5 },    // 最困难
  };
  
  return baseScores[category as keyof typeof baseScores] || baseScores[3];
}

/**
 * FSI 语言学习难度数据
 * 基于美国外国语学院官方分类和学习时长标准
 * 
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: 2025-09-02T02:30:29.943Z
 */
export const FSI_LANGUAGE_DATA: LanguageData = {
  languages: [
    {
        'id': 'es',
        'name': 'Spanish的点点滴滴',
        'nativeName': 'Español',
        'countries': [
            'Spain',
            'Mexico',
            'Argentina',
            'Colombia',
            'Peru',
            'Venezuela',
            'Chile',
            'Ecuador',
            'Cuba',
            'Guatemala'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '最容易学习的语言之一',
            'details': {
                'grammar': 2,
                'vocabulary': 3,
                'pronunciation': 2,
                'writing': 1,
                'cultural': 2
            }
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 2,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 500000000,
        'flagEmoji': '🇪🇸',
        'color': '#28a745'
    },
    {
        'id': 'pt',
        'name': 'Portuguese',
        'nativeName': 'Português',
        'countries': [
            'Brazil',
            'Portugal',
            'Angola',
            'Mozambique',
            'Cape Verde'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '与西班牙语相似，相对容易',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 1,
                'cultural': 3
            }
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 3,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 260000000,
        'flagEmoji': '🇵🇹',
        'color': '#28a745'
    },
    {
        'id': 'it',
        'name': 'Italian',
        'nativeName': 'Italiano',
        'countries': [
            'Italy',
            'San Marino',
            'Vatican City',
            'Switzerland'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '语法相对简单，发音规则',
            'details': {
                'grammar': 2,
                'vocabulary': 3,
                'pronunciation': 2,
                'writing': 1,
                'cultural': 2
            }
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 2,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 65000000,
        'flagEmoji': '🇮🇹',
        'color': '#28a745'
    },
    {
        'id': 'fr',
        'name': 'French',
        'nativeName': 'Français',
        'countries': [
            'France',
            'Canada',
            'Belgium',
            'Switzerland',
            'Senegal',
            'Ivory Coast',
            'Democratic Republic of the Congo'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '语法复杂但有规律',
            'details': {
                'grammar': 4,
                'vocabulary': 3,
                'pronunciation': 4,
                'writing': 1,
                'cultural': 3
            }
        },
        'difficulty': {
            'overall': 4,
            'grammar': 4,
            'pronunciation': 4,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 280000000,
        'flagEmoji': '🇫🇷',
        'color': '#28a745'
    },
    {
        'id': 'ro',
        'name': 'Romanian',
        'nativeName': 'Română',
        'countries': [
            'Romania',
            'Moldova'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '罗曼语族中保留较多拉丁特征'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 4,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 24000000,
        'flagEmoji': '🇷🇴',
        'color': '#28a745'
    },
    {
        'id': 'nl',
        'name': 'Dutch',
        'nativeName': 'Nederlands',
        'countries': [
            'Netherlands',
            'Belgium',
            'Suriname'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '与英语同属西日耳曼语族'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 3,
            'vocabulary': 2
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 24000000,
        'flagEmoji': '🇳🇱',
        'color': '#28a745'
    },
    {
        'id': 'sv',
        'name': 'Swedish',
        'nativeName': 'Svenska',
        'countries': [
            'Sweden',
            'Finland'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '北欧语言中相对简单'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 3,
            'vocabulary': 2
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 10000000,
        'flagEmoji': '🇸🇪',
        'color': '#28a745'
    },
    {
        'id': 'no',
        'name': 'Norwegian',
        'nativeName': 'Norsk',
        'countries': [
            'Norway'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '语法简单，与英语相似度高'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 2,
            'pronunciation': 3,
            'vocabulary': 2
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 5000000,
        'flagEmoji': '🇳🇴',
        'color': '#28a745'
    },
    {
        'id': 'de',
        'name': 'German',
        'nativeName': 'Deutsch',
        'countries': [
            'Germany',
            'Austria',
            'Switzerland',
            'Liechtenstein',
            'Luxembourg'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '语法复杂，格变较多'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 6,
            'pronunciation': 4,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 100000000,
        'flagEmoji': '🇩🇪',
        'color': '#ffc107'
    },
    {
        'id': 'id',
        'name': 'Indonesian',
        'nativeName': 'Bahasa Indonesia',
        'countries': [
            'Indonesia'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '语法相对简单，无时态变化'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 2,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Austronesian',
        'subfamily': 'Malayo-Polynesian',
        'writingSystem': 'Latin',
        'speakers': 270000000,
        'flagEmoji': '🇮🇩',
        'color': '#ffc107'
    },
    {
        'id': 'ms',
        'name': 'Malay',
        'nativeName': 'Bahasa Melayu',
        'countries': [
            'Malaysia',
            'Brunei',
            'Singapore'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '与印尼语相似，语法简单'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 2,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Austronesian',
        'subfamily': 'Malayo-Polynesian',
        'writingSystem': 'Latin',
        'speakers': 290000000,
        'flagEmoji': '🇲🇾',
        'color': '#ffc107'
    },
    {
        'id': 'sw',
        'name': 'Swahili',
        'nativeName': 'Kiswahili',
        'countries': [
            'Tanzania',
            'Kenya',
            'Uganda',
            'Democratic Republic of the Congo'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '班图语族，语法相对规律'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 4,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Niger-Congo',
        'subfamily': 'Bantu',
        'writingSystem': 'Latin',
        'speakers': 200000000,
        'flagEmoji': '🇹🇿',
        'color': '#ffc107'
    },
    {
        'id': 'hi',
        'name': 'Hindi',
        'nativeName': 'हिन्दी',
        'countries': [
            'India'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '梵文文字系统，语法复杂'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 5,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Indo-Aryan',
        'writingSystem': 'Devanagari',
        'speakers': 600000000,
        'flagEmoji': '🇮🇳',
        'color': '#fd7e14'
    },
    {
        'id': 'ru',
        'name': 'Russian',
        'nativeName': 'Русский',
        'countries': [
            'Russian Federation',
            'Kazakhstan',
            'Belarus',
            'Kyrgyzstan'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '六格变体系，语法极其复杂'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 5,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Cyrillic',
        'speakers': 260000000,
        'flagEmoji': '🇷🇺',
        'color': '#fd7e14'
    },
    {
        'id': 'th',
        'name': 'Thai',
        'nativeName': 'ภาษาไทย',
        'countries': [
            'Thailand'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '声调语言，文字复杂'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 4,
            'pronunciation': 7,
            'vocabulary': 6
        },
        'family': 'Kra-Dai',
        'subfamily': 'Tai',
        'writingSystem': 'Thai',
        'speakers': 69000000,
        'flagEmoji': '🇹🇭',
        'color': '#fd7e14'
    },
    {
        'id': 'vi',
        'name': 'Vietnamese',
        'nativeName': 'Tiếng Việt',
        'countries': [
            'Vietnam'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '六声调语言，语法相对简单'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 3,
            'pronunciation': 8,
            'vocabulary': 6
        },
        'family': 'Austroasiatic',
        'subfamily': 'Vietic',
        'writingSystem': 'Latin (Vietnamese)',
        'speakers': 95000000,
        'flagEmoji': '🇻🇳',
        'color': '#fd7e14'
    },
    {
        'id': 'he',
        'name': 'Hebrew',
        'nativeName': 'עברית',
        'countries': [
            'Israel'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '闪族语言，从右到左书写'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 6,
            'pronunciation': 5,
            'vocabulary': 6
        },
        'family': 'Afro-Asiatic',
        'subfamily': 'Semitic',
        'writingSystem': 'Hebrew',
        'speakers': 9000000,
        'flagEmoji': '🇮🇱',
        'color': '#fd7e14'
    },
    {
        'id': 'pl',
        'name': 'Polish',
        'nativeName': 'Polski',
        'countries': [
            'Poland'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '七格变体系，语音复杂'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 6,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Latin',
        'speakers': 45000000,
        'flagEmoji': '🇵🇱',
        'color': '#fd7e14'
    },
    {
        'id': 'tr',
        'name': 'Turkish',
        'nativeName': 'Türkçe',
        'countries': [
            'Turkey',
            'Cyprus'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '黏着语，语音和谐规律'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 6,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Turkic',
        'subfamily': 'Southwestern',
        'writingSystem': 'Latin',
        'speakers': 80000000,
        'flagEmoji': '🇹🇷',
        'color': '#fd7e14'
    },
    {
        'id': 'ar',
        'name': 'Arabic',
        'nativeName': 'العربية',
        'countries': [
            'Saudi Arabia',
            'Egypt',
            'Iraq',
            'Jordan',
            'Lebanon',
            'Syria',
            'Algeria',
            'Morocco',
            'Tunisia',
            'United Arab Emirates'
        ],
        'fsi': {
            'category': 4,
            'hours': 1800,
            'description': '闪族语言，文字和语法极其复杂'
        },
        'difficulty': {
            'overall': 8,
            'grammar': 8,
            'pronunciation': 7,
            'vocabulary': 7
        },
        'family': 'Afro-Asiatic',
        'subfamily': 'Semitic',
        'writingSystem': 'Arabic',
        'speakers': 422000000,
        'flagEmoji': '🇸🇦',
        'color': '#dc3545'
    },
    {
        'id': 'ko',
        'name': 'Korean',
        'nativeName': '한국어',
        'countries': [
            'South Korea',
            'North Korea'
        ],
        'fsi': {
            'category': 4,
            'hours': 1800,
            'description': '敬语体系复杂，语序与英语差异大'
        },
        'difficulty': {
            'overall': 7,
            'grammar': 8,
            'pronunciation': 6,
            'vocabulary': 7
        },
        'family': 'Koreanic',
        'subfamily': 'Korean',
        'writingSystem': 'Hangul',
        'speakers': 77000000,
        'flagEmoji': '🇰🇷',
        'color': '#dc3545'
    },
    {
        'id': 'zh',
        'name': 'Mandarin Chinese',
        'nativeName': '中文',
        'countries': [
            'China',
            'Taiwan',
            'Singapore'
        ],
        'fsi': {
            'category': 5,
            'hours': 2200,
            'description': '汉字文字系统，四声调语言'
        },
        'difficulty': {
            'overall': 9,
            'grammar': 6,
            'pronunciation': 8,
            'vocabulary': 10
        },
        'family': 'Sino-Tibetan',
        'subfamily': 'Sinitic',
        'writingSystem': 'Chinese Characters',
        'speakers': 918000000,
        'flagEmoji': '🇨🇳',
        'color': '#6f42c1'
    },
    {
        'id': 'ja',
        'name': 'Japanese',
        'nativeName': '日本語',
        'countries': [
            'Japan'
        ],
        'fsi': {
            'category': 5,
            'hours': 2200,
            'description': '三套文字系统，敬语复杂'
        },
        'difficulty': {
            'overall': 9,
            'grammar': 8,
            'pronunciation': 7,
            'vocabulary': 10
        },
        'family': 'Japonic',
        'subfamily': 'Japanese',
        'writingSystem': 'Hiragana, Katakana, Kanji',
        'speakers': 125000000,
        'flagEmoji': '🇯🇵',
        'color': '#6f42c1'
    },
    {
        'id': 'yue',
        'name': 'Cantonese',
        'nativeName': '粵語',
        'countries': [
            'China',
            'Hong Kong',
            'Macau'
        ],
        'fsi': {
            'category': 5,
            'hours': 2200,
            'description': '九声调，口语与书面语差异大'
        },
        'difficulty': {
            'overall': 9,
            'grammar': 6,
            'pronunciation': 9,
            'vocabulary': 10
        },
        'family': 'Sino-Tibetan',
        'subfamily': 'Sinitic',
        'writingSystem': 'Chinese Characters',
        'speakers': 85000000,
        'flagEmoji': '🇭🇰',
        'color': '#6f42c1'
    },
    {
        'id': 'en',
        'name': 'English',
        'nativeName': 'English',
        'countries': [
            'United States of America',
            'United Kingdom',
            'Canada',
            'Australia',
            'New Zealand',
            'Ireland',
            'South Africa',
            'Nigeria'
        ],
        'fsi': {
            'category': 0,
            'hours': 0,
            'description': '参考语言(英语母语者)'
        },
        'difficulty': {
            'overall': 0,
            'grammar': 0,
            'pronunciation': 0,
            'vocabulary': 0
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 1500000000,
        'flagEmoji': '🇺🇸',
        'color': '#6c757d'
    },
    {
        'id': 'bn',
        'name': 'Bengali',
        'nativeName': 'বাংলা',
        'countries': [
            'Bangladesh',
            'India'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '梵文字母系统'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 5,
            'pronunciation': 4,
            'vocabulary': 6
        },
        'family': 'Indo-European',
        'subfamily': 'Indo-Aryan',
        'writingSystem': 'Bengali',
        'speakers': 300000000,
        'flagEmoji': '🇧🇩',
        'color': '#fd7e14'
    },
    {
        'id': 'ur',
        'name': 'Urdu',
        'nativeName': 'اردو',
        'countries': [
            'Pakistan',
            'India'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '与印地语相似，使用阿拉伯文字'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 5,
            'pronunciation': 4,
            'vocabulary': 7
        },
        'family': 'Indo-European',
        'subfamily': 'Indo-Aryan',
        'writingSystem': 'Arabic (Urdu)',
        'speakers': 230000000,
        'flagEmoji': '🇵🇰',
        'color': '#fd7e14'
    },
    {
        'id': 'fa',
        'name': 'Persian',
        'nativeName': 'فارسی',
        'countries': [
            'Iran',
            'Afghanistan',
            'Tajikistan'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '印欧语系，语法相对简单'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 4,
            'pronunciation': 5,
            'vocabulary': 6
        },
        'family': 'Indo-European',
        'subfamily': 'Iranian',
        'writingSystem': 'Arabic (Persian)',
        'speakers': 110000000,
        'flagEmoji': '🇮🇷',
        'color': '#fd7e14'
    },
    {
        'id': 'ca',
        'name': 'Catalan',
        'nativeName': 'Català',
        'countries': [
            'Spain',
            'Andorra'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '罗曼语族，与西班牙语相似'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 2,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 10000000,
        'flagEmoji': '🇪🇸',
        'color': '#28a745'
    },
    {
        'id': 'da',
        'name': 'Danish',
        'nativeName': 'Dansk',
        'countries': [
            'Denmark'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '北日耳曼语族，与挪威语相似'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 3,
            'pronunciation': 4,
            'vocabulary': 2
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 6000000,
        'flagEmoji': '🇩🇰',
        'color': '#28a745'
    },
    {
        'id': 'af',
        'name': 'Afrikaans',
        'nativeName': 'Afrikaans',
        'countries': [
            'South Africa',
            'Namibia'
        ],
        'fsi': {
            'category': 1,
            'hours': 600,
            'description': '荷兰语的衍生语言'
        },
        'difficulty': {
            'overall': 3,
            'grammar': 2,
            'pronunciation': 3,
            'vocabulary': 3
        },
        'family': 'Indo-European',
        'subfamily': 'Germanic',
        'writingSystem': 'Latin',
        'speakers': 7000000,
        'flagEmoji': '🇿🇦',
        'color': '#28a745'
    },
    {
        'id': 'fi',
        'name': 'Finnish',
        'nativeName': 'Suomi',
        'countries': [
            'Finland'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '芬兰-乌戈尔语族，格变复杂'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 6,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Uralic',
        'subfamily': 'Finnic',
        'writingSystem': 'Latin',
        'speakers': 5500000,
        'flagEmoji': '🇫🇮',
        'color': '#ffc107'
    },
    {
        'id': 'hu',
        'name': 'Hungarian',
        'nativeName': 'Magyar',
        'countries': [
            'Hungary'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '乌拉尔语族，语法极其复杂'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 7,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Uralic',
        'subfamily': 'Ugric',
        'writingSystem': 'Latin',
        'speakers': 13000000,
        'flagEmoji': '🇭🇺',
        'color': '#ffc107'
    },
    {
        'id': 'et',
        'name': 'Estonian',
        'nativeName': 'Eesti keel',
        'countries': [
            'Estonia'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '芬兰-乌戈尔语族'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 6,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Uralic',
        'subfamily': 'Finnic',
        'writingSystem': 'Latin',
        'speakers': 1100000,
        'flagEmoji': '🇪🇪',
        'color': '#ffc107'
    },
    {
        'id': 'el',
        'name': 'Greek',
        'nativeName': 'Ελληνικά',
        'countries': [
            'Greece',
            'Cyprus'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '印欧语系独立分支'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 6,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Hellenic',
        'writingSystem': 'Greek',
        'speakers': 13400000,
        'flagEmoji': '🇬🇷',
        'color': '#fd7e14'
    },
    {
        'id': 'cs',
        'name': 'Czech',
        'nativeName': 'Čeština',
        'countries': [
            'Czech Republic'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '西斯拉夫语族，七格变'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 5,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Latin',
        'speakers': 10700000,
        'flagEmoji': '🇨🇿',
        'color': '#fd7e14'
    },
    {
        'id': 'sk',
        'name': 'Slovak',
        'nativeName': 'Slovenčina',
        'countries': [
            'Slovakia'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '与捷克语相近'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 5,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Latin',
        'speakers': 5200000,
        'flagEmoji': '🇸🇰',
        'color': '#fd7e14'
    },
    {
        'id': 'hr',
        'name': 'Croatian',
        'nativeName': 'Hrvatski',
        'countries': [
            'Croatia'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '南斯拉夫语族'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Latin',
        'speakers': 5600000,
        'flagEmoji': '🇭🇷',
        'color': '#fd7e14'
    },
    {
        'id': 'bg',
        'name': 'Bulgarian',
        'nativeName': 'Български',
        'countries': [
            'Bulgaria'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '南斯拉夫语族，使用西里尔文字'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 6,
            'pronunciation': 4,
            'vocabulary': 6
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Cyrillic',
        'speakers': 9000000,
        'flagEmoji': '🇧🇬',
        'color': '#fd7e14'
    },
    {
        'id': 'lv',
        'name': 'Latvian',
        'nativeName': 'Latviešu valoda',
        'countries': [
            'Latvia'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '波罗的海语族'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 6,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Baltic',
        'writingSystem': 'Latin',
        'speakers': 1750000,
        'flagEmoji': '🇱🇻',
        'color': '#fd7e14'
    },
    {
        'id': 'lt',
        'name': 'Lithuanian',
        'nativeName': 'Lietuvių kalba',
        'countries': [
            'Lithuania'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '波罗的海语族，保留古印欧语特征'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Baltic',
        'writingSystem': 'Latin',
        'speakers': 3000000,
        'flagEmoji': '🇱🇹',
        'color': '#fd7e14'
    },
    {
        'id': 'sl',
        'name': 'Slovenian',
        'nativeName': 'Slovenščina',
        'countries': [
            'Slovenia'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '南斯拉夫语族，保留双数'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 4,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Latin',
        'speakers': 2500000,
        'flagEmoji': '🇸🇮',
        'color': '#fd7e14'
    },
    {
        'id': 'uk',
        'name': 'Ukrainian',
        'nativeName': 'Українська',
        'countries': [
            'Ukraine'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '东斯拉夫语族，与俄语相近'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 7,
            'pronunciation': 5,
            'vocabulary': 5
        },
        'family': 'Indo-European',
        'subfamily': 'Slavic',
        'writingSystem': 'Cyrillic',
        'speakers': 40000000,
        'flagEmoji': '🇺🇦',
        'color': '#fd7e14'
    },
    {
        'id': 'am',
        'name': 'Amharic',
        'nativeName': 'አማርኛ',
        'countries': [
            'Ethiopia'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '闪族语言，埃塞俄比亚官方语言'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 6,
            'pronunciation': 5,
            'vocabulary': 6
        },
        'family': 'Afro-Asiatic',
        'subfamily': 'Semitic',
        'writingSystem': 'Ethiopic',
        'speakers': 57500000,
        'flagEmoji': '🇪🇹',
        'color': '#fd7e14'
    },
    {
        'id': 'mn',
        'name': 'Mongolian',
        'nativeName': 'Монгол хэл',
        'countries': [
            'Mongolia',
            'China'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '蒙古语族'
        },
        'difficulty': {
            'overall': 5,
            'grammar': 5,
            'pronunciation': 4,
            'vocabulary': 6
        },
        'family': 'Mongolic',
        'subfamily': 'Mongolic',
        'writingSystem': 'Cyrillic',
        'speakers': 5200000,
        'flagEmoji': '🇲🇳',
        'color': '#fd7e14'
    },
    {
        'id': 'ta',
        'name': 'Tamil',
        'nativeName': 'தமிழ்',
        'countries': [
            'India',
            'Sri Lanka',
            'Singapore'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '达罗毗荼语族，古典语言'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 6,
            'pronunciation': 5,
            'vocabulary': 6
        },
        'family': 'Dravidian',
        'subfamily': 'Southern',
        'writingSystem': 'Tamil',
        'speakers': 78000000,
        'flagEmoji': '🇮🇳',
        'color': '#fd7e14'
    },
    {
        'id': 'te',
        'name': 'Telugu',
        'nativeName': 'తెలుగు',
        'countries': [
            'India'
        ],
        'fsi': {
            'category': 3,
            'hours': 1100,
            'description': '达罗毗荼语族'
        },
        'difficulty': {
            'overall': 6,
            'grammar': 6,
            'pronunciation': 5,
            'vocabulary': 6
        },
        'family': 'Dravidian',
        'subfamily': 'South-Central',
        'writingSystem': 'Telugu',
        'speakers': 95000000,
        'flagEmoji': '🇮🇳',
        'color': '#fd7e14'
    },
    {
        'id': 'hau',
        'name': 'Hausa',
        'nativeName': 'Harshen Hausa',
        'countries': [
            'Nigeria',
            'Niger'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '乍得-萨拉语族'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 4,
            'pronunciation': 3,
            'vocabulary': 4
        },
        'family': 'Afro-Asiatic',
        'subfamily': 'Chadic',
        'writingSystem': 'Latin',
        'speakers': 70000000,
        'flagEmoji': '🇳🇬',
        'color': '#ffc107'
    },
    {
        'id': 'yo',
        'name': 'Yoruba',
        'nativeName': 'Èdè Yorùbá',
        'countries': [
            'Nigeria',
            'Benin'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '尼日尔-刚果语族'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 4,
            'pronunciation': 5,
            'vocabulary': 4
        },
        'family': 'Niger-Congo',
        'subfamily': 'Volta-Niger',
        'writingSystem': 'Latin',
        'speakers': 45000000,
        'flagEmoji': '🇳🇬',
        'color': '#ffc107'
    },
    {
        'id': 'zu',
        'name': 'Zulu',
        'nativeName': 'isiZulu',
        'countries': [
            'South Africa'
        ],
        'fsi': {
            'category': 2,
            'hours': 900,
            'description': '班图语族，咔嗒音语言'
        },
        'difficulty': {
            'overall': 4,
            'grammar': 5,
            'pronunciation': 6,
            'vocabulary': 4
        },
        'family': 'Niger-Congo',
        'subfamily': 'Bantu',
        'writingSystem': 'Latin',
        'speakers': 12000000,
        'flagEmoji': '🇿🇦',
        'color': '#ffc107'
    }
],
};

export default FSI_LANGUAGE_DATA;
