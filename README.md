# CampusOS — Student Management Dashboard

A modern, responsive student management dashboard built with **React and Vite** to help educational institutions manage student records, track attendance, monitor academic performance, and view important student statistics from a centralized interface.

## 🌐 Live Demo

**Production URL:** https://campusos-student-management.vercel.app

> Note: The Vercel project may have Deployment Protection enabled. Adjust its settings if you want the application to be publicly accessible.

## 📌 Project Overview

Managing student information across spreadsheets and separate systems can be time-consuming. CampusOS provides a centralized dashboard where student records, attendance information, and academic results can be organized through a clean, interactive user interface.

The project demonstrates how a React-based frontend can use reusable components, client-side routing, state management, and browser storage to deliver a student management experience.

## ✨ Features

### 1. Dashboard
- Overview of student-related statistics.
- Visual charts for understanding academic and attendance data.
- Quick access to important sections.
- Student-related summary information.

### 2. Student Management
- View the student directory.
- Add new student records.
- Edit existing student information.
- Delete student records.
- Manage details such as name, email, roll number, course, year, marks, and status.

### 3. Attendance Management
- Access attendance-related functionality.
- Record attendance information for students.
- Organize attendance records by date.
- Save attendance data in browser storage.

### 4. Academic Results
- View and update student marks.
- Calculate grades from marks.
- Review academic performance.

### 5. Responsive User Interface
- Sidebar navigation.
- Reusable React components.
- Interactive charts and icons.
- Animated interface elements.
- Client-side page navigation.

### 6. Local Data Persistence
- Stores student and attendance data in the browser's `localStorage`.
- Preserves saved information across page refreshes in the same browser, unless its stored data is cleared.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| HTML5 | Application structure |
| CSS3 | Styling and responsive layouts |
| JavaScript (ES6+) | Application logic |
| React | Component-based UI development |
| Vite | Development server and production build tool |
| React Router DOM | Client-side navigation |
| Recharts | Charts and data visualization |
| Lucide React | Icons |
| Motion | UI animations |
| Browser localStorage | Client-side data persistence |
| Vercel | Hosting and deployment |

## 📂 Project Structure

```text
student-management-system/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Dashboard.jsx
│   │   ├── Layout.jsx
│   │   └── studentmodal.jsx
│   ├── pages/
│   │   ├── Students.jsx
│   │   ├── Attendance.jsx
│   │   └── Results.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── data.js
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites

Install the following software:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### 1. Clone the repository

Replace `YOUR-USERNAME` with your GitHub username.

```bash
git clone https://github.com/YOUR-USERNAME/campusos-student-management.git
```

### 2. Navigate to the project directory

```bash
cd campusos-student-management
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

Open the local URL printed in your terminal, usually:

```text
http://localhost:5173
```

### 5. Create a production build

```bash
npm run build
```

Vite generates the production files in the `dist/` directory.

### 6. Preview the production build locally

```bash
npm run preview
```

## ☁️ Deployment

CampusOS is deployed using Vercel.

To deploy with the Vercel CLI:

```bash
npm install -g vercel
vercel login
vercel
vercel --prod
```

For automatic deployments, connect the GitHub repository to your Vercel project. New pushes can then trigger deployments automatically.

## 💾 Data Storage and Limitations

The current version uses browser `localStorage` for student and attendance data.

- Data is stored locally in the browser.
- Data is not automatically synchronized between different devices or browsers.
- Clearing the browser's stored site data may remove saved records.
- The current version does not provide a shared backend database or user authentication.

For a production-ready institutional system, a future version could integrate a backend API, a database, authentication, role-based access control, and centralized data backups.

## 🔮 Future Improvements

- Backend API integration with Node.js and Express.
- Database integration with MongoDB or PostgreSQL.
- Secure login for administrators, teachers, and students.
- Role-based access control.
- Attendance reports and downloadable CSV/PDF exports.
- Advanced student search, sorting, and filtering.
- Notifications for low attendance and academic performance.
- Cloud-based storage and data synchronization.
- Automated testing and continuous deployment.

## 🎯 Learning Outcomes

This project demonstrates practical experience with:

- React components, props, and hooks.
- State management with `useState` and `useEffect`.
- Routing with React Router DOM.
- CRUD operations for student records.
- Browser-based data persistence.
- Data visualization with Recharts.
- Reusable UI components and responsive design.
- Production builds and deployment with Vercel.

## 🤝 Contributing

Contributions and suggestions are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the application.
5. Submit a pull request.

## 📄 License

This project is available for educational and portfolio purposes. Add a `LICENSE` file if you want to specify formal reuse and distribution terms.

---

**Built with React, Vite, and JavaScript.**

*CampusOS — Organize student records. Track progress. Simplify campus administration.*