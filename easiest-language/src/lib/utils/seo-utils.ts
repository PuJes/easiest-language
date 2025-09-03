/**
 * SEO工具函数
 * 用于生成SEO友好的元数据和结构化数据
 */

import { ExtendedLanguageDetail } from '@/lib/data/data-adapters';

/**
 * 根据FSI类别获取难度描述
 */
export function getDifficultyDescription(category: number): string {
  const descriptions = {
    1: 'easiest',
    2: 'relatively easy', 
    3: 'moderately difficult',
    4: 'challenging',
    5: 'very challenging'
  };
  return descriptions[category as keyof typeof descriptions] || 'moderate';
}

/**
 * 生成语言页面的SEO标题
 */
export function generateLanguageTitle(language: ExtendedLanguageDetail): string {
  const difficulty = getDifficultyDescription(language.fsi.category);
  return `Learn ${language.name} - ${language.fsi.hours}h Study Time | FSI Category ${language.fsi.category}`;
}

/**
 * 生成语言页面的SEO描述
 */
export function generateLanguageDescription(language: ExtendedLanguageDetail): string {
  const difficulty = getDifficultyDescription(language.fsi.category);
  const primaryCountries = language.geography.primaryCountries.slice(0, 3).join(', ');
  
  return `${language.name} (${language.nativeName}) is ${difficulty} for English speakers. FSI Category ${language.fsi.category}, ${language.fsi.hours} hours study time. Spoken by ${language.speakers.total} people in ${primaryCountries}. Part of the ${language.family} family with ${language.writingSystem} writing system.`;
}

/**
 * 生成语言页面的关键词数组
 */
export function generateLanguageKeywords(language: ExtendedLanguageDetail): string[] {
  const baseKeywords = [
    `learn ${language.name.toLowerCase()}`,
    `${language.name.toLowerCase()} for English speakers`,
    `${language.name.toLowerCase()} difficulty`,
    `${language.name.toLowerCase()} learning time`,
    `FSI category ${language.fsi.category}`,
    `${language.family} languages`,
    `${language.writingSystem} writing system`,
    `${language.name.toLowerCase()} grammar`,
    `${language.name.toLowerCase()} pronunciation`,
    `how to learn ${language.name.toLowerCase()}`,
    `${language.name.toLowerCase()} vs English`,
    `${language.name.toLowerCase()} resources`
  ];

  // 添加特定语言的额外关键词
  const specificKeywords = getLanguageSpecificKeywords(language);
  
  return [...baseKeywords, ...specificKeywords];
}

/**
 * 获取特定语言的额外关键词
 */
function getLanguageSpecificKeywords(language: ExtendedLanguageDetail): string[] {
  const keywords: string[] = [];
  
  // 基于语言家族添加关键词
  if (language.family === 'Indo-European') {
    keywords.push('Indo-European languages', 'European languages');
  }
  
  if (language.family === 'Romance') {
    keywords.push('Romance languages', 'Latin languages');
  }
  
  if (language.family === 'Germanic') {
    keywords.push('Germanic languages');
  }
  
  // 基于使用人数添加关键词
  if (language.speakers.native.includes('M') && parseInt(language.speakers.native) > 100) {
    keywords.push('major world language', 'widely spoken language');
  }
  
  // 基于FSI类别添加关键词
  if (language.fsi.category === 1) {
    keywords.push('easiest languages', 'beginner friendly languages');
  }
  
  if (language.fsi.category >= 4) {
    keywords.push('challenging languages', 'difficult languages');
  }
  
  return keywords;
}

/**
 * 生成语言的结构化数据
 */
export function generateLanguageStructuredData(language: ExtendedLanguageDetail) {
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    "name": `Learn ${language.name}`,
    "description": `${language.name} language learning guide for English speakers`,
    "educationalLevel": `FSI Category ${language.fsi.category}`,
    "timeRequired": `PT${language.fsi.hours}H`,
    "competencyRequired": {
      "@type": "Competency",
      "name": "English Language Proficiency",
      "description": "Native or fluent English speaker"
    },
    "about": {
      "@type": "Language",
      "name": language.name,
      "alternateName": language.nativeName,
      "inLanguage": language.id,
      "speakingPopulation": language.speakers.total,
      "writingSystem": language.writingSystem,
      "languageFamily": language.family
    },
    "provider": {
      "@type": "Organization",
      "name": "Easiest Language to Learn",
      "url": "https://easiestlanguage.site"
    },
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": Math.max(1, 5 - language.fsi.category + 1),
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": Math.floor(parseInt(language.speakers.native.replace(/[^\d]/g, '')) / 1000000)
    }
  };
}

/**
 * 生成首页的结构化数据
 */
export function generateHomepageStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Easiest Language to Learn",
    "description": "Discover the easiest languages to learn based on official FSI standards for English speakers",
    "url": "https://easiestlanguage.site",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://easiestlanguage.site/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Easiest Language to Learn",
      "url": "https://easiestlanguage.site"
    },
    "mainEntity": {
      "@type": "ItemList",
      "name": "Easiest Languages to Learn",
      "description": "Languages ranked by difficulty for English speakers based on FSI standards",
      "numberOfItems": 50,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "item": {
            "@type": "Language",
            "name": "Spanish",
            "description": "FSI Category 1 - Easiest for English speakers"
          }
        },
        {
          "@type": "ListItem", 
          "position": 2,
          "item": {
            "@type": "Language",
            "name": "French",
            "description": "FSI Category 1 - Easiest for English speakers"
          }
        },
        {
          "@type": "ListItem",
          "position": 3,
          "item": {
            "@type": "Language", 
            "name": "German",
            "description": "FSI Category 2 - Relatively easy for English speakers"
          }
        }
      ]
    }
  };
}
