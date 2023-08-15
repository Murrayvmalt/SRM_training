// const bcrypt = require("bcrypt");

// //middleware to read req.body.<params>

// //middleware to authenticate tokens

// const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  //comes in as Bearer <token></token>
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// //example of how to get user from middleware authenticateToken
// app.get("/user", authenticateToken, (req, res) => {
//   res.json(req.user);
// });

// //create user
// app.post("/signup", async (req, res) => {
//   const user = req.body.name;
//   const hashedPassword = await bcrypt.hash(req.body.password, 10);

//   db.getConnection(async (err, connection) => {
//     if (err) throw err;

//     //? is replaced by user
//     const sqlSearch = "SELECT * FROM users WHERE username = ?";
//     const searchQuery = mysql.format(sqlSearch, [user]);

//     //? is replaced by user + hashedPassword
//     const sqlInstert = "Insert INTO users VALUES (0, ?, ?)";
//     const insertQuery = mysql.format(sqlInstert, [user, hashedPassword]);

//     await connection.query(searchQuery, async (err, result) => {
//       if (err) throw err;

//       console.log("------> Search Results");
//       console.log(result.length);

//       if (result.length != 0) {
//         connection.release();

//         console.log("------> User already exists");

//         res.sendStatus(409);
//       } else {
//         await connection.query(insertQuery, (err, result) => {
//           connection.release();

//           if (err) throw err;

//           console.log("--------> Created new User");
//           console.log(result.insertId);

//           res.sendStatus(201);
//         });
//       }
//     });
//   });
// });

// const generateAccessToken = require("./generateAccessToken");

//error example and middleware
// app.post('/beans/:beanName/remove', (req, res, next) => {
//     const numberOfBeans = Number(req.body.number) || 0;
//     if (req.bean.number < numberOfBeans) {
//       const error = new Error('Not enough beans in the jar to remove!')
//       error.status = 400;
//       return next(error);
//     }
//     req.bean.number -= numberOfBeans;
//     res.send(req.bean);
//   });
