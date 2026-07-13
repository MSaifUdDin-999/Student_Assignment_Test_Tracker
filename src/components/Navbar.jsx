export default function Navbar({ darkMode, toggleTheme }) {
  return (
    <nav>
      <div className="nav-logo">
        <span>{darkMode ? '🪐' : '🌤️'}</span>
        <div>SATT <span className="sub">Student Assignment & Task Tracker</span></div>
      </div>
      <div className="nav-space"></div>
      <button className="theme-btn" onClick={toggleTheme} aria-label="Toggle theme">
        <span className="theme-icon">{darkMode ? '☀️' : '🌙'}</span>
        <span>{darkMode ? 'Day Mode' : 'Solar Mode'}</span>
      </button>
    </nav>
  );
}