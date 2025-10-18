#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const messagesDir = path.join(__dirname, '../src/i18n/messages');
const locales = ['en', 'ua'];

function getAllKeys(obj, prefix = '') {
  let keys = [];
  for (const key in obj) {
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      keys = keys.concat(getAllKeys(obj[key], prefix ? `${prefix}.${key}` : key));
    } else {
      keys.push(prefix ? `${prefix}.${key}` : key);
    }
  }
  return keys;
}

function validateTranslations() {
  console.log('🔍 Validating translations...\n');
  
  const translations = {};
  const allKeys = new Set();
  
  // Load all translation files
  for (const locale of locales) {
    const filePath = path.join(messagesDir, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.error(`❌ Missing translation file: ${locale}.json`);
      process.exit(1);
    }
    
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      translations[locale] = JSON.parse(content);
      const keys = getAllKeys(translations[locale]);
      keys.forEach(key => allKeys.add(key));
      console.log(`✅ Loaded ${locale}.json with ${keys.length} keys`);
    } catch (error) {
      console.error(`❌ Error parsing ${locale}.json:`, error.message);
      process.exit(1);
    }
  }
  
  // Check for missing keys
  let hasErrors = false;
  for (const locale of locales) {
    const localeKeys = getAllKeys(translations[locale]);
    const missingKeys = Array.from(allKeys).filter(key => !localeKeys.includes(key));
    
    if (missingKeys.length > 0) {
      console.error(`\n❌ Missing keys in ${locale}.json:`);
      missingKeys.forEach(key => console.error(`  - ${key}`));
      hasErrors = true;
    } else {
      console.log(`✅ ${locale}.json has all required keys`);
    }
  }
  
  // Check for extra keys
  for (const locale of locales) {
    const localeKeys = getAllKeys(translations[locale]);
    const extraKeys = localeKeys.filter(key => !allKeys.has(key));
    
    if (extraKeys.length > 0) {
      console.warn(`\n⚠️  Extra keys in ${locale}.json (not in other locales):`);
      extraKeys.forEach(key => console.warn(`  - ${key}`));
    }
  }
  
  if (hasErrors) {
    console.log('\n❌ Translation validation failed');
    process.exit(1);
  } else {
    console.log('\n✅ All translations are valid!');
  }
}

validateTranslations();
