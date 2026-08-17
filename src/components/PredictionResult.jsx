import "./PredictionResult.css";

const cards = [
  { label: "Predicted Age", key: "age", icon: "🎂", format: (v) => `${v} Years` },
  { label: "Age Group", key: "age_group", icon: "📊", format: (v) => v },
  { label: "Gender", key: "gender", icon: "👤", format: (v) => v },
];

export default function PredictionResult({ result, onReset }) {
  return (
    <div className="result-section">
      <h3 className="result-heading">Prediction Results</h3>
      <div className="result-grid">
        {cards.map(({ label, key, icon, format }) => (
          <div className="result-card" key={key}>
            <div className="result-icon">{icon}</div>
            <p className="result-label">{label}</p>
            <p className="result-value">{format(result[key])}</p>
          </div>
        ))}
      </div>
      <button className="btn btn-outline try-again" onClick={onReset}>
        Try Another Image
      </button>
    </div>
  );
}
