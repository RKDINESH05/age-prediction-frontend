import "./AgeRangeGraph.css";

export default function AgeRangeGraph({ prediction }) {
  if (!prediction) return null;

  const age = Number(prediction?.age ?? 0);
  const ageRange = prediction?.age_range ?? prediction?.ageRange ?? null;
  const hasAgeRange =
    ageRange &&
    Number.isFinite(Number(ageRange.min)) &&
    Number.isFinite(Number(ageRange.max));

  const min = hasAgeRange ? Number(ageRange.min) : 0;
  const max = hasAgeRange ? Number(ageRange.max) : 100;
  const markerPercent = hasAgeRange
    ? ((age - min) / (max - min || 1)) * 100
    : (age / 100) * 100;

  if (!hasAgeRange) {
    return (
      <section className="age-graph-card">
        <div className="age-graph-header">
          <p className="section-kicker">Estimated Age Range</p>
          <h3>Predicted age on a 0–100 scale</h3>
        </div>

        <div className="simple-age-scale">
          <div className="simple-age-track">
            <span className="simple-age-scale-label left">0</span>
            <span className="simple-age-scale-label right">100</span>
            <div className="simple-age-marker" style={{ left: `${Math.min(Math.max(markerPercent, 0), 100)}%` }}>
              <span>{age}</span>
            </div>
          </div>
          <div className="simple-age-caption">Estimated Age</div>
        </div>
      </section>
    );
  }

  return (
    <section className="age-graph-card">
      <div className="age-graph-header">
        <p className="section-kicker">Estimated Age Range</p>
        <h3>Predicted age compared with the estimated range</h3>
      </div>

      <div className="age-range-simple">
        <div className="simple-age-track range-track">
          <span className="simple-age-scale-label left">{min}</span>
          <span className="simple-age-scale-label right">{max}</span>
          <div className="simple-age-range-fill" style={{ left: `${((min - min) / (max - min || 1)) * 100}%`, width: `${((age - min) / (max - min || 1)) * 100}%` }} />
          <div className="simple-age-marker" style={{ left: `${Math.min(Math.max(((age - min) / (max - min || 1)) * 100, 0), 100)}%` }}>
            <span>{age}</span>
          </div>
        </div>
        <div className="simple-age-caption">Predicted</div>
      </div>
    </section>
  );
}
