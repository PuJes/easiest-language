import type { LanguageData } from '../types';

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
 * 最后更新时间: 2025-09-02T09:09:38.312Z
 */
export const FSI_LANGUAGE_DATA: LanguageData = {
  languages: [
    {
        'id': 'es',
        'name': 'Spanish',
        'nativeName': 'Español',
        'countries': [
            'Spain',
            'Mexico',
            'Argentina'
        ],
        'family': 'Indo-European',
        'subfamily': 'Romance',
        'writingSystem': 'Latin',
        'speakers': 548000000,
        'flagEmoji': '🇪🇸',
        'color': '#28a745',
        'fsi': {
            'category': 1,
            'hours': 650,
            'description': 'One of the easiest languages to learn',
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
        }
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
            'description': 'Similar to Spanish, relatively easy',
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
            'description': 'Relatively simple grammar, regular pronunciation',
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
            'description': 'Complex but regular grammar',
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
            'description': 'Retains many Latin features among Romance languages',
            'details': {
                'grammar': 2,
                'vocabulary': 3,
                'pronunciation': 2,
                'writing': 1,
                'cultural': 2
            }
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
            'description': 'Belongs to West Germanic family like English',
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
            'description': 'Relatively simple among Nordic languages',
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
            'description': 'Simple grammar, high similarity to English',
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
            'description': 'Complex grammar with many cases',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Relatively simple grammar, no tense changes',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Similar to Indonesian, simple grammar',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Bantu family, relatively regular grammar',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Sanskrit script system, complex grammar',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Six-case system, extremely complex grammar',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Tonal language, complex writing system',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Six-tone language, relatively simple grammar',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Semitic language, written right-to-left',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Seven-case system, complex phonetics',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Agglutinative language, vowel harmony',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Semitic language, extremely complex script and grammar',
            'details': {
                'grammar': 4,
                'vocabulary': 5,
                'pronunciation': 5,
                'writing': 4,
                'cultural': 4
            }
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
            'description': 'Complex honorific system, word order differs from English',
            'details': {
                'grammar': 4,
                'vocabulary': 5,
                'pronunciation': 5,
                'writing': 4,
                'cultural': 4
            }
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
            'description': 'Chinese character writing system, four-tone language',
            'details': {
                'grammar': 5,
                'vocabulary': 5,
                'pronunciation': 5,
                'writing': 5,
                'cultural': 5
            }
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
        'speakers': 1180000000,
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
            'description': 'Three writing systems, complex honorifics',
            'details': {
                'grammar': 5,
                'vocabulary': 5,
                'pronunciation': 5,
                'writing': 5,
                'cultural': 5
            }
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
            'description': 'Nine tones, significant difference between spoken and written',
            'details': {
                'grammar': 5,
                'vocabulary': 5,
                'pronunciation': 5,
                'writing': 5,
                'cultural': 5
            }
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
            'description': 'Reference language (English native speakers)',
            'details': {
                'grammar': 1,
                'vocabulary': 1,
                'pronunciation': 1,
                'writing': 1,
                'cultural': 1
            }
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
        'speakers': 1370000000,
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
            'description': 'Sanskrit alphabet system',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Similar to Hindi, uses Arabic script',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Indo-European family, relatively simple grammar',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Romance family, similar to Spanish',
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
            'description': 'North Germanic family, similar to Norwegian',
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
            'description': 'Derived from Dutch',
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
            'description': 'Finno-Ugric family, complex case system',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Uralic family, extremely complex grammar',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Finno-Ugric family',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Independent branch of Indo-European',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'West Slavic family, seven cases',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Similar to Czech',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'South Slavic family',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'South Slavic family, uses Cyrillic script',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Baltic family',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Baltic family, retains ancient Indo-European features',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'South Slavic family, retains dual number',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'East Slavic family, similar to Russian',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Semitic language, official language of Ethiopia',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Mongolic family',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Dravidian family, classical language',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Dravidian family',
            'details': {
                'grammar': 4,
                'vocabulary': 4,
                'pronunciation': 4,
                'writing': 3,
                'cultural': 4
            }
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
            'description': 'Chadic-Sahara family',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Niger-Congo family',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
            'description': 'Bantu family, click consonant language',
            'details': {
                'grammar': 3,
                'vocabulary': 3,
                'pronunciation': 3,
                'writing': 2,
                'cultural': 3
            }
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
