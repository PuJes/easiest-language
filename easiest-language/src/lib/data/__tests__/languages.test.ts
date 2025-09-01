import { FSI_LANGUAGE_DATA } from '../languages';
import type { Language, FSICategory } from '../../types';

describe('FSI Language Data Validation', () => {
  const { languages } = FSI_LANGUAGE_DATA;

  describe('Data Structure Integrity', () => {
    test('should have exactly 50 languages for MVP', () => {
      expect(languages).toHaveLength(50); // MVP目标：50种语言
    });

    test('all languages should have required fields', () => {
      languages.forEach((lang: Language) => {
        expect(lang).toHaveProperty('id');
        expect(lang).toHaveProperty('name');
        expect(lang).toHaveProperty('nativeName');
        expect(lang).toHaveProperty('countries');
        expect(lang).toHaveProperty('fsi');
        expect(lang).toHaveProperty('difficulty');
        expect(lang).toHaveProperty('family');
        expect(lang).toHaveProperty('subfamily');
        expect(lang).toHaveProperty('writingSystem');
        expect(lang).toHaveProperty('speakers');
        expect(lang).toHaveProperty('flagEmoji');
        expect(lang).toHaveProperty('color');
      });
    });

    test('all language IDs should be unique', () => {
      const ids = languages.map((lang) => lang.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    test('all language names should be unique', () => {
      const names = languages.map((lang) => lang.name);
      const uniqueNames = new Set(names);
      expect(uniqueNames.size).toBe(names.length);
    });
  });

  describe('FSI Category Validation', () => {
    test('FSI categories should be within valid range (0-5)', () => {
      languages.forEach((lang: Language) => {
        expect(lang.fsi.category).toBeGreaterThanOrEqual(0);
        expect(lang.fsi.category).toBeLessThanOrEqual(5);
      });
    });

    test('FSI hours should correspond to categories', () => {
      languages.forEach((lang: Language) => {
        const { category, hours } = lang.fsi;

        switch (category as FSICategory) {
          case 0:
            expect(hours).toBe(0); // Native language
            break;
          case 1:
            expect(hours).toBeGreaterThanOrEqual(600);
            expect(hours).toBeLessThanOrEqual(750);
            break;
          case 2:
            expect(hours).toBe(900);
            break;
          case 3:
            expect(hours).toBe(1100);
            break;
          case 4:
            expect(hours).toBe(1800);
            break;
          case 5:
            expect(hours).toBe(2200);
            break;
          default:
            fail(`Invalid FSI category: ${category}`);
        }
      });
    });

    test('should have correct distribution of FSI categories for 50 languages', () => {
      const categoryCount = languages.reduce(
        (acc, lang) => {
          const category = lang.fsi.category;
          acc[category] = (acc[category] || 0) + 1;
          return acc;
        },
        {} as Record<number, number>
      );

      // Check that we have balanced distribution across categories (根据实际分布调整)
      expect(categoryCount[0]).toBeGreaterThanOrEqual(1); // Native (English)
      expect(categoryCount[1]).toBeGreaterThanOrEqual(8); // Category I (easy) - 11个
      expect(categoryCount[2]).toBeGreaterThanOrEqual(8); // Category II - 10个
      expect(categoryCount[3]).toBeGreaterThanOrEqual(20); // Category III - 23个（最多）
      expect(categoryCount[4]).toBeGreaterThanOrEqual(2); // Category IV - 2个
      expect(categoryCount[5]).toBeGreaterThanOrEqual(3); // Category V (hardest) - 3个
    });
  });

  describe('Difficulty Scores Validation', () => {
    test('difficulty scores should be within valid range (0-10)', () => {
      languages.forEach((lang: Language) => {
        const { overall, grammar, pronunciation, vocabulary } = lang.difficulty;

        expect(overall).toBeGreaterThanOrEqual(0);
        expect(overall).toBeLessThanOrEqual(10);
        expect(grammar).toBeGreaterThanOrEqual(0);
        expect(grammar).toBeLessThanOrEqual(10);
        expect(pronunciation).toBeGreaterThanOrEqual(0);
        expect(pronunciation).toBeLessThanOrEqual(10);
        expect(vocabulary).toBeGreaterThanOrEqual(0);
        expect(vocabulary).toBeLessThanOrEqual(10);
      });
    });

    test('English should have zero difficulty scores', () => {
      const english = languages.find((lang) => lang.id === 'en');
      expect(english).toBeDefined();
      if (english) {
        expect(english.difficulty.overall).toBe(0);
        expect(english.difficulty.grammar).toBe(0);
        expect(english.difficulty.pronunciation).toBe(0);
        expect(english.difficulty.vocabulary).toBe(0);
      }
    });

    test('difficulty should generally correlate with FSI category', () => {
      const categoryI = languages.filter((lang) => lang.fsi.category === 1);
      const categoryV = languages.filter((lang) => lang.fsi.category === 5);

      if (categoryI.length > 0 && categoryV.length > 0) {
        const avgCat1Difficulty =
          categoryI.reduce((sum, lang) => sum + lang.difficulty.overall, 0) / categoryI.length;
        const avgCat5Difficulty =
          categoryV.reduce((sum, lang) => sum + lang.difficulty.overall, 0) / categoryV.length;

        expect(avgCat5Difficulty).toBeGreaterThan(avgCat1Difficulty);
      }
    });
  });

  describe('Language Family Validation', () => {
    test('should have valid language families', () => {
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
        'Uralic', // 芬兰-乌戈尔语族 (Finnish, Hungarian, Estonian)
        'Mongolic', // 蒙古语族 (Mongolian)
        'Dravidian', // 达罗毗荼语族 (Tamil, Telugu)
      ];

      languages.forEach((lang: Language) => {
        expect(validFamilies).toContain(lang.family);
      });
    });

    test('related languages should have same family', () => {
      const romananceLanguages = ['es', 'pt', 'it', 'fr', 'ro'];
      const germanicLanguages = ['en', 'de', 'nl', 'sv', 'no'];

      romananceLanguages.forEach((id) => {
        const lang = languages.find((l) => l.id === id);
        if (lang) {
          expect(lang.family).toBe('Indo-European');
          expect(lang.subfamily).toBe('Romance');
        }
      });

      germanicLanguages.forEach((id) => {
        const lang = languages.find((l) => l.id === id);
        if (lang) {
          expect(lang.family).toBe('Indo-European');
          expect(lang.subfamily).toBe('Germanic');
        }
      });
    });
  });

  describe('Numerical Data Validation', () => {
    test('speaker counts should be positive numbers', () => {
      languages.forEach((lang: Language) => {
        expect(lang.speakers).toBeGreaterThan(0);
        expect(Number.isInteger(lang.speakers)).toBe(true);
      });
    });

    test('should have reasonable speaker counts', () => {
      // Chinese should have the most speakers
      const chinese = languages.find((lang) => lang.id === 'zh');
      expect(chinese).toBeDefined();
      if (chinese) {
        expect(chinese.speakers).toBeGreaterThan(900000000);
      }

      // English should have high speaker count (including non-natives)
      const english = languages.find((lang) => lang.id === 'en');
      expect(english).toBeDefined();
      if (english) {
        expect(english.speakers).toBeGreaterThan(1000000000);
      }
    });

    test('colors should be valid hex codes', () => {
      const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      languages.forEach((lang: Language) => {
        expect(lang.color).toMatch(hexColorRegex);
      });
    });
  });

  describe('Country Data Validation', () => {
    test('all languages should have at least one country', () => {
      languages.forEach((lang: Language) => {
        expect(lang.countries.length).toBeGreaterThan(0);
        expect(Array.isArray(lang.countries)).toBe(true);
      });
    });

    test('country names should be non-empty strings', () => {
      languages.forEach((lang: Language) => {
        lang.countries.forEach((country: string) => {
          expect(typeof country).toBe('string');
          expect(country.length).toBeGreaterThan(0);
          expect(country.trim()).toBe(country); // No leading/trailing whitespace
        });
      });
    });
  });

  describe('Writing System Validation', () => {
    test('should have valid writing systems', () => {
      const validWritingSystems = [
        'Latin',
        'Arabic',
        'Chinese Characters',
        'Cyrillic',
        'Devanagari',
        'Thai',
        'Hebrew',
        'Hangul',
        'Hiragana, Katakana, Kanji',
        'Bengali',
        'Arabic (Persian)',
        'Arabic (Urdu)',
        'Latin (Vietnamese)',
        'Greek', // 希腊文
        'Ethiopic', // 埃塞俄比亚文
        'Tamil', // 泰米尔文
        'Telugu', // 泰卢固文
      ];

      languages.forEach((lang: Language) => {
        expect(validWritingSystems).toContain(lang.writingSystem);
      });
    });
  });

  describe('Flag Emoji Validation', () => {
    test('all languages should have flag emojis', () => {
      languages.forEach((lang: Language) => {
        expect(lang.flagEmoji).toMatch(
          /^🇦🇩|🇦🇪|🇦🇫|🇦🇬|🇦🇮|🇦🇱|🇦🇲|🇦🇴|🇦🇶|🇦🇷|🇦🇸|🇦🇹|🇦🇺|🇦🇼|🇦🇽|🇦🇿|🇧🇦|🇧🇧|🇧🇩|🇧🇪|🇧🇫|🇧🇬|🇧🇭|🇧🇮|🇧🇯|🇧🇱|🇧🇲|🇧🇳|🇧🇴|🇧🇶|🇧🇷|🇧🇸|🇧🇹|🇧🇻|🇧🇼|🇧🇾|🇧🇿|🇨🇦|🇨🇨|🇨🇩|🇨🇫|🇨🇬|🇨🇭|🇨🇮|🇨🇰|🇨🇱|🇨🇲|🇨🇳|🇨🇴|🇨🇵|🇨🇷|🇨🇺|🇨🇻|🇨🇼|🇨🇽|🇨🇾|🇨🇿|🇩🇪|🇩🇬|🇩🇯|🇩🇰|🇩🇲|🇩🇴|🇩🇿|🇪🇦|🇪🇨|🇪🇪|🇪🇬|🇪🇭|🇪🇷|🇪🇸|🇪🇹|🇪🇺|🇫🇮|🇫🇯|🇫🇰|🇫🇲|🇫🇴|🇫🇷|🇬🇦|🇬🇧|🇬🇩|🇬🇪|🇬🇫|🇬🇬|🇬🇭|🇬🇮|🇬🇱|🇬🇲|🇬🇳|🇬🇵|🇬🇶|🇬🇷|🇬🇸|🇬🇹|🇬🇺|🇬🇼|🇬🇾|🇭🇰|🇭🇲|🇭🇳|🇭🇷|🇭🇹|🇭🇺|🇮🇨|🇮🇩|🇮🇪|🇮🇱|🇮🇲|🇮🇳|🇮🇴|🇮🇶|🇮🇷|🇮🇸|🇮🇹|🇯🇪|🇯🇲|🇯🇴|🇯🇵|🇰🇪|🇰🇬|🇰🇭|🇰🇮|🇰🇲|🇰🇳|🇰🇵|🇰🇷|🇰🇼|🇰🇾|🇰🇿|🇱🇦|🇱🇧|🇱🇨|🇱🇮|🇱🇰|🇱🇷|🇱🇸|🇱🇹|🇱🇺|🇱🇻|🇱🇾|🇲🇦|🇲🇨|🇲🇩|🇲🇪|🇲🇫|🇲🇬|🇲🇭|🇲🇰|🇲🇱|🇲🇲|🇲🇳|🇲🇴|🇲🇵|🇲🇶|🇲🇷|🇲🇸|🇲🇹|🇲🇺|🇲🇻|🇲🇼|🇲🇽|🇲🇾|🇲🇿|🇳🇦|🇳🇨|🇳🇪|🇳🇫|🇳🇬|🇳🇮|🇳🇱|🇳🇴|🇳🇵|🇳🇷|🇳🇺|🇳🇿|🇴🇲|🇵🇦|🇵🇪|🇵🇫|🇵🇬|🇵🇭|🇵🇰|🇵🇱|🇵🇲|🇵🇳|🇵🇷|🇵🇸|🇵🇹|🇵🇼|🇵🇾|🇶🇦|🇷🇪|🇷🇴|🇷🇸|🇷🇺|🇷🇼|🇸🇦|🇸🇧|🇸🇨|🇸🇩|🇸🇪|🇸🇬|🇸🇭|🇸🇮|🇸🇯|🇸🇰|🇸🇱|🇸🇲|🇸🇳|🇸🇴|🇸🇷|🇸🇸|🇸🇹|🇸🇻|🇸🇽|🇸🇾|🇸🇿|🇹🇦|🇹🇨|🇹🇩|🇹🇫|🇹🇬|🇹🇭|🇹🇯|🇹🇰|🇹🇱|🇹🇲|🇹🇳|🇹🇴|🇹🇷|🇹🇹|🇹🇻|🇹🇼|🇹🇿|🇺🇦|🇺🇬|🇺🇲|🇺🇸|🇺🇾|🇺🇿|🇻🇦|🇻🇨|🇻🇪|🇻🇬|🇻🇮|🇻🇳|🇻🇺|🇼🇫|🇼🇸|🇽🇰|🇾🇪|🇾🇹|🇿🇦|🇿🇲|🇿🇼$/
        );
      });
    });
  });
});
