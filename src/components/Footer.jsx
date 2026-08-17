import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span className="footer-copy">
          © {new Date().getFullYear()} AI Age Predictor
        </span>
        <div className="footer-stack">
          <span className="footer-tag">FastAPI</span>
          <span className="footer-tag">Google Cloud Run</span>
          <span className="footer-tag">React</span>
        </div>
      </div>
    </footer>
  );
}
