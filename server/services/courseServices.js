const pool = require("./dbServices");

const { removeSection } = require("./sectionServices");

const fetchAllCourses = async (acive) => {
  const query = `
  SELECT
    c.courseId,
    c.courseName,
    c.prerequisite,
    c.imageUrl,
    c.descriptionText,
    c.active,
    s.sectionId
  FROM course c
  LEFT JOIN section s ON c.courseId = s.courseId
`;

  const [rows] = await pool.query(query);

  const courses = [];
  let currentCourse = null;

  rows.forEach((row) => {
    if (!currentCourse || currentCourse.courseId !== row.courseId) {
      currentCourse = {
        courseId: row.courseId,
        courseName: row.courseName,
        prerequisite: row.prerequisite,
        imageUrl: row.imageUrl,
        description: row.description,
        active: row.active,
        numberOfSections: row.numberOfSections,
        sections: [],
      };
      courses.push(currentCourse);
    }

    if (row.sectionId) {
      currentCourse.sections.push({
        sectionId: row.sectionId,
        numberOfSubsections: row.numberOfSubsections,
      });
    }
  });

  return courses;
};

const fetchCourseById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
      FROM course 
      WHERE courseId = ?`,
    [id]
  );
  return rows[0];
};

const insertCourse = async (
  courseName,
  prerequisite,
  imageUrl,
  descriptionText,
  active
) => {
  const [result] = await pool.query(
    `INSERT INTO course (courseName, prerequisite, imageUrl, descriptionText, active)
          VALUES (?, ?, ?, ?, ?);`,
    [courseName, prerequisite, imageUrl, descriptionText, active]
  );
  const id = result.insertId;
  return fetchCourseById(id);
};

const modifyCourse = async (
  courseId,
  courseName,
  prerequisite,
  active,
  imageUrl,
  descriptionText
) => {
  const [result] = await pool.query(
    `UPDATE course 
    SET courseName = ?, prerequisite = ?, active = ?, imageUrl = ?, descriptionText = ? 
    WHERE courseId = ?`,
    [courseName, prerequisite, active, imageUrl, descriptionText, courseId]
  );

  return result.affectedRows;
};

const modifyText = async (textId, heading, text, fileName) => {
  const [result] = await pool.query(
    `UPDATE text 
    SET heading = ?, text = ?, fileName = ?
    WHERE textId = ?`,
    [heading, text, fileName, textId]
  );

  return result.affectedRows;
};

const removeCourse = async (courseId) => {
  await removeSection(0, courseId);
  const [result] = await pool.query(
    `DELETE FROM course
       WHERE courseId = ?;`,
    [courseId]
  );

  return result.affectedRows;
};

module.exports = {
  fetchAllCourses,
  insertCourse,
  removeCourse,
  modifyCourse,
  modifyText,
};
