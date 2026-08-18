import "./PredictionResult.css";

export default function PredictionResult({ result, onReset, onPrint }) {
  const predictedAge = Number(result?.age ?? 0);
  const ageGroup = result?.age_group ?? "N/A";
  const gender = result?.gender ?? "N/A";
  const ageRange = result?.age_range ?? result?.ageRange ?? null;
  const hasAgeRange =
    ageRange &&
    Number.isFinite(Number(ageRange.min)) &&
    Number.isFinite(Number(ageRange.max));

  return (
    <div className="result-panel">
      <div className="result-panel-header">
        <span className="result-panel-title">PREDICTION RESULT</span>
        <span className="status-pill success">Face Detected</span>
      </div>

      <div className="age-primary">
        <p className="age-primary-label">Age</p>
        <p className="age-primary-value">
          {predictedAge}
          <span className="age-primary-unit">YEARS</span>
        </p>
        <p className="age-group-name">{ageGroup}</p>
      </div>

      <div className="result-secondary-row">
        <div className="result-card-sm">
          <p className="result-card-sm-label">Predicted Age</p>
          <p className="result-card-sm-value">{predictedAge} years</p>
        </div>

        <div className="result-card-sm">
          <p className="result-card-sm-label">Age Range</p>
          <p className="result-card-sm-value">
            {hasAgeRange
              ? `${Number(ageRange.min)}–${Number(ageRange.max)} years`
              : "Estimated age only"}
          </p>
        </div>

        <div className="result-card-sm">
          <p className="result-card-sm-label">Age Group</p>
          <p className="result-card-sm-value">{ageGroup}</p>
        </div>

        <div className="result-card-sm">
          <p className="result-card-sm-label">Gender</p>
          <p className="result-card-sm-value">{gender}</p>
        </div>
      </div>

      <div className="result-actions">
        <button type="button" className="btn btn-primary" onClick={onPrint}>
          Print / Save Report
        </button>
        <button type="button" className="btn btn-ghost" onClick={onReset}>
          Analyze Another Image
        </button>
      </div>
    </div>
  );
}
