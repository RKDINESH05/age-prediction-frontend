const stages = [
  "Image uploaded",
  "Detecting face",
  "Processing image",
  "Estimating age",
  "Generating result",
];

export default function ProcessingTracker({ status = "idle", currentStep = 0, failedStep = null }) {
  const isLoading = status === "loading";
  const isSuccess = status === "success";
  const isError = status === "error";

  return (
    <div className="processing-card">
      <div className="section-kicker">Processing</div>
      <div className="tracker-grid">
        {stages.map((stage, index) => {
          let state = "pending";

          if (isSuccess) {
            state = "complete";
          } else if (isError) {
            if (index < (failedStep ?? currentStep)) {
              state = "complete";
            } else if (index === (failedStep ?? currentStep)) {
              state = "failed";
            }
          } else if (isLoading) {
            if (index < currentStep) {
              state = "complete";
            } else if (index === currentStep) {
              state = "active";
            }
          } else if (index === 0 && currentStep === 0) {
            state = "pending";
          }

          return (
            <div key={stage} className={`tracker-item ${state}`}>
              <div className="tracker-bullet" aria-hidden="true">
                {state === "complete" ? "✓" : state === "failed" ? "!" : index + 1}
              </div>
              <span>{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
