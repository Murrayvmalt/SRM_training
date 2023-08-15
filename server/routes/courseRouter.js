const express = require("express");

const courseRouter = express.Router();

const courseController = require("../controllers/courseController");

//user routes
//gets all courses and their sections
courseRouter.get("/", courseController.getAllCourses);
courseRouter.get("/section/", courseController.getAllSectionDetails);

courseRouter.put("/edit", courseController.editCourse);
courseRouter.put("/subsection/edit-text", courseController.editText);

//admin routes
courseRouter.post("/add", courseController.addCourse);
courseRouter.post("/section/add", courseController.addSection);
courseRouter.post("/subsection/add", courseController.addSubsection);
courseRouter.post("/subsection/add-text", courseController.addSubsectionText);

courseRouter.delete("/remove/:id", courseController.deleteCourse);

module.exports = courseRouter;
