import "./Hero.css";

export default function Hero({ onStartPrediction }) {
  return (
    <section className="hero">
      <div className="hero-eyebrow">
        <span className="hero-eyebrow-dot" />
        AI-POWERED COMPUTER VISION
      </div>
      <h2 className="hero-title">Predict Age with AI</h2>
      <p className="hero-sub">
        Estimate age from a facial image using deep learning and uncertainty-aware prediction.
      </p>
      <button type="button" className="btn btn-primary hero-button" onClick={onStartPrediction}>
        Start Prediction
      </button>
    </section>
  );
}
