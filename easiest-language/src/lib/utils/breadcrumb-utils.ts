import { Language } from '@/lib/types/language';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
  /** 是否显示下拉菜单 */
  hasDropdown?: boolean;
  /** 下拉菜单选项 */
  dropdownItems?: Array<{
    label: string;
    href: string;
    flagEmoji?: string;
  }>;
}

/**
 * Generate breadcrumb items for different page types
 */
export const generateBreadcrumbs = {
  /**
   * Generate breadcrumbs for language detail page
   */
  languageDetail: (language: Language, allLanguages?: Language[]): BreadcrumbItem[] => [
    { 
      label: 'Languages', 
      href: '/languages',
      hasDropdown: true,
      dropdownItems: allLanguages?.map(lang => ({
        label: lang.name,
        href: `/language/${lang.id}`,
        flagEmoji: lang.flagEmoji
      })) || []
    },
    { label: language.name, href: `/language/${language.id}`, isCurrentPage: true },
  ],

  /**
   * Generate breadcrumbs for languages list page
   */
  languages: (): BreadcrumbItem[] => [
    { label: 'Languages', href: '/languages', isCurrentPage: true },
  ],

  /**
   * Generate breadcrumbs for compare page
   */
  compare: (languages?: string[]): BreadcrumbItem[] => {
    const items: BreadcrumbItem[] = [
      { label: 'Compare', href: '/compare', isCurrentPage: true },
    ];
    
    if (languages && languages.length > 0) {
      items[0].isCurrentPage = false;
      items.push({
        label: languages.join(' vs '),
        href: `/compare?languages=${languages.join(',')}`,
        isCurrentPage: true,
      });
    }
    
    return items;
  },

  /**
   * Generate breadcrumbs for home page
   */
  home: (): BreadcrumbItem[] => [
    { label: 'Home', href: '/', isCurrentPage: true },
  ],

  /**
   * Generate breadcrumbs for admin page
   */
  admin: (): BreadcrumbItem[] => [
    { label: 'Admin', href: '/admin', isCurrentPage: true },
  ],
};

/**
 * Get breadcrumb items based on current pathname
 */
export const getBreadcrumbsFromPath = (pathname: string, language?: Language): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  
  if (segments.length === 0) {
    return generateBreadcrumbs.home();
  }
  
  switch (segments[0]) {
    case 'language':
      if (segments[1] && language) {
        return generateBreadcrumbs.languageDetail(language);
      }
      return generateBreadcrumbs.languages();
      
    case 'languages':
      return generateBreadcrumbs.languages();
      
    case 'compare':
      const languages = new URLSearchParams(window.location.search).get('languages')?.split(',');
      return generateBreadcrumbs.compare(languages);
      
    case 'admin':
      return generateBreadcrumbs.admin();
      
    default:
      return generateBreadcrumbs.home();
  }
};
