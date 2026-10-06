const fs = require('fs');
const path = require('path');

const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace the opening tag of the logo SVG to include inline styles for fill and stroke
    // Current typical tag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" width="36" height="36">
    // Some might not have width/height or have different values.
    
    // We can regex for any SVG that immediately precedes the <circle cx="12" cy="12" r="8"></circle> logo code.
    const svgMatch = /(<svg[^>]*)(>)\s*<circle cx="12" cy="12" r="8"><\/circle>/g;
    content = content.replace(svgMatch, (match, openTag, closeBracket) => {
        // If it doesn't already have inline style, add it
        if (!openTag.includes('style="')) {
            return openTag + ' style="fill: none !important;"' + closeBracket + '\n<circle cx="12" cy="12" r="8"></circle>';
        }
        return match;
    });

    fs.writeFileSync(file, content);
    console.log('Fixed inline style', file);
});
