'use client';

import React from 'react';
import { motion } from 'framer-motion';

type FSICategory = 0 | 1 | 2 | 3 | 4 | 5;

interface FSIBadgeProps {
  category: FSICategory;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

const FSI_CONFIG = {
  0: {
    color: '#6c757d',
    label: 'Native',
    description: 'Native Language',
    hours: 'Native',
  },
  1: {
    color: '#22c55e',
    label: 'Easy',
    description: 'Easiest for English Speakers',
    hours: '600-750h',
  },
  2: {
    color: '#eab308',
    label: 'Moderate',
    description: 'Moderate Difficulty',
    hours: '900h',
  },
  3: {
    color: '#f97316',
    label: 'Medium',
    description: 'Medium Difficulty',
    hours: '1100h',
  },
  4: {
    color: '#ef4444',
    label: 'Hard',
    description: 'Hard for English Speakers',
    hours: '1800h',
  },
  5: {
    color: '#a855f7',
    label: 'Hardest',
    description: 'Hardest for English Speakers',
    hours: '2200h',
  },
};

const SIZE_CONFIG = {
  sm: {
    container: 'text-xs gap-1',
    badge: 'w-3 h-3',
    text: 'text-xs',
  },
  md: {
    container: 'text-sm gap-2',
    badge: 'w-4 h-4',
    text: 'text-sm',
  },
  lg: {
    container: 'text-base gap-2',
    badge: 'w-5 h-5',
    text: 'text-base font-medium',
  },
};

const FSIBadge: React.FC<FSIBadgeProps> = ({
  category,
  size = 'md',
  showLabel = true,
  className = '',
}) => {
  const config = FSI_CONFIG[category];
  const sizeConfig = SIZE_CONFIG[size];
  const romanMap: Record<Exclude<FSICategory, 0>, string> = { 1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V' }; // 罗马数字映射

  return (
    <motion.div
      className={`inline-flex items-center ${sizeConfig.container} ${className}`}
      data-testid="fsi-badge"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      {/* FSI色环徽章 */}
      <div
        className={`${sizeConfig.badge} rounded-full border-2 border-white shadow-sm`}
        style={{ backgroundColor: config.color }}
        title={`FSI Category ${category} - ${config.description} (${config.hours})`}
      />

      {/* 标签文字 */}
      {showLabel && (
        <span className={`${sizeConfig.text} text-gray-700 dark:text-gray-200`}>
          {config.label}
          {category !== 0 ? ` (${romanMap[category as Exclude<FSICategory, 0>]})` : ''}
        </span>
      )}
    </motion.div>
  );
};

export default FSIBadge;
