const express = require("express");

const questionRouter = express.Router();

const questionController = require("../controllers/questionController");

//user routes
//userRouter.post("/login", usersController.login);
questionRouter.get("/:id", questionController.getQuestions);
questionRouter.post("/add", questionController.addQuestions);

questionRouter.put("/edit", questionController.editQuestion);

module.exports = questionRouter;
