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
                      Primary Countries:
                    </span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {language.geography.primaryCountries.map((country) => (
                        <span
                          key={country}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                        >
                          {country}
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
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
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
                      Primary Countries
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {language.geography.primaryCountries.map((country) => (
                        <span
                          key={country}
                          className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {country}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-600 dark:text-gray-400 mb-2">
                      Also Spoken In
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {language.geography.secondaryCountries.map((country) => (
                        <span
                          key={country}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                        >
                          {country}
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
            {['beginner', 'intermediate', 'advanced'].map((level) => (
              <div key={level} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 capitalize flex items-center gap-2">
                  <BookOpenIcon className="h-6 w-6 text-blue-600" />
                  {level} Resources
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {language.resources[level as keyof typeof language.resources].map(
                    (resource, index) => (
                      <motion.a
                        key={index}
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-4 border border-gray-200 dark:border-gray-600 rounded-xl hover:shadow-lg transition-all hover:border-blue-300 dark:hover:border-blue-500"
                        whileHover={{ scale: 1.02, y: -2 }}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {resource.name}
                          </h4>
                          <LinkIcon className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
                            {resource.type}
                          </span>
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={
                                  i < resource.rating ? 'text-yellow-400' : 'text-gray-300'
                                }
                              >
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.a>
                    )
                  )}
                </div>
              </div>
            ))}
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
            <Link href="/languages">
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
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-4">{language.name}</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-400 mb-6">{language.nativeName}</p>

          <div className="flex justify-center items-center gap-6 mb-8">
            <FSIBadge category={language.fsi.category} size="lg" showLabel />
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {language.fsi.hours}h
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                study time for English speakers
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <Link href={`/compare?languages=${language.id}`}>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
                Compare Languages
              </button>
            </Link>
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg">
              Start Learning
            </button>
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
      </div>
    </div>
  );
};

export default LanguageDetail;
