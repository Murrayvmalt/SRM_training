const pool = require("./dbServices");

const { removeSubsection } = require("./subSectionServices");

const fetchSectionDetailsBySectionId = async (id) => {
  const [rows] = await pool.query(
    `SELECT
      sub.subsectionId,
      sub.position,
      sub.type,
      txt.textId,
      txt.heading,
      txt.text,
      txt.fileName
    FROM subsection sub
    LEFT JOIN text txt ON sub.subsectionId = txt.subsectionId
    WHERE sub.sectionId = ?;`,
    [id]
  );
  return rows;
};

const fetchSectionById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
  FROM section 
  WHERE sectionId = ?`,
    [id]
  );
  return rows[0];
};

const fetchSectionByCourseId = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
    FROM section
    WHERE courseId = ?`,
    [id]
  );
  return rows;
};

const insertSection = async (courseId) => {
  const [result] = await pool.query(
    `INSERT INTO section (courseId)
      VALUES (?);`,
    [courseId]
  );
  const id = result.insertId;
  return fetchSectionById(id);
};

const removeSection = async (sectionId, courseId = 0) => {
  if (courseId > 0) {
    const rows = await fetchSectionByCourseId(courseId);
    for (const row of rows) {
      await removeSubsection(0, row.sectionId);
    }
  } else {
    await removeSubsection(0, sectionId);
  }

  const [result] = await pool.query(
    `DELETE FROM section
    WHERE sectionId = ?
    OR courseId = ?`,
    [sectionId, courseId]
  );

  return result.affectedRows;
};

module.exports = {
  fetchSectionDetailsBySectionId,
  insertSection,
  removeSection,
};
