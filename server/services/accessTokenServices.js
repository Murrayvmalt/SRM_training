const jwt = require("jsonwebtoken");

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

//commented out for till I need to activate
const authenticateToken = (requiredAccess) => (req, res, next) => {
  // const authHeader = req.headers["authorization"];
  // const token = authHeader && authHeader.split(" ")[1];

  // if (token == null) return res.sendStatus(401);

  // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //   if (err) return res.sendStatus(403);

  //   if (!requiredAccess.includes(user.access)) {
  //     return res.status(403).send("Access forbidden.");
  //   }

  //   req.user = user;
  next();
  // });
};

module.exports = { generateAccessToken, authenticateToken };
//app.get("/admin-only-route", authenticateToken(["admin"]), (req, res) => {
// Your admin-only route logic here
//});
