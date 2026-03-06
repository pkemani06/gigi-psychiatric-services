require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// ─── DATABASE SETUP ───────────────────────────────────────────────
const adapter = new JSONFile(path.join(__dirname, 'bookings.json'));
const db = new Low(adapter, { bookings: [] });

async function initDB() {
  await db.read();
  db.data ||= { bookings: [] };
  await db.write();
}
// ──────────────────────────────────────────────────────────────────

// ─── SENDGRID SETUP ───────────────────────────────────────────────
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// ──────────────────────────────────────────────────────────────────

function formatTime(t) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
}

function formatDate(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
  });
}

// GET /bookings
app.get('/bookings', async (req, res) => {
  await db.read();
  const grouped = {};
  for (const b of db.data.bookings) {
    if (!grouped[b.date]) grouped[b.date] = [];
    grouped[b.date].push(b.time);
  }
  res.json(grouped);
});

// POST /book
app.post('/book', async (req, res) => {
  const { date, time, name, age, email, reason } = req.body;

  if (!date || !time || !name || !age || !email || !reason) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  await db.read();

  const alreadyBooked = db.data.bookings.some(
    b => b.date === date && b.time === time
  );
  if (alreadyBooked) {
    return res.status(409).json({ error: 'This slot was just taken. Please pick another time.' });
  }

  const booking = {
    id: Date.now().toString(),
    date,
    time,
    name: name.trim(),
    age: String(age).trim(),
    email: email.trim(),
    reason: reason.trim(),
    createdAt: new Date().toISOString(),
  };
  db.data.bookings.push(booking);
  await db.write();

  const formattedDate = formatDate(date);
  const formattedTime = formatTime(time);

  // ── Email to patient ──────────────────────────────────────────
  const patientEmail = {
    to: booking.email,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `Your Appointment Confirmation – ${formattedDate} at ${formattedTime}`,
    text:
      `Hi ${booking.name},\n\n` +
      `Your appointment has been confirmed!\n\n` +
      `Date: ${formattedDate}\n` +
      `Time: ${formattedTime}\n\n` +
      `Please be ready at your appointment time. You will receive meeting details shortly.\n\n` +
      `— Gigi Psychiatric Services`,
    html:
      `<h2>Hi ${booking.name},</h2>` +
      `<p>Your appointment has been confirmed!</p>` +
      `<table style="border-collapse:collapse;margin:16px 0;">` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Date</td><td>${formattedDate}</td></tr>` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Time</td><td>${formattedTime}</td></tr>` +
      `</table>` +
      `<p style="color:#666;font-size:14px;">Please be ready at your appointment time. You will receive meeting details shortly.</p>` +
      `<br><p>— Gigi Psychiatric Services</p>`,
  };

  // ── Email to mom (doctor) ─────────────────────────────────────
  const momEmail = {
    to: process.env.MOMS_EMAIL,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject: `New Appointment: ${booking.name} on ${formattedDate}`,
    text:
      `NEW APPOINTMENT\n\n` +
      `Name: ${booking.name}, Age ${booking.age}\n` +
      `Email: ${booking.email}\n` +
      `Date: ${formattedDate}\n` +
      `Time: ${formattedTime}\n` +
      `Reason: ${booking.reason}\n\n` +
      `— Gigi Booking System`,
    html:
      `<h2>New Appointment</h2>` +
      `<table style="border-collapse:collapse;margin:16px 0;">` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Name</td><td>${booking.name}, Age ${booking.age}</td></tr>` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Email</td><td>${booking.email}</td></tr>` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Date</td><td>${formattedDate}</td></tr>` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Time</td><td>${formattedTime}</td></tr>` +
      `<tr><td style="padding:6px 16px 6px 0;font-weight:bold;">Reason</td><td>${booking.reason}</td></tr>` +
      `</table>` +
      `<br><p>— Gigi Booking System</p>`,
  };

  try {
    await sgMail.send(patientEmail);
    console.log(`✅ Patient email sent to ${booking.email}`);
  } catch (err) {
    console.error('⚠️  Patient email failed (booking still saved):', err.message);
  }

  try {
    await sgMail.send(momEmail);
    console.log(`✅ Doctor email sent to ${process.env.MOMS_EMAIL}`);
  } catch (err) {
    console.error('⚠️  Doctor email failed (booking still saved):', err.message);
  }

  res.json({ success: true });
});

// DELETE /book/:id
app.delete('/book/:id', async (req, res) => {
  await db.read();
  const before = db.data.bookings.length;
  db.data.bookings = db.data.bookings.filter(b => b.id !== req.params.id);
  await db.write();
  res.json({ deleted: db.data.bookings.length < before });
});

const PORT = process.env.PORT || 4000;
initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Gigi Booking Server running on http://localhost:${PORT}`);
    console.log(`📁 Bookings stored in: bookings.json\n`);
  });
});