import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="10" />
        </svg>
        Powered by Deep Learning
      </div>
      <h2 className="hero-title">AI Age &amp; Gender Prediction</h2>
      <p className="hero-sub">
        Upload a face image and let our AI model estimate the person's age and gender instantly.
      </p>
    </section>
  );
}
