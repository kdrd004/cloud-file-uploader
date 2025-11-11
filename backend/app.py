from flask import Flask, request, jsonify
from google.cloud import storage
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Tell Flask where your service account key file is
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "diya-file-uploader-key.json"  # rename based on your file

@app.route('/upload', methods=['POST'])
def upload_file():
    try:
        file = request.files['file']
        client = storage.Client()
        bucket = client.bucket('diya-file-uploader')  # your bucket name
        blob = bucket.blob(file.filename)
        blob.upload_from_file(file)
        blob.make_public()  # make it viewable by anyone
        return jsonify({'url': blob.public_url})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
