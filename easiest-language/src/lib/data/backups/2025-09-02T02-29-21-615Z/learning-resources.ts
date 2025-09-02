import type { LearningResource } from '../types';

/**
 * 按语言分类的学习资源数据
 * 为每种语言提供推荐的学习资源
 * 
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: 2025-09-02T02:28:58.947Z
 */
export const LEARNING_RESOURCES_BY_LANGUAGE: Record<string, LearningResource[]> = {
  'en': [
    {
      'title': 'English Grammar in Use',
      'type': 'book',
      'url': 'https://www.cambridge.org/us/cambridgeenglish/catalog/grammar-vocabulary-and-pronunciation/english-grammar-use-fifth-edition',
      'description': 'Cambridge出版的经典英语语法教材',
      'free': false,
      'rating': 5
    },
    {
      'title': 'BBC Learning English',
      'type': 'website',
      'url': 'https://www.bbc.co.uk/learningenglish',
      'description': 'BBC官方英语学习网站，免费资源丰富',
      'free': true,
      'rating': 5
    }
  ],
  'es': [
    {
      'title': 'Duolingo Spanish',
      'type': 'app',
      'url': 'https://www.duolingo.com/course/es/en',
      'description': '最受欢迎的免费西班牙语学习应用',
      'free': true,
      'rating': 4
    },
    {
      'title': 'SpanishPod101',
      'type': 'podcast',
      'url': 'https://www.spanishpod101.com',
      'description': '高质量的西班牙语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Conjuguemos',
      'type': 'website',
      'url': 'https://conjuguemos.com',
      'description': '西班牙语动词变位练习网站',
      'free': true,
      'rating': 4
    }
  ],
  'pt': [
    {
      'title': 'Babbel Portuguese',
      'type': 'app',
      'url': 'https://www.babbel.com/learn-portuguese',
      'description': 'Babbel葡萄牙语课程',
      'free': false,
      'rating': 4
    },
    {
      'title': 'PortuguesePod101',
      'type': 'podcast',
      'url': 'https://www.portuguesepod101.com',
      'description': '系统的葡萄牙语播客课程',
      'free': false,
      'rating': 4
    }
  ],
  'it': [
    {
      'title': 'ItalianPod101',
      'type': 'podcast',
      'url': 'https://www.italianpod101.com',
      'description': '全面的意大利语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Lingodeer Italian',
      'type': 'app',
      'description': 'Lingodeer意大利语课程',
      'free': false,
      'rating': 4
    }
  ],
  'fr': [
    {
      'title': 'FrenchPod101',
      'type': 'podcast',
      'url': 'https://www.frenchpod101.com',
      'description': '权威的法语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Conjugue French Verbs',
      'type': 'website',
      'url': 'https://conjuguemos.com/list/verb/french',
      'description': '法语动词变位练习',
      'free': true,
      'rating': 4
    }
  ],
  'de': [
    {
      'title': 'Deutsche Welle',
      'type': 'course',
      'url': 'https://learngerman.dw.com',
      'description': '德国之声免费德语课程',
      'free': true,
      'rating': 5
    },
    {
      'title': 'GermanPod101',
      'type': 'podcast',
      'url': 'https://www.germanpod101.com',
      'description': '系统的德语播客学习',
      'free': false,
      'rating': 5
    }
  ],
  'nl': [
    {
      'title': 'DutchPod101',
      'type': 'podcast',
      'url': 'https://www.dutchpod101.com',
      'description': '荷兰语播客课程',
      'free': false,
      'rating': 4
    }
  ],
  'id': [
    {
      'title': 'IndonesianPod101',
      'type': 'podcast',
      'url': 'https://www.indonesianpod101.com',
      'description': '印尼语播客学习资源',
      'free': false,
      'rating': 4
    }
  ],
  'fi': [
    {
      'title': 'FinnishPod101',
      'type': 'podcast',
      'url': 'https://www.finnishpod101.com',
      'description': '芬兰语播客课程',
      'free': false,
      'rating': 4
    }
  ],
  'ru': [
    {
      'title': 'RussianPod101',
      'type': 'podcast',
      'url': 'https://www.russianpod101.com',
      'description': '全面的俄语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Duolingo Russian',
      'type': 'app',
      'url': 'https://www.duolingo.com/course/ru/en',
      'description': 'Duolingo俄语课程',
      'free': true,
      'rating': 4
    }
  ],
  'hi': [
    {
      'title': 'HindiPod101',
      'type': 'podcast',
      'url': 'https://www.hindipod101.com',
      'description': '印地语播客学习',
      'free': false,
      'rating': 4
    }
  ],
  'th': [
    {
      'title': 'ThaiPod101',
      'type': 'podcast',
      'url': 'https://www.thaipod101.com',
      'description': '泰语播客课程',
      'free': false,
      'rating': 4
    }
  ],
  'vi': [
    {
      'title': 'VietnamesePod101',
      'type': 'podcast',
      'url': 'https://www.vietnamesepod101.com',
      'description': '越南语播客学习',
      'free': false,
      'rating': 4
    }
  ],
  'pl': [
    {
      'title': 'PolishPod101',
      'type': 'podcast',
      'url': 'https://www.polishpod101.com',
      'description': '波兰语播客课程',
      'free': false,
      'rating': 4
    }
  ],
  'tr': [
    {
      'title': 'TurkishPod101',
      'type': 'podcast',
      'url': 'https://www.turkishpod101.com',
      'description': '土耳其语播客学习',
      'free': false,
      'rating': 4
    }
  ],
  'he': [
    {
      'title': 'HebrewPod101',
      'type': 'podcast',
      'url': 'https://www.hebrewpod101.com',
      'description': '希伯来语播客课程',
      'free': false,
      'rating': 4
    }
  ],
  'el': [
    {
      'title': 'GreekPod101',
      'type': 'podcast',
      'url': 'https://www.greekpod101.com',
      'description': '希腊语播客学习',
      'free': false,
      'rating': 4
    }
  ],
  'ar': [
    {
      'title': 'ArabicPod101',
      'type': 'podcast',
      'url': 'https://www.arabicpod101.com',
      'description': '阿拉伯语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Madinah Arabic',
      'type': 'book',
      'url': 'https://www.lqtoronto.com/madinah-arabic/',
      'description': '经典阿拉伯语教材',
      'free': true,
      'rating': 5
    }
  ],
  'ko': [
    {
      'title': 'KoreanPod101',
      'type': 'podcast',
      'url': 'https://www.koreanpod101.com',
      'description': '权威韩语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'TTMIK',
      'type': 'website',
      'url': 'https://talktomeinkorean.com',
      'description': '非常受欢迎的韩语学习网站',
      'free': true,
      'rating': 5
    }
  ],
  'zh': [
    {
      'title': 'ChinesePod101',
      'type': 'podcast',
      'url': 'https://www.chinesepod101.com',
      'description': '系统的中文播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'HelloChinese',
      'type': 'app',
      'description': '专为中文初学者设计的应用',
      'free': true,
      'rating': 4
    },
    {
      'title': 'Pleco Dictionary',
      'type': 'app',
      'description': '最佳中文字典应用',
      'free': true,
      'rating': 5
    }
  ],
  'ja': [
    {
      'title': 'JapanesePod101',
      'type': 'podcast',
      'url': 'https://www.japanesepod101.com',
      'description': '最全面的日语播客课程',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Genki Textbook',
      'type': 'book',
      'description': '大学日语教材标准',
      'free': false,
      'rating': 5
    },
    {
      'title': 'Anki',
      'type': 'app',
      'url': 'https://apps.ankiweb.net',
      'description': '间隔重复记忆应用，适合日语汉字',
      'free': true,
      'rating': 5
    }
  ]
};

export default LEARNING_RESOURCES_BY_LANGUAGE;
