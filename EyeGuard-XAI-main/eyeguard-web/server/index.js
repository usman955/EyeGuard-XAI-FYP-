/**
 * ============================================================================
 * File: index.js
 * Purpose: Express.js server logic and database integration for the EyeGuard-XAI Web Dashboard.
 * This file is part of the EyeGuard-XAI automated screening system.
 * ============================================================================
 */

const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'eyeguard-super-secret-key';

app.use(cors());
app.use(express.json());

// --- Authentication Middleware ---
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// --- Auth Routes ---

app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role, license } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'Name, email, password, and role are required fields.' });
  }

  if (role === 'doctor' && !license) {
    return res.status(400).json({ error: 'A Medical License Number is required for professional registration.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        email: email.toLowerCase().trim(),
        password: hashedPassword,
        name,
        role,
        license: role === 'doctor' ? license : null
      }
    });
    res.json({ success: true, message: 'Registration successful' });
  } catch (err) {
    console.error('Registration Database Error:', err);
    if (err.code === 'P2002') {
      return res.status(400).json({ error: 'This email is already registered. Please login instead.' });
    }
    res.status(500).json({ error: `Registration failed: ${err.message || 'Database error'}` });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password, role } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ error: 'Email, password, and role are required.' });
  }

  try {
    const user = await prisma.user.findUnique({ where: { email: email.toLowerCase().trim() } });

    if (!user) {
      return res.status(401).json({ error: 'No account found with this email. Please register first.' });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Incorrect password. Please try again.' });
    }

    // Role verification (Strict)
    if (user.role !== role) {
      const actualRoleName = user.role === 'doctor' ? 'Medical Professional' : 'General User';
      return res.status(403).json({ error: `Access Denied: This is a ${actualRoleName} account. Please use the correct login portal.` });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    console.error('Login Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// --- Patient & Screening Routes ---

app.get('/api/patients', authenticate, async (req, res) => {
  if (req.userRole !== 'doctor') return res.status(403).json({ error: 'Forbidden' });
  const patients = await prisma.patient.findMany({
    where: { doctorId: req.userId },
    include: { screenings: true }
  });
  res.json(patients);
});

app.post('/api/patients', authenticate, async (req, res) => {
  if (req.userRole !== 'doctor') return res.status(403).json({ error: 'Forbidden' });
  const { name, age, gender } = req.body;
  const patient = await prisma.patient.create({
    data: { name, age: parseInt(age), gender, doctorId: req.userId }
  });
  res.json(patient);
});

app.post('/api/screenings', authenticate, async (req, res) => {
  const { patientId, imageUrl, result } = req.body;
  const screening = await prisma.screening.create({
    data: {
      patientId,
      userId: req.userId,
      imageUrl,
      result: JSON.stringify(result)
    }
  });
  res.json(screening);
});

app.get('/api/screenings', authenticate, async (req, res) => {
  const screenings = await prisma.screening.findMany({
    where: req.userRole === 'doctor' ? { patient: { doctorId: req.userId } } : { userId: req.userId },
    include: { patient: true }
  });
  res.json(screenings);
});

const seedUsers = async () => {
  const defaults = [
    { email: 'doctor@eyeguard.com', password: 'password123', name: 'Dr. Smith', role: 'doctor', license: 'MD12345' },
    { email: 'user@eyeguard.com', password: 'password123', name: 'John Doe', role: 'user' }
  ];

  for (const u of defaults) {
    const existing = await prisma.user.findUnique({ where: { email: u.email } });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      await prisma.user.create({
        data: { ...u, password: hashedPassword }
      });
      console.log(`Seeded user: ${u.email}`);
    }
  }
};

app.listen(PORT, async () => {
  await seedUsers();
  console.log(`Server running on http://localhost:${PORT}`);
});
