'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon, ArrowLeftIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import { BreadcrumbItem } from '@/lib/utils/breadcrumb-utils';

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
 * Dropdown component for language selection
 */
const LanguageDropdown: React.FC<{
  item: BreadcrumbItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ item, isOpen, onToggle, onClose }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!item.hasDropdown || !item.dropdownItems || item.dropdownItems.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={onToggle}
        className="flex items-center gap-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-xs"
        title={`Go to ${item.label}`}
      >
        {item.label}
        <ChevronDownIcon className={`h-3 w-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          <div className="py-1">
            {item.dropdownItems.map((dropdownItem, index) => (
              <Link
                key={index}
                href={dropdownItem.href}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                onClick={onClose}
              >
                {dropdownItem.flagEmoji && (
                  <span className="text-lg">{dropdownItem.flagEmoji}</span>
                )}
                <span>{dropdownItem.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Breadcrumb Navigation Component
 * Provides hierarchical navigation with internal links for better SEO and UX
 * Now includes optional back button functionality and language dropdown
 */
const BreadcrumbNavigation: React.FC<BreadcrumbNavigationProps> = ({
  items,
  className = '',
  showBackButton = true,
  backButtonLabel = 'Back to Home',
  backButtonHref = '/home',
}) => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState<number | null>(null);
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
            ) : item.hasDropdown ? (
              <LanguageDropdown
                item={item}
                isOpen={openDropdownIndex === index}
                onToggle={() => setOpenDropdownIndex(openDropdownIndex === index ? null : index)}
                onClose={() => setOpenDropdownIndex(null)}
              />
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
