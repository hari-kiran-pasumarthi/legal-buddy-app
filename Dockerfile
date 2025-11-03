# ✅ Use Python 3.13 (official slim image)
FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Install system-level dependencies
# gcc → compiles some ML libs
# ffmpeg + libsndfile1 → needed for audio modules (SpeechRecognition, pydub)
RUN apt-get update && \
    apt-get install -y gcc g++ ffmpeg libsndfile1 && \
    rm -rf /var/lib/apt/lists/*

# Copy requirements first (for better layer caching)
COPY requirements.txt .

# ✅ Ensure we use binary wheels (no source compile)
RUN pip install --upgrade pip setuptools wheel && \
    pip install --prefer-binary --no-cache-dir -r requirements.txt

# Copy rest of your backend code
COPY . .

# Expose FastAPI port
EXPOSE 8000

# Run FastAPI using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
