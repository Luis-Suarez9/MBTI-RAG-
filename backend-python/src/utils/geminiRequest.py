import os
from dotenv import load_dotenv
from google import genai
from google.genai.errors import APIError
import json

class Gemini_api:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(Gemini_api, cls).__new__(cls)
            load_dotenv()
            cls._instance.__my_api_key = os.getenv("GEMINI_API_KEY")
            cls._instance.__client = genai.Client(api_key=cls._instance.__my_api_key)
            cls._instance.__MODELS = [
                "gemini-3.5-flash", 
                "gemini-3.1-flash-lite",
                "gemini-3-flash",
                "gemini-2.5-flash", 
                "gemini-2.5-pro", 
                "gemini-2-flash", 
                "gemini-2-flash-lite"
            ]
        return cls._instance

    def call_gemini(self, answers: list[int], mbti: list[dict]):
        
        # Your exact original wording, plus the data variables and JSON instruction
        prompt = f"""You are an expert psycologist here who can somehow code. 
                    I want you to take a look at user's answers to all 48 mbti question {answers} and the mbti that I got from using my web algorithm {mbti}. 
                    From those information please write a short paragraph for these 3 aspect: 
                    First, your own way of describing this person personality. Since everyone may not be fully on e or i s or n so on I want you to describe this person in your own word looking at how they answer to questions mainly, and reference to their mbti because this person might have some contradictive personality to their mbti. 
                    Second, MBTI best match who can they get along best and why give me 2 of that. 
                    Third, MBTI clash tell me what MBTI can be clash with this person: why clash and how to avoid. 
                    Note I want you to structure your answer exactly like this ai_description: one short paragraph for it, clashed_mbti_and_how_to_solve: one short paragraph for it, matching_partner_and_reason: one short paragraph for it. 
                    Also try to humanize the language too. Do not use hard english word.
                    
                    Return ONLY a valid JSON object with exactly these three keys. Do not include markdown formatting like ```json.
                    {{
                        "ai_description": "...",
                        "matching_partner_and_reason": "...",
                        "clashed_mbti_and_how_to_solve": "..."
                    }}"""

        # Try each model until one succeeds
        for model_name in self.__MODELS:
            try:
                response = self.__client.models.generate_content(
                    model=model_name,
                    contents=prompt,
                    config={"response_mime_type": "application/json"} 
                )
                
                # Parse the text into a dictionary
                response_dict = json.loads(response.text)
                
                # Extract your three distinct strings
                ai_desc = response_dict.get("ai_description", "")
                match = response_dict.get("matching_partner_and_reason", "")
                clash = response_dict.get("clashed_mbti_and_how_to_solve", "")
                
                return ai_desc, match, clash
            
            except Exception as e:
                # Optionally print(e) here to see why a model fails
                pass
        
        return None, None, None
        