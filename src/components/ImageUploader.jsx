import { useRef, useState } from "react";
import "./ImageUploader.css";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/png"];

export default function ImageUploader({
  preview,
  selectedImage,
  imageInfo,
  onImageSelect,
  onReset,
  onPredict,
  loading,
  hasResult,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [validationError, setValidationError] = useState(null);

  function validate(file) {
    if (!file) return false;

    if (!ALLOWED.includes(file.type)) {
      setValidationError("Please upload a JPG, JPEG, or PNG image.");
      return false;
    }

    if (file.size > MAX_SIZE) {
      setValidationError("File size must be under 10 MB.");
      return false;
    }

    setValidationError(null);
    return true;
  }

  function handleFile(file) {
    if (file && validate(file)) {
      onImageSelect(file);
    }
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }

  return (
    <div className="uploader-wrapper">
      {!preview ? (
        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="drop-icon-wrap">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="3" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
          <p className="drop-title">Upload Face Image</p>
          <p className="drop-sub">Drag &amp; drop or click to browse</p>
          <p className="drop-hint">JPG, JPEG or PNG</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={(e) => {
              e.stopPropagation();
              inputRef.current.click();
            }}
          >
            Upload Image
          </button>
        </div>
      ) : (
        <div className="preview-card">
          <div className="preview-img-wrap">
            <img src={preview} alt="Preview" className="preview-img" />
          </div>

          {selectedImage && (
            <div className="preview-meta">
              <span className="preview-filename">{selectedImage.name}</span>
              {imageInfo.width && imageInfo.height && (
                <span className="preview-dimensions">
                  {imageInfo.width} × {imageInfo.height}
                </span>
              )}
            </div>
          )}

          <div className="preview-actions">
            <button type="button" className="btn btn-ghost" onClick={() => inputRef.current.click()} disabled={loading}>
              Change Image
            </button>
            <button type="button" className="btn btn-ghost subtle" onClick={onReset} disabled={loading}>
              Remove Image
            </button>
            <button type="button" className="btn btn-primary" onClick={onPredict} disabled={loading || hasResult}>
              {loading ? "Predicting..." : "Predict Age"}
            </button>
          </div>
        </div>
      )}

      {validationError && <p className="validation-error">{validationError}</p>}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={(e) => {
          handleFile(e.target.files[0]);
          e.target.value = "";
        }}
      />
    </div>
  );
}
