'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ChevronRightIcon,
  GlobeAltIcon,
  AcademicCapIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import FSIBadge from './FSIBadge';
import BreadcrumbNavigation from './BreadcrumbNavigation';
import { generateBreadcrumbs } from '@/lib/utils/breadcrumb-utils';
import { Language } from '@/lib/types/language';
import { getFeaturedLanguages } from '@/lib/data/data-adapters';

const PLATFORM_STATS = [
  {
    label: '50+ Languages',
    value: '50+',
    icon: GlobeAltIcon,
    description: 'World languages covered',
  },
  {
    label: 'FSI Standards',
    value: '✓',
    icon: AcademicCapIcon,
    description: 'Official difficulty ratings',
  },
  {
    label: 'Study Hours',
    value: '600-2200',
    icon: ChartBarIcon,
    description: 'Scientific time estimates',
  },
];

interface QuickQuizQuestion {
  question: string;
  options: string[];
  weights: number[]; // FSI level weights for each option
}

const QUICK_QUIZ: QuickQuizQuestion[] = [
  {
    question: "What's your primary goal for learning a new language?",
    options: [
      'Business/Career advancement',
      'Travel and culture exploration',
      'Academic study',
      'Personal challenge',
    ],
    weights: [2, 1, 3, 4],
  },
  {
    question: 'How much time can you dedicate daily to language study?',
    options: ['Less than 30 minutes', '30-60 minutes', '1-2 hours', 'More than 2 hours'],
    weights: [1, 2, 3, 4],
  },
  {
    question: "What's your experience with foreign languages?",
    options: [
      'Complete beginner',
      'Some high school language classes',
      'I speak another language fluently',
      "I'm multilingual",
    ],
    weights: [1, 2, 3, 4],
  },
];

const HomePage: React.FC = () => {
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<number[]>([]);
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [recommendedLevel, setRecommendedLevel] = useState<number>(1);
  const [featuredLanguages] = useState<Language[]>(() => getFeaturedLanguages());

  const handleQuizAnswer = (answerIndex: number) => {
    const newAnswers = [...quizAnswers, answerIndex];
    setQuizAnswers(newAnswers);

    if (quizStep < QUICK_QUIZ.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // 计算推荐FSI等级
      const avgWeight =
        newAnswers.reduce((sum, answerIdx, qIdx) => sum + QUICK_QUIZ[qIdx].weights[answerIdx], 0) /
        QUICK_QUIZ.length;

      const level = Math.min(Math.max(Math.round(avgWeight), 1), 2); // 推荐1-2级为主
      setRecommendedLevel(level);
      setShowQuizResults(true);
    }
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers([]);
    setShowQuizResults(false);
  };

  const getRecommendedLanguages = (): Language[] => {
    return featuredLanguages.filter((lang) => lang.fsi.category <= recommendedLevel);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Breadcrumb Navigation */}
      <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <BreadcrumbNavigation items={generateBreadcrumbs.home()} />
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* 英语母语用户标识 */}
        <div className="absolute top-6 right-6 z-10">
          <div className="bg-green-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg flex items-center gap-2">
            <span className="text-lg">🇺🇸</span>
            <span>English Native Speaker</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Find Your
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {' '}
                Perfect{' '}
              </span>
              Language
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
              Discover the easiest languages to learn based on official{' '}
              <strong>FSI standards</strong> designed specifically for{' '}
              <strong>English speakers</strong>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <motion.button
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setQuizStep(0);
                  setQuizAnswers([]);
                  setShowQuizResults(false);
                  // 滚动到问卷区域
                  setTimeout(() => {
                    const quizSection = document.getElementById('quiz-section');
                    if (quizSection) {
                      quizSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }}
              >
                Take 1-Minute Quiz 🚀
              </motion.button>

              <Link href="/languages" title="Browse All Languages - Complete Language List">
                <motion.button
                  className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl text-lg font-semibold shadow-lg border-2 border-gray-200 transform transition-all duration-200 hover:scale-105"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse All Languages <ChevronRightIcon className="inline h-5 w-5 ml-2" />
                </motion.button>
              </Link>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {PLATFORM_STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-blue-600 dark:text-blue-400" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">{stat.description}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Assessment Quiz */}
      <section id="quiz-section" className="py-16 bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!showQuizResults ? (
            <motion.div
              key={quizStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-center"
            >
              <div className="mb-8">
                <div className="flex justify-center mb-4">
                  {QUICK_QUIZ.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 w-16 mx-1 rounded-full transition-colors duration-300 ${
                        index <= quizStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Question {quizStep + 1} of {QUICK_QUIZ.length}
                </p>
              </div>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                {QUICK_QUIZ[quizStep].question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {QUICK_QUIZ[quizStep].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="p-6 bg-white dark:bg-gray-800 rounded-xl text-left hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors border-2 border-transparent hover:border-blue-300 dark:hover:border-blue-600"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleQuizAnswer(index)}
                  >
                    <div className="text-lg font-medium text-gray-900 dark:text-white">
                      {option}
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                Your Recommended Languages 🎯
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                Based on your answers, these languages are perfect for you:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {getRecommendedLanguages().map((language) => (
                  <Link key={language.id} href={`/language/${language.id}`}>
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
                      whileHover={{ scale: 1.03, y: -2 }}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{language.flagEmoji}</span>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                              {language.name}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {language.nativeName}
                            </p>
                          </div>
                        </div>
                        <FSIBadge category={language.fsi.category} size="md" showLabel />
                      </div>

                      <div className="text-center bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-4">
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {language.fsi.hours}h
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          study time for English speakers
                        </div>
                      </div>
                    </motion.div>
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={resetQuiz}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold"
                >
                  Retake Quiz
                </button>
                <Link href="/languages">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold">
                    See All Languages
                  </button>
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Featured Languages Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Most Popular Languages for English Speakers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start with these scientifically-ranked languages based on FSI difficulty ratings
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredLanguages.map((language, index) => (
              <Link key={language.id} href={`/language/${language.id}`} title={`Learn ${language.name} - ${language.fsi.hours}h Study Time`}>
                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer h-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.03, y: -4 }}
                >
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{language.flagEmoji}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {language.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {language.nativeName}
                    </p>
                  </div>

                  <div className="flex justify-center mb-4">
                    <FSIBadge category={language.fsi.category} size="md" showLabel />
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-3 text-center mb-4">
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {language.fsi.hours}h
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">
                      for English speakers
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>
                      👥{' '}
                      {language.speakers >= 1000000
                        ? `${Math.round(language.speakers / 1000000)}M`
                        : `${Math.round(language.speakers / 1000)}K`}
                    </span>
                    <span>🌍 {language.regions.length} regions</span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/languages" title="Explore All 50+ Languages - Complete Language Database">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-lg transform transition-all duration-200 hover:scale-105">
                Explore All 50+ Languages <ChevronRightIcon className="inline h-5 w-5 ml-2" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
