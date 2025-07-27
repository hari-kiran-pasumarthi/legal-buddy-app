# backend/case_predictor/predictor.py

import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# ----------- Training Section -----------

# Sample training data
X_train = [
    "The accused was caught red-handed with stolen items.",
    "The victim had no eyewitnesses and presented weak evidence.",
    "A contract breach occurred with written proof and recordings.",
    "No valid evidence presented, only verbal claims.",
]
y_train = ["Guilty", "Not Guilty", "Guilty", "Not Guilty"]

# Train model
vectorizer = TfidfVectorizer()
X_vectors = vectorizer.fit_transform(X_train)

model = LogisticRegression()
model.fit(X_vectors, y_train)

# Save model and vectorizer
os.makedirs("ml_modules/case_predictor", exist_ok=True)
joblib.dump(vectorizer, "ml_modules/case_predictor/vectorizer.pkl")
joblib.dump(model, "ml_modules/case_predictor/case_model.pkl")

print("✅ Case predictor training completed.")

# ----------- Inference Function -----------

# Reload trained model for inference
def predict_case_outcome(facts: str) -> str:
    """Given case facts, return outcome prediction."""
    vectorizer = joblib.load("ml_modules/case_predictor/vectorizer.pkl")
    model = joblib.load("ml_modules/case_predictor/case_model.pkl")
    X = vectorizer.transform([facts])
    prediction = model.predict(X)[0]
    return "The case is likely to succeed." if prediction == "Guilty" else "The case may not succeed."
