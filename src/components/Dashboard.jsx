import { motion } from "motion/react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
import {
  Users, CalendarCheck, GraduationCap, BookOpen,
  ArrowUpRight, ArrowDownRight, Plus, Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getGrade } from "../data";

const attendanceData = [
  { day: "Mon", attendance: 84, previous: 78 },
  { day: "Tue", attendance: 91, previous: 82 },
  { day: "Wed", attendance: 87, previous: 85 },
  { day: "Thu", attendance: 94, previous: 86 },
  { day: "Fri", attendance: 90, previous: 83 },
  { day: "Sat", attendance: 78, previous: 74 },
  { day: "Sun", attendance: 82, previous: 76 },
];

const chartTooltip = {
  contentStyle: { background: "#17191f", border: "1px solid #30323b", borderRadius: 10, color: "#fff" },
  itemStyle: { color: "#a78bfa" },
  labelStyle: { color: "#a1a1aa", marginBottom: 6 },
};

const gradeColors = ["#a78bfa", "#6ee7b7", "#60a5fa", "#fbbf24", "#f87171"];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function MetricCard({ title, value, change, icon: Icon, tone, note }) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -4 }} className="metric-card">
      <div className="metric-top">
        <div className={`metric-icon ${tone}`}><Icon size={19} /></div>
        <span className={`metric-change ${change < 0 ? "negative" : ""}`}>
          {change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {Math.abs(change)}%
        </span>
      </div>
      <p className="metric-label">{title}</p>
      <div className="metric-value">{value}</div>
      <p className="metric-note">{note}</p>
    </motion.div>
  );
}

export default function Dashboard({ students, onAddStudent }) {
  const navigate = useNavigate();
  const total = students.length;
  const avgMarks = total ? students.reduce((sum, s) => sum + Number(s.marks || 0), 0) / total : 0;
  const avgAttendance = total ? students.reduce((sum, s) => sum + Number(s.attendance || 0), 0) / total : 0;
  const active = students.filter((s) => s.status === "Active").length;

  const grades = [
    { name: "A+ / 90–100", value: students.filter(s => Number(s.marks) >= 90).length },
    { name: "A / 80–89", value: students.filter(s => Number(s.marks) >= 80 && Number(s.marks) < 90).length },
    { name: "B / 70–79", value: students.filter(s => Number(s.marks) >= 70 && Number(s.marks) < 80).length },
    { name: "C / 60–69", value: students.filter(s => Number(s.marks) >= 60 && Number(s.marks) < 70).length },
    { name: "Below 60", value: students.filter(s => Number(s.marks) < 60).length },
  ];

  const recent = [...students].slice(-5).reverse();

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="dashboard-page">
      <motion.div variants={itemVariants} className="page-heading">
        <div>
          <div className="eyebrow"><span className="live-dot" /> CAMPUS OVERVIEW</div>
          <h1>Good evening, <span>Admin.</span></h1>
          <p>Here's what's happening across your campus today.</p>
        </div>
        <button className="btn-primary" onClick={onAddStudent}><Plus size={17} /> Add student</button>
      </motion.div>

      <div className="metrics-grid">
        <MetricCard title="Total students" value={total.toLocaleString()} change={8.2} icon={Users} tone="purple" note="Registered student records" />
        <MetricCard title="Avg. attendance" value={`${avgAttendance.toFixed(1)}%`} change={2.4} icon={CalendarCheck} tone="green" note="Average across all students" />
        <MetricCard title="Average score" value={`${avgMarks.toFixed(1)}%`} change={3.1} icon={GraduationCap} tone="blue" note="Overall academic performance" />
        <MetricCard title="Active students" value={active.toLocaleString()} change={1.8} icon={BookOpen} tone="orange" note="Currently active records" />
      </div>

      <div className="charts-grid">
        <motion.section variants={itemVariants} className="panel attendance-panel">
          <div className="panel-header">
            <div><h2>Attendance overview</h2><p>Weekly attendance trend</p></div>
            <span className="panel-chip"><Activity size={13} /> Weekly</span>
          </div>
          <div className="chart-summary">
            <strong>{avgAttendance.toFixed(1)}%</strong>
            <span>Average attendance</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={attendanceData} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="attendanceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#a78bfa" stopOpacity={0.34} />
                    <stop offset="95%" stopColor="#a78bfa" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#292b34" strokeDasharray="4 5" vertical={false} />
                <XAxis dataKey="day" tick={{ fill: "#858796", fontSize: 12 }} axisLine={false} tickLine={false} dy={10} />
                <YAxis domain={[0, 100]} tick={{ fill: "#858796", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip {...chartTooltip} formatter={(value) => [`${value}%`, "Attendance"]} />
                <Area type="monotone" dataKey="attendance" stroke="#a78bfa" strokeWidth={2.5} fill="url(#attendanceGradient)" animationDuration={1200} activeDot={{ r: 5, fill: "#a78bfa", stroke: "#17191f", strokeWidth: 3 }} />
                <Area type="monotone" dataKey="previous" stroke="#4b5563" strokeWidth={1.5} strokeDasharray="5 5" fill="transparent" animationDuration={1500} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-legend">
            <span><i className="legend-dot purple-dot" /> This week</span>
            <span><i className="legend-dot gray-dot" /> Previous week</span>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="panel grade-panel">
          <div className="panel-header">
            <div><h2>Grade distribution</h2><p>Student performance breakdown</p></div>
            <span className="panel-chip">Current</span>
          </div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={grades} dataKey="value" nameKey="name" innerRadius={65} outerRadius={91} paddingAngle={4} stroke="none" animationDuration={1000}>
                  {grades.map((entry, index) => <Cell key={entry.name} fill={gradeColors[index]} />)}
                </Pie>
                <Tooltip {...chartTooltip} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center"><strong>{total}</strong><span>Students</span></div>
          </div>
          <div className="grade-legend">
            {grades.map((grade, index) => (
              <div key={grade.name} className="grade-row">
                <span className="grade-name"><i className="legend-dot" style={{ background: gradeColors[index] }} />{grade.name}</span>
                <strong>{grade.value}</strong>
              </div>
            ))}
          </div>
        </motion.section>
      </div>

      <motion.section variants={itemVariants} className="panel recent-panel">
        <div className="panel-header">
          <div><h2>Recently added students</h2><p>Latest student records in your workspace</p></div>
          <button className="btn-ghost" onClick={() => navigate("/students")}>View all <ArrowUpRight size={15} /></button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>STUDENT</th><th>ROLL NUMBER</th><th>COURSE</th><th>GRADE</th><th>STATUS</th></tr></thead>
            <tbody>
              {recent.map((student) => (
                <tr key={student.id}>
                  <td><div className="student-cell"><div className="student-avatar">{student.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</div><div><strong>{student.name}</strong><small>{student.email}</small></div></div></td>
                  <td className="mono">{student.roll}</td>
                  <td>{student.course}</td>
                  <td><span className={`grade-badge grade-${getGrade(student.marks).replace("+", "plus")}`}>{getGrade(student.marks)}</span></td>
                  <td><span className="status-badge"><i />{student.status}</span></td>
                </tr>
              ))}
              {total === 0 && <tr><td colSpan="5" className="empty-state">No students yet. Add your first student to get started.</td></tr>}
            </tbody>
          </table>
        </div>
      </motion.section>
    </motion.div>
  );
}