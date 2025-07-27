# chatbot/bot.py

import joblib
import os
from sklearn.feature_extraction.text import TfidfVectorizer

# Paths to the model and vectorizer
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "chatbot_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "vectorizer.pkl")
ANSWERS_PATH = os.path.join(BASE_DIR, "answers.json")

# Load model and vectorizer
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

# Load intent-to-answer map
import json
with open(ANSWERS_PATH, "r") as f:
    intent_to_answer = json.load(f)

def ask_legal_question(question: str) -> str:
    X = vectorizer.transform([question])
    predicted_intent = model.predict(X)[0]
    response = intent_to_answer.get(predicted_intent, "Sorry, I don't understand your question yet.")
    return response
