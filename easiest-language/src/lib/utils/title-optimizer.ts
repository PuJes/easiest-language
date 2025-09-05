/**
 * 标题优化工具
 * 用于检查和优化页面标题长度，确保符合SEO最佳实践
 */

/**
 * 检查标题长度是否符合SEO标准
 * @param title 页面标题
 * @param maxLength 最大长度限制，默认70字符
 * @returns 检查结果
 */
export function checkTitleLength(title: string, maxLength: number = 70): {
  isValid: boolean;
  length: number;
  maxLength: number;
  isOverLimit: boolean;
  recommendation: string;
} {
  const length = title.length;
  const isOverLimit = length > maxLength;
  
  let recommendation = '';
  if (isOverLimit) {
    const excess = length - maxLength;
    recommendation = `标题超出${excess}个字符，建议缩短至${maxLength}字符以内`;
  } else if (length > 60) {
    recommendation = '标题长度适中，但建议保持在60字符以内以获得最佳显示效果';
  } else {
    recommendation = '标题长度符合SEO最佳实践';
  }

  return {
    isValid: !isOverLimit,
    length,
    maxLength,
    isOverLimit,
    recommendation
  };
}

/**
 * 优化语言详情页标题
 * @param languageName 语言名称
 * @param fsiCategory FSI类别
 * @param studyHours 学习小时数
 * @param maxLength 最大长度限制
 * @returns 优化后的标题
 */
export function optimizeLanguageTitle(
  languageName: string, 
  fsiCategory: number, 
  studyHours: number,
  maxLength: number = 70
): string {
  // 基础标题格式
  const baseTitle = `Learn ${languageName} - ${studyHours}h Study Time | FSI Category ${fsiCategory}`;
  
  // 检查是否需要优化
  const check = checkTitleLength(baseTitle, maxLength);
  
  if (check.isValid) {
    return baseTitle;
  }
  
  // 优化策略1：简化FSI类别描述
  const simplifiedTitle = `Learn ${languageName} - ${studyHours}h | FSI Cat ${fsiCategory}`;
  const simplifiedCheck = checkTitleLength(simplifiedTitle, maxLength);
  
  if (simplifiedCheck.isValid) {
    return simplifiedTitle;
  }
  
  // 优化策略2：进一步简化
  const minimalTitle = `Learn ${languageName} - ${studyHours}h Study Time`;
  const minimalCheck = checkTitleLength(minimalTitle, maxLength);
  
  if (minimalCheck.isValid) {
    return minimalTitle;
  }
  
  // 优化策略3：最简化版本
  return `Learn ${languageName} - FSI Category ${fsiCategory}`;
}

/**
 * 优化比较页面标题
 * @param maxLength 最大长度限制
 * @returns 优化后的标题
 */
export function optimizeCompareTitle(maxLength: number = 70): string {
  const baseTitle = 'Language Learning Difficulty Comparison | Easiest Language';
  const check = checkTitleLength(baseTitle, maxLength);
  
  if (check.isValid) {
    return baseTitle;
  }
  
  // 简化版本
  return 'Language Difficulty Comparison | Easiest Language';
}

/**
 * 优化语言列表页标题
 * @param maxLength 最大长度限制
 * @returns 优化后的标题
 */
export function optimizeLanguagesTitle(maxLength: number = 70): string {
  const baseTitle = 'All Languages - Complete Language Database | FSI Difficulty Ratings';
  const check = checkTitleLength(baseTitle, maxLength);
  
  if (check.isValid) {
    return baseTitle;
  }
  
  // 简化版本
  return 'All Languages - FSI Difficulty Ratings | Easiest Language';
}

/**
 * 优化首页标题
 * @param maxLength 最大长度限制
 * @returns 优化后的标题
 */
export function optimizeHomepageTitle(maxLength: number = 70): string {
  const baseTitle = 'Easiest Languages to Learn for English Speakers | FSI Guide';
  const check = checkTitleLength(baseTitle, maxLength);
  
  if (check.isValid) {
    return baseTitle;
  }
  
  // 简化版本
  return 'Easiest Languages to Learn | FSI Guide';
}

/**
 * 批量检查页面标题
 * @param titles 标题数组
 * @param maxLength 最大长度限制
 * @returns 检查结果数组
 */
export function batchCheckTitles(titles: string[], maxLength: number = 70): Array<{
  title: string;
  check: ReturnType<typeof checkTitleLength>;
}> {
  return titles.map(title => ({
    title,
    check: checkTitleLength(title, maxLength)
  }));
}

/**
 * 生成SEO友好的标题建议
 * @param pageType 页面类型
 * @param languageName 语言名称（仅语言详情页需要）
 * @param fsiCategory FSI类别（仅语言详情页需要）
 * @param studyHours 学习小时数（仅语言详情页需要）
 * @returns 标题建议
 */
export function generateTitleSuggestions(
  pageType: 'homepage' | 'languages' | 'compare' | 'language-detail',
  languageName?: string,
  fsiCategory?: number,
  studyHours?: number
): {
  primary: string;
  alternative: string;
  minimal: string;
} {
  switch (pageType) {
    case 'homepage':
      return {
        primary: 'Easiest Languages to Learn for English Speakers | FSI Guide',
        alternative: 'Easiest Languages to Learn | FSI Guide',
        minimal: 'Easiest Languages to Learn'
      };
    
    case 'languages':
      return {
        primary: 'All Languages - Complete Language Database | FSI Difficulty Ratings',
        alternative: 'All Languages - FSI Difficulty Ratings | Easiest Language',
        minimal: 'All Languages - FSI Guide'
      };
    
    case 'compare':
      return {
        primary: 'Language Learning Difficulty Comparison | Easiest Language',
        alternative: 'Language Difficulty Comparison | Easiest Language',
        minimal: 'Language Comparison'
      };
    
    case 'language-detail':
      if (!languageName || !fsiCategory || !studyHours) {
        throw new Error('Language detail page requires languageName, fsiCategory, and studyHours');
      }
      return {
        primary: `Learn ${languageName} - ${studyHours}h Study Time | FSI Category ${fsiCategory}`,
        alternative: `Learn ${languageName} - ${studyHours}h | FSI Cat ${fsiCategory}`,
        minimal: `Learn ${languageName} - FSI Category ${fsiCategory}`
      };
    
    default:
      throw new Error(`Unknown page type: ${pageType}`);
  }
}
