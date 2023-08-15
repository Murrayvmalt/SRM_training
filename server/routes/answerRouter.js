const express = require("express");

const answerRouter = express.Router();

const answerController = require("../controllers/answerController");

//user routes
//userRouter.post("/login", usersController.login);
// questionRouter.get("/:id", questionController.getQuestions);
answerRouter.post("/submit", answerController.submitAnswers);
answerRouter.get("/", answerController.getAnswersByUserAndSubsectionId);
answerRouter.post("/mark", answerController.markQuestions);
answerRouter.put("/score", answerController.submitScore);

module.exports = answerRouter;
