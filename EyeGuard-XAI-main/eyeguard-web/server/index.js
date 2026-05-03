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
  const { email, password, name, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, password: hashedPassword, name, role }
    });
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
    res.status(400).json({ error: 'User already exists' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET);
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } catch (err) {
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
