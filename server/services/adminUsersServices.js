const pool = require("./dbServices");

const fetchAllAdminUsers = async () => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM admin_users`
  );
  return rows;
};

const fetchAdminUserById = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM admin_users 
        WHERE adminId = ?`,
    [id]
  );
  return rows[0];
};

const fetchAdminUserByEmail = async (email) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM admin_users 
        WHERE email = ?`,
    [email]
  );
  return rows.length === 0 ? null : rows[0];
};

const insertAdminUser = async (email, password, name, surname, accessLevel) => {
  const [result] = await pool.query(
    `INSERT INTO admin_users (email, password, name, surname, accessLevel)
      VALUES (?, ?, ?, ?, ?)`,
    [email, password, name, surname, accessLevel]
  );
  const id = result.insertId;
  return await fetchAdminUserById(id);
};

const removeAdminUsers = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM admin_users
         WHERE adminId = ?;`,
    [id]
  );

  if (result.affectedRows === 0) {
    throw new Error(`Admin with ID ${id} not found.`);
  }

  return `Admin with ID ${id} has been deleted.`;
};

module.exports = { fetchAdminUserByEmail, insertAdminUser };
