from pydantic import BaseModel, Field


class QuizAnswer(BaseModel):
    question: str = Field(min_length=1)
    questionNo: int = Field(strict=True, ge=1, le=48)
    weight: float = Field(strict=True, allow_inf_nan=False)
    score: int = Field(strict=True, ge=-3, le=3)
