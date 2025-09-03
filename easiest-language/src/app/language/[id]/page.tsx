import LanguageDetail from '@/components/LanguageDetail';
import { getLanguageDetailData } from '@/lib/data/data-adapters';
import type { Metadata } from 'next';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * 生成语言详情页的动态元数据
 * 为每种语言创建SEO优化的标题、描述和关键词
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const language = getLanguageDetailData(id);
  
  if (!language) {
    return {
      title: 'Language Not Found',
      description: 'The requested language could not be found.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const fsiCategory = language.fsi.category;
  const difficultyText = fsiCategory === 1 ? 'easiest' : 
                        fsiCategory === 2 ? 'relatively easy' :
                        fsiCategory === 3 ? 'moderately difficult' :
                        fsiCategory === 4 ? 'challenging' : 'very challenging';

  const primaryCountries = language.geography.primaryCountries.slice(0, 3).join(', ');
  const languageFamily = language.family;
  const writingSystem = language.writingSystem;

  return {
    title: `Learn ${language.name} - ${language.fsi.hours}h Study Time | FSI Category ${fsiCategory}`,
    description: `${language.name} (${language.nativeName}) is ${difficultyText} for English speakers. FSI Category ${fsiCategory}, ${language.fsi.hours} hours study time. Spoken by ${language.speakers.total} people in ${primaryCountries}. Part of the ${languageFamily} family with ${writingSystem} writing system.`,
    keywords: [
      `learn ${language.name.toLowerCase()}`,
      `${language.name.toLowerCase()} for English speakers`,
      `${language.name.toLowerCase()} difficulty`,
      `${language.name.toLowerCase()} learning time`,
      `FSI category ${fsiCategory}`,
      `${languageFamily} languages`,
      `${writingSystem} writing system`,
      `${language.name.toLowerCase()} grammar`,
      `${language.name.toLowerCase()} pronunciation`,
      `how to learn ${language.name.toLowerCase()}`,
      `${language.name.toLowerCase()} vs English`,
      `${language.name.toLowerCase()} resources`
    ],
    authors: [{ name: 'Easiest Language Team' }],
    alternates: {
      canonical: `/language/${id}`,
    },
    openGraph: {
      title: `Learn ${language.name} - ${language.fsi.hours}h Study Time`,
      description: `${language.name} is ${difficultyText} for English speakers. FSI Category ${fsiCategory}. Spoken by ${language.speakers.total} people worldwide.`,
      url: `https://easiestlanguage.site/language/${id}`,
      siteName: 'Easiest Language to Learn',
      images: [
        {
          url: `/og/${id}`, // 动态生成语言特定的OG图片
          width: 1200,
          height: 630,
          alt: `Learn ${language.name} - FSI Category ${fsiCategory}`,
        },
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: 'Language Learning',
      tags: [language.name, languageFamily, `FSI Category ${fsiCategory}`],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Learn ${language.name} - ${language.fsi.hours}h Study Time`,
      description: `${language.name} is ${difficultyText} for English speakers. FSI Category ${fsiCategory}.`,
      images: [`/og/${id}`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    category: 'education',
  };
}

export default async function LanguageDetailPage({ params }: PageProps) {
  const { id } = await params;
  const language = getLanguageDetailData(id);

  if (!language) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Language Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested language could not be found.
          </p>
        </div>
      </div>
    );
  }

  // 生成结构化数据
  const structuredData = {
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
      "ratingValue": Math.max(1, 5 - language.fsi.category + 1), // 基于FSI类别计算评分
      "bestRating": 5,
      "worstRating": 1,
      "ratingCount": Math.floor(language.speakers.native / 1000000) // 基于使用人数估算评分数量
    }
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LanguageDetail language={language} />
    </>
  );
}
