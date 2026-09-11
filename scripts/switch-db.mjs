import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const target = process.argv[2]?.toLowerCase();

if (!['sqlite', 'postgres', 'postgresql'].includes(target)) {
  console.log('Usage: node scripts/switch-db.mjs <sqlite|postgres>');
  process.exit(1);
}

const isPostgres = target.startsWith('postgres');
const sourceFile = isPostgres 
  ? path.join(rootDir, 'prisma', 'schema.prisma.postgres')
  : path.join(rootDir, 'prisma', 'schema.prisma.sqlite');
const destFile = path.join(rootDir, 'prisma', 'schema.prisma');

if (!fs.existsSync(sourceFile)) {
  console.error(`Error: Source schema file not found at ${sourceFile}`);
  process.exit(1);
}

fs.copyFileSync(sourceFile, destFile);
console.log(`✅ Switched Prisma schema to: ${isPostgres ? 'PostgreSQL' : 'SQLite'}`);
console.log(`📌 File updated: prisma/schema.prisma`);
console.log(`👉 Next step: Run "npx prisma generate" and "npx prisma db push"`);
