import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// ── In-Memory Database with Dummy Data ────────────────────────────────────────

let users = [
  { id: 'admin-1',   email: 'admin',           password: 'admin123',  name: 'Super Admin',     role: 'ADMIN'   },
  { id: 'teacher-1', email: 'sara@teacher.com', password: 'sara123',   name: 'Sara Malik',      role: 'TEACHER' },
  { id: 'teacher-2', email: 'bilal@teacher.com',password: 'bilal123',  name: 'Bilal Ahmed',     role: 'TEACHER' },
  { id: 'teacher-3', email: 'ayesha@teacher.com',password:'ayesha123', name: 'Ayesha Siddiqui', role: 'TEACHER' },
];

let teacherApplications = [
  { id: 'app-1', firstName:'Sara',   lastName:'Malik',    email:'sara@teacher.com',  education:'Masters',  subject:'Mathematics', status:'approved', submittedAt:'2025-04-10T09:00:00Z' },
  { id: 'app-2', firstName:'Bilal',  lastName:'Ahmed',    email:'bilal@teacher.com', education:'Bachelors',subject:'Physics',     status:'approved', submittedAt:'2025-04-15T11:30:00Z' },
  { id: 'app-3', firstName:'Ayesha', lastName:'Siddiqui', email:'ayesha@teacher.com',education:'Masters',  subject:'English',     status:'pending',  submittedAt:'2025-05-01T08:45:00Z' },
  { id: 'app-4', firstName:'Omar',   lastName:'Farooq',   email:'omar@teacher.com',  education:'PhD',      subject:'Chemistry',   status:'pending',  submittedAt:'2025-05-05T14:20:00Z' },
  { id: 'app-5', firstName:'Zainab', lastName:'Butt',     email:'zainab@teacher.com',education:'Bachelors',subject:'Biology',     status:'rejected', submittedAt:'2025-05-07T10:00:00Z' },
];

let tutorRequests = [
  { id: 'req-1', name:'Ali Khan',    phone:'03001234567', mode:'Home Tutor',   grade:'Matric/O-Level', city:'Lahore',    subjects:'Math, Physics',   submittedAt:'2025-05-01T10:00:00Z' },
  { id: 'req-2', name:'Fatima Noor', phone:'03119876543', mode:'Online Tutor', grade:'FSc/A-Level',    city:'Karachi',   subjects:'Chemistry',       submittedAt:'2025-05-03T12:00:00Z' },
  { id: 'req-3', name:'Hassan Raza', phone:'03215556677', mode:'Home Tutor',   grade:'Class 6-8',      city:'Islamabad', subjects:'English, Urdu',    submittedAt:'2025-05-05T09:30:00Z' },
  { id: 'req-4', name:'Maryam Shah', phone:'03331112233', mode:'Online Tutor', grade:'Class 1-5',      city:'Lahore',    subjects:'Math',             submittedAt:'2025-05-07T15:00:00Z' },
  { id: 'req-5', name:'Usman Tariq', phone:'03451234000', mode:'Home Tutor',   grade:'FSc/A-Level',    city:'Karachi',   subjects:'Physics, Maths',   submittedAt:'2025-05-08T11:00:00Z' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const delay = (ms) => new Promise(r => setTimeout(r, ms));
const genId = () => Math.random().toString(36).substr(2, 9);

// ── Auth Routes ───────────────────────────────────────────────────────────────

app.post('/api/auth/login', async (req, res) => {
  await delay(600);
  const { email, password, role } = req.body;
  const user = users.find(u =>
    u.email.toLowerCase() === email.toLowerCase() &&
    u.password === password &&
    u.role === role
  );
  if (user) {
    res.json({ success: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
  } else {
    res.json({ success: false, message: 'Invalid username or password' });
  }
});

app.post('/api/auth/signup', async (req, res) => {
  await delay(600);
  const { name, email, password, role } = req.body;
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return res.json({ success: false, message: 'Account with this email already exists' });
  }
  const newUser = { id: genId(), email, password, name, role };
  users.push(newUser);
  res.json({ success: true, user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role } });
});

// ── Teacher Routes ────────────────────────────────────────────────────────────

app.post('/api/teacher/apply', async (req, res) => {
  await delay(800);
  const app_ = { id: genId(), submittedAt: new Date().toISOString(), status: 'pending', ...req.body };
  teacherApplications.unshift(app_);
  res.json({ success: true, message: 'Application received' });
});

// ── Parent / Tutor Request Routes ─────────────────────────────────────────────

app.post('/api/tutor/request', async (req, res) => {
  await delay(800);
  const req_ = { id: genId(), submittedAt: new Date().toISOString(), ...req.body };
  tutorRequests.unshift(req_);
  res.json({ success: true, matches: 3 });
});

// ── Admin Routes ──────────────────────────────────────────────────────────────

app.get('/api/admin/data', (req, res) => {
  res.json({ teacherApplications, tutorRequests });
});

app.patch('/api/admin/approve/:id', async (req, res) => {
  await delay(300);
  const app_ = teacherApplications.find(a => a.id === req.params.id);
  if (!app_) return res.json({ success: false, message: 'Not found' });
  app_.status = 'approved';
  res.json({ success: true });
});

app.patch('/api/admin/reject/:id', async (req, res) => {
  await delay(300);
  const app_ = teacherApplications.find(a => a.id === req.params.id);
  if (!app_) return res.json({ success: false, message: 'Not found' });
  app_.status = 'rejected';
  res.json({ success: true });
});

// ── Start ─────────────────────────────────────────────────────────────────────

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Keep Tutors API running → http://localhost:${PORT}`));
