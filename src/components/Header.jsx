import "./Header.css";
import ModelStatus from "./ModelStatus.jsx";

export default function Header({ modelStatus = "checking" }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="header-brand">
          <div className="brand-icon">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="brand-copy">
            <h1 className="brand-name">AGEVISION AI</h1>
            <p className="brand-sub">AI-Powered Age Prediction</p>
          </div>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <a href="#overview">Overview</a>
          <a href="#predict">Prediction</a>
          <a href="#model">Model</a>
        </nav>

        <div className="header-status">
          <ModelStatus status={modelStatus} />
        </div>
      </div>
    </header>
  );
}
