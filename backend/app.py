from flask import Flask, request, jsonify
from google.cloud import storage
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "https://cloud-file-uploader-nine.vercel.app"}})

@app.route("/")
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
        # Print the error to logs for debugging
        print("UPLOAD ERROR:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
