# ml_modules/rights_module/train_rights_advisor.py

import joblib
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
import os

# Sample user profiles and corresponding advice
profiles = [
    "I am a tenant facing eviction without notice",
    "I am a woman being harassed at work",
    "I am a minor caught shoplifting",
    "My employer refuses to pay salary",
]
advice = [
    "As a tenant, you have a right to notice and protection under the Rent Control Act.",
    "You can file a complaint under the POSH Act for workplace harassment.",
    "You are protected under the Juvenile Justice Act and have the right to legal aid.",
    "File a complaint with the Labor Commissioner and approach labor court.",
]

# Train
vectorizer = CountVectorizer()
X = vectorizer.fit_transform(profiles)

model = MultinomialNB()
model.fit(X, advice)

# Save
os.makedirs("ml_modules/rights_module", exist_ok=True)
joblib.dump(vectorizer, "ml_modules/rights_module/vectorizer.pkl")
joblib.dump(model, "ml_modules/rights_module/rights_model.pkl")

print("✅ Rights advisor training completed.")
