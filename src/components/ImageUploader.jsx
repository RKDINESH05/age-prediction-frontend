import { useRef, useState } from "react";
import "./ImageUploader.css";

const MAX_SIZE = 10 * 1024 * 1024;
const ALLOWED = ["image/jpeg", "image/jpg", "image/png"];

export default function ImageUploader({
  preview,
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
    if (!ALLOWED.includes(file.type)) {
      setValidationError("Only JPG, JPEG, or PNG files are supported.");
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
    if (file && validate(file)) onImageSelect(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  return (
    <div className="uploader-wrapper">
      {!preview ? (
        <div
          className={`drop-zone ${dragging ? "dragging" : ""}`}
          onClick={() => inputRef.current.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
        >
          <div className="drop-icon">📷</div>
          <p className="drop-title">Upload a clear face image</p>
          <p className="drop-hint">JPG, JPEG or PNG · Max 10 MB</p>
          <button
            className="btn btn-outline"
            onClick={(e) => { e.stopPropagation(); inputRef.current.click(); }}
          >
            Choose File
          </button>
        </div>
      ) : (
        <div className="preview-card">
          <div className="preview-img-wrap">
            <img src={preview} alt="Preview" className="preview-img" />
          </div>
          <div className="preview-actions">
            <button className="btn btn-ghost" onClick={onReset} disabled={loading}>
              Change Image
            </button>
            <button
              className="btn btn-primary"
              onClick={onPredict}
              disabled={loading || hasResult}
            >
              {loading ? "Analyzing…" : "Predict Age"}
            </button>
          </div>
        </div>
      )}

      {validationError && (
        <p className="validation-error">⚠ {validationError}</p>
      )}

      <input
        ref={inputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        style={{ display: "none" }}
        onChange={(e) => handleFile(e.target.files[0])}
      />
    </div>
  );
}
