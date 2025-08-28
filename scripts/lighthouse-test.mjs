import fs from 'fs';
import lighthouse from 'lighthouse';
import * as chromeLauncher from 'chrome-launcher';

const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
const runnerResult = await lighthouse('http://localhost:5002/', {logLevel: 'warn', output: 'html', onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'], port: chrome.port});

// `.report` is the HTML report as a string
const reportHtml = runnerResult.report;
fs.writeFileSync('lhreport.html', reportHtml);

// `.lhr` is the Lighthouse Result as a JS object
const performanceScore = runnerResult.lhr.categories.performance.score * 100;
const accessibilityScore = runnerResult.lhr.categories.accessibility.score * 100;
const seoScore = runnerResult.lhr.categories.seo.score * 100;
const bestPracticesScore = runnerResult.lhr.categories['best-practices'].score * 100;

console.log('Report is done for', runnerResult.lhr.finalDisplayedUrl);
console.log('Performance score was', performanceScore);
console.log('Accessibility score was', accessibilityScore);
console.log('SEO score was', seoScore);
console.log('Best practices score was',bestPracticesScore);

chrome.kill();

process.exit([performanceScore, accessibilityScore, seoScore, bestPracticesScore].some(item => item < 85) ? 1 : 0)