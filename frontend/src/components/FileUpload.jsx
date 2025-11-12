import React, { useState } from "react";
import axios from "axios";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [uploadedFileName, setUploadedFileName] = useState("");

  // Use environment variable if available, otherwise fallback
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://file-uploader-585811215222.asia-south1.run.app/upload";

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setError("");
    setLink("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first!");
      return;
    }

    setLoading(true);
    setError("");
    setLink("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await axios.post(BACKEND_URL, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setLink(response.data.url);
      setUploadedFileName(file.name);
      setFile(null);
      document.getElementById("fileInput").value = "";
    } catch (err) {
      console.error("Upload error:", err);
      setError(
        err.response?.data?.error ||
          "Error uploading file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">
                📤 Upload Your File
              </h2>

              <div className="mb-3">
                <label htmlFor="fileInput" className="form-label">
                  Choose File
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="fileInput"
                  onChange={handleFileChange}
                  disabled={loading}
                  accept="image/*,.pdf,.txt,.doc,.docx"
                />
                <small className="text-muted">
                  Supported: Images, PDF, Text, Documents
                </small>
              </div>

              <div className="d-grid gap-2">
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleUpload}
                  disabled={!file || loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2"></span>
                      Uploading...
                    </>
                  ) : (
                    "Upload to Cloud"
                  )}
                </button>
              </div>

              {error && (
                <div className="alert alert-danger mt-4" role="alert">
                  <strong>Error:</strong> {error}
                </div>
              )}

              {link && (
                <div className="alert alert-success mt-4" role="alert">
                  <strong>✅ Success!</strong>
                  <p className="mt-2 mb-2">File: {uploadedFileName}</p>
                  <p className="mb-0">
                    Download Link:{" "}
                    <a
                      href={link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link}
                    </a>
                  </p>
                  <button
                    className="btn btn-sm btn-outline-success mt-2"
                    onClick={() => {
                      navigator.clipboard.writeText(link);
                      alert("Link copied to clipboard!");
                    }}
                  >
                    📋 Copy Link
                  </button>
                </div>
              )}

              <div className="mt-5 pt-3 border-top">
                <h6 className="text-muted">How it works:</h6>
                <ol className="small text-muted">
                  <li>Select a file from your device</li>
                  <li>
                    Click "Upload to Cloud" to send it to Google Cloud Storage
                  </li>
                  <li>Get a public link to download or share the file</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FileUpload;
