# Gigi Psychiatric Services — Website

A React front end (Create React App) plus an Express booking API. Patients browse the
site, pick an appointment slot, and the backend stores the booking and sends
confirmation email via SendGrid.

```
gigi-pediatric-website/
├── frontend/          # React app (CRA) — the public website
│   ├── public/images/ # all site images live here (logo, provider photo, conditions)
│   └── src/pages/     # one file per route: index, about, services, what-we-treat, blog, booking, contact
├── backend/           # Express API — booking storage + notifications
│   ├── server.js      # the whole API (GET /bookings, POST /book, DELETE /bookings/:id)
│   └── bookings.json  # lowdb "database" (git-ignored, created on first run)
└── vercel.json        # Vercel builds only the frontend; backend is hosted on Railway
```

## Prerequisites

- **Node.js 22.x** (the frontend pins `"engines": { "node": "22.x" }`)
- npm

Check with `node -v`.

## First-time setup

Install dependencies in each folder separately — there is no root `package.json`,
so `npm install` at the top level does nothing.

```bash
cd backend && npm install
cd ../frontend && npm install
```

## Backend — run the API

```bash
cd backend
npm start          # → node server.js
```

Runs at **http://localhost:4000** (`PORT` in `.env`, defaults to 4000). On success:

```
🚀 Gigi Booking Server running on http://localhost:4000
📁 Bookings stored in: bookings.json
```

### Environment variables

The backend needs `backend/.env` (git-ignored — never commit it). It is loaded only
when `NODE_ENV !== 'production'`; in production the host supplies these directly.

| Variable | Purpose |
| --- | --- |
| `SENDGRID_API_KEY` | SendGrid key used to send booking emails |
| `SENDGRID_FROM_EMAIL` | Verified sender address the emails come from |
| `MOMS_EMAIL` | Where new-booking notifications are delivered |
| `WEBEX_MEETING_LINK` | Telehealth link included in the confirmation email |
| `TWILIO_ACCOUNT_SID` | Twilio account SID |
| `TWILIO_AUTH_TOKEN` | Twilio auth token |
| `PORT` | Port for the Express server (default `4000`) |

### API endpoints

| Method | Route | Description |
| --- | --- | --- |
| `GET` | `/bookings` | All booked slots, grouped by date |
| `POST` | `/book` | Create a booking (`date`, `time`, `name`, `age`, `email`, `reason` all required) |
| `DELETE` | `/bookings/:id` | Remove a booking by id |

Quick check that it's alive:

```bash
curl http://localhost:4000/bookings
```

## Frontend — run the website

```bash
cd frontend
npm start
```

Opens **http://localhost:3000** with hot reload.

Production build:

```bash
npm run build       # outputs to frontend/build/
```

## Running both at once

Use two terminal tabs — one for each server:

```bash
# tab 1
cd backend && npm start

# tab 2
cd frontend && npm start
```

> **Note:** `frontend/src/pages/booking.jsx` currently posts to the deployed Railway
> backend, not `localhost`. To exercise your local API, temporarily point that `fetch`
> URL at `http://localhost:4000/book`.

## Images

All site images are served from `frontend/public/images/` and referenced by absolute
path (e.g. `src="/images/provider-photo.png"`).

- `logo.png` — navbar and footer
- `provider-photo.png` — caregiver photo on the About page (`src/pages/about.jsx`)
- `backdrop.jpg`, `backdrop-for-hero.png` — page and hero backgrounds
- `conditions/*.jpg` — the What We Treat cards

To swap an image, replace the file in `frontend/public/images/` keeping the same
filename. Do **not** edit anything in `frontend/build/` — that folder is regenerated
by `npm run build` and your changes would be overwritten.

## Deployment

- **Frontend** → Vercel, per `vercel.json` (builds `frontend/`, serves `frontend/build`).
- **Backend** → Railway at `gigi-psychiatric-services-production.up.railway.app`.
  Set every variable from the table above in the Railway dashboard; `.env` is not deployed.
