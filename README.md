### Live Demo
Access the hosted frontend: https://file-uploader-frontend-zeta.vercel.app/

# Cloud File Uploader 🚀

A full-stack web application for uploading files to Google Cloud Storage with a React frontend and Flask backend.

## 📋 Project Structure

```
file-uploader/
├── frontend/                 # React + Vite application
│   ├── src/
│   │   ├── components/
│   │   │   └── FileUpload.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   ├── index.html
│   └── .env.example
│
└── backend/                  # Flask application
    ├── app.py
    ├── requirements.txt
    ├── Dockerfile
    ├── .env.example
    └── .dockerignore
```

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Frontend | React + Vite | Fast, modern UI development |
| UI Framework | Bootstrap 5 | Responsive styling |
| HTTP Client | Axios | File upload requests |
| Backend | Python Flask | REST API server |
| Cloud Storage | Google Cloud Storage | File persistence |
| CORS | Flask-CORS | Cross-origin requests |
| Deployment | Google Cloud Run | Backend hosting |
| Frontend Hosting | Vercel/Netlify | Frontend deployment |

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at `http://localhost:3000`

### Backend Setup

1. **Set up Google Cloud Storage**
   - Create a GCP project
   - Enable Google Cloud Storage API
   - Create a bucket
   - Create a service account and download JSON credentials

2. **Configure environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and add your GCS_BUCKET_NAME
   export GOOGLE_APPLICATION_CREDENTIALS="/path/to/service-account-key.json"
   ```

3. **Install dependencies and run**
   ```bash
   pip install -r requirements.txt
   python app.py
   ```

The backend will run at `http://localhost:5000`

## 📡 API Endpoints

### Upload File
- **POST** `/upload`
- **Body:** `multipart/form-data` with `file` field
- **Response:** `{ url: string, filename: string, size: number }`

### Health Check
- **GET** `/health`
- **Response:** `{ status: "healthy" }`

### List Files
- **GET** `/files`
- **Response:** `{ files: Array<{ name, url, size, created }> }`

### Delete File
- **DELETE** `/delete/<filename>`
- **Response:** `{ message: string }`

## 🔧 Configuration

### Frontend (.env)
```
VITE_BACKEND_URL=http://localhost:5000
```

### Backend (.env)
```
GCS_BUCKET_NAME=your-bucket-name, mine: diya-file-uploader
FLASK_ENV=development
FLASK_DEBUG=1
```

## 📦 Supported File Types

- Images: `.png`, `.jpg`, `.jpeg`, `.gif`
- Documents: `.pdf`, `.txt`, `.doc`, `.docx`
- Maximum file size: 50MB

## ☁️ Deployment

### Backend on Google Cloud Run

```bash
cd backend

# Build container
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/file-uploader

### Frontend on Vercel

1. Push repository to GitHub
2. Connect to Vercel
3. Set `VITE_BACKEND_URL` environment variable to your Cloud Run URL
4. Deploy

## 🐛 Troubleshooting

### GCS Authentication Error
- Ensure `GOOGLE_APPLICATION_CREDENTIALS` environment variable is set
- Verify service account has Storage Admin permissions

### CORS Issues
- Check backend is running on correct port
- Verify `VITE_BACKEND_URL` matches backend URL
- Flask-CORS is configured to allow all origins

### Upload Fails
- Check file size doesn't exceed 50MB
- Verify file type is in allowed list
- Ensure bucket exists and is accessible

## 📚 Resources

- [React Documentation](https://react.dev)
- [Flask Documentation](https://flask.palletsprojects.com)
- [Google Cloud Storage Python Client](https://cloud.google.com/python/docs/reference/storage/latest)
- [Vite Documentation](https://vitejs.dev)

## 📝 License

MIT

## 👨‍💻 Author

Challenge 1: Cloud File Uploader - Built with React and Flask
