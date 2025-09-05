'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  BookOpenIcon,
  GlobeAltIcon,
  UsersIcon,
  ChartBarIcon,
  AcademicCapIcon,
  MapPinIcon,
  LinkIcon,
  PlayIcon,
} from '@heroicons/react/24/outline';
import FSIBadge from './FSIBadge';
import { ExtendedLanguageDetail } from '@/lib/data/data-adapters';

// 辅助函数：获取难度描述
function getDifficultyDescription(category: number): string {
  const descriptions = {
    1: 'easiest',
    2: 'relatively easy', 
    3: 'moderately difficult',
    4: 'challenging',
    5: 'very challenging'
  };
  return descriptions[category as keyof typeof descriptions] || 'moderate';
}

// 辅助函数：获取语法描述
function getGrammarDescription(level: number): string {
  const descriptions = {
    1: 'Very simple grammar structure',
    2: 'Simple grammar with few exceptions',
    3: 'Moderate complexity with some rules',
    4: 'Complex grammar with many rules',
    5: 'Very complex grammar system'
  };
  return descriptions[level as keyof typeof descriptions] || 'Moderate complexity';
}

// 辅助函数：获取发音描述
function getPronunciationDescription(level: number): string {
  const descriptions = {
    1: 'Easy pronunciation for English speakers',
    2: 'Some new sounds to learn',
    3: 'Moderate pronunciation challenges',
    4: 'Difficult pronunciation patterns',
    5: 'Very challenging pronunciation system'
  };
  return descriptions[level as keyof typeof descriptions] || 'Moderate difficulty';
}

// 辅助函数：获取词汇描述
function getVocabularyDescription(level: number): string {
  const descriptions = {
    1: 'Many cognates with English',
    2: 'Some familiar vocabulary',
    3: 'Moderate vocabulary learning required',
    4: 'Extensive vocabulary to master',
    5: 'Very extensive vocabulary system'
  };
  return descriptions[level as keyof typeof descriptions] || 'Moderate vocabulary';
}

// 辅助函数：获取相似性
function getSimilarities(language: ExtendedLanguageDetail): string[] {
  const similarities: string[] = [];
  
  if (language.family === 'Indo-European') {
    similarities.push('Both are Indo-European languages');
  }
  
  if (language.writingSystem === 'Latin') {
    similarities.push('Uses the same Latin alphabet');
  }
  
  if (language.fsi.category <= 2) {
    similarities.push('Similar sentence structure to English');
    similarities.push('Many cognates with English words');
  }
  
  return similarities.length > 0 ? similarities : ['Both are human languages with grammar rules'];
}

// 辅助函数：获取差异
function getDifferences(language: ExtendedLanguageDetail): string[] {
  const differences: string[] = [];
  
  if (language.writingSystem !== 'Latin') {
    differences.push(`Uses ${language.writingSystem} writing system`);
  }
  
  if (language.fsi.details.grammar >= 4) {
    differences.push('More complex grammar than English');
  }
  
  if (language.fsi.details.pronunciation >= 4) {
    differences.push('Different pronunciation patterns');
  }
  
  if (language.family !== 'Indo-European') {
    differences.push('Different language family structure');
  }
  
  return differences.length > 0 ? differences : ['Different vocabulary and cultural context'];
}

interface LanguageDetailProps {
  language: ExtendedLanguageDetail;
}

const LanguageDetail: React.FC<LanguageDetailProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: GlobeAltIcon },
    { id: 'difficulty', label: 'Learning Difficulty', icon: ChartBarIcon },
    { id: 'resources', label: 'Learning Resources', icon: BookOpenIcon },
    { id: 'culture', label: 'Culture & Context', icon: UsersIcon },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <AcademicCapIcon className="h-6 w-6 text-blue-600" />
                  Language Family
                </h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Family:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{language.family}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">Subfamily:</span>
                    <span className="ml-2 text-gray-900 dark:text-white">{language.subfamily}</span>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Writing System:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {language.writingSystem}
                    </span>
                  </div>
                </div>
              </div>

              {/* Geography Section */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPinIcon className="h-6 w-6 text-green-600" />
                  Geographic Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Primary Regions:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {language.geography.primaryRegions.map((region) => (
                        <span
                          key={region}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <UsersIcon className="h-6 w-6 text-green-600" />
                  Speaker Statistics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {language.speakers.native}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Native Speakers</div>
                  </div>
                  <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div
                      className="text-2xl font-bold text-gray-900 dark:text-white"
                      data-testid="speakers-count"
                    >
                      {language.speakers.total}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Speakers</div>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                    #{language.speakers.rank} Most Spoken Worldwide
                  </span>
                </div>
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <MapPinIcon className="h-6 w-6 text-red-600" />
                  Geographic Distribution
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Primary Regions
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {language.geography.primaryRegions.map((region) => (
                        <span
                          key={region}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Also Spoken In
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {language.geography.secondaryRegions.map((region) => (
                        <span
                          key={region}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {region}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Continents
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {language.geography.continents.map((continent) => (
                        <span
                          key={continent}
                          className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {continent}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Speaker Statistics Visual */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Speaker Distribution
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Native Speakers
                      </span>
                      <span className="text-xl font-bold text-blue-600">
                        {language.speakers.native}
                      </span>
                    </div>
                    <div className="w-full bg-blue-200 dark:bg-blue-700 rounded-full h-2 mt-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        Total Speakers
                      </span>
                      <span className="text-xl font-bold text-purple-600">
                        {language.speakers.total}
                      </span>
                    </div>
                    <div className="w-full bg-purple-200 dark:bg-purple-700 rounded-full h-2 mt-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: '85%' }}
                      ></div>
                    </div>
                  </div>

                  <div className="text-center mt-4">
                    <span className="bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 px-3 py-1 rounded-full text-sm font-medium">
                      #{language.speakers.rank} Most Spoken Worldwide
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 'difficulty':
        // 安全检查：确保fsi.details存在
        if (!language.fsi?.details) {
          return (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Learning Difficulty Data Not Available
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                The difficulty analysis data for this language is currently being prepared.
              </p>
            </div>
          );
        }

        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                FSI Learning Difficulty Analysis
              </h3>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 mb-6 text-center">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <FSIBadge category={language.fsi.category} size="lg" showLabel />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {language.fsi.hours} Hours
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Estimated study time for English speakers
                </div>
                <div className="text-lg font-medium text-blue-600 dark:text-blue-400 mt-2">
                  {language.fsi.description}
                </div>
              </div>

              <div className="space-y-4">
                {[
                  {
                    label: 'Grammar Complexity',
                    value: language.fsi.details.grammar,
                    color: 'blue',
                  },
                  {
                    label: 'Vocabulary Learning',
                    value: language.fsi.details.vocabulary,
                    color: 'green',
                  },
                  {
                    label: 'Pronunciation',
                    value: language.fsi.details.pronunciation,
                    color: 'yellow',
                  },
                  { label: 'Writing System', value: language.fsi.details.writing, color: 'red' },
                  {
                    label: 'Cultural Context',
                    value: language.fsi.details.cultural,
                    color: 'purple',
                  },
                ].map((aspect) => (
                  <div key={aspect.label} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-medium text-gray-700 dark:text-gray-300">
                        {aspect.label}
                      </span>
                      <span className="text-sm text-gray-500">{aspect.value}/5</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          aspect.color === 'blue'
                            ? 'bg-blue-500'
                            : aspect.color === 'green'
                              ? 'bg-green-500'
                              : aspect.color === 'yellow'
                                ? 'bg-yellow-500'
                                : aspect.color === 'red'
                                  ? 'bg-red-500'
                                  : 'bg-purple-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${(aspect.value / 5) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Difficulty Visualization
              </h3>
              <div className="h-80 flex items-center justify-center">
                {/* Simplified Radar Chart Visual */}
                <div className="relative w-60 h-60">
                  {/* Center circle */}
                  <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                    <FSIBadge category={language.fsi.category} size="sm" />
                  </div>

                  {/* Difficulty points */}
                  {[
                    { label: 'Grammar', value: language.fsi.details.grammar, angle: 0 },
                    { label: 'Vocabulary', value: language.fsi.details.vocabulary, angle: 72 },
                    {
                      label: 'Pronunciation',
                      value: language.fsi.details.pronunciation,
                      angle: 144,
                    },
                    { label: 'Writing', value: language.fsi.details.writing, angle: 216 },
                    { label: 'Cultural', value: language.fsi.details.cultural, angle: 288 },
                  ].map((item, index) => {
                    const radius = 80 + item.value * 15;
                    const x = Math.cos(((item.angle - 90) * Math.PI) / 180) * radius;
                    const y = Math.sin(((item.angle - 90) * Math.PI) / 180) * radius;

                    return (
                      <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                        }}
                      >
                        <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold">
                          {item.value}
                        </div>
                        <div className="text-xs text-center mt-1 font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                          {item.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                Interactive radar chart showing difficulty across 5 dimensions
              </div>
            </div>
          </div>
        );

      case 'resources':
        return (
          <div className="space-y-8">
            {Object.entries(language.learningResources).map(([type, resources]) => {
              // 只显示有资源的类型
              if (resources.length === 0) return null;

              // 资源类型的英文名称和图标映射
              const typeConfig = {
                app: {
                  name: 'Applications',
                  icon: '📱',
                  color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
                },
                book: {
                  name: 'Books',
                  icon: '📚',
                  color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
                },
                course: {
                  name: 'Courses',
                  icon: '🎓',
                  color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
                },
                website: {
                  name: 'Websites',
                  icon: '🌐',
                  color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
                },
                video: {
                  name: 'Videos',
                  icon: '🎥',
                  color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
                },
                podcast: {
                  name: 'Podcasts',
                  icon: '🎧',
                  color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
                },
              };

              const config = typeConfig[type as keyof typeof typeConfig];

              return (
                <div key={type} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                    <span className="text-2xl">{config.icon}</span>
                    {config.name}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      ({resources.length} resources)
                    </span>
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {resources.map((resource, index) => (
                      <motion.div
                        key={index}
                        className="group relative bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:border-blue-300 dark:hover:border-blue-500"
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        {/* 免费/付费标签 */}
                        <div className="absolute top-3 right-3">
                          <span
                            className={`px-2 py-1 text-xs rounded-full font-medium ${
                              resource.free
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                            }`}
                          >
                            {resource.free ? 'Free' : 'Paid'}
                          </span>
                        </div>

                        {/* 资源标题 */}
                        <div className="mb-3 pr-16">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
                            {resource.title}
                          </h4>
                        </div>

                        {/* 资源描述 */}
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                          {resource.description}
                        </p>

                        {/* 底部信息 */}
                        <div className="flex items-center justify-end">
                          {/* 访问链接 */}
                          {resource.url && (
                            <motion.a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-xs font-medium transition-colors"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <LinkIcon className="h-3 w-3" />
                              Visit
                            </motion.a>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* 如果没有学习资源 */}
            {Object.values(language.learningResources).every(
              (resources) => resources.length === 0
            ) && (
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-12 shadow-lg text-center">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No Learning Resources
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learning resources for this language are being organized. Please stay tuned!
                </p>
              </div>
            )}
          </div>
        );

      case 'culture':
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Cultural Overview
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language.culture.overview}
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Business Usage
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language.culture.businessUse}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <PlayIcon className="h-6 w-6 text-purple-600" />
                  Entertainment & Media
                </h3>
                <div className="flex flex-wrap gap-2">
                  {language.culture.entertainment.map((item) => (
                    <span
                      key={item}
                      className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span className="text-xl">🍽️</span>
                  Cuisine & Food Culture
                </h3>
                <div className="flex flex-wrap gap-2">
                  {language.culture.cuisine.map((item) => (
                    <span
                      key={item}
                      className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 px-3 py-1 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/languages" title="Back to All Languages - Complete Language List">
              <motion.button
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                whileHover={{ x: -4 }}
              >
                <ArrowLeftIcon className="h-5 w-5" />
                Back to Languages
              </motion.button>
            </Link>

            <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
              <span className="text-lg">🇺🇸</span>
              <span>English Native Speaker</span>
            </div>
          </div>
        </div>
      </div>

      {/* Language Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-8xl mb-4">{language.flag}</div>
          <h1
            className="text-5xl font-bold text-gray-900 dark:text-white mb-4"
            data-testid="language-name"
          >
            {language.name}
          </h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">{language.nativeName}</p>

          <div className="flex justify-center items-center gap-6 mb-8">
            <FSIBadge category={language.fsi.category} size="lg" showLabel />
            <div className="text-center">
              <div
                className="text-3xl font-bold text-blue-600 dark:text-blue-400"
                data-testid="learning-hours"
              >
                {language.fsi.hours}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                study time for English speakers
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href={`/compare?languages=${language.id}`} title={`Compare ${language.name} with Other Languages`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                Compare Languages
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm flex items-center gap-2 transition-colors`}
                >
                  <tab.icon className="h-5 w-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderTabContent()}
        </motion.div>

        {/* SEO Content Sections */}
        <motion.div
          className="mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Why Learn {language.name}? Complete Guide for English Speakers
            </h2>
            
            <div className="prose prose-lg max-w-none space-y-8">
              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language.name} Learning Overview
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {language.name} ({language.nativeName}) is classified as FSI Category {language.fsi.category}, 
                  making it {getDifficultyDescription(language.fsi.category)} for English speakers to learn. 
                  According to the Foreign Service Institute, you'll need approximately {language.fsi.hours} hours 
                  of study to achieve professional working proficiency.
                </p>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Key Learning Challenges for English Speakers
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Grammar Complexity</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language.fsi.details.grammar}/5 difficulty - {getGrammarDescription(language.fsi.details.grammar)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Pronunciation</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language.fsi.details.pronunciation}/5 difficulty - {getPronunciationDescription(language.fsi.details.pronunciation)}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Writing System</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language.fsi.details.writing}/5 difficulty - Uses {language.writingSystem} script
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Vocabulary</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {language.fsi.details.vocabulary}/5 difficulty - {getVocabularyDescription(language.fsi.details.vocabulary)}
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Why {language.name} is Worth Learning
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  With {language.speakers.total} speakers worldwide, {language.name} is the #{language.speakers.rank} 
                  most spoken language globally. It's primarily spoken in {language.geography.primaryRegions.join(', ')} 
                  and is part of the {language.family} language family.
                </p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-2">
                  <li>Business opportunities in {language.geography.primaryRegions.slice(0, 2).join(' and ')}</li>
                  <li>Cultural enrichment through {language.family} heritage</li>
                  <li>Travel convenience across {language.geography.continents.join(', ')}</li>
                  <li>Academic and research opportunities</li>
                </ul>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {language.name} vs English: Key Differences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Similarities</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      {getSimilarities(language).map((similarity, index) => (
                        <li key={index}>{similarity}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Key Differences</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
                      {getDifferences(language).map((difference, index) => (
                        <li key={index}>{difference}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Best Learning Strategies for {language.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Beginner Level</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                      <li>Master basic pronunciation</li>
                      <li>Learn essential vocabulary</li>
                      <li>Understand basic grammar rules</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Intermediate Level</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                      <li>Practice conversation skills</li>
                      <li>Expand vocabulary range</li>
                      <li>Study cultural context</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Advanced Level</h3>
                    <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1 text-sm">
                      <li>Master complex grammar</li>
                      <li>Develop fluency</li>
                      <li>Understand nuances</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Detailed Learning Time Breakdown for {language.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Based on FSI research, here's how the {language.fsi.hours} hours of study time are typically distributed 
                  across different learning phases and skill areas for English speakers learning {language.name}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Learning Phases</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Basic Foundation</span>
                        <span className="font-semibold text-blue-600">{Math.round(language.fsi.hours * 0.3)}h</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Intermediate Skills</span>
                        <span className="font-semibold text-green-600">{Math.round(language.fsi.hours * 0.4)}h</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Advanced Proficiency</span>
                        <span className="font-semibold text-purple-600">{Math.round(language.fsi.hours * 0.3)}h</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Skill Areas</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Grammar & Structure</span>
                        <span className="font-semibold text-yellow-600">{Math.round(language.fsi.hours * 0.25)}h</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Vocabulary Building</span>
                        <span className="font-semibold text-red-600">{Math.round(language.fsi.hours * 0.25)}h</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Speaking & Listening</span>
                        <span className="font-semibold text-indigo-600">{Math.round(language.fsi.hours * 0.35)}h</span>
                      </div>
                      <div className="flex justify-between items-center p-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                        <span className="text-gray-700 dark:text-gray-300">Reading & Writing</span>
                        <span className="font-semibold text-pink-600">{Math.round(language.fsi.hours * 0.15)}h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Common Mistakes English Speakers Make When Learning {language.name}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Understanding common pitfalls can help you avoid them and accelerate your learning progress. 
                  Here are the most frequent mistakes English speakers make when learning {language.name}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Pronunciation Mistakes</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span>Applying English stress patterns to {language.name} words</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span>Not mastering {language.name}-specific sounds early</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span>Ignoring tone or pitch variations (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Grammar Mistakes</h3>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span>Using English word order in {language.name} sentences</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span>Overlooking gender or case systems</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-500 mr-2 mt-1">•</span>
                        <span>Directly translating idioms and expressions</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Career Opportunities with {language.name} Skills
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Learning {language.name} opens doors to numerous career opportunities, especially in 
                  {language.geography.primaryRegions.slice(0, 2).join(' and ')} and other regions where 
                  {language.name} is widely spoken.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">Business & Finance</h3>
                    <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
                      <li>International business development</li>
                      <li>Financial services and banking</li>
                      <li>Import/export operations</li>
                      <li>Market research and analysis</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">Education & Research</h3>
                    <ul className="space-y-2 text-sm text-green-700 dark:text-green-300">
                      <li>Language teaching and tutoring</li>
                      <li>Academic research and translation</li>
                      <li>Cultural exchange programs</li>
                      <li>Linguistic studies and analysis</li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">Technology & Media</h3>
                    <ul className="space-y-2 text-sm text-purple-700 dark:text-purple-300">
                      <li>Software localization</li>
                      <li>Content creation and media</li>
                      <li>Customer support and services</li>
                      <li>Digital marketing and SEO</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Cultural Context and Social Etiquette in {language.name}-Speaking Regions
                </h2>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  Understanding cultural context is crucial for effective communication in {language.name}. 
                  Here are important cultural aspects to consider when learning and using {language.name}.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Communication Style</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Formal vs Informal</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {language.name} has distinct formal and informal registers. Understanding when to use 
                          each level is essential for appropriate communication.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Non-verbal Communication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Gestures, eye contact, and personal space norms vary significantly from English-speaking cultures.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Social Customs</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Greetings and Introductions</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Learn the proper way to greet people, including handshakes, kisses, or other cultural greetings.
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-2">Business Etiquette</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Professional communication norms, meeting protocols, and business relationship building.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LanguageDetail;
