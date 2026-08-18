export default function ModelInfo() {
  return (
    <section className="info-card compact-card" id="model">
      <div className="section-kicker">Model Information</div>
      <div className="info-grid">
        <div><span>Model</span><strong>EfficientNetB4</strong></div>
        <div><span>Task</span><strong>Age Regression</strong></div>
        <div><span>Input</span><strong>224 × 224 RGB</strong></div>
        <div><span>Output</span><strong>Estimated age</strong></div>
        <div className="info-wide"><span>Uncertainty</span><strong>MC Dropout-based uncertainty</strong></div>
      </div>
    </section>
  );
}
