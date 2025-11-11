from flask import Flask, request, jsonify
from google.cloud import storage
from flask_cors import CORS
import os

app = Flask(__name__)

# ✅ Allow both your deployed frontend and local dev
CORS(app, resources={r"/*": {"origins": ["https://cloud-file-uploader-nine.vercel.app", "http://localhost:5173"]}})

# ✅ Google Cloud credentials
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "diya-file-uploader-key.json"

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Backend running successfully!"})

@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        file = request.files["file"]
        client = storage.Client()
        bucket = client.bucket("diya-file-uploader")  # your bucket name
        blob = bucket.blob(file.filename)
        blob.upload_from_file(file)
        blob.make_public()
        return jsonify({"url": blob.public_url})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
