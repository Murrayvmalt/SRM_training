const {
  fetchAdminUserByEmail,
  insertAdminUser,
} = require("../services/adminUsersServices");

const { generateAccessToken } = require("../services/accessTokenServices");

const bcrypt = require("bcrypt");

const adminLogin = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await fetchAdminUserByEmail(email);
  const { name, surname, userId } = user;

  if (!user) {
    res.sendStatus(404).send("Invalid email or password");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (await bcrypt.compare(password, hashedPassword)) {
    const accessToken = generateAccessToken({ email: email, access: "user" });
    res.status(201).json({ accessToken, name, surname, email, userId });
  } else {
    res.status(401).send("Invalid email or password");
  }
};

const addAdmin = async (req, res, next) => {
  const { email, password, name, surname, accessLevel } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const existingUser = await fetchAdminUserByEmail(email);
  if (existingUser) {
    return res.status(409).send("Admin with this email already exists.");
  }

  const user = await insertAdminUser(
    email,
    hashedPassword,
    name,
    surname,
    accessLevel
  );
  const { adminId } = user;
  res.status(201).json({ name, surname, email, adminId, accessLevel });
};

module.exports = { adminLogin, addAdmin };
