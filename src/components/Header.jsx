import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="brand-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div>
            <h1 className="brand-name">AI Age Predictor</h1>
            <p className="brand-sub">Age &amp; gender prediction</p>
          </div>
        </div>
        <div className="status-badge">
          <span className="status-dot" />
          Model Online
        </div>
      </div>
    </header>
  );
}
