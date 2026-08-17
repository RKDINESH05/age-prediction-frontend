import "./PredictionResult.css";

const AgeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const GroupIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const GenderIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const cards = [
  { label: "Predicted Age", key: "age", Icon: AgeIcon, format: (v) => `${v} yrs` },
  { label: "Age Group", key: "age_group", Icon: GroupIcon, format: (v) => v },
  { label: "Gender", key: "gender", Icon: GenderIcon, format: (v) => v },
];

export default function PredictionResult({ result, onReset }) {
  return (
    <div className="result-section">
      <h3 className="result-heading">Prediction Results</h3>
      <div className="result-grid">
        {cards.map(({ label, key, Icon, format }) => (
          <div className="result-card" key={key}>
            <div className="result-icon-wrap"><Icon /></div>
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
