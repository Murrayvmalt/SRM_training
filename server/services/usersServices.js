const pool = require("./dbServices");

const {
  removeUserAnswers,
  removeSubsectionScores,
} = require("./answersServices");

const fetchAllUsers = async () => {
  const [rows] = await pool.query(
    `SELECT userId, email, name, surname 
        FROM users`
  );
  return rows;
};

const fetchUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM users 
        WHERE userId = ?`,
    [id]
  );

  return rows[0];
};

const fetchUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM users 
        WHERE email = ?`,
    [email]
  );
  return rows.length === 0 ? null : rows[0];
};

const fetchRegistrationById = async (id) => {
  const [rows] = await pool.query(
    `SELECT *
  FROM course_registration
  WHERE registrationId = ?`,
    [id]
  );

  return rows[0];
};

const insertUser = async (email, password, name, surname) => {
  const [result] = await pool.query(
    `INSERT INTO users (email, password, name, surname)
      VALUES (?, ?, ?, ?)`,
    [email, password, name, surname]
  );
  const id = result.insertId;
  return await fetchUserById(id);
};

const insertRegistration = async (
  userId,
  courseId,
  currentStatus,
  currentSection
) => {
  const [result] = await pool.query(
    `INSERT INTO course_registration (userId, courseId, currentStatus, currentSection)
    VALUES (?, ?, ?, ?)`,
    [userId, courseId, currentStatus, currentSection]
  );
  const id = result.insertId;
  return fetchRegistrationById(id);
};

const removeRegistration = async (registrationId, userId = 0) => {
  const [result] = await pool.query(
    `DELETE FROM course_registration
    WHERE registrationId = ?
    OR userId = ?`,
    [registrationId, userId]
  );

  return result.affectedRows;
};

const modifyRegistrationStatus = async (registrationId, currentStatus) => {
  const [result] = await pool.query(
    `UPDATE course_registration
    SET currentStatus = ?
    WHERE registrationId = ?`,
    [currentStatus, registrationId]
  );

  return result.affectedRows;
};

const modifyRegistrationSection = async (registrationId, currentSection) => {
  const [result] = await pool.query(
    `UPDATE course_registration
    SET currentSection = ?
    WHERE registrationId = ?`,
    [currentSection, registrationId]
  );

  return result.affectedRows;
};

const removeUser = async (userId) => {
  await removeRegistration(0, userId);
  await removeUserAnswers(0, 0, userId);
  await removeSubsectionScores(0, 0, userId);

  const [result] = await pool.query(
    `DELETE FROM users
         WHERE userId = ?;`,
    [userId]
  );

  return result.affectedRows;
};

module.exports = {
  fetchUserByEmail,
  insertUser,
  removeUser,
  fetchAllUsers,
  insertRegistration,
  modifyRegistrationStatus,
  modifyRegistrationSection,
};
