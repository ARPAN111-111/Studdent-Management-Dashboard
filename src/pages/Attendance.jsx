import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Plus, Pencil, Trash2, Download, SlidersHorizontal, Users } from "lucide-react";
import StudentModal from "../components/studentmodal.jsx";
import { getGrade } from "../data";

export default function Students({ students, onAdd, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All courses");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const filtered = useMemo(() => students.filter((student) => {
    const query = search.toLowerCase();
    const matchesSearch = [student.name, student.email, student.roll, student.course]
      .some((value) => String(value).toLowerCase().includes(query));
    return matchesSearch && (course === "All courses" || student.course === course);
  }), [students, search, course]);

  function openAdd() {
    setEditing(null);
    setModalOpen(true);
  }

  function openEdit(student) {
    setEditing(student);
    setModalOpen(true);
  }

  function save(form) {
    if (editing) onUpdate({ ...form, id: editing.id });
    else onAdd(form);
    setModalOpen(false);
    setEditing(null);
  }

  function exportCSV() {
    const headers = ["Name", "Email", "Roll Number", "Course", "Year", "Marks", "Attendance", "Grade"];
    const rows = filtered.map(s => [s.name, s.email, s.roll, s.course, s.year, s.marks, s.attendance, getGrade(s.marks)]);
    const escape = value => `"${String(value ?? "").replace(/"/g, '""')}"`;
    const csv = [headers, ...rows].map(row => row.map(escape).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "campusos-students.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="students-page">
      <div className="page-heading">
        <div><div className="eyebrow">DIRECTORY / RECORDS</div><h1>Student <span>directory.</span></h1><p>Manage your student records in one place.</p></div>
        <button className="btn-primary" onClick={openAdd}><Plus size={17} /> Add student</button>
      </div>

      <div className="directory-summary">
        <div className="directory-summary-icon"><Users size={21} /></div>
        <div><strong>{students.length} students</strong><p>{filtered.length} records matching your filters</p></div>
        <div className="directory-summary-spacer" />
        <span className="summary-status"><i className="live-dot" /> Records synced locally</span>
      </div>

      <section className="panel directory-panel">
        <div className="directory-toolbar">
          <div className="directory-search"><Search size={17} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search name, email or roll number..." aria-label="Search students" /></div>
          <div className="toolbar-right">
            <div className="select-wrap"><SlidersHorizontal size={15} /><select value={course} onChange={e => setCourse(e.target.value)} aria-label="Filter by course"><option>All courses</option>{[...new Set(students.map(s => s.course))].sort().map(c => <option key={c}>{c}</option>)}</select></div>
            <button className="btn-secondary" onClick={exportCSV}><Download size={16} /> Export</button>
          </div>
        </div>

        <div className="table-wrap">
          <table>
            <thead><tr><th>STUDENT</th><th>ROLL NUMBER</th><th>COURSE / YEAR</th><th>MARKS</th><th>ATTENDANCE</th><th>STATUS</th><th>ACTIONS</th></tr></thead>
            <tbody>
              <AnimatePresence initial={false}>
                {filtered.map(student => (
                  <motion.tr key={student.id} layout initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.2 }}>
                    <td><div className="student-cell"><div className="student-avatar">{student.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</div><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
                    <td className="mono">{student.roll}</td>
                    <td><strong className="course-name">{student.course}</strong><small className="table-subtext">{student.year}</small></td>
                    <td><span className={`grade-badge grade-${getGrade(student.marks).replace("+", "plus")}`}>{student.marks}%</span></td>
                    <td><div className="attendance-cell"><span>{student.attendance}%</span><div className="mini-progress"><i style={{ width: `${student.attendance}%` }} /></div></div></td>
                    <td><span className="status-badge"><i />{student.status}</span></td>
                    <td><div className="action-buttons"><button className="icon-button small-action" onClick={() => openEdit(student)} aria-label={`Edit ${student.name}`}><Pencil size={15} /></button><button className="icon-button small-action delete-action" onClick={() => { if (window.confirm(`Delete ${student.name}'s record?`)) onDelete(student.id); }} aria-label={`Delete ${student.name}`}><Trash2 size={15} /></button></div></td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filtered.length === 0 && <tr><td colSpan="7" className="empty-state">No students found. Try another search or add a student.</td></tr>}
            </tbody>
          </table>
        </div>
        <div className="table-footer"><span>Showing {filtered.length} of {students.length} students</span><span>Student directory <i className="live-dot" /></span></div>
      </section>

      <StudentModal open={modalOpen} student={editing} onClose={() => setModalOpen(false)} onSave={save} />
    </motion.div>
  );
}

