# ml_modules/bot/train_bot.py
import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression

# Load training data
with open("ml_modules/bot/answers.json", "r") as f:
    data = json.load(f)

# Prepare dummy questions for training
training_sentences = []
training_labels = []

# You should replace these with real training phrases later
default_questions = {
    "greeting": ["hi", "hello", "hey"],
    "theft_law": ["what is the punishment for theft", "penalty for stealing", "IPC theft law"],
    "bail_right": ["can I get bail", "what is bail", "is bail a right"],
    "arrest_procedure": ["what are my rights on arrest", "can police arrest me", "what to do if arrested"]
}

for intent, questions in default_questions.items():
    for q in questions:
        training_sentences.append(q)
        training_labels.append(intent)

# Train model
vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(training_sentences)

model = LogisticRegression()
model.fit(X, training_labels)

# Save model and vectorizer
joblib.dump(model, "ml_modules/bot/chatbot_model.pkl")
joblib.dump(vectorizer, "ml_modules/bot/vectorizer.pkl")

print("✅ Chatbot model and vectorizer saved.")
