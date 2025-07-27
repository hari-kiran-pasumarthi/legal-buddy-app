# backend/document_gen/generator.py

def generate_document(doc_type: str, details: str) -> str:
    """
    Dummy document generation logic based on type.
    In real use, you can use templates, NLP, or language models here.
    """
    if doc_type.lower() == "affidavit":
        return f"Affidavit\n\nI, {details}, do hereby solemnly affirm that the information above is true to the best of my knowledge."
    
    elif doc_type.lower() == "rental agreement":
        return f"Rental Agreement\n\nThis agreement is made between {details} as the tenant and the landlord."

    elif doc_type.lower() == "legal notice":
        return f"Legal Notice\n\nTo Whom It May Concern,\n\nThis is a formal notice regarding {details}."

    else:
        return f"Document Type '{doc_type}' is not supported."
