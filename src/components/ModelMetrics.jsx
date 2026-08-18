const modelMetrics = {
  beforeMAE: null,
  afterMAE: null,
  beforeRMSE: null,
  afterRMSE: null,
};

export default function ModelMetrics() {
  const hasMetrics = Object.values(modelMetrics).some((value) => value !== null && value !== undefined);

  if (!hasMetrics) {
    return (
      <section className="metrics-card compact-card">
        <div className="section-kicker">Model Evaluation</div>
        <p className="metrics-empty">Model performance metrics will be added after evaluation.</p>
      </section>
    );
  }

  return (
    <section className="metrics-card compact-card">
      <div className="section-kicker">Model Evaluation</div>
      <div className="metrics-table-wrap">
        <table className="metrics-table">
          <thead>
            <tr>
              <th>Metric</th>
              <th>Before</th>
              <th>After</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>MAE</td>
              <td>{modelMetrics.beforeMAE ?? "—"}</td>
              <td>{modelMetrics.afterMAE ?? "—"}</td>
            </tr>
            <tr>
              <td>RMSE</td>
              <td>{modelMetrics.beforeRMSE ?? "—"}</td>
              <td>{modelMetrics.afterRMSE ?? "—"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}
