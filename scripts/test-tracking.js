#!/usr/bin/env node

/**
 * Testing Script for SEO and Tracking Integration
 *
 * This script verifies that all required files and integrations
 * are in place for proper SEO and conversion tracking.
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

// Helper function to check if file exists
function checkFile(filePath, description) {
  const fullPath = path.join(__dirname, '..', filePath);
  const exists = fs.existsSync(fullPath);

  if (exists) {
    console.log(`${colors.green}✓${colors.reset} ${description}: ${colors.blue}${filePath}${colors.reset}`);
    return true;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${description}: ${colors.red}${filePath} NOT FOUND${colors.reset}`);
    return false;
  }
}

// Helper function to check file content
function checkFileContent(filePath, searchString, description) {
  const fullPath = path.join(__dirname, '..', filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`${colors.red}✗${colors.reset} ${description}: ${colors.red}File not found${colors.reset}`);
    return false;
  }

  const content = fs.readFileSync(fullPath, 'utf8');
  const contains = content.includes(searchString);

  if (contains) {
    console.log(`${colors.green}✓${colors.reset} ${description}`);
    return true;
  } else {
    console.log(`${colors.red}✗${colors.reset} ${description}: ${colors.red}String "${searchString}" not found${colors.reset}`);
    return false;
  }
}

console.log(`\n${colors.bold}${colors.blue}======================================${colors.reset}`);
console.log(`${colors.bold}${colors.blue}  SEO & Tracking Integration Test${colors.reset}`);
console.log(`${colors.bold}${colors.blue}======================================${colors.reset}\n`);

let totalChecks = 0;
let passedChecks = 0;

// Section 1: Core Files
console.log(`${colors.bold}1. Core Utility Files${colors.reset}`);
totalChecks++;
if (checkFile('app/lib/analytics.js', 'Analytics utility')) passedChecks++;
totalChecks++;
if (checkFile('app/lib/structuredData.js', 'Structured data schemas')) passedChecks++;
console.log('');

// Section 2: SEO Components
console.log(`${colors.bold}2. SEO Components${colors.reset}`);
totalChecks++;
if (checkFile('app/components/seo/StructuredData.jsx', 'StructuredData component')) passedChecks++;
totalChecks++;
if (checkFile('app/components/seo/Breadcrumbs.jsx', 'Breadcrumbs component')) passedChecks++;
console.log('');

// Section 3: Landing Pages
console.log(`${colors.bold}3. Landing Pages${colors.reset}`);
totalChecks++;
if (checkFile('app/(pages)/diseno-web/page.jsx', 'Diseño Web landing page')) passedChecks++;
totalChecks++;
if (checkFile('app/(pages)/desarrollo-web/page.jsx', 'Desarrollo Web landing page')) passedChecks++;
console.log('');

// Section 4: Integration Checks - Diseño Web
console.log(`${colors.bold}4. Diseño Web Integration${colors.reset}`);
totalChecks++;
if (checkFileContent('app/(pages)/diseno-web/page.jsx', 'useSearchParams', 'useSearchParams import')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/diseno-web/page.jsx', 'trackCTAClick', 'trackCTAClick import')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/diseno-web/page.jsx', 'StructuredData', 'StructuredData component usage')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/diseno-web/page.jsx', 'Breadcrumbs', 'Breadcrumbs component usage')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/diseno-web/page.jsx', 'ctaConfig', 'Dynamic CTA configuration')) passedChecks++;
console.log('');

// Section 5: Integration Checks - Desarrollo Web
console.log(`${colors.bold}5. Desarrollo Web Integration${colors.reset}`);
totalChecks++;
if (checkFileContent('app/(pages)/desarrollo-web/page.jsx', 'useSearchParams', 'useSearchParams import')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/desarrollo-web/page.jsx', 'trackCTAClick', 'trackCTAClick import')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/desarrollo-web/page.jsx', 'StructuredData', 'StructuredData component usage')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/desarrollo-web/page.jsx', 'Breadcrumbs', 'Breadcrumbs component usage')) passedChecks++;
totalChecks++;
if (checkFileContent('app/(pages)/desarrollo-web/page.jsx', 'ctaConfig', 'Dynamic CTA configuration')) passedChecks++;
console.log('');

// Section 6: Component Updates
console.log(`${colors.bold}6. Component CTA Integration${colors.reset}`);
totalChecks++;
if (checkFileContent('app/components/diseno-web/Hero.jsx', 'cta?.primary', 'Hero component dynamic CTAs')) passedChecks++;
totalChecks++;
if (checkFileContent('app/components/diseno-web/DiagnosticSection.jsx', 'cta?.primary', 'DiagnosticSection dynamic CTAs')) passedChecks++;
totalChecks++;
if (checkFileContent('app/components/diseno-web/CaseStudies.jsx', 'cta?.primary', 'CaseStudies dynamic CTAs')) passedChecks++;
totalChecks++;
if (checkFileContent('app/components/desarrollo-web/Hero.jsx', 'cta?.primary', 'Desarrollo Hero dynamic CTAs')) passedChecks++;
console.log('');

// Section 7: Form Tracking
console.log(`${colors.bold}7. Form Tracking Integration${colors.reset}`);
totalChecks++;
if (checkFileContent('app/components/diseno-web/WhatsAppForm.jsx', 'trackFormStart', 'Form start tracking')) passedChecks++;
totalChecks++;
if (checkFileContent('app/components/diseno-web/WhatsAppForm.jsx', 'trackWhatsAppConversion', 'WhatsApp conversion tracking')) passedChecks++;
console.log('');

// Section 8: Documentation
console.log(`${colors.bold}8. Documentation${colors.reset}`);
totalChecks++;
if (checkFile('docs/TRACKING.md', 'Tracking documentation')) passedChecks++;
console.log('');

// Summary
console.log(`${colors.bold}${colors.blue}======================================${colors.reset}`);
console.log(`${colors.bold}Summary${colors.reset}`);
console.log(`${colors.bold}${colors.blue}======================================${colors.reset}`);
console.log(`Tests passed: ${colors.green}${passedChecks}${colors.reset}/${totalChecks}`);
console.log(`Success rate: ${colors.green}${Math.round((passedChecks / totalChecks) * 100)}%${colors.reset}\n`);

if (passedChecks === totalChecks) {
  console.log(`${colors.green}${colors.bold}✓ All checks passed!${colors.reset}\n`);
} else {
  console.log(`${colors.yellow}${colors.bold}⚠ Some checks failed. Please review the issues above.${colors.reset}\n`);
}

// Manual Testing Checklist
console.log(`${colors.bold}${colors.blue}======================================${colors.reset}`);
console.log(`${colors.bold}Manual Testing Checklist${colors.reset}`);
console.log(`${colors.bold}${colors.blue}======================================${colors.reset}\n`);

console.log(`${colors.yellow}Important: The following must be tested manually:${colors.reset}\n`);

console.log(`${colors.bold}1. Dynamic CTAs (URL Parameters)${colors.reset}`);
console.log(`   Test URLs:`);
console.log(`   - http://localhost:3000/diseno-web (organic traffic)`);
console.log(`   - http://localhost:3000/diseno-web?source=ads (ads traffic)`);
console.log(`   - http://localhost:3000/desarrollo-web (organic traffic)`);
console.log(`   - http://localhost:3000/desarrollo-web?source=ads (ads traffic)`);
console.log(`   ${colors.green}✓${colors.reset} Verify CTA text changes based on source parameter\n`);

console.log(`${colors.bold}2. Event Tracking (Browser Console)${colors.reset}`);
console.log(`   1. Open browser DevTools → Network tab`);
console.log(`   2. Filter by "gtag" or "google-analytics"`);
console.log(`   3. Click CTAs and submit form`);
console.log(`   ${colors.green}✓${colors.reset} Verify events are being sent to GA4\n`);

console.log(`${colors.bold}3. Structured Data Validation${colors.reset}`);
console.log(`   1. Visit: https://search.google.com/test/rich-results`);
console.log(`   2. Enter your page URLs`);
console.log(`   ${colors.green}✓${colors.reset} Verify all schemas are detected (LocalBusiness, Service, FAQ, etc.)\n`);

console.log(`${colors.bold}4. Metadata Verification${colors.reset}`);
console.log(`   1. View page source (Right-click → View Source)`);
console.log(`   ${colors.green}✓${colors.reset} Verify og:image, twitter:card, geo tags are present\n`);

console.log(`${colors.bold}5. Breadcrumbs Display${colors.reset}`);
console.log(`   ${colors.green}✓${colors.reset} Verify breadcrumbs appear below navbar on both pages\n`);

console.log(`${colors.bold}6. Form Tracking${colors.reset}`);
console.log(`   1. Click on form name field (triggers form_start event)`);
console.log(`   2. Fill and submit form (triggers conversion event)`);
console.log(`   ${colors.green}✓${colors.reset} Verify events in Network tab\n`);

console.log(`${colors.bold}${colors.blue}======================================${colors.reset}`);
console.log(`${colors.bold}Pending Configuration${colors.reset}`);
console.log(`${colors.bold}${colors.blue}======================================${colors.reset}\n`);

console.log(`${colors.yellow}⚠ The following must be configured by the client:${colors.reset}\n`);
console.log(`1. ${colors.red}Google Ads Conversion Label${colors.reset}`);
console.log(`   File: app/lib/analytics.js:12`);
console.log(`   Replace: "CONVERSION_LABEL" with actual conversion label\n`);

console.log(`2. ${colors.red}OG Images${colors.reset}`);
console.log(`   Create and upload:`);
console.log(`   - /public/assets/og-diseno-web.jpg (1200x630px)`);
console.log(`   - /public/assets/og-desarrollo-web.jpg (1200x630px)\n`);

console.log(`${colors.bold}For detailed instructions, see: docs/TRACKING.md${colors.reset}\n`);

// Exit with appropriate code
process.exit(passedChecks === totalChecks ? 0 : 1);
