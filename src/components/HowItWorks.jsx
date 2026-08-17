import "./HowItWorks.css";

const steps = [
  { num: "1", icon: "📁", title: "Upload Image", desc: "Choose a clear face image." },
  { num: "2", icon: "🤖", title: "AI Analysis", desc: "Our deployed AI model analyzes the image." },
  { num: "3", icon: "✅", title: "View Results", desc: "Get the estimated age, age group and gender." },
];

export default function HowItWorks() {
  return (
    <section className="how-section">
      <h3 className="how-title">How It Works</h3>
      <div className="how-grid">
        {steps.map((s) => (
          <div className="how-card" key={s.num}>
            <div className="how-num">{s.num}</div>
            <div className="how-icon">{s.icon}</div>
            <p className="how-card-title">{s.title}</p>
            <p className="how-card-desc">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
