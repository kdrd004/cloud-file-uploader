## Cloud File Uploader - Workspace Setup Guide

This workspace contains both the React frontend and Python Flask backend for the Cloud File Uploader application.

### Initial Setup Steps

#### 1. Install Frontend Dependencies
```bash
cd frontend
npm install
```

#### 2. Install Backend Dependencies
```bash
cd backend
pip install -r requirements.txt
```

#### 3. Configure Google Cloud Storage
- Create a GCP project and enable Cloud Storage API
- Create a GCS bucket
- Generate a service account key
- Save the key and set `GOOGLE_APPLICATION_CREDENTIALS` environment variable

#### 4. Environment Configuration
Create `.env` files in both directories:
- Copy `frontend/.env.example` to `frontend/.env`
- Copy `backend/.env.example` to `backend/.env`
- Update bucket name and credentials

### Development

Run frontend and backend in separate terminals:

```bash
# Terminal 1: Frontend
cd frontend
npm run dev

# Terminal 2: Backend
cd backend
python app.py
```

Frontend: `http://localhost:3000`
Backend: `http://localhost:5000`

### File Upload Flow
1. User selects file in React component
2. File is sent via Axios POST to Flask backend
3. Flask receives file and uploads to GCS
4. Public URL is returned to frontend
5. User can download/share the file

### Next Steps
- [ ] Set up GCP project and service account
- [ ] Configure `.env` files
- [ ] Install dependencies
- [ ] Test file upload functionality
- [ ] Deploy backend to Cloud Run
- [ ] Deploy frontend to Vercel/Netlify

For detailed documentation, see README.md
