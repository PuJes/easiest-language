'use client';

import React from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Language } from '@/lib/types/language';

// 动态导入 ECharts 避免 SSR 问题
const ReactECharts = dynamic(() => import('echarts-for-react'), {
  ssr: false,
});

interface StatsDashboardProps {
  languages: Language[];
  className?: string;
}

const StatsDashboard: React.FC<StatsDashboardProps> = ({ languages, className = '' }) => {
  // 计算难度分布
  const difficultyDistribution = languages.reduce(
    (acc, lang) => {
      const category = lang.fsi.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {} as Record<number, number>
  );

  // 计算平均学习时间
  const averageLearningTime = Math.round(
    languages.reduce((sum, lang) => {
      if (lang.fsi.category === 0) return sum;
      return sum + lang.fsi.hours;
    }, 0) / languages.filter((lang) => lang.fsi.category !== 0).length
  );

  // 最受欢迎的语言家族
  const familyCounts = languages.reduce(
    (acc, lang) => {
      acc[lang.family] = (acc[lang.family] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const topFamily =
    Object.entries(familyCounts).sort(([, a], [, b]) => b - a)[0]?.[0] || 'Indo-European';

  // ECharts 配置
  const chartOption = {
    backgroundColor: 'transparent',
    title: {
      text: 'Difficulty Distribution',
      left: 'center',
      textStyle: {
        color: '#374151',
        fontSize: 14,
        fontWeight: 600,
      },
    },
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)',
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      borderColor: '#374151',
      textStyle: { color: '#fff' },
    },
    series: [
      {
        name: 'Languages',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '60%'],
        data: [
          {
            value: difficultyDistribution[0] || 0,
            name: 'Native',
            itemStyle: { color: '#6c757d' },
          },
          {
            value: difficultyDistribution[1] || 0,
            name: 'Easy',
            itemStyle: { color: '#22c55e' },
          },
          {
            value: difficultyDistribution[2] || 0,
            name: 'Moderate',
            itemStyle: { color: '#eab308' },
          },
          {
            value: difficultyDistribution[3] || 0,
            name: 'Medium',
            itemStyle: { color: '#f97316' },
          },
          {
            value: difficultyDistribution[4] || 0,
            name: 'Hard',
            itemStyle: { color: '#ef4444' },
          },
          {
            value: difficultyDistribution[5] || 0,
            name: 'Hardest',
            itemStyle: { color: '#a855f7' },
          },
        ].filter((item) => item.value > 0),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        label: {
          show: false,
        },
        labelLine: {
          show: false,
        },
      },
    ],
  };

  return (
    <motion.div
      className={`bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-6 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 头部标题 */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Language Overview</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300">FSI data for English speakers</p>
        <div className="w-12 h-1 bg-blue-500 rounded-full mt-2" />
      </div>

      {/* 关键指标 */}
      <div className="space-y-4 mb-6">
        <motion.div className="flex items-center justify-between" whileHover={{ scale: 1.02 }}>
          <span className="text-gray-600 dark:text-gray-300">Total Languages</span>
          <span className="text-2xl font-bold text-blue-600">{languages.length}</span>
        </motion.div>

        <motion.div className="flex items-center justify-between" whileHover={{ scale: 1.02 }}>
          <span className="text-gray-600 dark:text-gray-300">Avg. Study Time</span>
          <span className="text-lg font-semibold text-orange-500">{averageLearningTime}h</span>
        </motion.div>

        <motion.div className="flex items-center justify-between" whileHover={{ scale: 1.02 }}>
          <span className="text-gray-600 dark:text-gray-300">Top Family</span>
          <span className="text-sm font-medium text-green-600">{topFamily}</span>
        </motion.div>
      </div>

      {/* 难度分布图表 */}
      <div className="h-48 mb-4">
        <ReactECharts
          option={chartOption}
          style={{ height: '100%', width: '100%' }}
          opts={{ renderer: 'canvas' }}
        />
      </div>

      {/* 难度等级说明 */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          FSI Difficulty Levels
        </h3>

        {[
          { level: 1, color: '#22c55e', name: 'Easy', count: difficultyDistribution[1] || 0 },
          { level: 2, color: '#eab308', name: 'Moderate', count: difficultyDistribution[2] || 0 },
          { level: 3, color: '#f97316', name: 'Medium', count: difficultyDistribution[3] || 0 },
          { level: 4, color: '#ef4444', name: 'Hard', count: difficultyDistribution[4] || 0 },
          { level: 5, color: '#a855f7', name: 'Hardest', count: difficultyDistribution[5] || 0 },
        ].map(({ level, color, name, count }) => (
          <motion.div
            key={level}
            className="flex items-center justify-between text-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-gray-600 dark:text-gray-300">{name}</span>
            </div>
            <span className="text-gray-500 font-medium">{count}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default StatsDashboard;
