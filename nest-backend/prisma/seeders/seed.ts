import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { seedCategories } from './categories.seed';

const adapter = new PrismaMariaDb({
    port: parseInt(process.env.DB_PORT || '3310'),
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'archi-logiciel',
    allowPublicKeyRetrieval: true,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    console.log('🌱 Starting database seeding...\n');

    await seedCategories(prisma);

    console.log('\n✅ Database seeding completed successfully!');
  } catch (error) {
    console.error('\n❌ Error during database seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
