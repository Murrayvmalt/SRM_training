const {
  fetchQuestionsBySubsectionId,
  insertQuestion,
  modifyQuestion,
} = require("../services/questionsServices");

const getQuestions = async (req, res, next) => {
  const id = req.params.id;
  const rows = await fetchQuestionsBySubsectionId(id);
  return res.status(201).send(rows);
};

const addQuestions = async (req, res, next) => {
  const { subsectionId, questions } = req.body;
  const insertionResults = await Promise.all(
    questions.map(async (question) => {
      const {
        questionNumber,
        questionType,
        questionText,
        options,
        solution,
        marks,
        fileName,
      } = question;
      const result = await insertQuestion(
        subsectionId,
        questionNumber,
        questionType,
        questionText,
        options,
        solution,
        marks,
        fileName
      );
      return result;
    })
  );
  const hasError = insertionResults.includes(0);

  if (hasError) {
    return res.status(500).send("Error submitting questions");
  }
  const results = await fetchQuestionsBySubsectionId(subsectionId);
  if (results === 0) {
    return res.status(500).send("Error submitting questions");
  }
  return res.status(201).send(results);
};

const editQuestion = async (req, res, next) => {
  const {
    questionId,
    questionNumber,
    questionType,
    questionText,
    options,
    solution,
    marks,
    fileName,
  } = req.body;
  const result = await modifyQuestion(
    questionId,
    questionNumber,
    questionType,
    questionText,
    options,
    solution,
    marks,
    fileName
  );

  if (result === 0) {
    return res.status(404).send("Question with the specified ID was not found");
  }

  return res.status(200).send("Question updated successfully");
};

module.exports = { getQuestions, addQuestions, editQuestion };
