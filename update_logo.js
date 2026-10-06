const fs = require('fs');
const path = require('path');

const newInnerLogo = `
            <circle cx="12" cy="12" r="8"></circle>
            <path d="M9 4V3h6v1"></path>
            <path d="M9 20v1h6v-1"></path>
            <path d="M20 11v2"></path>
            <path d="M12 6.5l3.5 3.5-3.5 5-3.5-5z"></path>
            <path d="M8.5 10h7"></path>`;

// Regex to match the old logo's inner paths
const oldLogoRegex = /<polygon points="12 2 2 7 12 12 22 7 12 2"><\/polygon>\s*<polyline points="2 17 12 22 22 17"><\/polyline>\s*<polyline points="2 12 12 17 22 12"><\/polyline>/g;

// Regex to match the old favicon link
const oldFaviconRegex = /<link rel="icon" type="image\/svg\+xml" href="data:image\/svg\+xml,%3Csvg xmlns='http:\/\/www\.w3\.org\/2000\/svg' viewBox='0 0 24 24'%3E%3Cpath d='M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5' fill='none' stroke='%23C19A5B' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'\/%3E%3C\/svg%3E">/g;

const newFavicon = `<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23C19A5B' stroke-width='1.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='8'/%3E%3Cpath d='M9 4V3h6v1'/%3E%3Cpath d='M9 20v1h6v-1'/%3E%3Cpath d='M20 11v2'/%3E%3Cpath d='M12 6.5l3.5 3.5-3.5 5-3.5-5z'/%3E%3Cpath d='M8.5 10h7'/%3E%3C/svg%3E">`;

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace old logo paths with new ones
    content = content.replace(oldLogoRegex, newInnerLogo.trim());
    
    // Also, change stroke-width="2" to stroke-width="1.2" on the SVG tag that wraps this new logo.
    const svgMatch = new RegExp(`(<svg[^>]*stroke-width="2"[^>]*>)\\s*` + newInnerLogo.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    content = content.replace(svgMatch, (match, svgTag) => {
        return svgTag.replace('stroke-width="2"', 'stroke-width="1.2"') + '\n' + newInnerLogo.trim();
    });

    // Replace favicon
    content = content.replace(oldFaviconRegex, newFavicon);
    
    fs.writeFileSync(filePath, content);
    console.log('Updated', file);
});
