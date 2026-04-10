import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

export const Layout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          Croper App
        </div>
        
        <nav className="nav-links">
          <NavLink 
            to="/" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            Productos
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              U
            </div>
            <span style={{ fontWeight: 500 }}>Mi Cuenta</span>
            <button 
              onClick={handleLogout} 
              style={{ background: 'none', border: 'none', color: 'var(--danger)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', marginLeft: '1rem' }}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        <div className="page-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

