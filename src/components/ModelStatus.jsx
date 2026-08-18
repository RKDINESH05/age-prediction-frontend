export default function ModelStatus({ status = "checking" }) {
  const isOnline = status === "online";
  const isChecking = status === "checking";

  return (
    <div className={`model-status ${isOnline ? "online" : isChecking ? "checking" : "offline"}`}>
      <span className="status-dot" aria-hidden="true" />
      {isChecking ? "Checking model status..." : isOnline ? "Model Online" : "Model Offline"}
    </div>
  );
}
