"""Build the text query used to search the MBTI vector store."""

from __future__ import annotations

import json


def build_compatibility_prompt(mbti: list[dict] | str, context: str) -> str:
    """Create the Groq prompt for best-match and clash answers."""
    # JSON makes every type and percentage unambiguous to the language model.
    mbti_json = json.dumps(mbti, ensure_ascii=False) if not isinstance(mbti, str) else mbti
    return f"""You are an expert MBTI compatibility guide.

The user's frontend-supplied MBTI type and axis percentages are: {mbti_json}
Use those supplied E/I, S/N, T/F, and J/P percentages when relevant.

Use this retrieved MBTI reference context as your source:
{context}

Write exactly two short, humanized paragraphs:
1. matching_partner_and_reason: identify the best matching MBTI types and explain why.
2. clashed_mbti_and_how_to_solve: identify likely clashes and explain how to handle them.

Return ONLY valid JSON with exactly these keys:
{{
  "matching_partner_and_reason": "...",
  "clashed_mbti_and_how_to_solve": "..."
}}"""
