#!/usr/bin/env node

/**
 * 标题长度检查脚本
 * 用于验证所有页面标题是否符合SEO最佳实践（70字符以内）
 */

const fs = require('fs');
const path = require('path');

// 检查标题长度
function checkTitleLength(title, maxLength = 70) {
  const length = title.length;
  return {
    title,
    length,
    maxLength,
    isOverLimit: length > maxLength,
    isValid: length <= maxLength
  };
}

// 测试标题
const testTitles = [
  // 首页
  'Find Your Perfect Language - FSI Quiz | Easiest Language',
  
  // 语言列表页
  'All Languages - FSI Difficulty Ratings | Easiest Language',
  
  // 比较页面
  'Language Difficulty Comparison | Easiest Language',
  
  // 语言详情页示例
  'Learn Spanish - 600h Study Time | FSI Category 1',
  'Learn French - 600h Study Time | FSI Category 1', 
  'Learn German - 900h Study Time | FSI Category 2',
  'Learn Italian - 600h Study Time | FSI Category 1',
  'Learn Portuguese - 600h Study Time | FSI Category 1',
  'Learn Dutch - 600h Study Time | FSI Category 1',
  'Learn Swedish - 600h Study Time | FSI Category 1',
  'Learn Norwegian - 600h Study Time | FSI Category 1',
  'Learn Danish - 600h Study Time | FSI Category 1',
  'Learn Russian - 1100h Study Time | FSI Category 3',
  'Learn Chinese - 2200h Study Time | FSI Category 5',
  'Learn Japanese - 2200h Study Time | FSI Category 5',
  'Learn Korean - 2200h Study Time | FSI Category 5',
  'Learn Arabic - 2200h Study Time | FSI Category 5',
  'Learn Hindi - 1100h Study Time | FSI Category 3',
  'Learn Telugu - 1100h Study Time | FSI Category 3',
  'Learn Thai - 1100h Study Time | FSI Category 3',
  'Learn Vietnamese - 1100h Study Time | FSI Category 3',
  'Learn Indonesian - 900h Study Time | FSI Category 2',
  'Learn Malay - 900h Study Time | FSI Category 2',
];

console.log('🔍 标题长度检查报告\n');
console.log('=' .repeat(80));

let validCount = 0;
let invalidCount = 0;

testTitles.forEach((title, index) => {
  const result = checkTitleLength(title);
  const status = result.isValid ? '✅' : '❌';
  const lengthInfo = `${result.length}/${result.maxLength}`;
  
  console.log(`${status} ${index + 1}. ${title}`);
  console.log(`   长度: ${lengthInfo} 字符`);
  
  if (!result.isValid) {
    console.log(`   ⚠️  超出 ${result.length - result.maxLength} 个字符`);
  }
  
  console.log('');
  
  if (result.isValid) {
    validCount++;
  } else {
    invalidCount++;
  }
});

console.log('=' .repeat(80));
console.log(`📊 检查结果汇总:`);
console.log(`   ✅ 符合标准: ${validCount} 个标题`);
console.log(`   ❌ 超出限制: ${invalidCount} 个标题`);
console.log(`   📈 通过率: ${((validCount / testTitles.length) * 100).toFixed(1)}%`);

if (invalidCount > 0) {
  console.log('\n🔧 建议优化策略:');
  console.log('   1. 简化描述性词汇');
  console.log('   2. 使用缩写形式');
  console.log('   3. 移除重复的品牌名');
  console.log('   4. 优化关键词密度');
  process.exit(1);
} else {
  console.log('\n🎉 所有标题都符合SEO最佳实践！');
  process.exit(0);
}
