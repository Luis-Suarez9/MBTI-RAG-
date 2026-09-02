from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.utils.groqRequest import Groq_api

app = FastAPI(title="MBTI API")

# 1. Configure CORS to allow your frontend/express service
origins = [
    "http://mbti_express:5175",
    "http://localhost:5175", # Included for local machine testing
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, PUT, DELETE, OPTIONS)
    allow_headers=["*"], # Allows all headers
)

# 2. Define the data structure you expect to receive (Pydantic Model)
class MBTIRequest(BaseModel):
    answers: list[dict]
    mbti: list[dict]
    
class MBTIResponse(BaseModel):
    aiDescription: str
    matching_partner_and_reason: str
    clashed_mbti_and_how_to_solve: str

# 3. API Endpoints

@app.post("/analyze", response_model=MBTIResponse)
def analyze_mbti(payload: MBTIRequest):
    """
    Receives MBTI answers from the express service and processes them.
    """
    print(f"Data received: {payload.answers}")

    groq_api = Groq_api()
    aiDescription, matching_partner_and_reason, clashed_mbti_and_how_to_solve = groq_api.call_groq(
        answers=payload.answers,
        mbti=payload.mbti,
    )
    # TODO: Add your actual MBTI calculation logic here
    # For now, we return a mock result that strictly matches the MBTIResponse model

    return MBTIResponse(
        aiDescription=aiDescription,
        matching_partner_and_reason=matching_partner_and_reason,
        clashed_mbti_and_how_to_solve=clashed_mbti_and_how_to_solve
    )
