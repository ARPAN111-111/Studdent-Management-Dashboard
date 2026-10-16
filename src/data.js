const STORAGE_KEY = "campusos_students";
const ATTENDANCE_KEY = "campusos_attendance";

export const initialStudents = [
  { id: 1, name: "Aarav Sharma", email: "aarav@campus.edu", roll: "CS2026001", course: "Computer Science", year: "3rd Year", marks: 88, attendance: 96, status: "Active" },
  { id: 2, name: "Ananya Verma", email: "ananya@campus.edu", roll: "CS2026002", course: "Computer Science", year: "2nd Year", marks: 94, attendance: 98, status: "Active" },
  { id: 3, name: "Rohan Gupta", email: "rohan@campus.edu", roll: "EC2026003", course: "Electronics", year: "3rd Year", marks: 76, attendance: 82, status: "Active" },
  { id: 4, name: "Priya Singh", email: "priya@campus.edu", roll: "IT2026004", course: "Information Technology", year: "4th Year", marks: 91, attendance: 95, status: "Active" },
  { id: 5, name: "Kabir Malhotra", email: "kabir@campus.edu", roll: "ME2026005", course: "Mechanical", year: "1st Year", marks: 68, attendance: 74, status: "Active" },
  { id: 6, name: "Isha Patel", email: "isha@campus.edu", roll: "CS2026006", course: "Computer Science", year: "2nd Year", marks: 85, attendance: 91, status: "Active" },
  { id: 7, name: "Aditya Kumar", email: "aditya@campus.edu", roll: "EC2026007", course: "Electronics", year: "4th Year", marks: 79, attendance: 86, status: "Active" },
  { id: 8, name: "Meera Joshi", email: "meera@campus.edu", roll: "IT2026008", course: "Information Technology", year: "3rd Year", marks: 97, attendance: 99, status: "Active" },
];

export function loadStudents() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : initialStudents;
  } catch {
    return initialStudents;
  }
}

export function saveStudents(students) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

export function loadAttendance() {
  try {
    return JSON.parse(localStorage.getItem(ATTENDANCE_KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveAttendance(attendance) {
  localStorage.setItem(ATTENDANCE_KEY, JSON.stringify(attendance));
}

export function getGrade(marks) {
  if (marks >= 90) return "A+";
  if (marks >= 80) return "A";
  if (marks >= 70) return "B";
  if (marks >= 60) return "C";
  if (marks >= 40) return "D";
  return "F";
}