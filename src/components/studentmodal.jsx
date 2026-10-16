import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, UserRoundPlus } from "lucide-react";

const emptyStudent = {
  name: "",
  email: "",
  roll: "",
  course: "Computer Science",
  year: "1st Year",
  marks: 0,
  attendance: 100,
  status: "Active",
};

export default function StudentModal({ open, student, onClose, onSave }) {
  const [form, setForm] = useState(emptyStudent);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setForm(student ? { ...student } : { ...emptyStudent });
      setError("");
    }
  }, [open, student]);

  function update(field, value) {
    setForm((previous) => ({ ...previous, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.roll.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Enter a valid email address.");
      return;
    }

    onSave({
      ...form,
      name: form.name.trim(),
      email: form.email.trim(),
      roll: form.roll.trim(),
      marks: Number(form.marks),
      attendance: Number(form.attendance),
    });
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) onClose();
          }}
        >
          <motion.div
            className="modal-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby="student-modal-title"
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="modal-heading">
              <div className="modal-heading-icon"><UserRoundPlus size={21} /></div>
              <div>
                <h2 id="student-modal-title">{student ? "Edit student" : "Add new student"}</h2>
                <p>Enter the student's academic information.</p>
              </div>
              <button className="icon-button" onClick={onClose} aria-label="Close modal"><X size={19} /></button>
            </div>

            <form onSubmit={submit}>
              <div className="form-grid">
                <label className="field full-field">Full name *
                  <input autoFocus value={form.name} onChange={(e) => update("name", e.target.value)} placeholder="e.g. Aarav Sharma" />
                </label>
                <label className="field">Email address *
                  <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} placeholder="student@campus.edu" />
                </label>
                <label className="field">Roll number *
                  <input value={form.roll} onChange={(e) => update("roll", e.target.value)} placeholder="CS2026009" />
                </label>
                <label className="field">Course
                  <select value={form.course} onChange={(e) => update("course", e.target.value)}>
                    <option>Computer Science</option>
                    <option>Information Technology</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil Engineering</option>
                    <option>Business Administration</option>
                  </select>
                </label>
                <label className="field">Academic year
                  <select value={form.year} onChange={(e) => update("year", e.target.value)}>
                    <option>1st Year</option>
                    <option>2nd Year</option>
                    <option>3rd Year</option>
                    <option>4th Year</option>
                  </select>
                </label>
                <label className="field">Marks (%)
                  <input type="number" min="0" max="100" value={form.marks} onChange={(e) => update("marks", e.target.value)} />
                </label>
                <label className="field">Attendance (%)
                  <input type="number" min="0" max="100" value={form.attendance} onChange={(e) => update("attendance", e.target.value)} />
                </label>
              </div>

              {error && <p className="form-error" role="alert">{error}</p>}

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn-primary">{student ? "Save changes" : "Create student"}</button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}