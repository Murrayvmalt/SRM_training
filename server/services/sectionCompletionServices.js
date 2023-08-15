const fetchSectionsCompletionByUserId = async (id) => {
  const [rows] = await pool.query(
    `SELECT * 
        FROM section_completion 
        WHERE user_id = ?`,
    [id]
  );
  return rows;
};

const insertSectionCompletion = async ({
  userId,
  sectionId,
  completionDate,
}) => {
  const [result] = await pool.query(
    `INSERT INTO section_completion (user_id, section_id, completion_date)
      VALUES (?, ?, ?);`,
    [userId, sectionId, completionDate]
  );
  const id = result.insertId;
  return fetchUsersById(id);
};

const removeSectionComplete = async (id) => {
  const [result] = await pool.query(
    `DELETE FROM section_completion
         WHERE completion_id = ?;`,
    [id]
  );

  if (result.affectedRows === 0) {
    throw new Error(`Section Complete with ID ${id} not found.`);
  }

  return `Section Complete with ID ${id} has been deleted.`;
};
