const fs = require('fs');
const path = require('path');

const imgLogo = `\n  <img src="logo.png" alt="Fine Jewelry & Watches Directory" class="brand-logo-img">\n`;
const newFavicon = `<link rel="icon" type="image/png" href="logo.png">`;

const logoRegex = /(<a[^>]*class="[^"]*\blogo\b[^"]*"[^>]*>)[\s\S]*?(<\/a>)/g;
const faviconRegex = /<link rel="icon" type="image\/svg\+xml"[^>]*>/g;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace the inner content of <a class="logo">
    content = content.replace(logoRegex, (match, p1, p2) => {
        return p1 + imgLogo + p2;
    });

    // Replace the favicon
    content = content.replace(faviconRegex, newFavicon);
    
    fs.writeFileSync(filePath, content);
    console.log('Replaced logo with image in', file);
});
