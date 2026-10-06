const fs = require('fs');
const path = require('path');

const imgLogoWithText = `
          <a href="index.html" class="logo" style="text-decoration: none; color: inherit;">
            <img src="logo.png" alt="Fine Jewelry & Watches Directory" class="brand-logo-img">
            <div class="logo-text">
              <span class="logo-title">FINE & TIME</span>
              <span class="logo-desc">Professional Directory</span>
            </div>
          </a>`;

const footerLogoRegex = /<div class="logo">\s*<svg[\s\S]*?<\/svg>\s*<div class="logo-text">[\s\S]*?<\/div>\s*<\/div>/g;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(footerLogoRegex, imgLogoWithText.trim());
    fs.writeFileSync(filePath, content);
    console.log('Fixed footer logo in', file);
});
