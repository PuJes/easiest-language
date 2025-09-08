# Usage Examples

This document provides practical examples of how to use the Easiest Language application's APIs, components, and utilities.

## Table of Contents

- [Getting Started](#getting-started)
- [Component Usage](#component-usage)
- [Data Management](#data-management)
- [Advanced Features](#advanced-features)
- [Integration Examples](#integration-examples)
- [Best Practices](#best-practices)

## Getting Started

### Basic Setup

```tsx
// pages/index.tsx
import { getAllLanguages, getFeaturedLanguages } from '@/lib/data/data-adapters';
import LanguageCard from '@/components/LanguageCard';
import LanguageList from '@/components/LanguageList';

export default function HomePage() {
  const featuredLanguages = getFeaturedLanguages();
  const allLanguages = getAllLanguages();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Easiest Languages to Learn</h1>
      
      {/* Featured Languages Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6">Featured Languages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredLanguages.map(language => (
            <LanguageCard
              key={language.id}
              language={language}
              onViewDetails={(lang) => router.push(`/language/${lang.id}`)}
            />
          ))}
        </div>
      </section>

      {/* All Languages Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">All Languages</h2>
        <LanguageList availableLanguages={allLanguages} />
      </section>
    </div>
  );
}
```

### Language Detail Page

```tsx
// pages/language/[id].tsx
import { getLanguageDetailData } from '@/lib/data/data-adapters';
import LanguageDetail from '@/components/LanguageDetail';
import { notFound } from 'next/navigation';

interface LanguagePageProps {
  params: {
    id: string;
  };
}

export default function LanguagePage({ params }: LanguagePageProps) {
  const language = getLanguageDetailData(params.id);

  if (!language) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <LanguageDetail language={language} />
    </div>
  );
}

export async function generateStaticParams() {
  const languages = getAllLanguages();
  return languages.map(language => ({
    id: language.id,
  }));
}
```

## Component Usage

### LanguageCard with Custom Handlers

```tsx
import { useState } from 'react';
import LanguageCard from '@/components/LanguageCard';
import { Language } from '@/lib/types/language';

function LanguageGrid() {
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);

  const handleCompare = (language: Language) => {
    if (selectedLanguages.length < 3) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleViewDetails = (language: Language) => {
    router.push(`/language/${language.id}`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {languages.map(language => (
        <LanguageCard
          key={language.id}
          language={language}
          showCompareButton={selectedLanguages.length < 3}
          onCompare={handleCompare}
          onViewDetails={handleViewDetails}
          className="hover:shadow-xl transition-shadow"
        />
      ))}
    </div>
  );
}
```

### LanguageList with Custom Filtering

```tsx
import { useState, useMemo } from 'react';
import LanguageList from '@/components/LanguageList';
import { getAllLanguages } from '@/lib/data/data-adapters';
import { Language } from '@/lib/types/language';

function FilteredLanguagePage() {
  const allLanguages = getAllLanguages();
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all');

  const filteredLanguages = useMemo(() => {
    if (difficultyFilter === 'all') return allLanguages;
    return allLanguages.filter(lang => 
      lang.fsi.category.toString() === difficultyFilter
    );
  }, [allLanguages, difficultyFilter]);

  return (
    <div>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">
          Filter by Difficulty:
        </label>
        <select
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="all">All Difficulties</option>
          <option value="1">Easy (Category I)</option>
          <option value="2">Moderate (Category II)</option>
          <option value="3">Hard (Category III)</option>
          <option value="4">Very Hard (Category IV)</option>
          <option value="5">Extreme (Category V)</option>
        </select>
      </div>

      <LanguageList 
        availableLanguages={filteredLanguages}
        initialCategory={difficultyFilter === 'all' ? null : difficultyFilter}
      />
    </div>
  );
}
```

### LanguageComparison with URL Parameters

```tsx
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import LanguageComparison from '@/components/LanguageComparison';
import { getAllLanguages, getLanguageById } from '@/lib/data/data-adapters';

function ComparePage() {
  const searchParams = useSearchParams();
  const allLanguages = getAllLanguages();
  const [initialLanguages, setInitialLanguages] = useState<Language[]>([]);

  useEffect(() => {
    const languageIds = searchParams.get('languages')?.split(',') || [];
    const languages = languageIds
      .map(id => getLanguageById(id))
      .filter((lang): lang is Language => lang !== null);
    
    setInitialLanguages(languages);
  }, [searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Compare Languages</h1>
      <LanguageComparison
        availableLanguages={allLanguages}
        initialLanguages={initialLanguages}
      />
    </div>
  );
}
```

### FSIBadge Usage Examples

```tsx
import FSIBadge from '@/components/FSIBadge';

function BadgeExamples() {
  return (
    <div className="space-y-4">
      {/* Basic usage */}
      <FSIBadge category={1} />
      
      {/* Large badge with label */}
      <FSIBadge category={2} size="lg" showLabel />
      
      {/* Small badge without label */}
      <FSIBadge category={4} size="sm" showLabel={false} />
      
      {/* Custom styling */}
      <FSIBadge 
        category={3} 
        className="border-2 border-blue-500" 
      />
    </div>
  );
}
```

### LanguageSelector Integration

```tsx
import { useState } from 'react';
import LanguageSelector from '@/components/LanguageSelector';
import { getAllLanguages } from '@/lib/data/data-adapters';
import { Language } from '@/lib/types/language';

function ComparisonTool() {
  const [showSelector, setShowSelector] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<Language[]>([]);
  const allLanguages = getAllLanguages();

  const handleLanguageSelect = (language: Language) => {
    if (selectedLanguages.length < 3) {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };

  const handleRemoveLanguage = (languageId: string) => {
    setSelectedLanguages(selectedLanguages.filter(lang => lang.id !== languageId));
  };

  return (
    <div>
      <button
        onClick={() => setShowSelector(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Add Language to Compare
      </button>

      <div className="mt-4">
        {selectedLanguages.map(language => (
          <div key={language.id} className="flex items-center justify-between p-2 border rounded">
            <span>{language.name}</span>
            <button
              onClick={() => handleRemoveLanguage(language.id)}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <LanguageSelector
        isOpen={showSelector}
        onClose={() => setShowSelector(false)}
        onSelect={handleLanguageSelect}
        availableLanguages={allLanguages}
        selectedLanguages={selectedLanguages}
        maxSelections={3}
      />
    </div>
  );
}
```

## Data Management

### Working with Language Data

```tsx
import { 
  getAllLanguages, 
  getLanguageById, 
  getLanguageDetailData,
  getFeaturedLanguages 
} from '@/lib/data/data-adapters';

function DataExamples() {
  // Get all languages
  const allLanguages = getAllLanguages();
  console.log(`Total languages: ${allLanguages.length}`);

  // Get specific language
  const spanish = getLanguageById('spanish');
  if (spanish) {
    console.log(`Spanish FSI category: ${spanish.fsi.category}`);
    console.log(`Study hours: ${spanish.fsi.hours}`);
  }

  // Get detailed language information
  const spanishDetail = getLanguageDetailData('spanish');
  if (spanishDetail) {
    console.log(`Native speakers: ${spanishDetail.speakers.native}`);
    console.log(`Continents: ${spanishDetail.geography.continents.join(', ')}`);
  }

  // Get featured languages
  const featured = getFeaturedLanguages();
  console.log('Featured languages:', featured.map(lang => lang.name));

  return null; // This is just for demonstration
}
```

### Filtering and Searching

```tsx
import { useState, useMemo } from 'react';
import { getAllLanguages } from '@/lib/data/data-adapters';
import { Language, FSICategory } from '@/lib/types/language';

function AdvancedSearch() {
  const allLanguages = getAllLanguages();
  const [searchTerm, setSearchTerm] = useState('');
  const [fsiCategory, setFsiCategory] = useState<FSICategory | null>(null);
  const [family, setFamily] = useState<string>('');

  const filteredLanguages = useMemo(() => {
    return allLanguages.filter(language => {
      const matchesSearch = searchTerm === '' || 
        language.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        language.nativeName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFsi = fsiCategory === null || language.fsi.category === fsiCategory;
      
      const matchesFamily = family === '' || language.family === family;

      return matchesSearch && matchesFsi && matchesFamily;
    });
  }, [allLanguages, searchTerm, fsiCategory, family]);

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Search languages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="flex gap-4">
        <select
          value={fsiCategory || ''}
          onChange={(e) => setFsiCategory(e.target.value ? Number(e.target.value) as FSICategory : null)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Difficulties</option>
          <option value="1">Easy</option>
          <option value="2">Moderate</option>
          <option value="3">Hard</option>
          <option value="4">Very Hard</option>
          <option value="5">Extreme</option>
        </select>

        <select
          value={family}
          onChange={(e) => setFamily(e.target.value)}
          className="px-3 py-2 border rounded-lg"
        >
          <option value="">All Families</option>
          <option value="Indo-European">Indo-European</option>
          <option value="Sino-Tibetan">Sino-Tibetan</option>
          <option value="Afro-Asiatic">Afro-Asiatic</option>
        </select>
      </div>

      <div className="text-sm text-gray-600">
        Found {filteredLanguages.length} languages
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredLanguages.map(language => (
          <div key={language.id} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{language.name}</h3>
            <p className="text-sm text-gray-600">{language.nativeName}</p>
            <p className="text-sm">FSI Category: {language.fsi.category}</p>
            <p className="text-sm">Study Hours: {language.fsi.hours}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Learning Resources

```tsx
import { getLearningResourcesForLanguage } from '@/lib/data/data-adapters';

function LearningResources({ languageId }: { languageId: string }) {
  const resources = getLearningResourcesForLanguage(languageId);

  return (
    <div className="space-y-6">
      {Object.entries(resources).map(([type, resourceList]) => {
        if (resourceList.length === 0) return null;

        return (
          <div key={type} className="border rounded-lg p-4">
            <h3 className="text-lg font-semibold capitalize mb-4">
              {type} ({resourceList.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resourceList.map((resource, index) => (
                <div key={index} className="border rounded p-3">
                  <h4 className="font-medium">{resource.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                  <div className="flex items-center justify-between">
                    <span className={`text-xs px-2 py-1 rounded ${
                      resource.free ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {resource.free ? 'Free' : 'Paid'}
                    </span>
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Visit Resource
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

## Advanced Features

### Custom Hooks Usage

```tsx
import { useAdvancedFilter } from '@/lib/hooks/useAdvancedFilter';
import { useLanguageEditor } from '@/lib/hooks/useLanguageEditor';

function AdvancedFilterExample() {
  const { filters, setFilters, clearFilters, applyFilters } = useAdvancedFilter({
    searchTerm: '',
    fsiCategory: null,
    family: null,
    region: null,
    minSpeakers: null,
    maxHours: null,
  });

  const allLanguages = getAllLanguages();
  const filteredLanguages = applyFilters(allLanguages);

  return (
    <div>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={filters.searchTerm}
          onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div className="mb-4">
        <button
          onClick={clearFilters}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg"
        >
          Clear Filters
        </button>
      </div>

      <div className="text-sm text-gray-600 mb-4">
        Showing {filteredLanguages.length} of {allLanguages.length} languages
      </div>

      {/* Render filtered languages */}
    </div>
  );
}

function LanguageEditorExample() {
  const { language, updateField, saveLanguage, isDirty } = useLanguageEditor();

  const handleSave = async () => {
    try {
      await saveLanguage();
      alert('Language saved successfully!');
    } catch (error) {
      alert('Save failed: ' + error.message);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Language Name:</label>
        <input
          type="text"
          value={language.name}
          onChange={(e) => updateField('name', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Native Name:</label>
        <input
          type="text"
          value={language.nativeName}
          onChange={(e) => updateField('nativeName', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">FSI Category:</label>
        <select
          value={language.fsi.category}
          onChange={(e) => updateField('fsi', { ...language.fsi, category: Number(e.target.value) as FSICategory })}
          className="w-full px-3 py-2 border rounded-lg"
        >
          <option value="1">Category I (Easy)</option>
          <option value="2">Category II (Moderate)</option>
          <option value="3">Category III (Hard)</option>
          <option value="4">Category IV (Very Hard)</option>
          <option value="5">Category V (Extreme)</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        disabled={!isDirty}
        className={`px-4 py-2 rounded-lg ${
          isDirty ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-500'
        }`}
      >
        {isDirty ? 'Save Changes' : 'No Changes'}
      </button>
    </div>
  );
}
```

### Breadcrumb Navigation

```tsx
import { generateBreadcrumbs, getBreadcrumbsFromPath } from '@/lib/utils/breadcrumb-utils';
import BreadcrumbNavigation from '@/components/BreadcrumbNavigation';

function BreadcrumbExamples() {
  const spanish = getLanguageById('spanish');
  const allLanguages = getAllLanguages();

  // Manual breadcrumb generation
  const languageBreadcrumbs = generateBreadcrumbs.languageDetail(spanish, allLanguages);
  const compareBreadcrumbs = generateBreadcrumbs.compare(['spanish', 'french']);
  const homeBreadcrumbs = generateBreadcrumbs.home();

  // Automatic breadcrumb generation from pathname
  const pathnameBreadcrumbs = getBreadcrumbsFromPath('/language/spanish', spanish);

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-2">Language Detail Breadcrumbs:</h3>
        <BreadcrumbNavigation 
          items={languageBreadcrumbs}
          showBackButton={true}
          backButtonLabel="Back to Languages"
          backButtonHref="/languages"
        />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Compare Breadcrumbs:</h3>
        <BreadcrumbNavigation items={compareBreadcrumbs} />
      </div>

      <div>
        <h3 className="font-semibold mb-2">Home Breadcrumbs:</h3>
        <BreadcrumbNavigation items={homeBreadcrumbs} />
      </div>
    </div>
  );
}
```

## Integration Examples

### Next.js App Router Integration

```tsx
// app/languages/page.tsx
import { getAllLanguages } from '@/lib/data/data-adapters';
import LanguageList from '@/components/LanguageList';

export default function LanguagesPage() {
  const languages = getAllLanguages();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">All Languages</h1>
      <LanguageList availableLanguages={languages} />
    </div>
  );
}

export async function generateMetadata() {
  return {
    title: 'All Languages - Easiest Language',
    description: 'Browse all available languages with FSI difficulty ratings',
  };
}
```

### API Route Integration

```tsx
// app/api/languages/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAllLanguages, getLanguageById } from '@/lib/data/data-adapters';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  try {
    if (id) {
      const language = getLanguageById(id);
      if (!language) {
        return NextResponse.json({ error: 'Language not found' }, { status: 404 });
      }
      return NextResponse.json(language);
    }

    const languages = getAllLanguages();
    return NextResponse.json(languages);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### TypeScript Integration

```tsx
// types/language-extensions.ts
import { Language, FSICategory } from '@/lib/types/language';

// Extend the base Language type for specific use cases
export interface LanguageWithStats extends Language {
  popularityScore: number;
  learningResourcesCount: number;
  culturalRichness: number;
}

// Utility type for language filtering
export type LanguageFilter = {
  searchTerm?: string;
  fsiCategory?: FSICategory;
  family?: string;
  region?: string;
  minSpeakers?: number;
  maxHours?: number;
};

// Type guard for language validation
export function isValidLanguage(obj: any): obj is Language {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    typeof obj.nativeName === 'string' &&
    Array.isArray(obj.regions) &&
    obj.fsi &&
    typeof obj.fsi.category === 'number' &&
    typeof obj.fsi.hours === 'number'
  );
}
```

## Best Practices

### Performance Optimization

```tsx
import { memo, useMemo, useCallback } from 'react';

// Memoize expensive calculations
const ExpensiveLanguageList = memo(({ languages }: { languages: Language[] }) => {
  const sortedLanguages = useMemo(() => {
    return languages.sort((a, b) => a.fsi.category - b.fsi.category);
  }, [languages]);

  const handleLanguageClick = useCallback((language: Language) => {
    router.push(`/language/${language.id}`);
  }, []);

  return (
    <div>
      {sortedLanguages.map(language => (
        <LanguageCard
          key={language.id}
          language={language}
          onViewDetails={handleLanguageClick}
        />
      ))}
    </div>
  );
});

// Use virtual scrolling for large lists
const VirtualizedLanguageList = ({ languages }: { languages: Language[] }) => {
  const [visibleCount, setVisibleCount] = useState(20);
  
  const visibleLanguages = useMemo(() => {
    return languages.slice(0, visibleCount);
  }, [languages, visibleCount]);

  const loadMore = useCallback(() => {
    setVisibleCount(prev => Math.min(prev + 20, languages.length));
  }, [languages.length]);

  return (
    <div>
      {visibleLanguages.map(language => (
        <LanguageCard key={language.id} language={language} />
      ))}
      {visibleCount < languages.length && (
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};
```

### Error Handling

```tsx
import { ErrorBoundary } from 'react-error-boundary';

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="text-center py-8">
      <h2 className="text-xl font-semibold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">{error.message}</p>
      <button
        onClick={resetErrorBoundary}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <LanguageList />
    </ErrorBoundary>
  );
}
```

### Accessibility

```tsx
function AccessibleLanguageCard({ language }: { language: Language }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`View details for ${language.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleViewDetails(language);
        }
      }}
      className="focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <LanguageCard language={language} />
    </div>
  );
}
```

### Testing

```tsx
// __tests__/LanguageCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import LanguageCard from '@/components/LanguageCard';
import { mockLanguage } from '@/lib/__mocks__/test-data';

describe('LanguageCard', () => {
  it('renders language information correctly', () => {
    render(<LanguageCard language={mockLanguage} />);
    
    expect(screen.getByText(mockLanguage.name)).toBeInTheDocument();
    expect(screen.getByText(mockLanguage.nativeName)).toBeInTheDocument();
  });

  it('calls onViewDetails when clicked', () => {
    const handleViewDetails = jest.fn();
    render(
      <LanguageCard 
        language={mockLanguage} 
        onViewDetails={handleViewDetails} 
      />
    );
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleViewDetails).toHaveBeenCalledWith(mockLanguage);
  });
});
```

This comprehensive guide provides practical examples for using all the major features of the Easiest Language application. Each example is production-ready and follows best practices for performance, accessibility, and maintainability.