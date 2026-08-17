import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} AI Age Predictor · Powered by FastAPI &amp; Google Cloud Run</p>
    </footer>
  );
}
