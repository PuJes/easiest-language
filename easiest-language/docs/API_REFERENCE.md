# API Reference

This document provides detailed API reference for all functions, hooks, and utilities in the Easiest Language application.

## Data Adapters

### `getAllLanguages()`

Retrieves all available languages with standardized data structure.

```typescript
function getAllLanguages(): Language[]
```

**Returns:** Array of all languages with proper type conversion and validation.

**Example:**
```typescript
import { getAllLanguages } from '@/lib/data/data-adapters';

const languages = getAllLanguages();
console.log(languages.length); // Output: 50+ languages
```

**Performance:** O(n) where n is the number of languages. Results are cached for subsequent calls.

---

### `getLanguageById(id: string)`

Retrieves a specific language by its unique identifier.

```typescript
function getLanguageById(id: string): Language | null
```

**Parameters:**
- `id` (string): Language identifier (e.g., 'spanish', 'french', 'mandarin')

**Returns:** Language object or null if not found.

**Example:**
```typescript
import { getLanguageById } from '@/lib/data/data-adapters';

const spanish = getLanguageById('spanish');
if (spanish) {
  console.log(spanish.name); // Output: "Spanish"
  console.log(spanish.fsi.category); // Output: 1
}
```

**Error Handling:** Returns null for invalid or non-existent IDs.

---

### `getLanguageDetailData(id: string)`

Gets extended language detail information for detail pages.

```typescript
function getLanguageDetailData(id: string): ExtendedLanguageDetail | null
```

**Parameters:**
- `id` (string): Language identifier

**Returns:** Extended language detail object with additional information or null if not found.

**Extended Information Includes:**
- Formatted speaker counts (native, total, rank)
- Geographic distribution (primary/secondary regions, continents)
- Learning resources organized by type
- Cultural information (overview, business use, entertainment, cuisine)
- Cultural metrics (business value, travel value, etc.)

**Example:**
```typescript
import { getLanguageDetailData } from '@/lib/data/data-adapters';

const detailData = getLanguageDetailData('spanish');
if (detailData) {
  console.log(detailData.speakers.native); // Output: "500M"
  console.log(detailData.geography.continents); // Output: ["Europe", "North America", "South America"]
  console.log(detailData.learningResources.app.length); // Output: 15
}
```

---

### `getFeaturedLanguages()`

Returns a curated list of featured languages for homepage display.

```typescript
function getFeaturedLanguages(): Language[]
```

**Returns:** Array of 4 featured languages representing different difficulty levels and regions.

**Featured Languages:**
- Spanish (Category 1 - Easy)
- French (Category 1 - Easy)
- German (Category 2 - Moderate)
- Mandarin (Category 4 - Hard)

**Example:**
```typescript
import { getFeaturedLanguages } from '@/lib/data/data-adapters';

const featured = getFeaturedLanguages();
console.log(featured.map(lang => lang.name)); // Output: ["Spanish", "French", "German", "Mandarin"]
```

---

### `getLearningResourcesForLanguage(languageId: string)`

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
- `languageId` (string): Language identifier

**Returns:** Object with learning resources grouped by type.

**Resource Types:**
- `app`: Mobile and desktop applications
- `book`: Textbooks and reference materials
- `course`: Online and offline courses
- `website`: Web-based learning platforms
- `video`: Video content and tutorials
- `podcast`: Audio learning content

**Example:**
```typescript
import { getLearningResourcesForLanguage } from '@/lib/data/data-adapters';

const resources = getLearningResourcesForLanguage('spanish');
console.log(resources.app.length); // Output: 12
console.log(resources.book[0].title); // Output: "Spanish for Beginners"
```

---

## Utility Functions

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

**Methods:**

##### `generateBreadcrumbs.languageDetail(language, allLanguages?)`

Generates breadcrumbs for language detail pages.

**Parameters:**
- `language` (Language): Language object
- `allLanguages` (Language[], optional): All available languages for dropdown

**Returns:** Array of breadcrumb items with dropdown support.

**Example:**
```typescript
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';

const breadcrumbs = generateBreadcrumbs.languageDetail(spanish, allLanguages);
// Returns: [
//   { label: 'Languages', href: '/languages', hasDropdown: true, dropdownItems: [...] },
//   { label: 'Spanish', href: '/language/spanish', isCurrentPage: true }
// ]
```

##### `generateBreadcrumbs.languages()`

Generates breadcrumbs for languages list page.

**Returns:** Array with single breadcrumb item.

**Example:**
```typescript
const breadcrumbs = generateBreadcrumbs.languages();
// Returns: [{ label: 'Languages', href: '/languages', isCurrentPage: true }]
```

##### `generateBreadcrumbs.compare(languages?)`

Generates breadcrumbs for comparison page.

**Parameters:**
- `languages` (string[], optional): Array of language names being compared

**Returns:** Array of breadcrumb items.

**Example:**
```typescript
const breadcrumbs = generateBreadcrumbs.compare(['spanish', 'french']);
// Returns: [
//   { label: 'Compare', href: '/compare' },
//   { label: 'spanish vs french', href: '/compare?languages=spanish,french', isCurrentPage: true }
// ]
```

#### `getBreadcrumbsFromPath(pathname: string, language?: Language)`

Generates breadcrumbs based on current pathname.

**Parameters:**
- `pathname` (string): Current URL pathname
- `language` (Language, optional): Language object for detail pages

**Returns:** Array of breadcrumb items.

**Example:**
```typescript
import { getBreadcrumbsFromPath } from '@/lib/utils/breadcrumb-utils';

const breadcrumbs = getBreadcrumbsFromPath('/language/spanish', spanishLanguage);
```

---

## Custom Hooks

### `useAdvancedFilter(initialFilters?)`

Hook for managing advanced filtering state and logic.

```typescript
function useAdvancedFilter(initialFilters?: FilterState): {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
  clearFilters: () => void;
  applyFilters: (languages: Language[]) => Language[];
}
```

**Parameters:**
- `initialFilters` (FilterState, optional): Initial filter state

**Returns:** Object with filter management functions.

**FilterState Interface:**
```typescript
interface FilterState {
  searchTerm: string;
  fsiCategory: FSICategory | null;
  family: string | null;
  region: string | null;
  minSpeakers: number | null;
  maxHours: number | null;
}
```

**Example:**
```typescript
import { useAdvancedFilter } from '@/lib/hooks/useAdvancedFilter';

function FilteredLanguageList() {
  const { filters, setFilters, applyFilters } = useAdvancedFilter();
  const allLanguages = getAllLanguages();
  const filteredLanguages = applyFilters(allLanguages);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <FilterControls filters={filters} onChange={handleFilterChange} />
      <LanguageList languages={filteredLanguages} />
    </div>
  );
}
```

**Features:**
- **State Management**: Centralized filter state
- **Type Safety**: Full TypeScript support
- **Performance**: Optimized filtering algorithms
- **Persistence**: Optional filter persistence

---

### `useLanguageEditor(initialLanguage?)`

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

**Parameters:**
- `initialLanguage` (Language, optional): Initial language data

**Returns:** Object with editing functions and state.

**Example:**
```typescript
import { useLanguageEditor } from '@/lib/hooks/useLanguageEditor';

function LanguageEditor() {
  const { language, updateField, saveLanguage, isDirty } = useLanguageEditor(initialLanguage);

  const handleNameChange = (newName: string) => {
    updateField('name', newName);
  };

  const handleSave = async () => {
    try {
      await saveLanguage();
      console.log('Language saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  return (
    <div>
      <input
        value={language.name}
        onChange={(e) => handleNameChange(e.target.value)}
      />
      <button onClick={handleSave} disabled={!isDirty}>
        Save Changes
      </button>
    </div>
  );
}
```

**Features:**
- **Field Updates**: Individual field modification
- **Dirty Tracking**: Tracks unsaved changes
- **Validation**: Built-in data validation
- **Error Handling**: Comprehensive error management

---

## API Endpoints

### Health Check

#### `GET /api/health`

Returns application health status and system information.

**Response Format:**
```typescript
interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  memory: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
  };
  version: string;
  environment: string;
}
```

**Success Response (200):**
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

**Error Response (503):**
```json
{
  "status": "unhealthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "error": "Database connection failed"
}
```

**Usage:**
```bash
curl -X GET http://localhost:3000/api/health
```

**Use Cases:**
- Docker container health checks
- Load balancer health monitoring
- System status monitoring
- Performance metrics collection

---

### Admin Endpoints

#### `POST /api/admin/save-data`

Saves language data (admin only).

**Request Body:**
```typescript
interface SaveDataRequest {
  languages: Language[];
  timestamp: string;
  version: string;
}
```

**Response:**
```json
{
  "success": true,
  "message": "Data saved successfully",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

#### `POST /api/admin/save-culture-info`

Saves cultural information (admin only).

**Request Body:**
```typescript
interface SaveCultureInfoRequest {
  languageId: string;
  cultureInfo: {
    overview: string;
    businessUse: string;
    entertainment: string[];
    cuisine: string[];
  };
}
```

#### `POST /api/admin/save-learning-resources`

Saves learning resources (admin only).

**Request Body:**
```typescript
interface SaveLearningResourcesRequest {
  languageId: string;
  resources: LearningResource[];
}
```

#### `POST /api/admin/import-excel`

Imports data from Excel file (admin only).

**Request Body:** Multipart form data with Excel file.

**Response:**
```json
{
  "success": true,
  "message": "Excel file imported successfully",
  "importedCount": 25,
  "errors": []
}
```

#### `POST /api/admin/restore-backup`

Restores from backup (admin only).

**Request Body:**
```typescript
interface RestoreBackupRequest {
  backupId: string;
  confirmRestore: boolean;
}
```

---

## Error Handling

### Common Error Patterns

#### Data Not Found
```typescript
const language = getLanguageById('nonexistent');
if (!language) {
  console.log('Language not found');
  // Handle gracefully
}
```

#### API Errors
```typescript
try {
  const response = await fetch('/api/health');
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  const data = await response.json();
} catch (error) {
  console.error('API call failed:', error);
  // Handle error
}
```

#### Validation Errors
```typescript
function validateLanguage(language: Language): string[] {
  const errors: string[] = [];
  
  if (!language.name) errors.push('Name is required');
  if (!language.id) errors.push('ID is required');
  if (language.fsi.category < 0 || language.fsi.category > 5) {
    errors.push('FSI category must be between 0 and 5');
  }
  
  return errors;
}
```

---

## Performance Considerations

### Caching Strategy

**Data Adapters:**
- Language data is cached after first load
- Cache invalidation on data updates
- Memory-efficient caching with LRU eviction

**API Endpoints:**
- Response caching with appropriate headers
- ETag support for conditional requests
- Compression for large responses

### Optimization Tips

1. **Use Memoization:**
```typescript
const expensiveCalculation = useMemo(() => {
  return languages.filter(lang => lang.fsi.category === 1);
}, [languages]);
```

2. **Implement Virtual Scrolling:**
```typescript
const visibleLanguages = useMemo(() => {
  return filteredLanguages.slice(0, visibleCount);
}, [filteredLanguages, visibleCount]);
```

3. **Debounce Search:**
```typescript
const debouncedSearch = useCallback(
  debounce((term: string) => {
    setSearchTerm(term);
  }, 300),
  []
);
```

---

## Type Safety

All functions and components are fully typed with TypeScript:

```typescript
// Strict type checking
const language: Language = getLanguageById('spanish')!; // Non-null assertion
const languages: Language[] = getAllLanguages();

// Generic types
function filterLanguages<T extends Language>(
  languages: T[],
  predicate: (lang: T) => boolean
): T[] {
  return languages.filter(predicate);
}
```

---

## Testing

### Unit Tests

All functions include comprehensive unit tests:

```typescript
describe('getLanguageById', () => {
  it('should return language for valid ID', () => {
    const language = getLanguageById('spanish');
    expect(language).toBeDefined();
    expect(language?.name).toBe('Spanish');
  });

  it('should return null for invalid ID', () => {
    const language = getLanguageById('nonexistent');
    expect(language).toBeNull();
  });
});
```

### Integration Tests

API endpoints are tested with integration tests:

```typescript
describe('/api/health', () => {
  it('should return health status', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('healthy');
  });
});
```

---

## Migration Guide

### Breaking Changes

**Version 2.0.0:**
- `Language` interface updated with new fields
- `FSIInfo` structure changed
- Component props updated

**Migration Steps:**
1. Update type imports
2. Update component usage
3. Update data handling logic
4. Run type checking

### Deprecation Warnings

Some functions may show deprecation warnings:
- `getOldLanguageData()` - Use `getLanguageById()` instead
- `legacyFilter()` - Use `useAdvancedFilter()` instead

---

For more detailed information about specific functions or components, refer to the source code and JSDoc comments.