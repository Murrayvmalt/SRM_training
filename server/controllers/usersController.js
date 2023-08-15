const {
  fetchUserByEmail,
  insertUser,
  removeUser,
  fetchAllUsers,
  insertRegistration,
  modifyRegistrationStatus,
  modifyRegistrationSection,
} = require("../services/usersServices");

const { generateAccessToken } = require("../services/accessTokenServices");

const bcrypt = require("bcrypt");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await fetchUserByEmail(email);
  const { name, surname, userId } = user;

  if (!user) {
    return res.sendStatus(404).send("Invalid email or password");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  if (await bcrypt.compare(password, hashedPassword)) {
    const accessToken = generateAccessToken({ email: email, access: "user" });
    return res.status(201).json({ accessToken, name, surname, email, userId });
  } else {
    return res.status(401).send("Invalid email or password");
  }
};

const signup = async (req, res, next) => {
  const { email, password, name, surname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await fetchUserByEmail(email);
  if (existingUser) {
    return res.status(409).send("User with this email already exists.");
  }

  const user = await insertUser(email, hashedPassword, name, surname);
  const { userId } = user;
  const accessToken = generateAccessToken({ user: user, access: "user" });
  return res.status(201).json({ accessToken, name, surname, email, userId });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  const result = await removeUser(id);
  if (result === 0) {
    res.status(404).send("User not found");
  }
  res.status(204).send();
};

const getAllUsers = async (req, res, next) => {
  const rows = await fetchAllUsers();
  return res.status(201).send(rows);
};

const registerUser = async (req, res, next) => {
  const { userId, courseId, currentStatus, currentSection } = req.body;
  const result = await insertRegistration(
    userId,
    courseId,
    currentStatus,
    currentSection
  );
  return res.status(201).send(result);
};

const editRegistrationStatus = async (req, res, next) => {
  const { registrationId, currentStatus } = req.body;
  const result = await modifyRegistrationStatus(registrationId, currentStatus);

  if (result === 0) {
    return res
      .status(404)
      .send("Registration with the specified ID was not found");
  }

  return res.status(200).send("Registration Status updated successfully");
};

const editRegistrationSection = async (req, res, next) => {
  const { registrationId, currentSection } = req.body;
  const result = await modifyRegistrationSection(
    registrationId,
    currentSection
  );

  if (result === 0) {
    return res
      .status(404)
      .send("Registration with the specified ID was not found");
  }

  return res.status(200).send("Registration Section updated successfully");
};

module.exports = {
  login,
  signup,
  deleteUser,
  getAllUsers,
  registerUser,
  editRegistrationStatus,
  editRegistrationSection,
};
