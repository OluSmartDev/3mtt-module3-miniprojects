import { con } from "../index.js"

// --- Helper function to handle errors ---
const handleError = (res, status, message, details = null) => {
    console.error(`HTTP ${status} - ${message}`, details || '');
    return res.status(status).json({ error: message, details });
  };

// --- Retrieve all Users ---
export const getUsers = async (req, res) => {

    try {
        const fetch_query = "SELECT * FROM users"
        const result = await con.query(fetch_query);

        if (result.rows.length === 0) {
        return res.json({"message": "No user is found. The table is empty!"});
        }

        res.json(result.rows);

    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send(err.message || "An error occurred while fetching the users.");
    }
}

// --- Retrieve a single User by ID ---
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const fetch_query = `SELECT * FROM users WHERE id = $1`;
    const result = await con.query(fetch_query, [id]);

    // Check if the user with the given ID exists
    if (result.rows.length === 0) {
      return handleError(res, 404, `User with ID ${id} not found`);
    }

    res.json(result.rows);
    
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send(err.message || "An error occurred while fetching the user.");
  }
};

// --- Create a new User ---
export const createUser = async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const insert_query = "INSERT INTO users (name, email, age) VALUES ($1, $2, $3)";
    const result = await con.query(insert_query, [name, email, age]);
    res.json(result.rows);
    console.log("New User Added to Database Successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || "An error occurred while adding the user.");
  }
};

// --- Update a User by ID ---
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age } = req.body;

    // Check if the user with the given ID exists
    const check_query = "SELECT id FROM users WHERE id = $1";
    const check_result = await con.query(check_query, [id]);

    if (check_result.rows.length === 0) {
      return res.status(404).send(`User with ID ${id} not found.`);
    }

    // avoid situations where fields that are not updated (i.e. undefined) are automatically given null values in the database
    const updates = [];
    const values = [];
    let paramCount = 1;

    if (name !== undefined) {
      updates.push(`name = $${paramCount++}`);
      values.push(name);
    }
    if (email !== undefined) {
      updates.push(`email = $${paramCount++}`);
      values.push(email);
    }
    if (age !== undefined) {
      updates.push(`age = $${paramCount++}`);
      values.push(age);
    }

    if (updates.length === 0) {
      return res.status(400).send("At least one field (name, email, or age) must be provided for update.");
    }

    const update_query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount}`;
    values.push(id);
    const result = await con.query(update_query, values);

    console.log(result);
    res.send("Database updated successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || "An error occurred while updating the user.");
  }
};

// --- Delete a User by ID---
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the user with the given ID exists
    const check_query = "SELECT id FROM users WHERE id = $1";
    const check_result = await con.query(check_query, [id]);

    if (check_result.rows.length === 0) {
      return res.status(404).send(`User with ID ${id} not found.`);
    }
    
    const delete_query = `DELETE FROM users WHERE id = $1`;
    const result = await con.query(delete_query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: `User with ID ${id} not found.` });
    }

    console.log(result);
    res.json({ message: `User with ID ${id} has been successfully deleted` });
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || "An error occurred while deleting the user.");
  }
};