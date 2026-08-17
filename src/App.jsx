import { useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ImageUploader from "./components/ImageUploader.jsx";
import PredictionResult from "./components/PredictionResult.jsx";
import Loading from "./components/Loading.jsx";
import HowItWorks from "./components/HowItWorks.jsx";
import Footer from "./components/Footer.jsx";
import { API_URL } from "./config.js";
import "./App.css";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleImageSelect(file) {
    setSelectedImage(file);
    setPreview(URL.createObjectURL(file));
    setResult(null);
    setError(null);
  }

  function handleReset() {
    setSelectedImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  }

  async function handlePredict() {
    if (!selectedImage || loading) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", selectedImage);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("api_error");
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      if (err.message === "api_error") {
        setError("Unable to analyze this image. Please try again.");
      } else {
        setError(
          "Prediction service is currently unavailable. Please try again later."
        );
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Hero />
        <section className="upload-section">
          <ImageUploader
            preview={preview}
            onImageSelect={handleImageSelect}
            onReset={handleReset}
            onPredict={handlePredict}
            loading={loading}
            hasResult={!!result}
          />
          {loading && <Loading />}
          {error && (
            <div className="error-banner">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          )}
          {result && (
            <PredictionResult result={result} onReset={handleReset} />
          )}
        </section>
        <HowItWorks />
        <div className="disclaimer">
          <p>Predictions are AI-generated estimates and may not always be accurate.</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
