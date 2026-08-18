import { API_URL } from "../config.js";

export async function predictAge(file) {
  if (!file) {
    throw new Error("No image selected.");
  }

  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_URL}/predict`, {
    method: "POST",
    body: formData,
  });

  const contentType = response.headers.get("content-type") || "";
  let data = null;

  if (contentType.includes("application/json")) {
    data = await response.json();
  }

  if (!response.ok) {
    const detail = data && (data.detail || data.message);
    throw new Error(detail || "Prediction request failed.");
  }

  return data;
}

export async function checkModelStatus() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${API_URL}/`, {
      signal: controller.signal,
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("API unavailable");
    }

    const data = await response.json();
    return data?.message === "Age Prediction API is running";
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
}
