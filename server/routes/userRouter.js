const express = require("express");

const userRouter = express.Router();

const usersController = require("../controllers/usersController");

//user routes
userRouter.post("/login", usersController.login);
userRouter.post("/signup", usersController.signup);
userRouter.post("/register", usersController.registerUser);

//instructor routes
userRouter.get("/all", usersController.getAllUsers);

//instreuctor and user routes
userRouter.delete("/delete/:id", usersController.deleteUser);
userRouter.put("/edit-status", usersController.editRegistrationStatus);
userRouter.put("/edit-section", usersController.editRegistrationSection);

module.exports = userRouter;
