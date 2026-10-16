import { useMemo, useState } from "react";
import { motion } from "motion/react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from "recharts";
import { Search, Trophy, TrendingUp, GraduationCap, Download } from "lucide-react";
import { getGrade } from "../data";

const tooltipStyle = {
  contentStyle: { background: "#17191f", border: "1px solid #30323b", borderRadius: 10, color: "#fff" },
};

export default function Results({ students, onUpdate }) {
  const [search, setSearch] = useState("");
  const [course, setCourse] = useState("All courses");

  const filtered = useMemo(() => students.filter(s => {
    const query = `${s.name} ${s.roll} ${s.course}`.toLowerCase();
    return query.includes(search.toLowerCase()) && (course === "All courses" || s.course === course);
  }), [students, search, course]);

  const average = filtered.length
    ? filtered.reduce((sum, s) => sum + Number(s.marks || 0), 0) / filtered.length
    : 0;
  const topScore = filtered.length ? Math.max(...filtered.map(s => Number(s.marks || 0))) : 0;
  const passing = filtered.filter(s => Number(s.marks) >= 40).length;

  const gradeData = [
    { grade: "A+", count: filtered.filter(s => s.marks >= 90).length },
    { grade: "A", count: filtered.filter(s => s.marks >= 80 && s.marks < 90).length },
    { grade: "B", count: filtered.filter(s => s.marks >= 70 && s.marks < 80).length },
    { grade: "C", count: filtered.filter(s => s.marks >= 60 && s.marks < 70).length },
    { grade: "D", count: filtered.filter(s => s.marks >= 40 && s.marks < 60).length },
    { grade: "F", count: filtered.filter(s => s.marks < 40).length },
  ];

  function exportResults() {
    const csv = [
      ["Name", "Roll", "Course", "Marks", "Grade"],
      ...filtered.map(s => [s.name, s.roll, s.course, s.marks, getGrade(s.marks)])
    ].map(row => row.map(value => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = "campusos-results.csv";
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <div className="page-heading">
        <div><div className="eyebrow">ACADEMICS / PERFORMANCE</div><h1>Academic <span>results.</span></h1><p>Track student performance, grades, and academic progress.</p></div>
        <button className="btn-secondary" onClick={exportResults}><Download size={16} /> Export results</button>
      </div>

      <div className="attendance-metrics">
        <div className="attendance-stat"><div className="metric-icon purple"><GraduationCap size={19} /></div><span>Average marks</span><strong>{average.toFixed(1)}%</strong><small>Current filtered group</small></div>
        <div className="attendance-stat"><div className="metric-icon green"><Trophy size={19} /></div><span>Highest score</span><strong>{topScore}%</strong><small>Top student score</small></div>
        <div className="attendance-stat"><div className="metric-icon blue"><TrendingUp size={19} /></div><span>Pass rate</span><strong>{filtered.length ? ((passing / filtered.length) * 100).toFixed(1) : "0.0"}%</strong><small>Pass threshold: 40%</small></div>
        <div className="attendance-stat"><div className="metric-icon orange"><GraduationCap size={19} /></div><span>Students assessed</span><strong>{filtered.length}</strong><small>Student records</small></div>
      </div>

      <section className="panel grade-chart-panel">
        <div className="panel-header"><div><h2>Grade distribution</h2><p>Number of students in each grade band</p></div><span className="panel-chip">Performance</span></div>
        <div className="results-chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={gradeData} margin={{ top: 10, right: 12, left: -18, bottom: 0 }}>
              <defs><linearGradient id="gradeGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#a78bfa" /><stop offset="100%" stopColor="#6d5ce7" /></linearGradient></defs>
              <CartesianGrid stroke="#292b34" strokeDasharray="4 5" vertical={false} />
              <XAxis dataKey="grade" tick={{ fill: "#a1a1aa", fontSize: 12 }} axisLine={false} tickLine={false} dy={9} />
              <YAxis allowDecimals={false} tick={{ fill: "#858796", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="count" name="Students" fill="url(#gradeGradient)" radius={[6, 6, 0, 0]} maxBarSize={52} animationDuration={1000} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="panel directory-panel results-table-panel">
        <div className="directory-toolbar">
          <div><h2 className="toolbar-title">Student results</h2><p className="toolbar-description">Update marks directly in the table.</p></div>
          <div className="toolbar-right">
            <div className="directory-search results-search"><Search size={16} /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search students..." /></div>
            <div className="select-wrap"><select value={course} onChange={e => setCourse(e.target.value)} aria-label="Filter by course"><option>All courses</option>{[...new Set(students.map(s => s.course))].sort().map(c => <option key={c}>{c}</option>)}</select></div>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>STUDENT</th><th>ROLL NUMBER</th><th>COURSE</th><th>MARKS (%)</th><th>GRADE</th><th>RESULT</th></tr></thead>
            <tbody>
              {filtered.map(student => (
                <tr key={student.id}>
                  <td><div className="student-cell"><div className="student-avatar">{student.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</div><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
                  <td className="mono">{student.roll}</td>
                  <td>{student.course}</td>
                  <td><input aria-label={`Marks for ${student.name}`} className="marks-input" type="number" min="0" max="100" value={student.marks} onChange={e => { const value = e.target.value; if (value === "" || (Number(value) >= 0 && Number(value) <= 100)) onUpdate({ ...student, marks: value === "" ? 0 : Number(value) }); }} /></td>
                  <td><span className={`grade-badge grade-${getGrade(student.marks).replace("+", "plus")}`}>{getGrade(student.marks)}</span></td>
                  <td><span className={`result-badge ${Number(student.marks) >= 40 ? "passed" : "failed"}`}>{Number(student.marks) >= 40 ? "Passed" : "Failed"}</span></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan="6" className="empty-state">No results match your filters.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}