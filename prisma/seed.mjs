import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // 1. Seed Super Admin User (Somboon)
  const adminUser = await prisma.user.upsert({
    where: { email: 'smjaurna@gmail.com' },
    update: {},
    create: {
      id: 'usr-admin-somboon',
      email: 'smjaurna@gmail.com',
      fullName: 'อาจารย์ ดร.สมบูรณ์ จารุณะ',
      paliName: 'สมฺปุณฺโณ',
      sanghaRank: 'ผู้ดูแลระบบหลัก (Super Administrator)',
      monasticType: 'LAYPERSON',
      role: 'SUPER_ADMIN',
      templeName: 'มหาวชิราลงกรณบาลีเถรวาทราชวิทยาลัย',
      phone: '099-445-4256',
    },
  });
  console.log(`✅ Super Admin created: ${adminUser.fullName} (${adminUser.email})`);

  // 2. Seed Abbot / Director
  const directorUser = await prisma.user.upsert({
    where: { email: 'director@mcu.ac.th' },
    update: {},
    create: {
      id: 'usr-director-phradham',
      email: 'director@mcu.ac.th',
      fullName: 'พระธรรมวชิราจารย์, รศ.ดร.',
      paliName: 'สุทนฺโต',
      sanghaRank: 'พระราชาคณะชั้นธรรม / ผู้อำนวยการ',
      monasticType: 'BHIKKHU',
      role: 'SUPER_ADMIN',
      templeName: 'วัดบาลีเถรวาทสังฆาราม',
      phone: '034-123-456',
    },
  });
  console.log(`✅ Director created: ${directorUser.fullName}`);

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
