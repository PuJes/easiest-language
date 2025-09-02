#!/usr/bin/env node

/**
 * 批量为所有语言添加FSI details字段的脚本
 */

const fs = require('fs');
const path = require('path');

// FSI类别对应的默认难度评分
const fsiDetailsMap = {
  1: { grammar: 2, vocabulary: 3, pronunciation: 2, writing: 1, cultural: 2 },    // 最容易
  2: { grammar: 3, vocabulary: 3, pronunciation: 3, writing: 2, cultural: 3 },    // 容易
  3: { grammar: 4, vocabulary: 4, pronunciation: 4, writing: 3, cultural: 4 },    // 中等
  4: { grammar: 4, vocabulary: 5, pronunciation: 5, writing: 4, cultural: 4 },    // 困难
  5: { grammar: 5, vocabulary: 5, pronunciation: 5, writing: 5, cultural: 5 },    // 最困难
};

// 读取languages.ts文件
const filePath = path.join(__dirname, '../src/lib/data/languages.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 查找所有fsi对象并添加details字段
const fsiPattern = /fsi:\s*\{([^}]+)\}/g;
let match;
let modified = false;

while ((match = fsiPattern.exec(content)) !== null) {
  const fsiContent = match[1];
  
  // 检查是否已经有details字段
  if (!fsiContent.includes('details:')) {
    // 提取category值
    const categoryMatch = fsiContent.match(/category:\s*(\d+)/);
    if (categoryMatch) {
      const category = parseInt(categoryMatch[1]);
      const details = fsiDetailsMap[category] || fsiDetailsMap[3];
      
      // 在fsi对象的最后一个属性后添加details
      const newFsiContent = fsiContent.replace(/(\s*)(\n\s*)(\})/g, 
        `$1,details: {
        grammar: ${details.grammar},        // 语法复杂度
        vocabulary: ${details.vocabulary},     // 词汇学习难度
        pronunciation: ${details.pronunciation},  // 发音难度
        writing: ${details.writing},        // 书写系统难度
        cultural: ${details.cultural},       // 文化背景难度
      }$2$3`);
      
      // 替换原内容
      content = content.replace(match[0], `fsi: {${newFsiContent}}`);
      modified = true;
    }
  }
}

if (modified) {
  // 写回文件
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✅ 成功为所有语言添加了FSI details字段！');
} else {
  console.log('ℹ️  所有语言都已经有了FSI details字段');
}

console.log('🎯 现在Learning Difficulty模块应该可以正常工作了！');
