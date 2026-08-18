export default function ProblemStatement() {
  return (
    <section className="problem-card" id="overview">
      <div className="section-kicker">Why Age Estimation?</div>
      <p className="problem-text">
        Estimating age from facial images is challenging because facial appearance
        can vary with lighting, pose, image quality, facial features, and other
        visual factors.
      </p>
      <p className="problem-text secondary">
        Our system uses a deep learning-based age prediction model to estimate age
        from facial images and provide an estimated age range with uncertainty.
      </p>
    </section>
  );
}
