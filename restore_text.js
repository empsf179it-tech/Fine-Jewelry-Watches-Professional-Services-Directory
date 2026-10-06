const fs = require('fs');
const path = require('path');

const imgLogoWithText = `
  <img src="logo.png" alt="Fine Jewelry & Watches Directory" class="brand-logo-img">
  <div class="logo-text">
    <span class="logo-title">FINE & TIME</span>
    <span class="logo-desc">Professional Directory</span>
  </div>
`;

const logoRegex = /(<a[^>]*class="[^"]*\blogo\b[^"]*"[^>]*>)\s*<img src="logo\.png" alt="Fine Jewelry & Watches Directory" class="brand-logo-img">\s*(<\/a>)/g;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(logoRegex, (match, p1, p2) => {
        return p1 + imgLogoWithText + p2;
    });
    fs.writeFileSync(filePath, content);
    console.log('Restored text in', file);
});
