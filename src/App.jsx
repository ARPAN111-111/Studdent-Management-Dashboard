import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Results from "./pages/Results";
import {
  loadStudents, saveStudents, loadAttendance, saveAttendance
} from "./data";

export default function App() {
  const [students, setStudents] = useState(loadStudents);
  const [attendance, setAttendance] = useState(loadAttendance);

  useEffect(() => {
    saveStudents(students);
  }, [students]);

  useEffect(() => {
    saveAttendance(attendance);
  }, [attendance]);

  function addStudent(student) {
    const newStudent = { ...student, id: Date.now(), status: "Active" };
    setStudents(previous => [...previous, newStudent]);
  }

  function updateStudent(updated) {
    setStudents(previous => previous.map(student =>
      student.id === updated.id ? updated : student
    ));
  }

  function deleteStudent(id) {
    setStudents(previous => previous.filter(student => student.id !== id));
  }

  function updateAttendance(date, records) {
    setAttendance(previous => ({ ...previous, [date]: records }));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout students={students} />}>
          <Route index element={<Dashboard students={students} onAddStudent={addStudent} />} />
          <Route path="students" element={
            <Students students={students} onAdd={addStudent} onUpdate={updateStudent} onDelete={deleteStudent} />
          } />
          <Route path="attendance" element={
            <Attendance students={students} attendance={attendance} onSaveAttendance={updateAttendance} />
          } />
          <Route path="results" element={
            <Results students={students} onUpdate={updateStudent} />
          } />
          <Route path="*" element={<Dashboard students={students} onAddStudent={addStudent} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}