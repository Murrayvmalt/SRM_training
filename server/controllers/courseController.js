const {
  fetchAllCourses,
  insertCourse,
  removeCourse,
  modifyCourse,
  modifyText,
} = require("../services/courseServices");

const { fetchSectionScores } = require("../services/answersServices");

const {
  insertSection,
  fetchSectionDetailsBySectionId,
} = require("../services/sectionServices");

const {
  insertSubsection,
  insertText,
} = require("../services/subSectionServices");

const getAllCourses = async (req, res, next) => {
  const rows = await fetchAllCourses();
  res.status(201).send(rows);
};

getAllSectionDetails = async (req, res, next) => {
  const userId = req.query.userId || "0";
  const sectionId = req.query.sectionId;
  const rowsDetails = await fetchSectionDetailsBySectionId(sectionId);
  const rowsQuizResults = await fetchSectionScores(userId, sectionId);
  const rowsSend = { rowsDetails, rowsQuizResults };
  res.status(201).send(rowsSend);
};

const addCourse = async (req, res, next) => {
  const { courseName, prerequisite, imageUrl, descriptionText, active } =
    req.body;
  const course = await insertCourse(
    courseName,
    prerequisite,
    imageUrl,
    descriptionText,
    active
  );
  res.status(201).send(course);
};

const addSection = async (req, res, next) => {
  const { courseId } = req.body;
  const section = await insertSection(courseId);
  res.status(201).send(section);
};

const addSubsection = async (req, res, next) => {
  const { sectionId, position, type } = req.body;
  const subsection = await insertSubsection(sectionId, position, type);
  res.status(201).send(subsection);
};

const addSubsectionText = async (req, res, next) => {
  const { subsectionId, heading, text, fileName } = req.body;
  const textRow = await insertText(subsectionId, heading, text, fileName);
  res.status(201).send(textRow);
};

const editCourse = async (req, res, next) => {
  const {
    courseId,
    courseName,
    prerequisite,
    active,
    imageUrl,
    descriptionText,
  } = req.body;
  const result = await modifyCourse(
    courseId,
    courseName,
    prerequisite,
    active,
    imageUrl,
    descriptionText
  );

  if (result === 0) {
    return res.status(404).send("Course with the specified ID was not found");
  }

  return res.status(200).send("Course updated successfully");
};

const editText = async (req, res, next) => {
  const { textId, heading, text, fileName } = req.body;
  const result = await modifyText(textId, heading, text, fileName);

  if (result === 0) {
    return res.status(404).send("Text with the specified ID was not found");
  }

  return res.status(200).send("Text updated successfully");
};

const deleteCourse = async (req, res, next) => {
  const id = req.params.id;
  const result = await removeCourse(id);
  if (result === 0) {
    res.status(404).send("Course not found");
  }
  res.status(204).send();
};

module.exports = {
  getAllCourses,
  addCourse,
  deleteCourse,
  getAllSectionDetails,
  addSection,
  addSubsection,
  addSubsectionText,
  editCourse,
  editText,
};
