const express = require("express");

const adminRouter = express.Router();

const adminController = require("../controllers/adminUsersController");

adminRouter.post("/login", adminController.adminLogin);
adminRouter.post("/add", adminController.addAdmin);

module.exports = adminRouter;
