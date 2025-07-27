from fastapi import FastAPI
from chatbot.bot import ask_legal_question
from document_gen.generator import generate_document
from case_predictor.predictor import predict_case_outcome
from rights_module.advisor import suggest_rights
from pydantic import BaseModel
app = FastAPI()

@app.get("/")
def home():
    return {"message": "Legal Buddy API is running"}


class ChatbotRequest(BaseModel):
    question: str

@app.post("/chatbot/")
def chatbot_endpoint(data: ChatbotRequest):
    return {"response": ask_legal_question(data.question)}


class DocumentRequest(BaseModel):
    doc_type: str
    details: str

@app.post("/generate-document/")
def document_endpoint(request: DocumentRequest):
    return {"document": generate_document(request.doc_type, request.details)}


class CaseRequest(BaseModel):
    case_facts: str

@app.post("/predict-case/")
def case_predictor_endpoint(data: CaseRequest):
    return {"outcome": predict_case_outcome(data.case_facts)}


class RightsRequest(BaseModel):
    user_profile: str

@app.post("/rights/")
def rights_advisor_endpoint(data: RightsRequest):
    return {"advice": suggest_rights(data.user_profile)}
