const pool = require("./dbServices");

const fetchUserAnswersByUserAndSubsectionId = async (userId, subsecId) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM user_answers 
        WHERE userId = ?
        AND subsectionId =?`,
    [userId, subsecId]
  );
  return rows;
};

const insertUserAnswers = async (
  userId,
  subsectionId,
  questionId,
  questionText,
  answerText,
  attempt
) => {
  const [result] = await pool.query(
    `INSERT INTO user_answers (userId, subsectionId, questionId, questionText, answerText, attempt)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, subsectionId, questionId, questionText, answerText, attempt]
  );
  return result.affectedRows;
};

const insertUserSubsectionScores = async (
  userId,
  subsectionId,
  attempt,
  score,
  maxMarks,
  currentStatus
) => {
  const [result] = await pool.query(
    `INSERT INTO subsection_scores (
    userId, subsectionId, attempt, score, maxMarks, currentStatus)
    VALUES (?, ?, ?, ?, ?, ?)`,
    [userId, subsectionId, attempt, score, maxMarks, currentStatus]
  );
  return result.affectedRows;
};

const fetchSectionScores = async (userId, subsectionId) => {
  const [rows] = await pool.query(
    `SELECT ss.scoresId, ss.subsectionId, ss.attempt, ss.score, ss.maxMarks, ss.passed, ss.currentStatus
    FROM subsection_scores ss
    INNER JOIN subsection s ON ss.subsectionId = s.subsectionId
    INNER JOIN section sec ON s.sectionId = sec.sectionId
    WHERE ss.userId = ?
      AND s.sectionId = ?;`,
    [userId, subsectionId]
  );
  return rows;
};

const modifyFeedback = async (userAnswerId, score, marked, feedback) => {
  const [result] = await pool.query(
    `UPDATE user_answers 
    SET score = ?, marked = ?, feedback = ?
    WHERE userAnswerId = ?`,
    [score, marked, feedback, userAnswerId]
  );
  return result.affectedRows;
};

const allocateScore = async (scoreId, score, currentStatus, maxMarks) => {
  const [result] = await pool.query(
    `UPDATE subsection_scores
    SET score = ?, currentStatus = ?, maxMarks = ?`,
    [score, currentStatus, maxMarks, scoreId]
  );
  return result.affectedRows;
};

const removeUserAnswers = async (
  userAnswerId,
  subsectionId = 0,
  userId = 0
) => {
  const [result] = await pool.query(
    `DELETE FROM user_answers
    WHERE userAnswerId = ?
    OR subsectionId = ?
    OR userId = ?`,
    [userAnswerId, subsectionId, userId]
  );

  return result.affectedRows;
};

const removeSubsectionScores = async (
  userAnswerId,
  subsectionId = 0,
  userId = 0
) => {
  const [result] = await pool.query(
    `DELETE FROM subsection_scores
    WHERE scoresId = ?
    OR subsectionId = ?
    OR userId = ?`,
    [userAnswerId, subsectionId, userId]
  );

  return result.affectedRows;
};

module.exports = {
  insertUserAnswers,
  fetchUserAnswersByUserAndSubsectionId,
  modifyFeedback,
  insertUserSubsectionScores,
  fetchSectionScores,
  allocateScore,
  removeUserAnswers,
  removeSubsectionScores,
};
