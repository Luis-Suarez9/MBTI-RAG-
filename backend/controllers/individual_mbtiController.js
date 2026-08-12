// backend/controllers/individual_mbtiController.js
require('dotenv').config();
const individual_mbtiModel = require('../models/individual_mbtiModel');
const calculate = require('../utils/calculator');
const { mbtiProfiles } = require('../libs/mbtiDetail');

// ─── CRUD ────────────────────────────────────────────────────────────────────

/**
 * Create a new Individual MBTI record.
 */
const createIndividual_mbti = async (req, res) => {
  const data = req.body; // fields matching Prisma model
  const newRecord = await individual_mbtiModel.createIndividual_mbti(data);
  res.status(201).json({ message: 'Individual MBTI created', individual_mbti: newRecord });
};

/**
 * Retrieve all Individual MBTI records.
 */
const getAllIndividual_mbtis = async (req, res) => {
  const records = await individual_mbtiModel.getAllIndividual_mbtis();
  res.status(200).json(records);
};

/**
 * Retrieve a single Individual MBTI by ID.
 */
const getIndividual_mbtiById = async (req, res) => {
  const { id } = req.params;
  const record = await individual_mbtiModel.getIndividual_mbtiById(id);

  // Return 403 whether the record doesn't exist OR belongs to someone else —
  // deliberately avoids leaking that the record exists at all.
  if (!record) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }

  // If the record belongs to a registered user, enforce strict ownership
  if (record.userId) {
    if (!req.user || String(record.userId) !== String(req.user.userId)) {
      return res.status(403).json({ error: 'Individual MBTI not found' });
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
 * Update an existing Individual MBTI record.
 */
const updateIndividual_mbti = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const existingRecord = await individual_mbtiModel.getIndividual_mbtiById(id);
  if (!existingRecord) {
    return res.status(404).json({ error: 'Individual MBTI not found' });
  }

  const updated = await individual_mbtiModel.updateIndividual_mbti(id, data);
  res.status(200).json({ message: 'Individual MBTI updated', individual_mbti: updated });
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
  if (existingRecord.userId !== req.user.userId) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  await individual_mbtiModel.deleteIndividual_mbti(id);
  res.status(200).json({ message: 'Individual MBTI deleted' });
};

const calculateIndividualMbti = async (req, res) => {
  const payload = (req.body && Object.keys(req.body).length) ? req.body : req.query;

  // Compute the four MBTI dimension percentages
  const result = await calculate.calculator(payload);
  const mbtiName = `${result.EorI}${result.SorN}${result.TorF}${result.JorP}`;

  // ── Summary log (visible in Docker logs) ──────────────────────────────────
  console.log('─'.repeat(50));
  console.log('[calculateIndividualMbti] MBTI Dimension Results:');
  console.log(`  Group 1 (E/I - Q1–12):   ${result.group1}%`);
  console.log(`  Group 2 (S/N - Q13–24):  ${result.group2}%`);
  console.log(`  Group 3 (T/F - Q25–36):  ${result.group3}%`);
  console.log(`  Group 4 (J/P - Q37–48):  ${result.group4}%`);
  console.log('─'.repeat(50));
  // ──────────────────────────────────────────────────────────────────────────
  // make request to fast api to get ai description
  // create individual mbti from user id too
  // if user not login just like send response and like the ai description part just have them wait
  const userId = req.user?.userId || null;
  console.log('[calculateIndividualMbti] req.user:', req.user);
  console.log('[calculateIndividualMbti] userId:', userId);

  const matchedProfile = mbtiProfiles.find(p => p.name.includes(mbtiName));
  const nickname = matchedProfile ? matchedProfile.title : "Not available for now";
  const coreExplain = matchedProfile ? matchedProfile.coreDescription : "Not available for now";

  const mbtiData = {
    name: mbtiName,
    nickname: nickname,
    aiDescription: "Not available for now",
    coreExplain: coreExplain,
    eiPercent: Math.round(result.group1),
    snPercent: Math.round(result.group2),
    tfPercent: Math.round(result.group3),
    jpPercent: Math.round(result.group4),
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
  createIndividual_mbti,
  getAllIndividual_mbtis,
  getIndividual_mbtiById,
  getIndividual_mbtiByUserId,
  updateIndividual_mbti,
  deleteIndividual_mbti,
  calculateIndividualMbti,
};
