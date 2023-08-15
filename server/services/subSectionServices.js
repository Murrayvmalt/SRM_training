const pool = require("./dbServices");

const { removeQuestion } = require("./questionsServices");

const {
  removeUserAnswers,
  removeSubsectionScores,
} = require("./answersServices");

const fetchSubsectionBySectionId = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM subsection
        WHERE sectionId = ?`,
    [id]
  );
  return rows;
};

const fetchSubsectionByid = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
        FROM subsection 
        WHERE subsectionId = ?`,
    [id]
  );
  return rows[0];
};

const insertSubsection = async (sectionId, position, type) => {
  const [result] = await pool.query(
    `INSERT INTO subsection (sectionId, position, type)
    VALUES (?, ?, ?);`,
    [sectionId, position, type]
  );
  const id = result.insertId;
  return fetchSubsectionByid(id);
};

const fetchTextById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM text 
        WHERE textId = ?`,
    [id]
  );
  return rows[0];
};

const insertText = async (subsectionId, heading, text, fileName) => {
  const [result] = await pool.query(
    `INSERT INTO text (subsectionId, heading, text, fileName)
    VALUES (?, ?, ?, ?);`,
    [subsectionId, heading, text, fileName]
  );
  const id = result.insertId;
  return fetchTextById(id);
};

const removeText = async (textId, subsectionId = 0) => {
  const [result] = await pool.query(
    `DELETE FROM text
    WHERE textId = ?
    OR subsectionId = ?`,
    [textId, subsectionId]
  );

  return result.affectedRows;
};

const removeSubsection = async (subsectionId, sectionId = 0) => {
  if (sectionId > 0) {
    const rows = await fetchSubsectionBySectionId(sectionId);
    for (const row of rows) {
      await removeText(0, row.subsectionId);
      await removeQuestion(0, row.subsectionId);
      await removeUserAnswers(0, row.subsectionId);
      await removeSubsectionScores(0, row.subsectionId);
    }
  } else {
    await removeText(0, subsectionId);
    await removeQuestion(0, subsectionId);
    await removeUserAnswers(0, subsectionId);
    await removeSubsectionScores(0, subsectionId);
  }

  const [result] = await pool.query(
    `DELETE FROM subsection
    WHERE subsectionId = ?
    OR sectionId = ?`,
    [subsectionId, sectionId]
  );

  return result.affectedRows;
};

module.exports = { insertSubsection, insertText, removeText, removeSubsection };
