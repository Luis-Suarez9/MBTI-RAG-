/**
 * Calculates individual MBTI dimension percentages from 48 weighted questions.
 *
 * Each question in the payload has the shape:
 *   { question: string, weight: number, score: number }
 *
 * Steps:
 *  1. Parse question number from the "question" field (e.g. "48. ..." → 48).
 *  2. Sort questions into 4 groups of 12 (1-12, 13-24, 25-36, 37-48).
 *  3. For each group: raw = Σ(score × weight)
 *  4. Normalise: rawNorm = raw / MAX_WEIGHT
 *  5. Convert to percentage: percent = 50 + (rawNorm × 50)
 *
 * @param {Array<{question: string, weight: number, score: number}>} payload
 * @returns {{ group1: number, group2: number, group3: number, group4: number }}
 */
const calculator = async (payload) => {
  // Ensure payload is an array
  const questions = Array.isArray(payload) ? payload : Object.values(payload);
  // Maximum scores come from the request weights; scores range from -3 to 3.
  const MAX_WEIGHTS = { group1: 0, group2: 0, group3: 0, group4: 0 };

  for (const item of questions) {
    const questionNumber = parseInt(item.question, 10);
    const maxScore = Math.abs(item.weight ?? 0) * 3;

    if (questionNumber >= 1 && questionNumber <= 12) {
      MAX_WEIGHTS.group1 += maxScore;
    } else if (questionNumber >= 13 && questionNumber <= 24) {
      MAX_WEIGHTS.group2 += maxScore;
    } else if (questionNumber >= 25 && questionNumber <= 36) {
      MAX_WEIGHTS.group3 += maxScore;
    } else if (questionNumber >= 37 && questionNumber <= 48) {
      MAX_WEIGHTS.group4 += maxScore;
    }
  }
  console.log(questions);
  // Initialise group accumulators
  const groups = { group1: 0, group2: 0, group3: 0, group4: 0 , EorI: "", SorN: "", TorF: "", JorP: ""};

  for (const item of questions) {
    // Extract question number from the leading digits, e.g. "12. Some text" → 12
    const match = String(item.question).match(/^(\d+)\./);
    console.log(item);
    if (!match) {
      console.warn(`[calculator] Could not parse question number from: "${item.question}"`);
      continue;
    }

    const qNum = parseInt(match[1], 10);
    console.log(qNum)
    const contribution = (item.score ?? 0) * (item.weight ?? 0);

    if (qNum >= 1 && qNum <= 12) {
      groups.group1 += contribution;
    } else if (qNum >= 13 && qNum <= 24) {
      groups.group2 += contribution;
    } else if (qNum >= 25 && qNum <= 36) {
      groups.group3 += contribution;
    } else if (qNum >= 37 && qNum <= 48) {
      groups.group4 += contribution;
    } else {
      console.warn(`[calculator] Question number ${qNum} is out of range (1–48).`);
    }
  }

  // Normalise and convert to percentage for each group
  // Prepare results container and normalise into percentages for each group
  const results = { group1: 0, group2: 0, group3: 0, group4: 0 };
  for (const [key, rawSum] of Object.entries(groups)) {
    const maxWeight = MAX_WEIGHTS[key];
    const rawNorm = rawSum / maxWeight;           // normalised ratio (can be negative)
    const percent = 50 + rawNorm * 50;            // map to 0–100 scale centred at 50
    results[key] = parseFloat(percent.toFixed(2));
  }

  // ── Debug logging ──────────────────────────────────────────────────────────
  console.log(`[MBTI Calculator] Group 1 (E/I - Q1–12):   ${results.group1}%`);
  console.log(`[MBTI Calculator] Group 2 (S/N - Q13–24):  ${results.group2}%`);
  console.log(`[MBTI Calculator] Group 3 (T/F - Q25–36):  ${results.group3}%`);
  console.log(`[MBTI Calculator] Group 4 (J/P - Q37–48):  ${results.group4}%`);
  // ──────────────────────────────────────────────────────────────────────────

  // determining the mbti type
  if (results.group1 > 50) {
    results.EorI = "E";
  } else {
    results.EorI = "I";
  }

  if (results.group2 > 50) {
    results.SorN = "S";
  } else {
    results.SorN = "N";
  }

  if (results.group3 > 50) {
    results.TorF = "T";
  } else {
    results.TorF = "F";
  }

  if (results.group4 > 50) {
    results.JorP = "J";
  } else {
    results.JorP = "P";
  }
  console.log(`${results.EorI}${results.SorN}${results.TorF}${results.JorP}`)
  return results;
};

module.exports = {
  calculator,
};