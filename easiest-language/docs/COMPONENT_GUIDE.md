# Component Guide

This guide provides detailed information about all React components in the Easiest Language application.

## Core Language Components

### LanguageCard

A reusable card component for displaying language information with interactive features.

#### Features
- **Animated Interactions**: Smooth hover and click animations using Framer Motion
- **FSI Badge Integration**: Displays difficulty level with color coding
- **Responsive Design**: Adapts to different screen sizes
- **Dark Mode Support**: Full dark/light theme compatibility
- **Accessibility**: ARIA labels and keyboard navigation support

#### Props Interface
```typescript
interface LanguageCardProps {
  language: Language;                    // Required: Language data object
  showCompareButton?: boolean;          // Optional: Show compare button (default: true)
  onCompare?: (language: Language) => void; // Optional: Compare button handler
  onViewDetails?: (language: Language) => void; // Optional: Details button handler
  className?: string;                   // Optional: Additional CSS classes
}
```

#### Usage Examples

**Basic Usage:**
```tsx
<LanguageCard language={spanishLanguage} />
```

**With Custom Handlers:**
```tsx
<LanguageCard
  language={frenchLanguage}
  onCompare={(lang) => addToComparison(lang)}
  onViewDetails={(lang) => navigateToDetails(lang)}
  className="custom-card-style"
/>
```

**Without Compare Button:**
```tsx
<LanguageCard
  language={germanLanguage}
  showCompareButton={false}
  onViewDetails={(lang) => showDetails(lang)}
/>
```

#### Styling
The component uses Tailwind CSS classes and supports custom styling through the `className` prop. Key style classes:
- `bg-white dark:bg-slate-800` - Background colors
- `border border-slate-200 dark:border-slate-700` - Border styling
- `rounded-xl` - Rounded corners
- `hover:border-blue-500 hover:shadow-lg` - Hover effects

### LanguageList

A comprehensive list component with search, filtering, and sorting capabilities.

#### Features
- **Search Functionality**: Search by language name or native name
- **Advanced Filtering**: Filter by FSI difficulty category
- **Multiple Sort Options**: Sort by name, difficulty, or speaker count
- **Virtual Scrolling**: Efficient rendering of large language lists
- **Responsive Grid**: Adapts to different screen sizes
- **Clear Filters**: Easy reset of all filters

#### Props Interface
```typescript
interface LanguageListProps {
  availableLanguages?: Language[];      // Optional: Pre-filtered languages
  initialCategory?: string | null;      // Optional: Initial difficulty filter
}
```

#### Usage Examples

**Basic Usage:**
```tsx
<LanguageList />
```

**With Pre-filtered Languages:**
```tsx
<LanguageList availableLanguages={easyLanguages} />
```

**With Initial Category Filter:**
```tsx
<LanguageList initialCategory="1" />
```

#### State Management
The component manages several pieces of state internally:
- `searchTerm`: Current search query
- `selectedCategory`: Selected difficulty category
- `sortBy`: Current sort field ('name', 'difficulty', 'speakers')
- `sortOrder`: Sort direction ('asc', 'desc')
- `visibleCount`: Number of visible items (for virtual scrolling)

### LanguageDetail

A comprehensive detail page component with tabbed interface and rich content.

#### Features
- **Tabbed Interface**: Overview, Difficulty, Resources, and Culture tabs
- **FSI Analysis**: Detailed difficulty breakdown with visual charts
- **Learning Resources**: Organized by type (apps, books, courses, etc.)
- **Cultural Context**: Business usage, entertainment, and cuisine information
- **SEO Content**: Rich, searchable content sections
- **Related Languages**: Recommendations based on similarity

#### Props Interface
```typescript
interface LanguageDetailProps {
  language: ExtendedLanguageDetail;     // Required: Extended language data
}
```

#### Tab Content

**Overview Tab:**
- Language family and subfamily information
- Geographic distribution
- Speaker statistics with visual charts
- Primary and secondary regions

**Difficulty Tab:**
- FSI category and study hours
- Detailed difficulty breakdown (grammar, vocabulary, pronunciation, writing, cultural)
- Visual radar chart representation
- Learning time breakdown by phases and skills

**Resources Tab:**
- Learning resources organized by type
- Free vs. paid resource indicators
- Resource descriptions and links
- Resource availability status

**Culture Tab:**
- Cultural overview and context
- Business usage information
- Entertainment and media
- Cuisine and food culture

#### Usage Examples

**Basic Usage:**
```tsx
<LanguageDetail language={extendedLanguageData} />
```

### LanguageComparison

A powerful comparison tool for analyzing multiple languages side by side.

#### Features
- **Multi-Language Support**: Compare 2-3 languages simultaneously
- **Multiple View Modes**: Overview, Detailed table, and Charts
- **AI Recommendations**: Intelligent learning suggestions
- **Export Functionality**: Download comparison data as JSON
- **URL Integration**: Deep linking with language parameters
- **Language Selector**: Modal for adding languages to comparison

#### Props Interface
```typescript
interface LanguageComparisonProps {
  availableLanguages?: Language[];      // Optional: Available languages
  initialLanguages?: Language[];        // Optional: Pre-selected languages
}
```

#### View Modes

**Overview Mode:**
- Language cards with key information
- FSI badges and study hours
- Speaker counts and regions
- AI-powered recommendations

**Detailed Mode:**
- Comprehensive comparison table
- Side-by-side feature comparison
- Business value ratings
- Learning resource counts

**Charts Mode:**
- Visual difficulty comparison
- Study time bar charts
- Interactive difficulty analysis

#### Usage Examples

**Basic Usage:**
```tsx
<LanguageComparison />
```

**With Pre-selected Languages:**
```tsx
<LanguageComparison initialLanguages={[spanish, french]} />
```

**With Custom Language Set:**
```tsx
<LanguageComparison availableLanguages={europeanLanguages} />
```

## UI Components

### FSIBadge

A specialized badge component for displaying FSI difficulty categories.

#### Features
- **Color Coding**: Visual representation of difficulty levels
- **Roman Numerals**: Category display with Roman numerals
- **Multiple Sizes**: Small, medium, and large variants
- **Hover Effects**: Interactive animations
- **Accessibility**: Tooltips with detailed information

#### Props Interface
```typescript
interface FSIBadgeProps {
  category: FSICategory;                // Required: FSI category (0-5)
  size?: 'sm' | 'md' | 'lg';           // Optional: Badge size (default: 'md')
  showLabel?: boolean;                  // Optional: Show text label (default: true)
  className?: string;                   // Optional: Additional CSS classes
}
```

#### Color Scheme
- **Category 0 (Native)**: Gray (#6c757d)
- **Category 1 (Easy)**: Green (#22c55e)
- **Category 2 (Moderate)**: Yellow (#eab308)
- **Category 3 (Significant)**: Orange (#f97316)
- **Category 4 (Hard)**: Red (#ef4444)
- **Category 5 (Hardest)**: Purple (#a855f7)

#### Usage Examples

**Basic Usage:**
```tsx
<FSIBadge category={2} />
```

**Large Badge with Label:**
```tsx
<FSIBadge category={1} size="lg" showLabel />
```

**Small Badge without Label:**
```tsx
<FSIBadge category={4} size="sm" showLabel={false} />
```

### LanguageSelector

A modal component for selecting languages to add to comparisons.

#### Features
- **Search Functionality**: Find languages by name or native name
- **Difficulty Filtering**: Filter by FSI category
- **Selection Limits**: Enforce maximum selection count
- **Animated Modal**: Smooth open/close animations
- **Responsive Design**: Works on all screen sizes

#### Props Interface
```typescript
interface LanguageSelectorProps {
  isOpen: boolean;                      // Required: Modal visibility state
  onClose: () => void;                  // Required: Close handler
  onSelect: (language: Language) => void; // Required: Selection handler
  availableLanguages: Language[];       // Required: Available languages
  selectedLanguages: Language[];        // Required: Currently selected
  maxSelections?: number;               // Optional: Max selections (default: 3)
}
```

#### Usage Examples

**Basic Usage:**
```tsx
const [isOpen, setIsOpen] = useState(false);
const [selected, setSelected] = useState([]);

<LanguageSelector
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSelect={(lang) => setSelected([...selected, lang])}
  availableLanguages={allLanguages}
  selectedLanguages={selected}
/>
```

**With Custom Selection Limit:**
```tsx
<LanguageSelector
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  onSelect={handleSelect}
  availableLanguages={languages}
  selectedLanguages={selected}
  maxSelections={5}
/>
```

## Layout Components

### BreadcrumbNavigation

A navigation component for showing current page location and providing navigation.

#### Features
- **Dynamic Generation**: Automatically generates breadcrumbs based on current page
- **Dropdown Support**: Optional dropdown menus for navigation
- **Back Button**: Integrated back button functionality
- **Responsive Design**: Adapts to different screen sizes

#### Props Interface
```typescript
interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];              // Required: Breadcrumb items
  showBackButton?: boolean;             // Optional: Show back button
  backButtonLabel?: string;             // Optional: Back button text
  backButtonHref?: string;              // Optional: Back button URL
}
```

#### Usage Examples

**Basic Usage:**
```tsx
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';

const breadcrumbs = generateBreadcrumbs.languageDetail(language, allLanguages);

<BreadcrumbNavigation items={breadcrumbs} />
```

**With Back Button:**
```tsx
<BreadcrumbNavigation
  items={breadcrumbs}
  showBackButton={true}
  backButtonLabel="Back to Languages"
  backButtonHref="/languages"
/>
```

## Filter Components

### FSICategoryFilter

A specialized filter component for FSI difficulty categories.

#### Features
- **Category Selection**: Single or multiple category selection
- **Visual Indicators**: Color-coded category display
- **Count Display**: Shows number of languages in each category
- **Clear Functionality**: Easy filter reset

### GeographicRegionFilter

A filter component for geographic regions.

#### Features
- **Region Selection**: Multi-select region filtering
- **Continent Grouping**: Organized by continent
- **Search Functionality**: Find regions quickly
- **Visual Indicators**: Flag emojis for regions

### LanguageFamilyFilter

A filter component for language families.

#### Features
- **Family Selection**: Filter by language family
- **Subfamily Support**: Include subfamily filtering
- **Hierarchical Display**: Tree-like family structure
- **Count Indicators**: Number of languages per family

## Performance Considerations

### Optimization Strategies

1. **Memoization**: Components use React.memo to prevent unnecessary re-renders
2. **Virtual Scrolling**: Large lists implement virtual scrolling for performance
3. **Lazy Loading**: Heavy components are loaded on demand
4. **Debounced Search**: Search inputs use debouncing to reduce API calls

### Best Practices

1. **Props Validation**: Use TypeScript interfaces for prop validation
2. **Error Boundaries**: Wrap components in error boundaries
3. **Loading States**: Provide loading indicators for async operations
4. **Accessibility**: Ensure all components are accessible

## Testing

### Component Testing

All components include comprehensive test suites covering:
- **Rendering**: Basic component rendering
- **Props**: Prop validation and handling
- **Interactions**: User interaction testing
- **Accessibility**: Screen reader compatibility
- **Responsive**: Different screen size testing

### Test Files

- `LanguageCard.test.tsx` - LanguageCard component tests
- `LanguageList.test.tsx` - LanguageList component tests
- `FSIBadge.test.tsx` - FSIBadge component tests

## Styling Guidelines

### CSS Classes

Components use Tailwind CSS with custom extensions:
- **Color System**: Consistent color palette
- **Spacing**: Standardized spacing scale
- **Typography**: Consistent font sizing and weights
- **Animations**: Smooth transitions and hover effects

### Dark Mode

All components support dark mode with:
- **CSS Variables**: Dynamic color switching
- **Tailwind Classes**: Dark mode variants
- **User Preference**: Respects system preference

### Responsive Design

Components are built mobile-first with:
- **Breakpoints**: sm, md, lg, xl breakpoints
- **Flexible Layouts**: Grid and flexbox layouts
- **Touch-Friendly**: Appropriate touch targets
- **Performance**: Optimized for mobile devices