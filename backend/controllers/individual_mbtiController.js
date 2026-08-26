// backend/controllers/individual_mbtiController.js
require('dotenv').config();
const individual_mbtiModel = require('../models/individual_mbtiModel');
const calculate = require('../utils/calculator');
const { analyzeMbti } = require('../utils/request_fastapi');
const { mbtiProfiles } = require('../libs/mbtiDetail');

// ─── CRUD ────────────────────────────────────────────────────────────────────

/**
 * Retrieve a single Individual MBTI by ID.
 */
const getIndividual_mbtiById = async (req, res) => {
  const { id } = req.params;
  const record = await individual_mbtiModel.getIndividual_mbtiById(id);

  if (!record) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }

  if (record.userId) {
    // Owned record — only the matching authenticated user may read it.
    if (!req.user || String(record.userId) !== String(req.user.userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    // Guest record — authenticated users are blocked.
    // Access is gated on the frontend by a one-time token; no auth user
    // should ever be fetching a record that has no owner.
    if (req.user) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  res.status(200).json(record);
};

/**
 * Retrieve Individual MBTI records by User ID.
 */
const getIndividual_mbtiByUserId = async (req, res) => {
  const { userId } = req.params;
  if (req.user.userId !== userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const records = await individual_mbtiModel.getIndividual_mbtiByUserId(userId);
  if (!records || records.length === 0) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }
  res.status(200).json(records);
};

/**
 * Delete an Individual MBTI record.
 */
const deleteIndividual_mbti = async (req, res) => {
  const { id } = req.params;

  const existingRecord = await individual_mbtiModel.getIndividual_mbtiById(id);
  if (!existingRecord) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }

  if (existingRecord.userId) {
    // Owned record — only the matching authenticated owner can delete it.
    // Guests (no req.user) and mismatched auth users are both rejected.
    if (!req.user || String(existingRecord.userId) !== String(req.user.userId)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  } else {
    // Guest record — only an unauthenticated request (the GuestCleanup
    // component) may delete it. Authenticated users cannot touch it.
    if (req.user) {
      return res.status(403).json({ error: 'Forbidden' });
    }
  }

  await individual_mbtiModel.deleteIndividual_mbti(id);
  res.status(200).json({ message: 'Individual MBTI deleted' });
};

const calculateIndividualMbti = async (req, res) => {
  const payload = (req.body && Object.keys(req.body).length) ? req.body : req.query;

  // Compute the four MBTI dimension percentages
  const result = await calculate.calculator(payload);
  const mbtiName = `${result.EorI}${result.SorN}${result.TorF}${result.JorP}`;

  // ──────────────────────────────────────────────────────────────────────────
  // make request to fast api to get ai description
  // create individual mbti from user id too
  // if user not login just like send response and like the ai description part just have them wait
  const userId = req.user?.userId || null;

  const matchedProfile = mbtiProfiles.find(p => p.name.includes(mbtiName));
  const nickname = matchedProfile ? matchedProfile.title : "Not available for now";
  const coreExplain = matchedProfile ? matchedProfile.coreDescription : "Not available for now";

  const answers = Array.isArray(payload) ? payload : Object.values(payload);
  const mbtiPayload = [{
    name: mbtiName,
    eiPercent: Math.round(result.group1),
    snPercent: Math.round(result.group2),
    tfPercent: Math.round(result.group3),
    jpPercent: Math.round(result.group4),
  }];

  const {
    aiDescription,
    matchingPartnerAndReason,
    clashedMbtiAndHowToSolve,
  } = await analyzeMbti(answers, mbtiPayload);

  const mbtiData = {
    name: mbtiName,
    nickname: nickname,
    aiDescription: aiDescription,
    coreExplain: coreExplain,
    eiPercent: Math.round(result.group1),
    snPercent: Math.round(result.group2),
    tfPercent: Math.round(result.group3),
    jpPercent: Math.round(result.group4),
    matchingPartnerAndReason: matchingPartnerAndReason,
    clashedMbtiAndHowToSolve: clashedMbtiAndHowToSolve,
  };

  if (userId) {
    mbtiData.userId = userId;
  }

  let savedRecord = null;
  try {
    savedRecord = await individual_mbtiModel.createIndividual_mbti(mbtiData);
  } catch (err) {
    console.error("[calculateIndividualMbti] Error saving MBTI record:", err);
  }

  res.status(200).json({
    id: savedRecord ? savedRecord.id : null
  });
};

module.exports = {
  getIndividual_mbtiById,
  getIndividual_mbtiByUserId,
  deleteIndividual_mbti,
  calculateIndividualMbti,
};
