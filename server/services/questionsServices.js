const pool = require("./dbServices");

const fetchQuestionsBySubsectionId = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM questions 
        WHERE subsectionId = ?`,
    [id]
  );
  return rows;
};

const fetchQuestionById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
    FROM questions 
    WHERE questionId = ?`
  );
};

const insertQuestion = async (
  subsectionId,
  questionNumber,
  questionType,
  questionText,
  options,
  solution,
  marks,
  fileName
) => {
  const [result] = await pool.query(
    `INSERT INTO questions (subsectionId, questionNumber, questionType, questionText, options, solution, marks, fileName)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
    [
      subsectionId,
      questionNumber,
      questionType,
      questionText,
      JSON.stringify(options),
      solution,
      marks,
      fileName,
    ]
  );
  return result.affectedRows;
};

const removeQuestion = async (questionId, subsectionId = 0) => {
  const [result] = await pool.query(
    `DELETE FROM questions
    WHERE questionId = ?
    OR subsectionId = ?`,
    [questionId, subsectionId]
  );

  return result.affectedRows;
};

const modifyQuestion = async (
  questionId,
  questionNumber,
  questionType,
  questionText,
  options,
  solution,
  marks,
  fileName
) => {
  const [result] = await pool.query(
    `UPDATE questions 
    SET	questionNumber = ?, questionType = ?,	questionText = ?,	options = ?,	solution = ?,	marks = ?,	fileName = ?
    WHERE questionId = ?`,
    [
      questionNumber,
      questionType,
      questionText,
      options,
      solution,
      marks,
      fileName,
      questionId,
    ]
  );

  return result.affectedRows;
};

module.exports = {
  fetchQuestionsBySubsectionId,
  insertQuestion,
  removeQuestion,
  modifyQuestion,
};
