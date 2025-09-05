'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  /** Display name of the breadcrumb item */
  label: string;
  /** URL path for the breadcrumb item */
  href: string;
  /** Whether this is the current page (last item) */
  isCurrentPage?: boolean;
}

interface BreadcrumbNavigationProps {
  /** Array of breadcrumb items */
  items: BreadcrumbItem[];
  /** Custom CSS classes */
  className?: string;
  /** Show back button (default: true) */
  showBackButton?: boolean;
  /** Back button label (default: "Back to Home") */
  backButtonLabel?: string;
  /** Back button href (default: "/home") */
  backButtonHref?: string;
}

/**
 * Breadcrumb Navigation Component
 * Provides hierarchical navigation with internal links for better SEO and UX
 * Now includes optional back button functionality
 */
const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items,
  className = '',
  showBackButton = true,
  backButtonLabel = 'Back to Home',
  backButtonHref = '/home',
}) => {
  return (
    <div className={`flex items-center justify-between ${className}`}>
      {/* Breadcrumb navigation */}
      <nav 
        className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 py-2"
        aria-label="Breadcrumb navigation"
      >
        {/* Home icon */}
        <Link 
          href="/" 
          className="flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          title="Go to Homepage"
        >
          <HomeIcon className="h-3 w-3" />
          <span className="sr-only">Home</span>
        </Link>

        {/* Breadcrumb items */}
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <ChevronRightIcon className="h-3 w-3 text-gray-400 mx-1" />
            {item.isCurrentPage ? (
              <span 
                className="font-medium text-gray-700 dark:text-gray-200 text-xs"
                aria-current="page"
              >
                {item.label}
              </span>
            ) : (
              <Link
                href={item.href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs"
                title={`Go to ${item.label}`}
              >
                {item.label}
              </Link>
            )}
          </React.Fragment>
        ))}
      </nav>

      {/* Back button */}
      {showBackButton && (
        <Link href={backButtonHref} title={backButtonLabel}>
          <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors text-sm">
            <ArrowLeftIcon className="h-4 w-4" />
            {backButtonLabel}
          </button>
        </Link>
      )}
    </div>
  );
};

export default BreadcrumbNavigation;
