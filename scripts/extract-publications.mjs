import mammoth from 'mammoth';
import fs from 'fs';
import path from 'path';

async function extract() {
  const dir = path.resolve('docs/faculty');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.docx'));
  let out = '';
  for (const f of files) {
    out += '========================================================\n';
    out += 'FILE: ' + f + '\n';
    out += '========================================================\n';
    try {
      const res = await mammoth.extractRawText({ path: path.join(dir, f) });
      out += res.value + '\n\n';
    } catch (e) {
      out += 'Error reading ' + f + ': ' + e.message + '\n';
    }
  }
  fs.writeFileSync('scripts/extracted_faculty_text.txt', out, 'utf8');
  console.log('Saved UTF-8 successfully, length:', out.length);
}

extract();
