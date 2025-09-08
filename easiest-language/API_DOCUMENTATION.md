# Easiest Language - API Documentation

This document provides comprehensive documentation for all public APIs, functions, and components in the Easiest Language application.

## Table of Contents

- [Overview](#overview)
- [Type Definitions](#type-definitions)
- [React Components](#react-components)
- [Utility Functions](#utility-functions)
- [Custom Hooks](#custom-hooks)
- [API Endpoints](#api-endpoints)
- [Data Adapters](#data-adapters)
- [Usage Examples](#usage-examples)

## Overview

The Easiest Language application is a Next.js-based language learning platform that helps users discover and compare languages based on FSI (Foreign Service Institute) difficulty ratings. The application provides:

- Language browsing and filtering
- Detailed language information
- Language comparison tools
- Learning resource recommendations
- Cultural context information

## Type Definitions

### Core Language Types

#### `Language`
The main language interface containing all essential language information.

```typescript
interface Language {
  id: string;                    // Unique language identifier
  name: string;                  // English name of the language
  nativeName: string;            // Native name of the language
  regions: string[];             // Regions where this language is spoken
  fsi: FSIInfo;                 // FSI difficulty and learning time information
  difficulty: LanguageDifficulty; // Detailed difficulty scores
  family: string;                // Language family (e.g., "Indo-European")
  subfamily: string;             // Language subfamily (e.g., "Romance")
  writingSystem: string;         // Writing system used
  speakers: number;              // Number of native speakers worldwide
  flagEmoji: string;             // Flag emoji representing the primary country
  color: string;                 // Color code for visual representation
}
```

#### `FSIInfo`
Foreign Service Institute difficulty and learning time information.

```typescript
interface FSIInfo {
  category: FSICategory;         // FSI difficulty category (0-5)
  hours: number;                 // Learning hours according to FSI standards
  description: string;           // Description of the difficulty level
  hoursRange?: [number, number]; // Hour range for ranges like 600-750h
  details: {                     // Detailed difficulty breakdown
    grammar: number;             // Grammar complexity (1-5)
    vocabulary: number;          // Vocabulary difficulty (1-5)
    pronunciation: number;       // Pronunciation difficulty (1-5)
    writing: number;             // Writing system difficulty (1-5)
    cultural: number;            // Cultural context difficulty (1-5)
  };
}
```

#### `FSICategory`
FSI difficulty categories.

```typescript
type FSICategory = 0 | 1 | 2 | 3 | 4 | 5;
// 0: Native Language
// 1: Easiest for English Speakers (600-750h)
// 2: Moderate Difficulty (900h)
// 3: Significant Difficulty (1100h)
// 4: Hard for English Speakers (1800h)
// 5: Hardest for English Speakers (2200h)
```

#### `LanguageDifficulty`
Detailed difficulty scores for different aspects.

```typescript
interface LanguageDifficulty {
  overall: number;               // Overall difficulty score (1-10)
  grammar: number;               // Grammar complexity score (1-10)
  pronunciation: number;         // Pronunciation difficulty score (1-10)
  vocabulary: number;            // Vocabulary difficulty score (1-10)
}
```

### Extended Types

#### `ExtendedLanguageDetail`
Extended language information for detail pages.

```typescript
interface ExtendedLanguageDetail extends Omit<Language, 'speakers'> {
  speakers: {
    native: string;              // Formatted native speaker count
    total: string;               // Formatted total speaker count
    rank: number;                // Global ranking by speaker count
  };
  flag: string;                  // Flag emoji
  geography: {
    primaryRegions: string[];    // Primary regions where spoken
    secondaryRegions: string[];  // Secondary regions where spoken
    continents: string[];        // Continents where spoken
  };
  learningResources: {           // Learning resources by type
    app: LearningResource[];
    book: LearningResource[];
    course: LearningResource[];
    website: LearningResource[];
    video: LearningResource[];
    podcast: LearningResource[];
  };
  culture: {
    overview: string;            // Cultural overview
    businessUse: string;         // Business usage information
    entertainment: string[];     // Entertainment and media
    cuisine: string[];           // Cuisine and food culture
  };
  culturalInfo: {
    businessUse: number;         // Business value score (1-5)
    travelValue: number;         // Travel value score (1-5)
    culturalRichness: number;    // Cultural richness score (1-5)
    onlinePresence: number;      // Online presence score (1-5)
  };
}
```

#### `LearningResource`
Learning resource information.

```typescript
interface LearningResource {
  title: string;                 // Resource title
  type: 'app' | 'book' | 'course' | 'website' | 'video' | 'podcast';
  url?: string;                  // Resource URL if available
  description: string;           // Resource description
  free: boolean;                 // Whether the resource is free
}
```

## React Components

### Core Language Components

#### `LanguageCard`
Displays a language in a card format with key information and actions.

**Props:**
```typescript
interface LanguageCardProps {
  language: Language;                    // Language data to display
  showCompareButton?: boolean;          // Whether to show compare button (default: true)
  onCompare?: (language: Language) => void; // Compare button click handler
  onViewDetails?: (language: Language) => void; // View details click handler
  className?: string;                   // Additional CSS classes
}
```

**Features:**
- Animated hover effects using Framer Motion
- FSI difficulty badge display
- Formatted speaker count and study hours
- Difficulty indicator with color-coded dots
- Responsive design with dark mode support

**Usage:**
```tsx
import LanguageCard from '@/components/LanguageCard';

<LanguageCard
  language={languageData}
  onCompare={(lang) => handleCompare(lang)}
  onViewDetails={(lang) => navigateToDetails(lang)}
  className="custom-card"
/>
```

#### `LanguageList`
Displays a grid of language cards with search and filtering capabilities.

**Props:**
```typescript
interface LanguageListProps {
  availableLanguages?: Language[];      // Available languages (optional)
  initialCategory?: string | null;      // Initial difficulty category filter
}
```

**Features:**
- Search functionality (name and native name)
- Difficulty category filtering
- Sorting by name, difficulty, or speaker count
- Virtual scrolling with "Load More" functionality
- Responsive grid layout
- Clear filters functionality

**Usage:**
```tsx
import LanguageList from '@/components/LanguageList';

<LanguageList
  availableLanguages={languages}
  initialCategory="1"
/>
```

#### `LanguageDetail`
Comprehensive language detail page with tabbed interface.

**Props:**
```typescript
interface LanguageDetailProps {
  language: ExtendedLanguageDetail;     // Extended language data
}
```

**Features:**
- Tabbed interface (Overview, Difficulty, Resources, Culture)
- Detailed FSI difficulty analysis with radar chart
- Learning resources organized by type
- Cultural context and business usage information
- SEO-optimized content sections
- Related languages recommendations
- Breadcrumb navigation

**Usage:**
```tsx
import LanguageDetail from '@/components/LanguageDetail';

<LanguageDetail language={extendedLanguageData} />
```

#### `LanguageComparison`
Tool for comparing multiple languages side by side.

**Props:**
```typescript
interface LanguageComparisonProps {
  availableLanguages?: Language[];      // Available languages for selection
  initialLanguages?: Language[];        // Initially selected languages
}
```

**Features:**
- Support for comparing 2-3 languages
- Multiple view modes (Overview, Detailed, Charts)
- AI-powered learning recommendations
- Export comparison data as JSON
- Language selector modal
- URL parameter support for deep linking

**Usage:**
```tsx
import LanguageComparison from '@/components/LanguageComparison';

<LanguageComparison
  availableLanguages={allLanguages}
  initialLanguages={[spanish, french]}
/>
```

### UI Components

#### `FSIBadge`
Displays FSI difficulty category with color coding and labels.

**Props:**
```typescript
interface FSIBadgeProps {
  category: FSICategory;                // FSI category (0-5)
  size?: 'sm' | 'md' | 'lg';           // Badge size (default: 'md')
  showLabel?: boolean;                  // Whether to show text label (default: true)
  className?: string;                   // Additional CSS classes
}
```

**Features:**
- Color-coded difficulty levels
- Roman numeral display for categories 1-5
- Hover animations
- Multiple size options
- Accessibility-friendly tooltips

**Usage:**
```tsx
import FSIBadge from '@/components/FSIBadge';

<FSIBadge category={2} size="lg" showLabel />
```

#### `LanguageSelector`
Modal component for selecting languages to compare.

**Props:**
```typescript
interface LanguageSelectorProps {
  isOpen: boolean;                      // Whether modal is open
  onClose: () => void;                  // Close handler
  onSelect: (language: Language) => void; // Language selection handler
  availableLanguages: Language[];       // Available languages
  selectedLanguages: Language[];        // Currently selected languages
  maxSelections?: number;               // Maximum selections allowed (default: 3)
}
```

**Features:**
- Search and filter functionality
- Difficulty-based filtering
- Animated modal with backdrop
- Responsive grid layout
- Selection limit enforcement

**Usage:**
```tsx
import LanguageSelector from '@/components/LanguageSelector';

<LanguageSelector
  isOpen={showSelector}
  onClose={() => setShowSelector(false)}
  onSelect={handleLanguageSelect}
  availableLanguages={languages}
  selectedLanguages={selected}
  maxSelections={3}
/>
```

## Utility Functions

### Data Adapters

#### `getAllLanguages()`
Returns all available languages with proper type conversion.

```typescript
function getAllLanguages(): Language[]
```

**Returns:** Array of all languages with standardized data structure.

**Usage:**
```tsx
import { getAllLanguages } from '@/lib/data/data-adapters';

const languages = getAllLanguages();
```

#### `getLanguageById(id: string)`
Retrieves a specific language by its ID.

```typescript
function getLanguageById(id: string): Language | null
```

**Parameters:**
- `id`: Language identifier

**Returns:** Language object or null if not found.

**Usage:**
```tsx
import { getLanguageById } from '@/lib/data/data-adapters';

const language = getLanguageById('spanish');
```

#### `getLanguageDetailData(id: string)`
Gets extended language detail information for detail pages.

```typescript
function getLanguageDetailData(id: string): ExtendedLanguageDetail | null
```

**Parameters:**
- `id`: Language identifier

**Returns:** Extended language detail object or null if not found.

**Usage:**
```tsx
import { getLanguageDetailData } from '@/lib/data/data-adapters';

const detailData = getLanguageDetailData('spanish');
```

#### `getFeaturedLanguages()`
Returns a curated list of featured languages for homepage display.

```typescript
function getFeaturedLanguages(): Language[]
```

**Returns:** Array of 4 featured languages.

**Usage:**
```tsx
import { getFeaturedLanguages } from '@/lib/data/data-adapters';

const featured = getFeaturedLanguages();
```

#### `getLearningResourcesForLanguage(languageId: string)`
Gets learning resources for a specific language, organized by type.

```typescript
function getLearningResourcesForLanguage(languageId: string): {
  app: LearningResource[];
  book: LearningResource[];
  course: LearningResource[];
  website: LearningResource[];
  video: LearningResource[];
  podcast: LearningResource[];
}
```

**Parameters:**
- `languageId`: Language identifier

**Returns:** Object with learning resources grouped by type.

**Usage:**
```tsx
import { getLearningResourcesForLanguage } from '@/lib/data/data-adapters';

const resources = getLearningResourcesForLanguage('spanish');
```

### Breadcrumb Utilities

#### `generateBreadcrumbs`
Utility object for generating breadcrumb navigation items.

```typescript
const generateBreadcrumbs = {
  languageDetail: (language: Language, allLanguages?: Language[]): BreadcrumbItem[];
  languages: (): BreadcrumbItem[];
  compare: (languages?: string[]): BreadcrumbItem[];
  home: (): BreadcrumbItem[];
  admin: (): BreadcrumbItem[];
}
```

**Usage:**
```tsx
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';

const breadcrumbs = generateBreadcrumbs.languageDetail(language, allLanguages);
```

## Custom Hooks

### `useAdvancedFilter`
Hook for managing advanced filtering state and logic.

```typescript
function useAdvancedFilter(initialFilters?: FilterState): {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  applyFilters: (languages: Language[]) => Language[];
}
```

**Features:**
- Filter state management
- Language filtering logic
- Filter clearing functionality
- Type-safe filter operations

**Usage:**
```tsx
import { useAdvancedFilter } from '@/lib/hooks/useAdvancedFilter';

const { filters, setFilters, applyFilters } = useAdvancedFilter();
```

### `useLanguageEditor`
Hook for managing language editing functionality.

```typescript
function useLanguageEditor(initialLanguage?: Language): {
  language: Language;
  setLanguage: (language: Language) => void;
  updateField: (field: keyof Language, value: any) => void;
  saveLanguage: () => Promise<void>;
  isDirty: boolean;
}
```

**Features:**
- Language editing state management
- Field-level updates
- Dirty state tracking
- Save functionality

**Usage:**
```tsx
import { useLanguageEditor } from '@/lib/hooks/useLanguageEditor';

const { language, updateField, saveLanguage } = useLanguageEditor(initialLanguage);
```

## API Endpoints

### Health Check

#### `GET /api/health`
Returns application health status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 12345.67,
  "memory": {
    "rss": 123456789,
    "heapTotal": 123456789,
    "heapUsed": 123456789,
    "external": 123456789
  },
  "version": "1.0.0",
  "environment": "production"
}
```

**Usage:**
```bash
curl -X GET http://localhost:3000/api/health
```

### Admin Endpoints

#### `POST /api/admin/save-data`
Saves language data (admin only).

#### `POST /api/admin/save-culture-info`
Saves cultural information (admin only).

#### `POST /api/admin/save-learning-resources`
Saves learning resources (admin only).

#### `POST /api/admin/import-excel`
Imports data from Excel file (admin only).

#### `POST /api/admin/restore-backup`
Restores from backup (admin only).

## Usage Examples

### Basic Language Display

```tsx
import { getAllLanguages, getLanguageById } from '@/lib/data/data-adapters';
import LanguageCard from '@/components/LanguageCard';

function LanguagePage() {
  const languages = getAllLanguages();
  const spanish = getLanguageById('spanish');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {languages.map(language => (
        <LanguageCard
          key={language.id}
          language={language}
          onViewDetails={(lang) => router.push(`/language/${lang.id}`)}
        />
      ))}
    </div>
  );
}
```

### Language Comparison

```tsx
import LanguageComparison from '@/components/LanguageComparison';
import { getAllLanguages } from '@/lib/data/data-adapters';

function ComparePage() {
  const languages = getAllLanguages();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  return (
    <LanguageComparison
      availableLanguages={languages}
      initialLanguages={selectedLanguages}
    />
  );
}
```

### Advanced Filtering

```tsx
import { useAdvancedFilter } from '@/lib/hooks/useAdvancedFilter';
import LanguageList from '@/components/LanguageList';

function FilteredLanguagePage() {
  const { filters, setFilters, applyFilters } = useAdvancedFilter();
  const allLanguages = getAllLanguages();
  const filteredLanguages = applyFilters(allLanguages);

  return (
    <div>
      <FilterControls filters={filters} onFiltersChange={setFilters} />
      <LanguageList availableLanguages={filteredLanguages} />
    </div>
  );
}
```

### Language Detail Page

```tsx
import { getLanguageDetailData } from '@/lib/data/data-adapters';
import LanguageDetail from '@/components/LanguageDetail';

function LanguageDetailPage({ params }: { params: { id: string } }) {
  const language = getLanguageDetailData(params.id);

  if (!language) {
    return <div>Language not found</div>;
  }

  return <LanguageDetail language={language} />;
}
```

## Error Handling

All functions include proper error handling:

- **Data Adapters**: Return `null` for missing data
- **Components**: Display appropriate fallback UI
- **API Endpoints**: Return proper HTTP status codes
- **Hooks**: Provide error states and recovery mechanisms

## Performance Considerations

- **Virtual Scrolling**: LanguageList implements virtual scrolling for large datasets
- **Memoization**: Components use React.memo and useMemo for optimization
- **Lazy Loading**: Images and heavy components are loaded on demand
- **Caching**: Data adapters include caching mechanisms

## Accessibility

All components are built with accessibility in mind:

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Full keyboard support
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Proper focus handling in modals and navigation

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS 14+, Android 10+
- **Features**: ES2020+ features with polyfills for older browsers

---

For more detailed information about specific components or functions, refer to the individual component files and their JSDoc comments.