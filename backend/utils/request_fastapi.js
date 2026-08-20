require('dotenv').config();

const unavailable = 'Not available for now';

const analyzeMbti = async (answers, mbti) => {
  const requestBody = {
    answers: Array.isArray(answers) ? answers : [],
    mbti: Array.isArray(mbti) ? mbti : [],
  };

  const result = {
    aiDescription: unavailable,
    matchingPartnerAndReason: unavailable,
    clashedMbtiAndHowToSolve: unavailable,
  };

  try {
    const fastApiUrl = process.env.FASTAPI_URL || 'http://localhost:8000';
    const response = await fetch(`${fastApiUrl}/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (response.ok) {
      const data = await response.json();
      result.aiDescription = data.aiDescription || result.aiDescription;
      result.matchingPartnerAndReason = data.matching_partner_and_reason || result.matchingPartnerAndReason;
      result.clashedMbtiAndHowToSolve = data.clashed_mbti_and_how_to_solve || result.clashedMbtiAndHowToSolve;
    } else {
      console.error('[analyzeMbti] FastAPI returned status:', response.status);
    }
  } catch (error) {
    console.error('[analyzeMbti] Error calling FastAPI:', error.message);
  }

  return result;
};

module.exports = {
  analyzeMbti,
};