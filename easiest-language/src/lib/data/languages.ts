import type { LanguageData } from '../types'

/**
 * FSI 语言学习难度数据
 * 基于美国外国语学院官方分类和学习时长标准
 */
export const FSI_LANGUAGE_DATA: LanguageData = {
  languages: [
    // === FSI Category I: 600-750小时 (最容易) ===
    {
      id: "es",
      name: "Spanish",
      nativeName: "Español",
      countries: ["Spain", "Mexico", "Argentina", "Colombia", "Peru", "Venezuela", "Chile", "Ecuador", "Cuba", "Guatemala"],
      fsi: {
        category: 1,
        hours: 600,
        description: "最容易学习的语言之一"
      },
      difficulty: {
        overall: 3,
        grammar: 3,
        pronunciation: 2,
        vocabulary: 3
      },
      family: "Indo-European",
      subfamily: "Romance",
      writingSystem: "Latin",
      speakers: 500000000,
      flagEmoji: "🇪🇸",
      color: "#28a745"
    },
    
    {
      id: "pt",
      name: "Portuguese", 
      nativeName: "Português",
      countries: ["Brazil", "Portugal", "Angola", "Mozambique", "Cape Verde"],
      fsi: {
        category: 1,
        hours: 600,
        description: "与西班牙语相似，相对容易"
      },
      difficulty: {
        overall: 3,
        grammar: 3,
        pronunciation: 3,
        vocabulary: 3
      },
      family: "Indo-European",
      subfamily: "Romance", 
      writingSystem: "Latin",
      speakers: 260000000,
      flagEmoji: "🇵🇹",
      color: "#28a745"
    },

    {
      id: "it",
      name: "Italian",
      nativeName: "Italiano", 
      countries: ["Italy", "San Marino", "Vatican City", "Switzerland"],
      fsi: {
        category: 1,
        hours: 600,
        description: "语法相对简单，发音规则"
      },
      difficulty: {
        overall: 3,
        grammar: 3,
        pronunciation: 2,
        vocabulary: 3
      },
      family: "Indo-European",
      subfamily: "Romance",
      writingSystem: "Latin", 
      speakers: 65000000,
      flagEmoji: "🇮🇹",
      color: "#28a745"
    },

    {
      id: "fr",
      name: "French",
      nativeName: "Français",
      countries: ["France", "Canada", "Belgium", "Switzerland", "Senegal", "Ivory Coast", "Democratic Republic of the Congo"],
      fsi: {
        category: 1,
        hours: 600,
        description: "语法复杂但有规律"
      },
      difficulty: {
        overall: 4,
        grammar: 4,
        pronunciation: 4,
        vocabulary: 3
      },
      family: "Indo-European", 
      subfamily: "Romance",
      writingSystem: "Latin",
      speakers: 280000000,
      flagEmoji: "🇫🇷",
      color: "#28a745"
    },

    {
      id: "ro",
      name: "Romanian",
      nativeName: "Română",
      countries: ["Romania", "Moldova"],
      fsi: {
        category: 1,
        hours: 600,
        description: "罗曼语族中保留较多拉丁特征"
      },
      difficulty: {
        overall: 4,
        grammar: 4,
        pronunciation: 3,
        vocabulary: 4
      },
      family: "Indo-European",
      subfamily: "Romance",
      writingSystem: "Latin",
      speakers: 24000000,
      flagEmoji: "🇷🇴",
      color: "#28a745"
    },

    {
      id: "nl",
      name: "Dutch",
      nativeName: "Nederlands",
      countries: ["Netherlands", "Belgium", "Suriname"],
      fsi: {
        category: 1,
        hours: 600,
        description: "与英语同属西日耳曼语族"
      },
      difficulty: {
        overall: 3,
        grammar: 3,
        pronunciation: 3,
        vocabulary: 2
      },
      family: "Indo-European",
      subfamily: "Germanic",
      writingSystem: "Latin",
      speakers: 24000000,
      flagEmoji: "🇳🇱",
      color: "#28a745"
    },

    {
      id: "sv",
      name: "Swedish",
      nativeName: "Svenska", 
      countries: ["Sweden", "Finland"],
      fsi: {
        category: 1,
        hours: 600,
        description: "北欧语言中相对简单"
      },
      difficulty: {
        overall: 3,
        grammar: 3,
        pronunciation: 3,
        vocabulary: 2
      },
      family: "Indo-European",
      subfamily: "Germanic",
      writingSystem: "Latin",
      speakers: 10000000,
      flagEmoji: "🇸🇪",
      color: "#28a745"
    },

    {
      id: "no",
      name: "Norwegian", 
      nativeName: "Norsk",
      countries: ["Norway"],
      fsi: {
        category: 1,
        hours: 600,
        description: "语法简单，与英语相似度高"
      },
      difficulty: {
        overall: 3,
        grammar: 2,
        pronunciation: 3,
        vocabulary: 2
      },
      family: "Indo-European",
      subfamily: "Germanic", 
      writingSystem: "Latin",
      speakers: 5000000,
      flagEmoji: "🇳🇴",
      color: "#28a745"
    },

    // === FSI Category II: 900小时 (相对容易) ===
    
    {
      id: "de",
      name: "German",
      nativeName: "Deutsch",
      countries: ["Germany", "Austria", "Switzerland", "Liechtenstein", "Luxembourg"],
      fsi: {
        category: 2,
        hours: 900,
        description: "语法复杂，格变较多"
      },
      difficulty: {
        overall: 5,
        grammar: 6,
        pronunciation: 4,
        vocabulary: 3
      },
      family: "Indo-European",
      subfamily: "Germanic",
      writingSystem: "Latin",
      speakers: 100000000,
      flagEmoji: "🇩🇪",
      color: "#ffc107"
    },

    {
      id: "id",
      name: "Indonesian",
      nativeName: "Bahasa Indonesia",
      countries: ["Indonesia"],
      fsi: {
        category: 2,
        hours: 900,
        description: "语法相对简单，无时态变化"
      },
      difficulty: {
        overall: 3,
        grammar: 2,
        pronunciation: 3,
        vocabulary: 4
      },
      family: "Austronesian",
      subfamily: "Malayo-Polynesian",
      writingSystem: "Latin",
      speakers: 270000000,
      flagEmoji: "🇮🇩", 
      color: "#ffc107"
    },

    {
      id: "ms",
      name: "Malay",
      nativeName: "Bahasa Melayu",
      countries: ["Malaysia", "Brunei", "Singapore"],
      fsi: {
        category: 2,
        hours: 900,
        description: "与印尼语相似，语法简单"
      },
      difficulty: {
        overall: 3,
        grammar: 2,
        pronunciation: 3,
        vocabulary: 4
      },
      family: "Austronesian",
      subfamily: "Malayo-Polynesian",
      writingSystem: "Latin",
      speakers: 290000000,
      flagEmoji: "🇲🇾",
      color: "#ffc107"
    },

    {
      id: "sw", 
      name: "Swahili",
      nativeName: "Kiswahili",
      countries: ["Tanzania", "Kenya", "Uganda", "Democratic Republic of the Congo"],
      fsi: {
        category: 2,
        hours: 900,
        description: "班图语族，语法相对规律"
      },
      difficulty: {
        overall: 4,
        grammar: 4,
        pronunciation: 3,
        vocabulary: 4
      },
      family: "Niger-Congo",
      subfamily: "Bantu",
      writingSystem: "Latin",
      speakers: 200000000,
      flagEmoji: "🇹🇿",
      color: "#ffc107"
    },

    // === FSI Category III: 1100小时 (中等难度) ===

    {
      id: "hi",
      name: "Hindi",
      nativeName: "हिन्दी",
      countries: ["India"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "梵文文字系统，语法复杂"
      },
      difficulty: {
        overall: 5,
        grammar: 5,
        pronunciation: 4,
        vocabulary: 5
      },
      family: "Indo-European",
      subfamily: "Indo-Aryan",
      writingSystem: "Devanagari",
      speakers: 600000000,
      flagEmoji: "🇮🇳",
      color: "#fd7e14"
    },

    {
      id: "ru",
      name: "Russian", 
      nativeName: "Русский",
      countries: ["Russian Federation", "Kazakhstan", "Belarus", "Kyrgyzstan"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "六格变体系，语法极其复杂"
      },
      difficulty: {
        overall: 6,
        grammar: 7,
        pronunciation: 5,
        vocabulary: 5
      },
      family: "Indo-European",
      subfamily: "Slavic",
      writingSystem: "Cyrillic",
      speakers: 260000000,
      flagEmoji: "🇷🇺",
      color: "#fd7e14"
    },

    {
      id: "th",
      name: "Thai",
      nativeName: "ภาษาไทย", 
      countries: ["Thailand"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "声调语言，文字复杂"
      },
      difficulty: {
        overall: 6,
        grammar: 4,
        pronunciation: 7,
        vocabulary: 6
      },
      family: "Kra-Dai",
      subfamily: "Tai", 
      writingSystem: "Thai",
      speakers: 69000000,
      flagEmoji: "🇹🇭",
      color: "#fd7e14"
    },

    {
      id: "vi",
      name: "Vietnamese",
      nativeName: "Tiếng Việt",
      countries: ["Vietnam"],
      fsi: {
        category: 3, 
        hours: 1100,
        description: "六声调语言，语法相对简单"
      },
      difficulty: {
        overall: 6,
        grammar: 3,
        pronunciation: 8,
        vocabulary: 6
      },
      family: "Austroasiatic",
      subfamily: "Vietic",
      writingSystem: "Latin (Vietnamese)",
      speakers: 95000000,
      flagEmoji: "🇻🇳",
      color: "#fd7e14"
    },

    {
      id: "he",
      name: "Hebrew",
      nativeName: "עברית",
      countries: ["Israel"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "闪族语言，从右到左书写"
      },
      difficulty: {
        overall: 6,
        grammar: 6,
        pronunciation: 5,
        vocabulary: 6
      },
      family: "Afro-Asiatic",
      subfamily: "Semitic",
      writingSystem: "Hebrew",
      speakers: 9000000,
      flagEmoji: "🇮🇱",
      color: "#fd7e14"
    },

    {
      id: "pl",
      name: "Polish",
      nativeName: "Polski", 
      countries: ["Poland"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "七格变体系，语音复杂"
      },
      difficulty: {
        overall: 6,
        grammar: 7,
        pronunciation: 6,
        vocabulary: 5
      },
      family: "Indo-European",
      subfamily: "Slavic",
      writingSystem: "Latin",
      speakers: 45000000,
      flagEmoji: "🇵🇱",
      color: "#fd7e14"
    },

    {
      id: "tr",
      name: "Turkish",
      nativeName: "Türkçe",
      countries: ["Turkey", "Cyprus"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "黏着语，语音和谐规律"
      },
      difficulty: {
        overall: 5,
        grammar: 6,
        pronunciation: 4,
        vocabulary: 5
      },
      family: "Turkic",
      subfamily: "Southwestern",
      writingSystem: "Latin",
      speakers: 80000000,
      flagEmoji: "🇹🇷",
      color: "#fd7e14"
    },

    // === FSI Category IV: 1800小时 (困难) ===

    {
      id: "ar",
      name: "Arabic",
      nativeName: "العربية",
      countries: ["Saudi Arabia", "Egypt", "Iraq", "Jordan", "Lebanon", "Syria", "Algeria", "Morocco", "Tunisia", "United Arab Emirates"],
      fsi: {
        category: 4,
        hours: 1800,
        description: "闪族语言，文字和语法极其复杂"
      },
      difficulty: {
        overall: 8,
        grammar: 8,
        pronunciation: 7,
        vocabulary: 7
      },
      family: "Afro-Asiatic",
      subfamily: "Semitic",
      writingSystem: "Arabic",
      speakers: 422000000,
      flagEmoji: "🇸🇦",
      color: "#dc3545"
    },

    {
      id: "ko",
      name: "Korean",
      nativeName: "한국어",
      countries: ["South Korea", "North Korea"],
      fsi: {
        category: 4,
        hours: 1800,
        description: "敬语体系复杂，语序与英语差异大"
      },
      difficulty: {
        overall: 7,
        grammar: 8,
        pronunciation: 6,
        vocabulary: 7
      },
      family: "Koreanic",
      subfamily: "Korean",
      writingSystem: "Hangul",
      speakers: 77000000,
      flagEmoji: "🇰🇷",
      color: "#dc3545"
    },

    // === FSI Category V: 2200小时 (最困难) ===

    {
      id: "zh",
      name: "Mandarin Chinese",
      nativeName: "中文",
      countries: ["China", "Taiwan", "Singapore"],
      fsi: {
        category: 5,
        hours: 2200,
        description: "汉字文字系统，四声调语言"
      },
      difficulty: {
        overall: 9,
        grammar: 6,
        pronunciation: 8,
        vocabulary: 10
      },
      family: "Sino-Tibetan",
      subfamily: "Sinitic", 
      writingSystem: "Chinese Characters",
      speakers: 918000000,
      flagEmoji: "🇨🇳",
      color: "#6f42c1"
    },

    {
      id: "ja",
      name: "Japanese",
      nativeName: "日本語",
      countries: ["Japan"],
      fsi: {
        category: 5,
        hours: 2200,
        description: "三套文字系统，敬语复杂"
      },
      difficulty: {
        overall: 9,
        grammar: 8,
        pronunciation: 7,
        vocabulary: 10
      },
      family: "Japonic",
      subfamily: "Japanese",
      writingSystem: "Hiragana, Katakana, Kanji",
      speakers: 125000000,
      flagEmoji: "🇯🇵",
      color: "#6f42c1"
    },

    {
      id: "yue",
      name: "Cantonese",
      nativeName: "粵語",
      countries: ["China", "Hong Kong", "Macau"],
      fsi: {
        category: 5,
        hours: 2200,
        description: "九声调，口语与书面语差异大"
      },
      difficulty: {
        overall: 9,
        grammar: 6,
        pronunciation: 9,
        vocabulary: 10
      },
      family: "Sino-Tibetan",
      subfamily: "Sinitic",
      writingSystem: "Chinese Characters",
      speakers: 85000000,
      flagEmoji: "🇭🇰",
      color: "#6f42c1"
    },

    // === 其他重要语言 ===

    {
      id: "en",
      name: "English", 
      nativeName: "English",
      countries: ["United States of America", "United Kingdom", "Canada", "Australia", "New Zealand", "Ireland", "South Africa", "Nigeria"],
      fsi: {
        category: 0, // 母语
        hours: 0,
        description: "参考语言(英语母语者)"
      },
      difficulty: {
        overall: 0,
        grammar: 0,
        pronunciation: 0,
        vocabulary: 0
      },
      family: "Indo-European",
      subfamily: "Germanic",
      writingSystem: "Latin",
      speakers: 1500000000,
      flagEmoji: "🇺🇸",
      color: "#6c757d"
    },

    {
      id: "bn",
      name: "Bengali",
      nativeName: "বাংলা",
      countries: ["Bangladesh", "India"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "梵文字母系统"
      },
      difficulty: {
        overall: 5,
        grammar: 5,
        pronunciation: 4,
        vocabulary: 6
      },
      family: "Indo-European",
      subfamily: "Indo-Aryan",
      writingSystem: "Bengali",
      speakers: 300000000,
      flagEmoji: "🇧🇩",
      color: "#fd7e14"
    },

    {
      id: "ur",
      name: "Urdu", 
      nativeName: "اردو",
      countries: ["Pakistan", "India"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "与印地语相似，使用阿拉伯文字"
      },
      difficulty: {
        overall: 6,
        grammar: 5,
        pronunciation: 4,
        vocabulary: 7
      },
      family: "Indo-European",
      subfamily: "Indo-Aryan", 
      writingSystem: "Arabic (Urdu)",
      speakers: 230000000,
      flagEmoji: "🇵🇰",
      color: "#fd7e14"
    },

    {
      id: "fa",
      name: "Persian",
      nativeName: "فارسی",
      countries: ["Iran", "Afghanistan", "Tajikistan"],
      fsi: {
        category: 3,
        hours: 1100,
        description: "印欧语系，语法相对简单"
      },
      difficulty: {
        overall: 5,
        grammar: 4,
        pronunciation: 5,
        vocabulary: 6
      },
      family: "Indo-European",
      subfamily: "Iranian",
      writingSystem: "Arabic (Persian)",
      speakers: 110000000,
      flagEmoji: "🇮🇷",
      color: "#fd7e14"
    }
  ]
}

export default FSI_LANGUAGE_DATA