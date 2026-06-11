# Babylon National School — Form Backend

Saves admission and contact form submissions to Excel and sends emails via Nodemailer.

---

## Quick Start (5 minutes)

### Step 1 — Install dependencies
```bash
cd babylon-backend
npm install
```

### Step 2 — Create your .env file
```bash
cp .env.example .env
```
Open `.env` and fill in your SMTP credentials (see comments inside).

**Fastest option — Gmail App Password:**
1. Go to your Google Account → Security → 2-Step Verification (enable it)
2. Then go to: https://myaccount.google.com/apppasswords
3. Create a new App Password → Mail
4. Copy the 16-character password into `SMTP_PASS`

### Step 3 — Start the server
```bash
# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:4000`

---

## API Endpoints

### `POST /api/admission`
Saves to `data/admissions.xlsx` and sends 2 emails (school + parent confirmation).

**Body (JSON):**
```json
{
  "studentName": "Ram Sharma",
  "dob": "2015-04-12",
  "gender": "Male",
  "gradeApplied": "Grade III",
  "previousSchool": "ABC School",
  "fatherName": "Hari Sharma",
  "motherName": "Sita Sharma",
  "guardianPhone": "9841000000",
  "guardianEmail": "hari@example.com",
  "address": "Kathmandu",
  "emergencyContact": "9800000000",
  "heardFrom": "Google",
  "message": "Looking forward to it",
  "hasDocuments": true
}
```

### `POST /api/contact`
Saves to `data/contacts.xlsx` and sends 2 emails (school + auto-reply).

**Body (JSON):**
```json
{
  "name": "Priya Thapa",
  "email": "priya@example.com",
  "message": "I want to know about admissions."
}
```

---

## Excel Files

Generated automatically in the `data/` folder:
- `data/admissions.xlsx` — one row per admission application
- `data/contacts.xlsx` — one row per contact message

Both files use a dark navy header row, alternating row colors, and auto-sized columns.

---

## Frontend Integration

See `frontend-changes.js` for the exact code to change in `App.jsx` — it's about 20 lines total in two places:
1. The Admission Modal submit button
2. The Footer contact form send button

---

## Production Deployment

1. **Update ALLOWED_ORIGIN** in `.env` to your frontend domain
2. **Update the fetch URL** in your React code from `http://localhost:4000` to your backend URL
3. **Keep `data/` in `.gitignore`** — Excel files contain personal data
4. Consider a cron job to email the Excel files to the admin periodically

---

## .gitignore (add these)
```
.env
data/
node_modules/
```
