//https://medium.com/@prashantramnyc/a-simple-registration-and-login-backend-using-nodejs-and-mysql-967811509a64
//https://www.youtube.com/watch?v=Hej48pi_lOc&ab_channel=SamMeech-Ward

const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const userRouter = require("./routes/userRouter");
const adminRouter = require("./routes/adminRouter");
const courseRouter = require("./routes/courseRouter");
const questionRouter = require("./routes/questionRouter");
const answerRouter = require("./routes/answerRouter");

//user routes
app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/question", questionRouter);
app.use("/answer", answerRouter);

//admin-instructor routes
app.use("/admin", adminRouter);

const port = process.env.PORT;
app.listen(port, () => console.log(`Server Started on port ${port}...`));

app.use((err, req, res, next) => {
  if (!err.status) {
    err.status = 500;
  }
  res.status(err.status).send(err.message);
});
