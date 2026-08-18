import "./HowItWorks.css";

const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
  </svg>
);

const AnalyzeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/><path d="M11 8v3l2 2"/>
  </svg>
);

const ResultIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 11 12 14 22 4"/>
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
  </svg>
);

const steps = [
  { num: "1", Icon: UploadIcon, title: "Upload Image", desc: "Choose a clear, well-lit face image from your device." },
  { num: "2", Icon: AnalyzeIcon, title: "AI Analysis", desc: "Our deployed deep learning model processes the image." },
  { num: "3", Icon: ResultIcon, title: "View Results", desc: "Receive estimated age, age group, and gender instantly." },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <div className="how-header">
        <p className="how-eyebrow">Process</p>
        <h3 className="how-title">How It Works</h3>
      </div>
      <div className="how-grid">
        {steps.map((s) => (
          <div className="how-card" key={s.num}>
            <div className="how-step">{s.num}</div>
            <div className="how-icon-wrap"><s.Icon /></div>
            <p className="how-card-title">{s.title}</p>
            <p className="how-card-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
