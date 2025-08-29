import { 
  COUNTRY_LANGUAGE_MAPPING, 
  getCountryColor, 
  getCountryLanguageInfo 
} from '../countries'
import { FSI_LANGUAGE_DATA } from '../languages'
import type { CountryLanguageData } from '../../types'

describe('Country Language Mapping Validation', () => {
  const countries = Object.keys(COUNTRY_LANGUAGE_MAPPING)
  const languageIds = FSI_LANGUAGE_DATA.languages.map(lang => lang.id)

  describe('Data Structure Integrity', () => {
    test('should have at least 75 countries mapped', () => {
      expect(countries.length).toBeGreaterThanOrEqual(75)
    })

    test('all countries should have required fields', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        expect(country).toHaveProperty('primary')
        expect(country).toHaveProperty('secondary')
        expect(country).toHaveProperty('languages')
        expect(country).toHaveProperty('region')
        expect(country).toHaveProperty('difficulty_avg')
      })
    })

    test('all country names should be non-empty strings', () => {
      countries.forEach(countryName => {
        expect(typeof countryName).toBe('string')
        expect(countryName.length).toBeGreaterThan(0)
        expect(countryName.trim()).toBe(countryName)
      })
    })
  })

  describe('Language ID Validation', () => {
    test('all primary languages should exist in language data', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        expect(languageIds).toContain(country.primary)
      })
    })

    test('all secondary languages should exist in language data', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        country.secondary.forEach(langId => {
          expect(languageIds).toContain(langId)
        })
      })
    })

    test('all languages array should exist in language data', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        country.languages.forEach(langId => {
          expect(languageIds).toContain(langId)
        })
      })
    })

    test('primary language should be included in languages array', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        expect(country.languages).toContain(country.primary)
      })
    })

    test('secondary languages should be included in languages array', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        country.secondary.forEach(langId => {
          expect(country.languages).toContain(langId)
        })
      })
    })
  })

  describe('Geographic Region Validation', () => {
    test('should have valid geographic regions', () => {
      const validRegions = [
        'North America',
        'South America', 
        'Europe',
        'Asia',
        'Africa',
        'Oceania',
        'Middle East',
        'Europe/Asia',
        'Middle East/Africa'
      ]

      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        expect(validRegions).toContain(country.region)
      })
    })

    test('should have reasonable regional distribution', () => {
      const regionCounts = countries.reduce((acc, countryName) => {
        const region = COUNTRY_LANGUAGE_MAPPING[countryName].region
        acc[region] = (acc[region] || 0) + 1
        return acc
      }, {} as Record<string, number>)

      // Should have multiple countries per major region
      expect(regionCounts['Europe']).toBeGreaterThanOrEqual(15)
      expect(regionCounts['Asia']).toBeGreaterThanOrEqual(15)
      expect(regionCounts['Africa']).toBeGreaterThanOrEqual(10)
      expect(regionCounts['North America']).toBeGreaterThanOrEqual(3)
      expect(regionCounts['South America']).toBeGreaterThanOrEqual(6)
    })
  })

  describe('Difficulty Average Validation', () => {
    test('difficulty averages should be within valid range (0-9)', () => {
      countries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        expect(country.difficulty_avg).toBeGreaterThanOrEqual(0)
        expect(country.difficulty_avg).toBeLessThanOrEqual(9)
      })
    })

    test('English-speaking countries should have low difficulty', () => {
      const englishCountries = countries.filter(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        return country.primary === 'en'
      })

      englishCountries.forEach(countryName => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        expect(country.difficulty_avg).toBeLessThanOrEqual(2)
      })
    })

    test('Chinese-speaking regions should have high difficulty', () => {
      const chineseRegions = ['China', 'Taiwan', 'Hong Kong', 'Macau']
      
      chineseRegions.forEach(countryName => {
        if (COUNTRY_LANGUAGE_MAPPING[countryName]) {
          const country = COUNTRY_LANGUAGE_MAPPING[countryName]
          expect(country.difficulty_avg).toBeGreaterThanOrEqual(6)
        }
      })
    })
  })

  describe('Consistency Validation', () => {
    test('should have bidirectional consistency with language data', () => {
      // Every country mentioned in language data should exist in country mapping
      FSI_LANGUAGE_DATA.languages.forEach(lang => {
        lang.countries.forEach(countryName => {
          expect(COUNTRY_LANGUAGE_MAPPING[countryName]).toBeDefined()
          
          if (COUNTRY_LANGUAGE_MAPPING[countryName]) {
            const country = COUNTRY_LANGUAGE_MAPPING[countryName]
            expect(country.languages).toContain(lang.id)
          }
        })
      })
    })

    test('major language countries should be correctly mapped', () => {
      const testCases = [
        { country: 'Spain', language: 'es' },
        { country: 'France', language: 'fr' },
        { country: 'Germany', language: 'de' },
        { country: 'Italy', language: 'it' },
        { country: 'China', language: 'zh' },
        { country: 'Japan', language: 'ja' },
        { country: 'South Korea', language: 'ko' },
        { country: 'Russian Federation', language: 'ru' },
        { country: 'Brazil', language: 'pt' },
        { country: 'United States of America', language: 'en' }
      ]

      testCases.forEach(({ country, language }) => {
        expect(COUNTRY_LANGUAGE_MAPPING[country]).toBeDefined()
        expect(COUNTRY_LANGUAGE_MAPPING[country].primary).toBe(language)
      })
    })
  })

  describe('Helper Functions', () => {
    describe('getCountryColor', () => {
      test('should return valid hex colors', () => {
        const hexColorRegex = /^#([A-Fa-f0-9]{6})$/
        
        countries.forEach(countryName => {
          const color = getCountryColor(countryName)
          expect(color).toMatch(hexColorRegex)
        })
      })

      test('should return default color for unknown country', () => {
        const color = getCountryColor('Nonexistent Country')
        expect(color).toBe('#94a3b8')
      })

      test('should return correct colors for difficulty levels', () => {
        // English countries (difficulty 0)
        expect(getCountryColor('United States of America')).toBe('#6c757d')
        
        // Easy languages (difficulty <= 3)
        expect(getCountryColor('Spain')).toBe('#28a745') // Spanish
        
        // Medium languages (difficulty <= 6)  
        expect(getCountryColor('Germany')).toBe('#fd7e14') // German
        
        // Hard languages (difficulty > 7)
        expect(getCountryColor('China')).toBe('#6f42c1') // Chinese
      })
    })

    describe('getCountryLanguageInfo', () => {
      test('should return detailed language information', () => {
        const info = getCountryLanguageInfo('Spain', FSI_LANGUAGE_DATA)
        expect(info).toBeDefined()
        if (info) {
          expect(info.primary).toBe('es')
          expect(info.languages).toHaveLength(1)
          expect(info.languages[0].name).toBe('Spanish')
          expect(info.region).toBe('Europe')
        }
      })

      test('should return null for unknown country', () => {
        const info = getCountryLanguageInfo('Nonexistent Country', FSI_LANGUAGE_DATA)
        expect(info).toBeNull()
      })

      test('should handle multilingual countries correctly', () => {
        const info = getCountryLanguageInfo('Switzerland', FSI_LANGUAGE_DATA)
        expect(info).toBeDefined()
        if (info) {
          expect(info.languages.length).toBeGreaterThan(1)
          expect(info.languages.map(l => l.id)).toContain('de')
          expect(info.languages.map(l => l.id)).toContain('fr')
          expect(info.languages.map(l => l.id)).toContain('it')
        }
      })
    })
  })

  describe('Data Quality Checks', () => {
    test('should have no duplicate country entries', () => {
      const countryNames = Object.keys(COUNTRY_LANGUAGE_MAPPING)
      const uniqueCountries = new Set(countryNames)
      expect(uniqueCountries.size).toBe(countryNames.length)
    })

    test('should have reasonable language distribution', () => {
      const languageUsage = countries.reduce((acc, countryName) => {
        const country = COUNTRY_LANGUAGE_MAPPING[countryName]
        country.languages.forEach(langId => {
          acc[langId] = (acc[langId] || 0) + 1
        })
        return acc
      }, {} as Record<string, number>)

      // Major languages should be used in multiple countries
      expect(languageUsage['en']).toBeGreaterThanOrEqual(8) // English
      expect(languageUsage['es']).toBeGreaterThanOrEqual(10) // Spanish
      expect(languageUsage['ar']).toBeGreaterThanOrEqual(8) // Arabic
      expect(languageUsage['fr']).toBeGreaterThanOrEqual(6) // French
    })
  })
})