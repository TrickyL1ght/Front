import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navLinks = [
    { path: '/', label: 'Главная', icon: '📊' },
    { path: '/transactions', label: 'Транзакции', icon: '💳' },
    { path: '/budgets', label: 'Бюджеты', icon: '📈' },
    { path: '/categories', label: 'Категории', icon: '🏷️' },
  ];
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <Link to="/" className="navbar-brand">
            <span className="brand-icon">💰</span>
            <span className="brand-text">FinanceTracker</span>
          </Link>
          
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-text">{link.label}</span>
              </Link>
            ))}
          </div>

          <div className="navbar-actions">
            <span className="current-date">{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
