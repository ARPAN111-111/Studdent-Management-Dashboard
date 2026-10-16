import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  Activity, Bell, BookOpen, CalendarCheck, ChevronRight,
  GraduationCap, LayoutDashboard, Menu, Search, Settings,
  Users, X, ChartNoAxesCombined
} from "lucide-react";

const navigation = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Students", path: "/students", icon: Users },
  { label: "Attendance", path: "/attendance", icon: CalendarCheck },
  { label: "Results", path: "/results", icon: ChartNoAxesCombined },
];

export default function Layout({ students }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const titles = {
    "/": "Overview",
    "/students": "Students",
    "/attendance": "Attendance",
    "/results": "Academic Results",
  };

  const sidebar = (
    <div className="sidebar-inner">
      <NavLink to="/" className="brand" onClick={() => setMobileOpen(false)}>
        <div className="brand-icon"><GraduationCap size={23} /></div>
        <div>
          <strong>campus<span>OS</span></strong>
          <small>STUDENT INTELLIGENCE</small>
        </div>
      </NavLink>

      <div className="nav-label">WORKSPACE</div>
      <nav className="nav-list">
        {navigation.map(({ label, path, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
          >
            <Icon size={18} />
            <span>{label}</span>
            {path === "/students" && <span className="nav-count">{students.length}</span>}
            {location.pathname === path && <ChevronRight className="nav-arrow" size={15} />}
          </NavLink>
        ))}
      </nav>

      <div className="nav-label tools-label">SYSTEM</div>
      <div className="nav-link muted-link"><Activity size={18} /><span>System status</span><span className="live-dot" /></div>
      <div className="nav-link muted-link"><Settings size={18} /><span>Settings</span></div>

      <div className="sidebar-bottom">
        <div className="storage-card">
          <div className="storage-icon"><BookOpen size={18} /></div>
          <strong>Campus workspace</strong>
          <p>Your academic data, organized.</p>
          <div className="storage-line"><span /></div>
          <small>LOCAL STORAGE · ACTIVE</small>
        </div>
        <div className="profile">
          <div className="avatar">AD</div>
          <div className="profile-info"><strong>Administrator</strong><small>Campus admin</small></div>
          <Settings size={16} className="profile-settings" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="app-shell">
      <aside className="desktop-sidebar">{sidebar}</aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div className="mobile-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} />
            <motion.aside className="mobile-sidebar" initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", damping: 26 }}>
              <button className="mobile-close icon-button" onClick={() => setMobileOpen(false)} aria-label="Close menu"><X /></button>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setMobileOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="breadcrumb"><span>Workspace</span><ChevronRight size={14} /><strong>{titles[location.pathname] || "Workspace"}</strong></div>
          <div className="topbar-actions">
            <div className="global-search"><Search size={16} /><span>Campus management</span><kbd>⌘ K</kbd></div>
            <button className="icon-button notification-button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="top-avatar">AD</div>
          </div>
        </header>
        <div className="page-content">
          <Outlet />
          <footer className="app-footer">
            <span>© 2026 CampusOS</span>
            <span><i className="live-dot" /> All systems operational</span>
          </footer>
        </div>
      </main>
    </div>
  );
}