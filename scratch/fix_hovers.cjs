const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const replacements = [
  { from: /hover:bg-slate-800/g, to: 'hover:bg-slate-100' },
  { from: /hover:bg-slate-900/g, to: 'hover:bg-slate-100' },
  { from: /hover:bg-slate-700/g, to: 'hover:bg-slate-200' },
  { from: /bg-slate-800\/50/g, to: 'bg-slate-100' },
  { from: /bg-slate-900\/50/g, to: 'bg-slate-100' },
  { from: /bg-slate-800/g, to: 'bg-slate-100' }
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const rep of replacements) {
    content = content.replace(rep.from, rep.to);
  }

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Processed: ${filePath}`);
  }
}

function walkDir(currentPath) {
  const files = fs.readdirSync(currentPath);
  for (const file of files) {
    const fullPath = path.join(currentPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

walkDir(srcDir);
console.log('Hover state updates completed successfully!');
