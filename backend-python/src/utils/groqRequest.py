import os
import json

from dotenv import load_dotenv
from groq import Groq
from src.schemas import QuizAnswer
from src.utils.query import build_compatibility_prompt
from src.utils.retriver import retriever
from src.utils.secrets import load_secrets

class Groq_api:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Groq_api, cls).__new__(cls)
            # Keep local .env support for development; Docker Compose loads
            # individual ignored secrets through /run/secrets instead.
            load_dotenv()
            load_secrets()
            cls._instance.__my_api_key = os.getenv("GROQ_API_KEY")
            cls._instance.__client = Groq(api_key=cls._instance.__my_api_key)
            cls._instance.__MODELS = [
                "llama-3.1-8b-instant",       # fast + cheap on limits
                "openai/gpt-oss-20b",         # stronger reasoning
                "llama-3.3-70b-versatile",    # stronger general model
                "openai/gpt-oss-120b",        # strongest fallback
            ]
        return cls._instance

    def call_groq(self, answers: list[QuizAnswer], mbti: list[dict]):
        
        answers_json = json.dumps([answer.model_dump() for answer in answers])
        mbti_json = json.dumps(mbti, ensure_ascii=False)
        # Include the validated answer objects and their signed weights.
        prompt = f"""You are an expert psycologist here who can code. 
                    I want you to take a look at the user's answers to all 48 MBTI questions: {answers_json}.
                    The frontend-supplied MBTI type and axis percentages are: {mbti_json}.
                    Use every supplied E/I, S/N, T/F, and J/P percentage when describing the user.
                    (The answer -3 to 3 shows agreement strength; the signed weight changes direction and influence.)
                    Each answer has question, questionNo, score, and weight. Score is agreement from -3 to 3; 0 is neutral.
                    Weight is a signed scoring coefficient, not agreement or confidence. Its absolute value indicates relative influence.
                    Use score * weight as the weighted contribution. For questions 1–12 positive contributions favor E and negative I;
                    for 13–24 positive favors S and negative N; for 25–36 positive favors T and negative F; for 37–48 positive favors J and negative P.
                    A negative weight reverses the scoring direction; it does not mean the user disagrees. Neutral scores contribute zero regardless of weight.
                    Consider these contributions alongside the question wording and supplied MBTI percentages when describing nuances.
                    From that information write only one short paragraph describing this person's personality.
                    Also try to humanize the language too. Make the user feel like you are trying to predict them(with out explicitly telling them) and they are having fun like ohh an ai predict me. You can achieve this by instead of saying this person or they you say 'you tends to ...' or 'you may perhap be ...'
                    
                    Return ONLY a valid JSON object with exactly one key. Do not include markdown formatting like ```json.
                    {{
                        "ai_description": "..."
                    }}"""

        # Try each model until one succeeds
        for model_name in self.__MODELS:
            try:
                response = self.__client.chat.completions.create(
                    model=model_name,
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                )

                # Parse the text into a dictionary
                response_text = response.choices[0].message.content or "{}"
                response_dict = json.loads(response_text)
                
                # Extract only personality; compatibility is handled by retriver.py/query.py.
                ai_desc = response_dict.get("ai_description", "")
                return ai_desc
            
            except Exception as e:
                # Optionally print(e) here to see why a model fails
                pass
        
        return None

    def call_compatibility(self, mbti: list[dict], answers: list[QuizAnswer]):
        """Retrieve structured local context, then ask Groq for two fields."""
        context = retriever.context(mbti, [answer.model_dump() for answer in answers])
        prompt = build_compatibility_prompt(mbti, context)
        for model_name in self.__MODELS:
            try:
                response = self.__client.chat.completions.create(
                    model=model_name,
                    messages=[{"role": "user", "content": prompt}],
                    response_format={"type": "json_object"},
                )
                result = json.loads(response.choices[0].message.content or "{}")
                return (
                    result.get("matching_partner_and_reason", ""),
                    result.get("clashed_mbti_and_how_to_solve", ""),
                )
            except Exception:
                pass
        return None, None
        
