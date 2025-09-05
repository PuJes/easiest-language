import HomePage from '@/components/HomePage';

export const metadata = {
  title: 'Find Your Perfect Language - Interactive Quiz & FSI Data | Easiest Language',
  description: 'Take our 1-minute quiz to discover the perfect language for you! Based on official FSI standards, get personalized language recommendations for English speakers.',
  keywords: 'language quiz,find perfect language,FSI language difficulty,English speakers,language recommendations,interactive quiz,language learning',
  openGraph: {
    title: 'Find Your Perfect Language - Interactive Quiz & FSI Data',
    description: 'Take our 1-minute quiz to discover the perfect language for you! Based on official FSI standards.',
    url: 'https://easiestlanguage.site',
    siteName: 'Easiest Language to Learn',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Find Your Perfect Language - Interactive Quiz & FSI Data',
    description: 'Take our 1-minute quiz to discover the perfect language for you! Based on official FSI standards.',
  },
};

export default function Home() {
  return <HomePage />;
}
