import os
import json

from dotenv import load_dotenv
from groq import Groq
from src.schemas import QuizAnswer

class Groq_api:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Groq_api, cls).__new__(cls)
            load_dotenv()
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
        # Include the validated answer objects and their signed weights.
        prompt = f"""You are an expert psycologist here who can code. 
                    I want you to take a look at user's answers to all 48 mbti question {answers_json} and the mbti that I got from using my web algorithm {mbti}. (please note that the answer -3 to 3 is for howstrong they agree for postivie and negative when disagree the further the number from 0 the stronger they agree and disagree to question moreover pelase consider the weight of the question too u can look at it and see if it si positive or negative question and hwo much it affect the question determine people mbti)
                    Each answer has question, questionNo, score, and weight. Score is agreement from -3 to 3; 0 is neutral.
                    Weight is a signed scoring coefficient, not agreement or confidence. Its absolute value indicates relative influence.
                    Use score * weight as the weighted contribution. For questions 1–12 positive contributions favor E and negative I;
                    for 13–24 positive favors S and negative N; for 25–36 positive favors T and negative F; for 37–48 positive favors J and negative P.
                    A negative weight reverses the scoring direction; it does not mean the user disagrees. Neutral scores contribute zero regardless of weight.
                    Consider these contributions alongside the question wording and supplied MBTI percentages when describing nuances.
                    From those information please write a short paragraph for these 3 aspect: 
                    First, your own way of describing this person personality. Since everyone may not be fully on e or i s or n so on I want you to describe this person in your own word looking at how they answer to questions mainly, and reference to their mbti because this person might have some contradictive personality to their mbti. 
                    Second, MBTI best match who can they get along best and why give me 2 of that. 
                    Third, MBTI clash tell me what MBTI can be clash with this person: why clash and how to avoid. 
                    Note I want you to structure your answer exactly like this ai_description: one short paragraph for it, clashed_mbti_and_how_to_solve: one short paragraph for it, matching_partner_and_reason: one short paragraph for it. 
                    Also try to humanize the language too. Make the user feel like you are trying to predict them(with out explicitly telling them) and they are having fun like ohh an ai predict me. You can achieve this by instead of saying this person or they you say 'you tends to ...' or 'you may perhap be ...'
                    
                    Return ONLY a valid JSON object with exactly these three keys. Do not include markdown formatting like ```json.
                    {{
                        "ai_description": "...",
                        "matching_partner_and_reason": "...",
                        "clashed_mbti_and_how_to_solve": "..."
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
                
                # Extract your three distinct strings
                ai_desc = response_dict.get("ai_description", "")
                match = response_dict.get("matching_partner_and_reason", "")
                clash = response_dict.get("clashed_mbti_and_how_to_solve", "")
                
                return ai_desc, match, clash
            
            except Exception as e:
                # Optionally print(e) here to see why a model fails
                pass
        
        return None, None, None
        
