import type { LearningResource } from '../types';

/**
 * 按语言分类的学习资源数据
 * 为每种语言提供推荐的学习资源
 *
 * ⚠️ 此文件由数据管理系统自动生成，请勿手动编辑
 * 最后更新时间: 2025-09-02T09:11:36.892Z
 */
export const LEARNING_RESOURCES_BY_LANGUAGE: Record<string, LearningResource[]> = {
  ar: [
    {
      title: 'ArabicPod101',
      type: 'podcast',
      url: 'https://www.arabicpod101.com',
      description:
        'Comprehensive Arabic language podcast with multiple dialects and cultural insights',
      free: false,
    },
    {
      title: 'Madinah Arabic',
      type: 'book',
      url: 'https://www.lqtoronto.com/madinah-arabic/',
      description: 'Classical Arabic learning textbook with comprehensive grammar and vocabulary',
      free: true,
    },
  ],
  de: [
    {
      title: 'Deutsche Welle',
      type: 'course',
      url: 'https://learngerman.dw.com',
      description: 'Free comprehensive German course from Deutsche Welle with multimedia content',
      free: true,
    },
    {
      title: 'GermanPod101',
      type: 'podcast',
      url: 'https://www.germanpod101.com',
      description:
        'Systematic German audio program with structured lessons and native pronunciation',
      free: false,
    },
  ],
  el: [
    {
      title: 'GreekPod101',
      type: 'podcast',
      url: 'https://www.greekpod101.com',
      description: 'Systematic Greek language podcast with ancient and modern Greek lessons',
      free: false,
    },
  ],
  en: [
    {
      title: 'English Grammar in Use',
      type: 'book',
      url: 'https://www.cambridge.org/us/cambridgeenglish/catalog/grammar-vocabulary-and-pronunciation/english-grammar-use-fifth-edition',
      description:
        'Comprehensive grammar reference book with clear explanations and practical exercises',
      free: false,
    },
    {
      title: 'BBC Learning English',
      type: 'website',
      url: 'https://www.bbc.co.uk/learningenglish',
      description:
        'Free online English learning platform with news, grammar, and vocabulary lessons',
      free: true,
    },
  ],
  es: [
    {
      title: 'Duolingo Spanish1',
      type: 'app',
      description: 'Popular language learning app',
      url: 'https://www.duolingo.com',
      free: true,
    },
  ],
  fi: [
    {
      title: 'FinnishPod101',
      type: 'podcast',
      url: 'https://www.finnishpod101.com',
      description:
        'Comprehensive Finnish language podcast with grammar explanations and cultural insights',
      free: false,
    },
  ],
  fr: [
    {
      title: 'FrenchPod101',
      type: 'podcast',
      url: 'https://www.frenchpod101.com',
      description:
        'Authoritative French learning podcast with native speakers and structured lessons',
      free: false,
    },
    {
      title: 'Conjugue French Verbs',
      type: 'website',
      url: 'https://conjuguemos.com/list/verb/french',
      description: 'Interactive French verb conjugation practice with customizable exercises',
      free: true,
    },
  ],
  he: [
    {
      title: 'HebrewPod101',
      type: 'podcast',
      url: 'https://www.hebrewpod101.com',
      description: 'Comprehensive Hebrew language podcast with biblical and modern Hebrew content',
      free: false,
    },
  ],
  hi: [
    {
      title: 'HindiPod101',
      type: 'podcast',
      url: 'https://www.hindipod101.com',
      description: 'Structured Hindi language podcast with native speakers and cultural context',
      free: false,
    },
  ],
  id: [
    {
      title: 'IndonesianPod101',
      type: 'podcast',
      url: 'https://www.indonesianpod101.com',
      description: 'Structured Indonesian language podcast with native speakers and vocabulary',
      free: false,
    },
  ],
  it: [
    {
      title: 'ItalianPod101',
      type: 'podcast',
      url: 'https://www.italianpod101.com',
      description:
        'Comprehensive Italian audio program with cultural context and conversation skills',
      free: false,
    },
    {
      title: 'Lingodeer Italian',
      type: 'app',
      description: 'Interactive Italian learning app with grammar explanations for beginners',
      free: false,
    },
  ],
  ja: [
    {
      title: 'JapanesePod101',
      type: 'podcast',
      url: 'https://www.japanesepod101.com',
      description: 'Most comprehensive Japanese language podcast with multiple difficulty levels',
      free: false,
    },
    {
      title: 'Genki Textbook',
      type: 'book',
      description:
        'Standard university-level Japanese textbook with comprehensive grammar and kanji',
      free: false,
    },
    {
      title: 'Anki',
      type: 'app',
      url: 'https://apps.ankiweb.net',
      description: 'Spaced repetition flashcard app for Japanese kanji and vocabulary learning',
      free: true,
    },
  ],
  ko: [
    {
      title: 'KoreanPod101',
      type: 'podcast',
      url: 'https://www.koreanpod101.com',
      description:
        'Authoritative Korean language podcast with native speakers and structured lessons',
      free: false,
    },
    {
      title: 'TTMIK',
      type: 'website',
      url: 'https://talktomeinkorean.com',
      description: 'Popular Korean learning website with free lessons and cultural content',
      free: true,
    },
  ],
  nl: [
    {
      title: 'DutchPod101',
      type: 'podcast',
      url: 'https://www.dutchpod101.com',
      description:
        'Comprehensive Dutch language podcast with practical lessons and cultural context',
      free: false,
    },
  ],
  pl: [
    {
      title: 'PolishPod101',
      type: 'podcast',
      url: 'https://www.polishpod101.com',
      description:
        'Comprehensive Polish language podcast with grammar explanations and cultural context',
      free: false,
    },
  ],
  pt: [
    {
      title: 'Babbel Portuguese',
      type: 'app',
      url: 'https://www.babbel.com/learn-portuguese',
      description: 'Structured Portuguese learning app with conversation-focused lessons',
      free: false,
    },
    {
      title: 'PortuguesePod101',
      type: 'podcast',
      url: 'https://www.portuguesepod101.com',
      description: 'Systematic Portuguese audio lessons with native speakers and grammar',
      free: false,
    },
  ],
  ru: [
    {
      title: 'RussianPod101',
      type: 'podcast',
      url: 'https://www.russianpod101.com',
      description:
        'Comprehensive Russian audio program with native speakers and structured progression',
      free: false,
    },
    {
      title: 'Duolingo Russian',
      type: 'app',
      url: 'https://www.duolingo.com/course/ru/en',
      description: 'Gamified Russian learning app with bite-sized lessons and exercises',
      free: true,
    },
  ],
  th: [
    {
      title: 'ThaiPod101',
      type: 'podcast',
      url: 'https://www.thaipod101.com',
      description:
        'Comprehensive Thai language podcast with pronunciation guides and cultural insights',
      free: false,
    },
  ],
  tr: [
    {
      title: 'TurkishPod101',
      type: 'podcast',
      url: 'https://www.turkishpod101.com',
      description:
        'Structured Turkish language podcast with native speakers and conversation skills',
      free: false,
    },
  ],
  vi: [
    {
      title: 'VietnamesePod101',
      type: 'podcast',
      url: 'https://www.vietnamesepod101.com',
      description: 'Systematic Vietnamese language podcast with native speakers and vocabulary',
      free: false,
    },
  ],
  zh: [
    {
      title: 'ChinesePod101',
      type: 'podcast',
      url: 'https://www.chinesepod101.com',
      description:
        'Systematic Chinese language podcast with structured lessons and cultural context',
      free: false,
    },
    {
      title: 'HelloChinese',
      type: 'app',
      description:
        'Beginner-friendly Chinese learning app with simplified characters and pronunciation',
      free: true,
    },
    {
      title: 'Pleco Dictionary',
      type: 'app',
      description: 'Comprehensive Chinese dictionary app with handwriting recognition and examples',
      free: true,
    },
  ],
  yue: [
    {
      title: 'CantoneseClass101',
      type: 'podcast',
      url: 'https://www.cantoneseclass101.com',
      description:
        'Comprehensive Cantonese language podcast with pronunciation guides and cultural insights',
      free: false,
    },
    {
      title: 'Cantonese Learning App',
      type: 'app',
      description:
        'Beginner-friendly Cantonese learning app with traditional characters and tone practice',
      free: true,
    },
    {
      title: 'Cantonese Dictionary',
      type: 'app',
      description: 'Comprehensive Cantonese dictionary with pronunciation and example sentences',
      free: true,
    },
    {
      title: 'Learn Cantonese Online',
      type: 'website',
      url: 'https://www.cantonese.sheik.co.uk',
      description: 'Free Cantonese learning website with grammar lessons and vocabulary',
      free: true,
    },
  ],
};

export default LEARNING_RESOURCES_BY_LANGUAGE;
