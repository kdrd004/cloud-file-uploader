FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ✅ Copy entire backend (including your key file)
COPY . .

# ✅ Set Google credentials path
#ENV GOOGLE_APPLICATION_CREDENTIALS="/app/diya-file-uploader-key.json"

# (Optional but harmless)
ENV FLASK_APP=app.py

EXPOSE 8080

# ✅ Gunicorn runs Flask app on Cloud Run’s expected port
CMD ["gunicorn", "--bind", "0.0.0.0:8080", "--timeout", "120", "app:app"]
