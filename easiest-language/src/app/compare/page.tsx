import { Suspense } from 'react';
import LanguageComparison from '@/components/LanguageComparison';

export default function ComparePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LanguageComparison />
    </Suspense>
  );
}
