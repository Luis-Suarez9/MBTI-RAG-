from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

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
    user_id: str
    answers: list[int]
    #it recieve waht ever frontend has sent it here
    
class MBTIResponse(BaseModel):
    name: str
    nickname: str
    aiDescription: str
    coreExplain: str
    eiPercent: int
    snPercent: int
    tfPercent: int
    jpPercent: int

# 3. API Endpoints

@app.post("/analyze", response_model=MBTIResponse)
def analyze_mbti(payload: MBTIRequest):
    """
    Receives MBTI answers from the express service and processes them.
    """
    print(f"Processing answers for user: {payload.user_id}")
    print(f"Data received: {payload.answers}")
    
    # TODO: Add your actual MBTI calculation logic here
    # For now, we return a mock result that strictly matches the MBTIResponse model
    
    return MBTIResponse(
        name="INTJ",
        nickname="The Architect",
        aiDescription="Imaginative and strategic thinkers, with a plan for everything.",
        coreExplain="You lead with Introverted Intuition, focusing on underlying patterns.",
        eiPercent=75,
        snPercent=65,
        tfPercent=80,
        jpPercent=90
    )