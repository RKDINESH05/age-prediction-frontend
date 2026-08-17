import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading-card">
      <div className="spinner" />
      <p className="loading-text">Analyzing image…</p>
    </div>
  );
}
