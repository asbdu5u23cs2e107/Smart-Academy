const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src');

const replacements = [
  // Backgrounds
  { from: /bg-slate-950/g, to: 'bg-slate-50' },
  { from: /bg-slate-900\/30/g, to: 'bg-white/40' },
  { from: /bg-slate-950\/40/g, to: 'bg-slate-100/40' },
  { from: /bg-slate-900\/20/g, to: 'bg-white/20' },
  { from: /bg-slate-900\/10/g, to: 'bg-white/10' },
  { from: /bg-slate-950\/85/g, to: 'bg-white/85' },
  { from: /bg-slate-950\/80/g, to: 'bg-white/80' },
  { from: /bg-slate-900/g, to: 'bg-white' },

  // Borders
  { from: /border-slate-900\/60/g, to: 'border-slate-200/60' },
  { from: /border-slate-900/g, to: 'border-slate-100' },
  { from: /border-slate-800/g, to: 'border-slate-200' },
  { from: /border-slate-850/g, to: 'border-slate-200' },
  { from: /border-sky-500\/20/g, to: 'border-purple-200' },
  { from: /border-indigo-500\/20/g, to: 'border-purple-200' },
  { from: /border-purple-500\/20/g, to: 'border-purple-200' },
  { from: /border-emerald-500\/20/g, to: 'border-emerald-200' },
  
  // Specific Headings text-white -> text-slate-900
  { from: /text-3xl font-bold tracking-tight text-white/g, to: 'text-3xl font-bold tracking-tight text-slate-900' },
  { from: /text-2xl font-bold text-white/g, to: 'text-2xl font-bold text-slate-900' },
  { from: /text-xl font-bold text-white/g, to: 'text-xl font-bold text-slate-900' },
  { from: /text-lg font-bold text-white/g, to: 'text-lg font-bold text-slate-900' },
  { from: /text-sm font-bold text-white/g, to: 'text-sm font-bold text-slate-900' },
  { from: /text-xs font-bold text-white/g, to: 'text-xs font-bold text-slate-900' },
  { from: /text-white font-bold/g, to: 'text-slate-900 font-bold' },
  { from: /font-bold text-white/g, to: 'font-bold text-slate-900' },
  { from: /font-semibold text-white/g, to: 'font-semibold text-slate-900' },
  { from: /font-extrabold text-white/g, to: 'font-extrabold text-slate-900' },
  
  // General text mappings
  { from: /text-slate-100/g, to: 'text-slate-900' },
  { from: /text-slate-200/g, to: 'text-slate-800' },
  { from: /text-slate-300/g, to: 'text-slate-700' },
  { from: /text-slate-355/g, to: 'text-slate-700' },
  { from: /text-slate-350/g, to: 'text-slate-700' },
  { from: /text-slate-400/g, to: 'text-slate-650' },
  { from: /text-slate-450/g, to: 'text-slate-650' },
  { from: /text-slate-500/g, to: 'text-slate-500' },

  // Brand icons & highlight text sky/indigo -> purple
  { from: /text-sky-400/g, to: 'text-purple-650' },
  { from: /text-indigo-400/g, to: 'text-purple-650' },
  { from: /text-purple-400/g, to: 'text-purple-650' },
  { from: /text-sky-500/g, to: 'text-purple-650' },
  { from: /text-indigo-650/g, to: 'text-purple-650' },

  // Brand highlight backgrounds
  { from: /bg-sky-500\/10/g, to: 'bg-purple-50' },
  { from: /bg-indigo-500\/10/g, to: 'bg-purple-50' },
  { from: /bg-purple-500\/10/g, to: 'bg-purple-50' },
  { from: /bg-sky-500\/5/g, to: 'bg-purple-50/50' },
  { from: /bg-indigo-500\/5/g, to: 'bg-purple-50/50' },
  { from: /bg-purple-500\/5/g, to: 'bg-purple-50/50' },

  // Brand solids sky/indigo -> purple
  { from: /bg-sky-500/g, to: 'bg-purple-600' },
  { from: /bg-indigo-600/g, to: 'bg-purple-600' },
  { from: /bg-purple-500/g, to: 'bg-purple-600' },
  { from: /from-sky-500 to-indigo-600/g, to: 'from-purple-600 to-indigo-600' },
  { from: /hover:from-sky-400 hover:to-indigo-500/g, to: 'hover:from-purple-500 hover:to-indigo-500' }
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
console.log('Class theme update completed successfully!');
