# Gigi Psychiatric Services 🧠

A full-stack telehealth booking website for Gigi Psychiatric Services, LLC. Patients can schedule virtual appointments online, and the provider receives email notifications for every new booking.

## Tech Stack

**Frontend**
- React (Create React App)
- React Router DOM
- Tailwind CSS
- Lucide React (icons)

**Backend**
- Node.js + Express
- SendGrid (email notifications)
- lowdb (JSON file database)
- dotenv

## Features

- 📅 Interactive weekly booking calendar (Mon–Fri, 9AM–5PM, 30-min slots)
- 🔒 Real-time slot blocking — booked times can't be double-booked
- 📧 Automatic email confirmation sent to the patient on booking
- 📬 Email notification sent to the provider with patient details
- ⚠️ Spam folder reminder popup for patients after booking
- 💾 Persistent bookings stored in `bookings.json`

## Project Structure

```
gigi-pediatric-website/
├── frontend/                  # React app
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── index.jsx      # Home
│   │   │   ├── services.jsx   # Services
│   │   │   ├── about.jsx      # About the provider
│   │   │   ├── contact.jsx    # Contact
│   │   │   └── booking.jsx    # Booking calendar
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── backend/                   # Express server
    ├── server.js
    ├── bookings.json          # Auto-generated, do not commit
    ├── .env                   # Secret keys, do not commit
    └── package.json
```

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/pkemani06/gigi-psychiatric-services.git
cd gigi-psychiatric-services
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` folder:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=your_verified_sender@email.com
MOMS_EMAIL=providers_email@email.com
PORT=4000
```

Start the backend:

```bash
node server.js
```

### 3. Set up the frontend

```bash
cd frontend
npm install
npm start
```

The app will run at `http://localhost:3000`.

## Environment Variables

| Variable | Description |
|---|---|
| `SENDGRID_API_KEY` | Your SendGrid API key |
| `SENDGRID_FROM_EMAIL` | Verified sender email in SendGrid |
| `MOMS_EMAIL` | Provider's email to receive booking notifications |
| `PORT` | Backend port (default: 4000) |

## Notes

- Never commit your `.env` file or `bookings.json`
- The `.gitignore` excludes both automatically
- SendGrid free tier allows up to 100 emails/day
- Patients may need to check their spam folder for confirmation emails

## Coming Soon

- 🔗 Webex meeting link included in confirmation emails
- 📆 Admin dashboard to view/cancel bookings
