import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <div className="footer-brand">AgeVision AI</div>
          <div className="footer-tagline">AI-powered facial age estimation</div>
        </div>
        <div className="footer-meta">
          <span>Powered by EfficientNetB4</span>
          <span className="footer-disclaimer">
            AI-generated estimates may vary depending on image quality, lighting, pose, and other factors.
          </span>
        </div>
      </div>
    </footer>
  );
}
