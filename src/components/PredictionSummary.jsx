export default function PredictionSummary({ prediction }) {
  if (!prediction) return null;

  const age = Number(prediction?.age ?? 0);
  const ageGroup = prediction?.age_group ?? "N/A";
  const ageRange = prediction?.age_range ?? prediction?.ageRange ?? null;
  const hasAgeRange =
    ageRange &&
    Number.isFinite(Number(ageRange.min)) &&
    Number.isFinite(Number(ageRange.max));

  let summary = `Based on the uploaded image, the model estimates an age of ${age} years, placing the prediction in the ${ageGroup} category.`;

  if (hasAgeRange) {
    summary += ` The estimated age range is ${Number(ageRange.min)}–${Number(ageRange.max)} years.`;
  }

  return (
    <section className="summary-card">
      <div className="section-kicker">Prediction Summary</div>
      <p>{summary}</p>
    </section>
  );
}
