const fs = require('fs');
const path = require('path');

const files = fs.readdirSync(__dirname).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace <link rel="icon" type="image/png" href="logo.png"> with favicon.png
    content = content.replace(/<link rel="icon" type="image\/png" href="logo\.png">/g, '<link rel="icon" type="image/png" href="favicon.png">');
    
    fs.writeFileSync(filePath, content);
    console.log('Updated favicon in', file);
});
