'use client';

import React from 'react';
import BreadcrumbNavigation from './BreadcrumbNavigation';
import FooterLinks from './FooterLinks';
import TagCloud from './TagCloud';
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';
import { Language } from '@/lib/types/language';

interface InternalLinksDemoProps {
  /** Current language for context-aware recommendations */
  currentLanguage?: Language;
  /** Page type for breadcrumb generation */
  pageType?: 'home' | 'languages' | 'language-detail' | 'compare';
  /** Whether to show all components */
  showAll?: boolean;
}

/**
 * Demo component showing how to integrate the new internal linking components
 * This demonstrates the usage of BreadcrumbNavigation, FooterLinks, and TagCloud
 */
const InternalLinksDemo: React.FC<InternalLinksDemoProps> = ({
  currentLanguage,
  pageType = 'home',
  showAll = true,
}) => {
  // Generate breadcrumbs based on page type
  const getBreadcrumbs = () => {
    switch (pageType) {
      case 'language-detail':
        return currentLanguage ? generateBreadcrumbs.languageDetail(currentLanguage) : generateBreadcrumbs.languages();
      case 'languages':
        return generateBreadcrumbs.languages();
      case 'compare':
        return generateBreadcrumbs.compare();
      default:
        return generateBreadcrumbs.home();
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb Navigation Example */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Breadcrumb Navigation
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Hierarchical navigation with internal links for better SEO and UX
        </p>
        <BreadcrumbNavigation items={getBreadcrumbs()} />
      </div>

      {/* Tag Cloud Example */}
      {showAll && (
        <TagCloud
          currentLanguage={currentLanguage}
          showFilters={true}
          maxTags={20}
        />
      )}

      {/* Footer Links Example */}
      {showAll && (
        <FooterLinks
          currentLanguage={currentLanguage}
          showPopularLanguages={true}
          showDifficultyCategories={true}
          showLanguageFamilies={true}
          showLearningResources={true}
        />
      )}
    </div>
  );
};

export default InternalLinksDemo;
