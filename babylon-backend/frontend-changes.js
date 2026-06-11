// ─── FRONTEND INTEGRATION ─────────────────────────────────────────────────────
// These are the two snippets you need to change in App.jsx to wire up the backend.
// ─────────────────────────────────────────────────────────────────────────────

// ══════════════════════════════════════════════════════════════════════════════
// 1) ADMISSION MODAL — replace the Submit button onClick (around line 1240)
// ══════════════════════════════════════════════════════════════════════════════

// ADD these two state variables inside AdmissionModal (after line 1123):
const [submitting, setSubmitting] = useState(false);
const [submitError, setSubmitError] = useState("");

// REPLACE the Submit button onClick handler (line 1241) with this function:
async function handleSubmit() {
  if (step < 4) { setStep(s => s + 1); return; }

  setSubmitting(true);
  setSubmitError("");
  try {
    const res = await fetch(`${API_BASE_URL}/api/admissions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      setSubmitted(true);
    } else {
      setSubmitError(data.message || "Submission failed. Please try again.");
    }
  } catch {
    setSubmitError("Could not connect to server. Please try again.");
  } finally {
    setSubmitting(false);
  }
}

// UPDATE the button (line 1240–1244) to use handleSubmit:
<button
  onClick={handleSubmit}
  disabled={submitting}
  style={{ padding: "10px 24px", borderRadius: 8, background: submitting ? "#aaa" : C.teal, color: "white", border: "none", fontSize: 14, fontWeight: 600, cursor: submitting ? "not-allowed" : "pointer" }}>
  {submitting ? "Submitting…" : step === 4 ? "Submit →" : "Next →"}
</button>

// ADD this error message right above the button div:
{submitError && (
  <p style={{ color: C.red, fontSize: 13, margin: "0 0 10px" }}>{submitError}</p>
)}


// ══════════════════════════════════════════════════════════════════════════════
// 2) FOOTER QUICK CONTACT — replace the Send Message button onClick (line 1408)
// ══════════════════════════════════════════════════════════════════════════════

// REPLACE the Footer function's state and button with:
const [sending, setSending] = useState(false);

async function handleContact() {
  if (!name.trim() || !email.trim() || !msg.trim()) return;
  setSending(true);
  try {
    const res = await fetch(`${API_BASE_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message: msg }),
    });
    const data = await res.json();
    if (data.success) setSent(true);
  } catch {
    // silently fail — user sees the button again
  } finally {
    setSending(false);
  }
}

// UPDATE the Send button:
<button onClick={handleContact} disabled={sending}
  style={{ width: "100%", padding: "10px", background: sending ? "#aaa" : C.teal, color: "white", border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: sending ? "not-allowed" : "pointer" }}>
  {sending ? "Sending…" : "Send Message"}
</button>


// ══════════════════════════════════════════════════════════════════════════════
// 3) FOR PRODUCTION — change the fetch URL to your deployed domain, e.g.:
//    "https://api.babylonschool.edu.np/api/admission"
// ══════════════════════════════════════════════════════════════════════════════
