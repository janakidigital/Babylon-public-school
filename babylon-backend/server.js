require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(express.json());

// ── Supabase ──────────────────────────────────────────────────────────────────
const sb = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// ── Mailer ────────────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const SCHOOL_EMAIL = process.env.SCHOOL_EMAIL || process.env.SMTP_USER;
const SCHOOL_NAME  = "Babylon National School";

async function sendMail(options) {
  try { await transporter.sendMail(options); }
  catch (err) { console.error("Email error:", err.message); }
}

// ── ADMISSION ─────────────────────────────────────────────────────────────────
app.post("/api/admission", async (req, res) => {
  try {
    const f = req.body;

    // 1. Save to Supabase
    const { error } = await sb.from("admissions").insert([{
      student_name:      f.studentName,
      dob:               f.dob,
      gender:            f.gender,
      grade_applied:     f.gradeApplied,
      previous_school:   f.previousSchool,
      father_name:       f.fatherName,
      mother_name:       f.motherName,
      guardian_phone:    f.guardianPhone,
      guardian_email:    f.guardianEmail,
      address:           f.address,
      emergency_contact: f.emergencyContact,
      heard_from:        f.heardFrom,
      message:           f.message,
      has_documents:     f.hasDocuments || false,
    }]);

    if (error) throw error;

    // 2. Notify school
    await sendMail({
      from: `"${SCHOOL_NAME} Website" <${process.env.SMTP_USER}>`,
      to: SCHOOL_EMAIL,
      subject: `📋 New Admission — ${f.studentName} (${f.gradeApplied})`,
      html: admissionNotifyHtml(f),
    });

    // 3. Confirm to parent
    if (f.guardianEmail) {
      await sendMail({
        from: `"${SCHOOL_NAME}" <${process.env.SMTP_USER}>`,
        to: f.guardianEmail,
        subject: `Application Received — ${SCHOOL_NAME}`,
        html: admissionConfirmHtml(f),
      });
    }

    res.json({ success: true, message: "Application submitted successfully." });
  } catch (err) {
    console.error("Admission error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ── CONTACT ───────────────────────────────────────────────────────────────────
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // 1. Save to Supabase
    const { error } = await sb.from("contacts").insert([{ name, email, message }]);
    if (error) throw error;

    // 2. Notify school
    await sendMail({
      from: `"${SCHOOL_NAME} Website" <${process.env.SMTP_USER}>`,
      to: SCHOOL_EMAIL,
      subject: `💬 New Contact Message from ${name}`,
      html: contactNotifyHtml(name, email, message),
    });

    // 3. Auto-reply
    if (email) {
      await sendMail({
        from: `"${SCHOOL_NAME}" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `We received your message — ${SCHOOL_NAME}`,
        html: contactConfirmHtml(name),
      });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ success: false, message: "Server error. Please try again." });
  }
});

// ── EMAIL TEMPLATES ───────────────────────────────────────────────────────────
function row(label, value) {
  if (!value) return "";
  return `<tr>
    <td style="padding:8px 12px;font-weight:600;color:#555;background:#f5f7fa;width:160px;border:1px solid #e0e0e0">${label}</td>
    <td style="padding:8px 12px;color:#222;border:1px solid #e0e0e0">${value}</td>
  </tr>`;
}

function emailWrapper(title, body) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;margin:0;background:#f0f2f5">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
  <table width="600" cellpadding="0" cellspacing="0" style="background:white;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,.1)">
    <tr><td style="background:#1a2744;padding:24px 32px">
      <h2 style="color:white;margin:0;font-size:20px">${SCHOOL_NAME}</h2>
      <p style="color:rgba(255,255,255,.6);margin:4px 0 0;font-size:13px">BalaBhadra Marga, Kathmandu, Nepal</p>
    </td></tr>
    <tr><td style="padding:28px 32px">
      <h3 style="color:#1a2744;margin:0 0 20px">${title}</h3>
      ${body}
    </td></tr>
    <tr><td style="background:#f5f7fa;padding:16px 32px;text-align:center">
      <p style="color:#999;font-size:12px;margin:0">© ${new Date().getFullYear()} ${SCHOOL_NAME}</p>
    </td></tr>
  </table></td></tr></table></body></html>`;
}

function admissionNotifyHtml(f) {
  return emailWrapper("New Admission Application", `
    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
      <tr><td colspan="2" style="padding:8px 12px;background:#12a5bf;color:white;font-weight:700;font-size:13px">STUDENT</td></tr>
      ${row("Student Name", f.studentName)}
      ${row("Date of Birth", f.dob)}
      ${row("Gender", f.gender)}
      ${row("Grade Applied", f.gradeApplied)}
      ${row("Previous School", f.previousSchool)}
      <tr><td colspan="2" style="padding:8px 12px;background:#12a5bf;color:white;font-weight:700;font-size:13px">PARENT</td></tr>
      ${row("Father's Name", f.fatherName)}
      ${row("Mother's Name", f.motherName)}
      ${row("Phone", f.guardianPhone)}
      ${row("Email", f.guardianEmail)}
      ${row("Address", f.address)}
      ${row("Emergency Contact", f.emergencyContact)}
      ${row("Heard From", f.heardFrom)}
      ${row("Message", f.message)}
      ${row("Docs Confirmed", f.hasDocuments ? "Yes" : "No")}
    </table>
    <p style="margin:16px 0 0;color:#888;font-size:12px">Also saved to Supabase → admissions table.</p>
  `);
}

function admissionConfirmHtml(f) {
  return emailWrapper("Application Received!", `
    <p style="color:#444">Dear <strong>${f.fatherName || f.motherName || "Parent/Guardian"}</strong>,</p>
    <p style="color:#444;line-height:1.7">Thank you for applying for <strong>${f.studentName}</strong> to ${SCHOOL_NAME}. We will contact you at <strong>${f.guardianPhone}</strong> within 3–5 business days.</p>
    <div style="background:#f0fafb;border-left:4px solid #12a5bf;padding:14px 18px;border-radius:4px;margin:20px 0">
      <p style="margin:0;font-size:13px;color:#555">Questions? Call <strong>+977-1-4108905</strong> or email <strong>info@babylonschool.edu.np</strong></p>
    </div>
    <p style="color:#444">Warm regards,<br><strong>Admissions Team</strong><br>${SCHOOL_NAME}</p>
  `);
}

function contactNotifyHtml(name, email, message) {
  return emailWrapper("New Contact Message", `
    <table cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse">
      ${row("Name", name)}${row("Email", email)}${row("Message", message)}
    </table>
  `);
}

function contactConfirmHtml(name) {
  return emailWrapper("We received your message!", `
    <p style="color:#444">Dear <strong>${name}</strong>,</p>
    <p style="color:#444;line-height:1.7">Thank you for contacting ${SCHOOL_NAME}. We'll get back to you within 1–2 business days.</p>
    <p style="color:#444">Warm regards,<br><strong>${SCHOOL_NAME}</strong></p>
  `);
}

// ── START ─────────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`✅ Babylon backend running on port ${PORT}`));