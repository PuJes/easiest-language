'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  TagIcon, 
  XMarkIcon,
  FunnelIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';
import { Language } from '@/lib/types/language';
import { getAllLanguages } from '@/lib/data/data-adapters';

interface Tag {
  /** Unique identifier for the tag */
  id: string;
  /** Display name of the tag */
  label: string;
  /** URL path for the tag */
  href: string;
  /** Number of languages associated with this tag */
  count: number;
  /** Category of the tag (difficulty, family, region, etc.) */
  category: 'difficulty' | 'family' | 'region' | 'writing' | 'feature';
  /** Color theme for the tag */
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'gray';
  /** Icon for the tag */
  icon?: string;
}

interface TagCloudProps {
  /** Current language for context-aware filtering */
  currentLanguage?: Language;
  /** Whether to show the filter panel */
  showFilters?: boolean;
  /** Maximum number of tags to display */
  maxTags?: number;
  /** Custom CSS classes */
  className?: string;
}

/**
 * Tag Cloud Component
 * Provides tag-based navigation with filtering capabilities for better content discovery
 */
const TagCloud: React.FC<TagCloudProps> = ({
  currentLanguage,
  showFilters = true,
  maxTags = 30,
  className = '',
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get all languages for tag generation
  const allLanguages = getAllLanguages();

  // Generate tags based on language data
  const tags = useMemo(() => {
    const tagMap = new Map<string, Tag>();

    // Difficulty category tags
    allLanguages.forEach((lang) => {
      const category = lang.fsi.category;
      const categoryName = category === 1 ? 'Easiest' :
                        category === 2 ? 'Relatively Easy' :
                        category === 3 ? 'Moderately Difficult' :
                        category === 4 ? 'Challenging' : 'Very Challenging';
      
      const tagId = `difficulty-${category}`;
      if (!tagMap.has(tagId)) {
        tagMap.set(tagId, {
          id: tagId,
          label: `FSI Category ${category}`,
          href: '/languages',
          count: 0,
          category: 'difficulty',
          color: category === 1 ? 'green' : 
                 category === 2 ? 'blue' : 
                 category === 3 ? 'orange' : 
                 category === 4 ? 'red' : 'red',
          icon: category === 1 ? '🟢' : 
                category === 2 ? '🟡' : 
                category === 3 ? '🟠' : 
                category === 4 ? '🔴' : '🔥'
        });
      }
      tagMap.get(tagId)!.count++;
    });

    // Language family tags
    const familyMap = new Map<string, number>();
    allLanguages.forEach((lang) => {
      const family = lang.family.toLowerCase();
      familyMap.set(family, (familyMap.get(family) || 0) + 1);
    });

    familyMap.forEach((count, family) => {
      const familyName = family.charAt(0).toUpperCase() + family.slice(1);
      const tagId = `family-${family}`;
      
      let icon = '🌐';
      let color: Tag['color'] = 'purple';
      
      if (family.includes('romance')) { icon = '💕'; color = 'purple'; }
      else if (family.includes('germanic')) { icon = '⚡'; color = 'blue'; }
      else if (family.includes('slavic')) { icon = '🌲'; color = 'green'; }
      else if (family.includes('sino-tibetan')) { icon = '🏮'; color = 'orange'; }
      else if (family.includes('afro-asiatic')) { icon = '🕌'; color = 'red'; }

      tagMap.set(tagId, {
        id: tagId,
        label: familyName,
        href: '/languages',
        count,
        category: 'family',
        color,
        icon
      });
    });

    // Writing system tags
    const writingMap = new Map<string, number>();
    allLanguages.forEach((lang) => {
      const writing = lang.writingSystem.toLowerCase();
      writingMap.set(writing, (writingMap.get(writing) || 0) + 1);
    });

    writingMap.forEach((count, writing) => {
      const writingName = writing.charAt(0).toUpperCase() + writing.slice(1);
      const tagId = `writing-${writing}`;
      
      let icon = '📝';
      let color: Tag['color'] = 'gray';
      
      if (writing.includes('latin')) { icon = '🔤'; color = 'blue'; }
      else if (writing.includes('cyrillic')) { icon = '🔤'; color = 'green'; }
      else if (writing.includes('arabic')) { icon = '🔤'; color = 'purple'; }
      else if (writing.includes('chinese')) { icon = '🔤'; color = 'orange'; }
      else if (writing.includes('devanagari')) { icon = '🔤'; color = 'red'; }

      tagMap.set(tagId, {
        id: tagId,
        label: writingName,
        href: '/languages',
        count,
        category: 'writing',
        color,
        icon
      });
    });

    // Popular languages as feature tags
    const popularLanguages = allLanguages
      .sort((a, b) => b.speakers.total - a.speakers.total)
      .slice(0, 8);

    popularLanguages.forEach((lang) => {
      const tagId = `language-${lang.id}`;
      tagMap.set(tagId, {
        id: tagId,
        label: lang.name,
        href: `/language/${lang.id}`,
        count: 1,
        category: 'feature',
        color: 'blue',
        icon: lang.flagEmoji
      });
    });

    return Array.from(tagMap.values());
  }, [allLanguages]);

  // Filter tags based on selected category and search query
  const filteredTags = useMemo(() => {
    let filtered = tags;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(tag => tag.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tag => 
        tag.label.toLowerCase().includes(query)
      );
    }

    // Sort by count (descending) and limit results
    return filtered
      .sort((a, b) => b.count - a.count)
      .slice(0, maxTags);
  }, [tags, selectedCategory, searchQuery, maxTags]);

  // Get color classes for tags
  const getTagColorClasses = (color: Tag['color']) => {
    const colorMap = {
      blue: 'bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30',
      green: 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/20 dark:text-green-300 dark:hover:bg-green-900/30',
      purple: 'bg-purple-100 text-purple-800 hover:bg-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:hover:bg-purple-900/30',
      orange: 'bg-orange-100 text-orange-800 hover:bg-orange-200 dark:bg-orange-900/20 dark:text-orange-300 dark:hover:bg-orange-900/30',
      red: 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900/20 dark:text-red-300 dark:hover:bg-red-900/30',
      gray: 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900/20 dark:text-gray-300 dark:hover:bg-gray-900/30',
    };
    return colorMap[color];
  };

  const categories = [
    { id: 'all', label: 'All Tags', icon: TagIcon },
    { id: 'difficulty', label: 'Difficulty', icon: AcademicCapIcon },
    { id: 'family', label: 'Language Families', icon: LanguageIcon },
    { id: 'writing', label: 'Writing Systems', icon: GlobeAltIcon },
    { id: 'feature', label: 'Popular Languages', icon: TagIcon },
  ];

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 ${className}`}>
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 mb-2">
          <TagIcon className="h-5 w-5 text-indigo-600" />
          Explore by Tags
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Discover languages by difficulty, family, writing system, and more
        </p>
      </div>

      {/* Filter controls */}
      {showFilters && (
        <div className="mb-6 space-y-4">
          {/* Category filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/20 dark:text-indigo-300'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                  }`}
                >
                  <IconComponent className="h-4 w-4" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {/* Search input */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
            <FunnelIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Tags display */}
      <div className="flex flex-wrap gap-2">
        {filteredTags.length > 0 ? (
          filteredTags.map((tag) => (
            <Link
              key={tag.id}
              href={tag.href}
              className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${getTagColorClasses(tag.color)}`}
              title={`${tag.label} (${tag.count} languages)`}
            >
              {tag.icon && <span className="text-sm">{tag.icon}</span>}
              <span>{tag.label}</span>
              {tag.count > 1 && (
                <span className="ml-1 text-xs opacity-75">({tag.count})</span>
              )}
            </Link>
          ))
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <TagIcon className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p>No tags found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Results summary */}
      {filteredTags.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Showing {filteredTags.length} of {tags.length} tags
        </div>
      )}
    </div>
  );
};

export default TagCloud;
