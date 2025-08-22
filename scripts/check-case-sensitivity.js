#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Get all image files in static/img
const imageFiles = glob.sync('static/img/**/*', { nodir: true });
const imageMap = new Map();

// Create a map of lowercase filenames to actual filenames
imageFiles.forEach(file => {
  const filename = path.basename(file);
  const lowercaseName = filename.toLowerCase();
  
  if (imageMap.has(lowercaseName)) {
    console.error(`❌ Case sensitivity conflict detected:`);
    console.error(`   ${imageMap.get(lowercaseName)}`);
    console.error(`   ${file}`);
    process.exit(1);
  }
  
  imageMap.set(lowercaseName, file);
});

// Get all markdown files
const markdownFiles = glob.sync('docs/**/*.md');

let hasErrors = false;

markdownFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  
  // Find all image references
  const imageRegex = /!\[.*?\]\(\/img\/([^)]+)\)/g;
  let match;
  
  while ((match = imageRegex.exec(content)) !== null) {
    const referencedImage = match[1];
    const lowercaseReferenced = referencedImage.toLowerCase();
    
    // Check if the referenced image exists (case-insensitive)
    if (!imageMap.has(lowercaseReferenced)) {
      console.error(`❌ Image not found: ${referencedImage} in ${file}`);
      hasErrors = true;
      continue;
    }
    
    // Check if the case matches exactly
    const actualFile = imageMap.get(lowercaseReferenced);
    const actualFilename = path.basename(actualFile);
    
    if (referencedImage !== actualFilename) {
      console.error(`❌ Case sensitivity issue in ${file}:`);
      console.error(`   Referenced: ${referencedImage}`);
      console.error(`   Actual:     ${actualFilename}`);
      hasErrors = true;
    }
  }
});

if (hasErrors) {
  console.error('\n💡 Tip: On case-sensitive file systems (Linux), these issues will cause build failures.');
  console.error('   Fix the case sensitivity issues above to ensure builds work on all platforms.');
  process.exit(1);
} else {
  console.log('✅ No case sensitivity issues found!');
} 