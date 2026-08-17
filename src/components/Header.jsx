import "./Header.css";

export default function Header() {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="brand-icon">🧠</div>
          <div>
            <h1 className="brand-name">AI Age Predictor</h1>
            <p className="brand-sub">AI-powered age and gender prediction</p>
          </div>
        </div>
        <div className="status-badge">
          <span className="status-dot" />
          AI Model Online
        </div>
      </div>
    </header>
  );
}
