import type { TabType } from '../types';
import './Navbar.css';

interface NavbarProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const Navbar = ({ activeTab, onTabChange }: NavbarProps) => {
  const navLinks: { id: TabType; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Главная', icon: '📊' },
    { id: 'transactions', label: 'Транзакции', icon: '💳' },
    { id: 'budgets', label: 'Бюджеты', icon: '📈' },
    { id: 'categories', label: 'Категории', icon: '🏷️' },
  ];
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <span className="brand-icon">💰</span>
            <span className="brand-text">FinanceTracker</span>
          </div>
          
          <div className="navbar-links">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onTabChange(link.id)}
                className={`navbar-link ${activeTab === link.id ? 'active' : ''}`}
              >
                <span className="link-icon">{link.icon}</span>
                <span className="link-text">{link.label}</span>
              </button>
            ))}
          </div>

          <div className="navbar-actions">
            <span className="current-date">{new Date().toLocaleDateString('ru-RU', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
