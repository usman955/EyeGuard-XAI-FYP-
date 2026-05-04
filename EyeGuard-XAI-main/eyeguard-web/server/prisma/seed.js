/**
 * ============================================================================
 * File: seed.js
 * Location: prisma
 * Purpose: Express.js server logic and database integration for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  const doctorPassword = await bcrypt.hash('password', 10);
  const userPassword = await bcrypt.hash('password', 10);
  const testPassword = await bcrypt.hash('test1234', 10);

  // Upsert Doctor
  await prisma.user.upsert({
    where: { email: 'doctor@eyeguard.com' },
    update: {},
    create: {
      email: 'doctor@eyeguard.com',
      password: doctorPassword,
      name: 'Dr. Smith',
      role: 'doctor'
    }
  });

  // Upsert Patient User
  await prisma.user.upsert({
    where: { email: 'user@eyeguard.com' },
    update: {},
    create: {
      email: 'user@eyeguard.com',
      password: userPassword,
      name: 'John Doe',
      role: 'user'
    }
  });

  // Upsert Test User
  await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      password: testPassword,
      name: 'Test User',
      role: 'user'
    }
  });

  console.log('Database seeded successfully');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
