import LanguageDetail from '@/components/LanguageDetail';
import { getLanguageDetailData } from '@/lib/data/data-adapters';

interface PageProps {
  params: Promise<{
    id: string;
  }>;
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

  return <LanguageDetail language={language} />;
}
