import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import ProblemStatement from "./components/ProblemStatement.jsx";
import ImageUploader from "./components/ImageUploader.jsx";
import ProcessingTracker from "./components/ProcessingTracker.jsx";
import PredictionResult from "./components/PredictionResult.jsx";
import AgeRangeGraph from "./components/AgeRangeGraph.jsx";
import PredictionSummary from "./components/PredictionSummary.jsx";
import ModelStatus from "./components/ModelStatus.jsx";
import ModelInfo from "./components/ModelInfo.jsx";
import ModelMetrics from "./components/ModelMetrics.jsx";
import Footer from "./components/Footer.jsx";
import { checkModelStatus, predictAge } from "./services/api.js";
import "./App.css";

const PROCESSING_STEPS = [
  "Image uploaded",
  "Detecting face",
  "Processing image",
  "Estimating age",
  "Generating result",
];

const ERROR_VARIANTS = {
  face: {
    title: "FACE NOT DETECTED",
    message: "Please upload a clear image containing a human face.",
    action: "Try Another Image",
  },
  invalid: {
    title: "INVALID IMAGE",
    message: "Please upload a JPG, JPEG, or PNG image.",
    action: "Try Another Image",
  },
  network: {
    title: "PREDICTION SERVICE UNAVAILABLE",
    message: "Unable to connect to the prediction server. Please try again.",
    action: "Try Again",
  },
  generic: {
    title: "SOMETHING WENT WRONG",
    message: "Please try again.",
    action: "Try Again",
  },
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [processingStatus, setProcessingStatus] = useState("idle");
  const [processingStep, setProcessingStep] = useState(0);
  const [failedStep, setFailedStep] = useState(null);
  const [modelStatus, setModelStatus] = useState("checking");
  const [imageInfo, setImageInfo] = useState({ name: "", width: null, height: null });

  useEffect(() => {
    let isMounted = true;

    async function loadModelStatus() {
      const isOnline = await checkModelStatus();

      if (isMounted) {
        setModelStatus(isOnline ? "online" : "offline");
      }
    }

    loadModelStatus();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!loading) return undefined;

    const timer = setInterval(() => {
      setProcessingStep((current) => Math.min(current + 1, PROCESSING_STEPS.length - 1));
    }, 700);

    return () => clearInterval(timer);
  }, [loading]);

  function handleImageSelect(file) {
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      setImageInfo({
        name: file.name,
        width: img.width,
        height: img.height,
      });
    };

    img.src = previewUrl;

    setSelectedImage(file);
    setPreview(previewUrl);
    setPrediction(null);
    setError(null);
    setProcessingStatus("idle");
    setProcessingStep(0);
    setFailedStep(null);
  }

  function handleReset() {
    setSelectedImage(null);
    setPreview(null);
    setPrediction(null);
    setError(null);
    setLoading(false);
    setProcessingStatus("idle");
    setProcessingStep(0);
    setFailedStep(null);
    setImageInfo({ name: "", width: null, height: null });
  }

  async function handlePredict() {
    if (!selectedImage || loading) return;

    setLoading(true);
    setError(null);
    setPrediction(null);
    setProcessingStatus("loading");
    setProcessingStep(0);
    setFailedStep(null);

    try {
      const data = await predictAge(selectedImage);

      if (data?.success === false) {
        throw new Error("No human face detected. Please upload a clear face image.");
      }

      setPrediction(data);
      setProcessingStatus("success");
      setProcessingStep(PROCESSING_STEPS.length - 1);
    } catch (errorObject) {
      const message = String(errorObject?.message || "");
      const lower = message.toLowerCase();

      if (lower.includes("no human face detected")) {
        setError(ERROR_VARIANTS.face);
        setProcessingStatus("error");
        setFailedStep(Math.min(Math.max(processingStep, 1), PROCESSING_STEPS.length - 1));
      } else if (lower.includes("invalid") || !selectedImage.type || !["image/jpeg", "image/png"].includes(selectedImage.type)) {
        setError(ERROR_VARIANTS.invalid);
        setProcessingStatus("error");
        setFailedStep(Math.min(Math.max(processingStep, 1), PROCESSING_STEPS.length - 1));
      } else if (lower.includes("failed to fetch") || lower.includes("network") || lower.includes("fetch")) {
        setError(ERROR_VARIANTS.network);
        setProcessingStatus("error");
        setFailedStep(Math.min(Math.max(processingStep, 1), PROCESSING_STEPS.length - 1));
      } else {
        setError(ERROR_VARIANTS.generic);
        setProcessingStatus("error");
        setFailedStep(Math.min(Math.max(processingStep, 1), PROCESSING_STEPS.length - 1));
      }
    } finally {
      setLoading(false);
    }
  }

  function handleScrollToPredict() {
    document.getElementById("predict")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="app-shell">
      <Header modelStatus={modelStatus} />

      <main className="main-shell">
        <Hero onStartPrediction={handleScrollToPredict} />
        <ProblemStatement />

        <div className="status-row">
          <ModelStatus status={modelStatus} />
        </div>

        <section className="upload-section" id="predict">
          <ImageUploader
            preview={preview}
            selectedImage={selectedImage}
            imageInfo={imageInfo}
            onImageSelect={handleImageSelect}
            onReset={handleReset}
            onPredict={handlePredict}
            loading={loading}
            hasResult={!!prediction}
          />

          {loading && (
            <ProcessingTracker status="loading" currentStep={processingStep} />
          )}

          {!loading && processingStatus === "success" && prediction && (
            <ProcessingTracker status="success" currentStep={PROCESSING_STEPS.length - 1} />
          )}

          {!loading && processingStatus === "error" && error && (
            <ProcessingTracker status="error" currentStep={failedStep ?? Math.min(processingStep, PROCESSING_STEPS.length - 1)} failedStep={failedStep ?? Math.min(processingStep, PROCESSING_STEPS.length - 1)} />
          )}

          {error && (
            <div className="error-panel">
              <div className="error-panel-header">
                <span className="error-icon">!</span>
                <strong>{error.title}</strong>
              </div>
              <p>{error.message}</p>
              <button className="btn btn-primary" type="button" onClick={handleReset}>
                {error.action}
              </button>
            </div>
          )}
        </section>

        {prediction && preview && (
          <>
            <div className="results-layout">
              <div className="results-image-col">
                <img src={preview} alt="Analyzed face" />
              </div>

              <PredictionResult
                result={prediction}
                onReset={handleReset}
                onPrint={() => window.print()}
              />
            </div>

            <AgeRangeGraph prediction={prediction} />
            <PredictionSummary prediction={prediction} />

            <div className="meta-grid">
              <ModelInfo />
              <ModelMetrics />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
