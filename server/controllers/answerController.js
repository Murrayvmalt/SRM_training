const {
  insertUserAnswers,
  fetchUserAnswersByUserAndSubsectionId,
  modifyFeedback,
  insertUserSubsectionScores,
  fetchSectionScores,
  allocateScore,
} = require("../services/answersServices");

const submitAnswers = async (req, res, next) => {
  const {
    userId,
    subsectionId,
    answers,
    attempt,
    score,
    maxMarks,
    currentStatus,
  } = req.body;

  const insertionResults = await Promise.all(
    answers.map(async (answer) => {
      const { questionId, questionText, answerText } = answer;
      const result = await insertUserAnswers(
        userId,
        subsectionId,
        questionId,
        questionText,
        answerText,
        attempt
      );
      return result;
    })
  );

  const hasError = insertionResults.includes(0);

  if (hasError) {
    return res.status(500).send("Error submitting answers");
  }
  const result = await insertUserSubsectionScores(
    userId,
    subsectionId,
    attempt,
    score,
    maxMarks,
    currentStatus
  );
  if (result === 0) {
    return res.status(500).send("Error submitting quiz total");
  }

  return res.status(200).send("Answers Submitted Successfully");
};

const markQuestions = async (req, res, next) => {
  const instructorFeedbacks = req.body;
  const updateResults = await Promise.all(
    instructorFeedbacks.map(async (singularFeedback) => {
      const { userAnswerId, marked, feedback, score } = singularFeedback;
      const result = await modifyFeedback(
        userAnswerId,
        score,
        marked,
        feedback
      );
      return result;
    })
  );
  const hasError = updateResults.includes(0);
  if (hasError) {
    return res.status(500).send("Error submitting feedback");
  }
  return res.status(200).send("Answers submitting successfully");
};

const submitScore = async (req, res, next) => {
  const { scoreId, score, currentStatus, maxMarks } = req.body;
  const result = await allocateScore(scoreId, score, currentStatus, maxMarks);
  if (result === 0) {
    return res.status(500).send("Error submitting score");
  }
  return res.status(200).send("score submitting successfully");
};

// const submitQuizTotal = async (req, res, next) => {
//   const { userId, subsectionId, attempt, score, maxMarks, status } = req.body;
//   const result = await insertUserSubsectionScores(
//     userId,
//     subsectionId,
//     attempt,
//     score,
//     maxMarks,
//     status
//   );
//   if (result === 0) {
//     return res.status(500).send("Error submitting quiz total");
//   }
//   return res.status(200).send("Quiz total submitting successfully");
// };

// getQuizTotalsByUserAndSectionId = async (req, res, next) => {
//   const userId = req.query.userId;
//   const sectionId = req.query.sectionId;
//   const rows = await fetchSectionScores(userId, sectionId);
//   res.status(201).send(rows);
// };

const getAnswersByUserAndSubsectionId = async (req, res, next) => {
  const userId = req.query.userId;
  const subSecId = req.query.subsecId;
  const rows = await fetchUserAnswersByUserAndSubsectionId(userId, subSecId);
  res.status(201).send(rows);
};

module.exports = {
  submitAnswers,
  getAnswersByUserAndSubsectionId,
  markQuestions,
  fetchSectionScores,
  submitScore,
  // getQuizTotalsByUserAndSectionId,
};
