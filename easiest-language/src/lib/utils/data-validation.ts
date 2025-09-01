import type { Language, LanguageData, FSICategory } from '../types';
import { FSI_LANGUAGE_DATA } from '../data/languages';
import { COUNTRY_LANGUAGE_MAPPING } from '../data/countries';
import { calculateLanguageFamilyStats } from '../data/language-families';

/**
 * 数据验证错误类型
 */
export interface ValidationError {
  type: 'error' | 'warning' | 'info';
  category: string;
  message: string;
  languageId?: string;
  countryName?: string;
}

/**
 * 数据验证结果
 */
export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationError[];
  stats: {
    totalLanguages: number;
    totalCountries: number;
    fsiDistribution: Record<FSICategory, number>;
    familyDistribution: Record<string, number>;
  };
}

/**
 * FSI数据验证器
 */
export class DataValidator {
  private errors: ValidationError[] = [];
  private warnings: ValidationError[] = [];

  /**
   * 完整的数据验证
   */
  validate(): ValidationResult {
    this.errors = [];
    this.warnings = [];

    // 1. 基础数据结构验证
    this.validateBasicStructure();

    // 2. FSI分类和学时验证
    this.validateFSIData();

    // 3. 难度分数验证
    this.validateDifficultyScores();

    // 4. 语言家族验证
    this.validateLanguageFamilies();

    // 5. 国家映射一致性验证
    this.validateCountryMapping();

    // 6. 数据完整性验证
    this.validateDataCompleteness();

    return {
      valid: this.errors.length === 0,
      errors: this.errors.filter((e) => e.type === 'error'),
      warnings: this.warnings.concat(this.errors.filter((e) => e.type === 'warning')),
      stats: this.calculateStats(),
    };
  }

  /**
   * 基础数据结构验证
   */
  private validateBasicStructure(): void {
    const { languages } = FSI_LANGUAGE_DATA;

    // 检查目标语言数量
    if (languages.length !== 50) {
      this.addError('structure', `Expected 50 languages, found ${languages.length}`, 'warning');
    }

    // 检查必需字段
    languages.forEach((lang, index) => {
      const requiredFields = [
        'id',
        'name',
        'nativeName',
        'countries',
        'fsi',
        'difficulty',
        'family',
        'subfamily',
        'writingSystem',
        'speakers',
        'flagEmoji',
        'color',
      ];

      requiredFields.forEach((field) => {
        if (!lang[field as keyof Language]) {
          this.addError(
            'structure',
            `Language at index ${index} missing required field: ${field}`,
            'error',
            lang.id
          );
        }
      });
    });

    // 检查ID唯一性
    const ids = languages.map((l) => l.id);
    const uniqueIds = new Set(ids);
    if (uniqueIds.size !== ids.length) {
      this.addError('structure', 'Duplicate language IDs found', 'error');
    }

    // 检查名称唯一性
    const names = languages.map((l) => l.name);
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== names.length) {
      this.addError('structure', 'Duplicate language names found', 'warning');
    }
  }

  /**
   * FSI数据验证
   */
  private validateFSIData(): void {
    const { languages } = FSI_LANGUAGE_DATA;

    languages.forEach((lang) => {
      const { category, hours } = lang.fsi;

      // FSI分类范围检查
      if (category < 0 || category > 5) {
        this.addError('fsi', `Invalid FSI category ${category} for ${lang.name}`, 'error', lang.id);
        return;
      }

      // FSI学时与分类对应检查
      const expectedHours = this.getExpectedHours(category);
      if (!expectedHours.includes(hours)) {
        this.addError(
          'fsi',
          `Invalid hours ${hours} for FSI category ${category} in ${lang.name}. Expected: ${expectedHours.join(', ')}`,
          'error',
          lang.id
        );
      }
    });
  }

  /**
   * 难度分数验证
   */
  private validateDifficultyScores(): void {
    const { languages } = FSI_LANGUAGE_DATA;

    languages.forEach((lang) => {
      const { overall, grammar, pronunciation, vocabulary } = lang.difficulty;
      const scores = [overall, grammar, pronunciation, vocabulary];
      const scoreNames = ['overall', 'grammar', 'pronunciation', 'vocabulary'];

      scores.forEach((score, index) => {
        if (score < 0 || score > 10) {
          this.addError(
            'difficulty',
            `Invalid ${scoreNames[index]} difficulty score ${score} for ${lang.name}. Must be 0-10.`,
            'error',
            lang.id
          );
        }
      });

      // 英语应该是零难度
      if (lang.id === 'en' && scores.some((score) => score !== 0)) {
        this.addError('difficulty', `English should have zero difficulty scores`, 'error', lang.id);
      }

      // 难度与FSI分类相关性检查
      const expectedDifficultyRange = this.getExpectedDifficultyRange(lang.fsi.category);
      if (overall < expectedDifficultyRange.min || overall > expectedDifficultyRange.max) {
        this.addError(
          'difficulty',
          `Difficulty ${overall} for ${lang.name} doesn't match FSI category ${lang.fsi.category}`,
          'warning',
          lang.id
        );
      }
    });
  }

  /**
   * 语言家族验证
   */
  private validateLanguageFamilies(): void {
    const { languages } = FSI_LANGUAGE_DATA;
    const validFamilies = [
      'Indo-European',
      'Sino-Tibetan',
      'Austronesian',
      'Niger-Congo',
      'Afro-Asiatic',
      'Kra-Dai',
      'Austroasiatic',
      'Koreanic',
      'Japonic',
      'Turkic',
      'Uralic',
      'Mongolic',
      'Dravidian',
    ];

    languages.forEach((lang) => {
      if (!validFamilies.includes(lang.family)) {
        this.addError(
          'family',
          `Invalid language family "${lang.family}" for ${lang.name}`,
          'error',
          lang.id
        );
      }

      // 检查相关语言家族一致性
      this.validateFamilyConsistency(lang);
    });
  }

  /**
   * 国家映射一致性验证
   */
  private validateCountryMapping(): void {
    const { languages } = FSI_LANGUAGE_DATA;
    const countries = Object.keys(COUNTRY_LANGUAGE_MAPPING);

    // 检查语言中提到的国家是否在映射中存在
    languages.forEach((lang) => {
      lang.countries.forEach((countryName) => {
        if (!COUNTRY_LANGUAGE_MAPPING[countryName]) {
          this.addError(
            'mapping',
            `Country "${countryName}" mentioned in ${lang.name} not found in country mapping`,
            'error',
            lang.id
          );
        }
      });
    });

    // 检查国家映射中的语言是否存在
    const languageIds = new Set(languages.map((l) => l.id));
    countries.forEach((countryName) => {
      const country = COUNTRY_LANGUAGE_MAPPING[countryName];

      if (!languageIds.has(country.primary)) {
        this.addError(
          'mapping',
          `Primary language "${country.primary}" for ${countryName} not found`,
          'error',
          undefined,
          countryName
        );
      }

      country.secondary.forEach((langId) => {
        if (!languageIds.has(langId)) {
          this.addError(
            'mapping',
            `Secondary language "${langId}" for ${countryName} not found`,
            'warning',
            undefined,
            countryName
          );
        }
      });
    });
  }

  /**
   * 数据完整性验证
   */
  private validateDataCompleteness(): void {
    const familyStats = calculateLanguageFamilyStats();
    const emptyFamilies = familyStats.filter((f) => f.languageCount === 0);

    if (emptyFamilies.length > 0) {
      this.addError(
        'completeness',
        `Empty language families: ${emptyFamilies.map((f) => f.name).join(', ')}`,
        'warning'
      );
    }

    // 检查FSI分类覆盖
    const fsiStats = this.calculateStats().fsiDistribution;
    Object.keys(fsiStats).forEach((category) => {
      const catNum = parseInt(category);
      if (catNum > 0 && fsiStats[catNum as FSICategory] < 2) {
        this.addError(
          'completeness',
          `Low representation for FSI category ${category}: ${fsiStats[catNum as FSICategory]} languages`,
          'warning'
        );
      }
    });
  }

  /**
   * 添加错误信息
   */
  private addError(
    category: string,
    message: string,
    type: 'error' | 'warning' = 'error',
    languageId?: string,
    countryName?: string
  ): void {
    const error: ValidationError = {
      type,
      category,
      message,
      languageId,
      countryName,
    };

    if (type === 'error') {
      this.errors.push(error);
    } else {
      this.warnings.push(error);
    }
  }

  /**
   * 获取FSI分类对应的预期学时
   */
  private getExpectedHours(category: FSICategory): number[] {
    switch (category) {
      case 0:
        return [0];
      case 1:
        return [600, 750];
      case 2:
        return [900];
      case 3:
        return [1100];
      case 4:
        return [1800];
      case 5:
        return [2200];
      default:
        return [];
    }
  }

  /**
   * 获取FSI分类对应的预期难度范围
   */
  private getExpectedDifficultyRange(category: FSICategory): { min: number; max: number } {
    switch (category) {
      case 0:
        return { min: 0, max: 0 };
      case 1:
        return { min: 2, max: 4 };
      case 2:
        return { min: 3, max: 5 };
      case 3:
        return { min: 4, max: 7 };
      case 4:
        return { min: 6, max: 8 };
      case 5:
        return { min: 7, max: 10 };
      default:
        return { min: 0, max: 10 };
    }
  }

  /**
   * 验证语言家族一致性
   */
  private validateFamilyConsistency(lang: Language): void {
    // Romance语言检查
    if (lang.subfamily === 'Romance' && lang.family !== 'Indo-European') {
      this.addError(
        'family',
        `Romance language ${lang.name} should belong to Indo-European family`,
        'error',
        lang.id
      );
    }

    // Germanic语言检查
    if (lang.subfamily === 'Germanic' && lang.family !== 'Indo-European') {
      this.addError(
        'family',
        `Germanic language ${lang.name} should belong to Indo-European family`,
        'error',
        lang.id
      );
    }

    // Slavic语言检查
    if (lang.subfamily === 'Slavic' && lang.family !== 'Indo-European') {
      this.addError(
        'family',
        `Slavic language ${lang.name} should belong to Indo-European family`,
        'error',
        lang.id
      );
    }
  }

  /**
   * 计算统计信息
   */
  private calculateStats() {
    const { languages } = FSI_LANGUAGE_DATA;

    const fsiDistribution = languages.reduce(
      (acc, lang) => {
        acc[lang.fsi.category] = (acc[lang.fsi.category] || 0) + 1;
        return acc;
      },
      {} as Record<FSICategory, number>
    );

    const familyDistribution = languages.reduce(
      (acc, lang) => {
        acc[lang.family] = (acc[lang.family] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return {
      totalLanguages: languages.length,
      totalCountries: Object.keys(COUNTRY_LANGUAGE_MAPPING).length,
      fsiDistribution,
      familyDistribution,
    };
  }
}

/**
 * 快速数据验证函数
 */
export function validateLanguageData(): ValidationResult {
  const validator = new DataValidator();
  return validator.validate();
}

/**
 * 生成数据质量报告
 */
export function generateDataQualityReport(): string {
  const result = validateLanguageData();

  let report = '# 语言学习平台数据质量报告\n\n';

  // 总体状态
  report += `## 总体状态: ${result.valid ? '✅ 通过' : '❌ 存在问题'}\n\n`;

  // 统计信息
  report += '## 数据统计\n';
  report += `- 总语言数: ${result.stats.totalLanguages}\n`;
  report += `- 总国家数: ${result.stats.totalCountries}\n`;
  report += '- FSI分类分布:\n';
  Object.entries(result.stats.fsiDistribution).forEach(([cat, count]) => {
    report += `  - Category ${cat}: ${count}个语言\n`;
  });

  // 错误信息
  if (result.errors.length > 0) {
    report += '\n## ❌ 错误信息\n';
    result.errors.forEach((error, index) => {
      report += `${index + 1}. [${error.category}] ${error.message}`;
      if (error.languageId) report += ` (语言: ${error.languageId})`;
      if (error.countryName) report += ` (国家: ${error.countryName})`;
      report += '\n';
    });
  }

  // 警告信息
  if (result.warnings.length > 0) {
    report += '\n## ⚠️ 警告信息\n';
    result.warnings.forEach((warning, index) => {
      report += `${index + 1}. [${warning.category}] ${warning.message}`;
      if (warning.languageId) report += ` (语言: ${warning.languageId})`;
      if (warning.countryName) report += ` (国家: ${warning.countryName})`;
      report += '\n';
    });
  }

  if (result.valid) {
    report += '\n## 🎉 恭喜！所有数据验证通过，可以开始TDD开发了！\n';
  }

  return report;
}

export default DataValidator;
