import { con } from "../utils/dbconnect.js"; //import database client
import {param, body, validationResult} from 'express-validator';

// --- Helper function to validate param using express-validator ---
export const paramValidator = (propertyName) => {
  return param(propertyName).isInt({ min: 1 }).withMessage(`${propertyName} must be a positive integer`);
}

// --- Helper function to to validate optional body inputs using express-validator ---
export const bodyValidator = (propertyName) => {
  return body(propertyName).isString().trim().escape();
}

// --- Helper function to to validate required body inputs using express-validator ---
export const bodyValidatorRequired = (propertyName) => {
  return body(propertyName).notEmpty().withMessage(`${propertyName} is required`).isString().trim().escape();
}

// --- Helper function to validate positive integers using express-validator ---
export const integerValidator = (propertyName) => {
  return body(propertyName).isInt({ min: 1 }).withMessage(`${propertyName} must be a positive integer`);
}

// --- Helper function to validate required positive integers using express-validator ---
export const integerValidatorRequired = (propertyName) => {
  return body(propertyName).notEmpty().withMessage(`${propertyName} is required`).isInt({ min: 1 }).withMessage(`${propertyName} must be a positive integer`);
}

// --- Helper function to validate email addresses using express-validator ---
export const emailValidator = (propertyName) => {
  return body(propertyName).notEmpty().withMessage(`${propertyName} is required`).isEmail().withMessage(`Invalid ${propertyName} format`).trim().normalizeEmail();
}

// --- Helper function to validate required email addresses using express-validator ---
export const emailValidatorRequired = (propertyName) => {
  return body(propertyName).notEmpty().withMessage(`${propertyName} is required`).isEmail().withMessage(`Invalid ${propertyName} format`).trim().normalizeEmail();
}

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

        // Check if no users are found 
        if (result.rows.length === 0) {
        return handleError(res, 404, "No user is found. The table is empty!");
        }

        console.log(`All Users retrieved successfully`);
        res.status(200).json(result.rows);

    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).send(err.message || "An error occurred while fetching the users.");
    }
}

// --- Retrieve a single User by ID ---
export const getUser = async (req, res) => {
    const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
          return handleError(res, 400, 'Invalid request parameters', errors.array());
      }

   try {
    const { id } = req.params;
    const fetch_query = `SELECT * FROM users WHERE id = $1`;
    const result = await con.query(fetch_query, [id]);

    // Check if the user with the given ID exists
    if (result.rows.length === 0) {
      return handleError(res, 404, `User with ID ${id} not found`);
    }

    console.log(`Single User retrieved successfully`);
    res.status(200).json(result.rows);
    
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).send(err.message || "An error occurred while fetching the user.");
  }
};

// --- Create a new User ---
export const createUser = async (req, res) => {
 
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
      return handleError(res, 400, 'Invalid request body', errors.array());
  }

  try {
    const { name, email, age } = req.body;
    const insert_query = `INSERT INTO users (name, email, age) VALUES ($1, $2, $3) RETURNING *`;
    const result = await con.query(insert_query, [name, email, age]);

    console.log("New User Added to Database Successfully");
    res.status(201).json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || "An error occurred while adding the user.");
  }
};

// --- Update a User by ID ---
export const updateUser = async (req, res) => {
  try {

    const paramErrors = validationResult(req);
    if (!paramErrors.isEmpty()) {
        return handleError(res, 400, 'Invalid request parameters', paramErrors.array());
    }

    const bodyErrors = validationResult(req);
    if (!bodyErrors.isEmpty()) {
        return handleError(res, 400, 'Invalid request body', bodyErrors.array());
    }

    const { id } = req.params;
    if (req.body === undefined) {
       return handleError(res, 500, `request body cannot be undefined`);
    }

    const { name, email, age } = req.body;

    // Check if the user with the given ID exists
    const check_query = "SELECT id FROM users WHERE id = $1";
    const check_result = await con.query(check_query, [id]);

    if (check_result.rows.length === 0) {
      return handleError(res, 404, `User with ID ${id} not found`);
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
      return handleError(res, 404, "At least one field (name, email, or age) must be provided for update.");
    }

    const update_query = `UPDATE users SET ${updates.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    values.push(id);
    const result = await con.query(update_query, values);

    console.log("Database updated successfully!");
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || "An error occurred while updating the user.");
  }
};

// --- Delete a User by ID---
export const deleteUser = async (req, res) => {

  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
      return handleError(res, 400, 'Invalid request parameters');
  }

  try {
    const { id } = req.params;

    // Check if the user with the given ID exists
    const check_query = "SELECT id FROM users WHERE id = $1";
    const check_result = await con.query(check_query, [id]);

    if (check_result.rows.length === 0) {
      return handleError(res, 404, `User with ID ${id} not found`);
    }
    
    const delete_query = `DELETE FROM users WHERE id = $1`;
    const result = await con.query(delete_query, [id]);

    console.log(`User with ID ${id} has been successfully deleted`);
    res.json({ message: `User with ID ${id} has been successfully deleted` });

  } catch (err) {
    console.error(err);
    res.status(500).send(err.message || "An error occurred while deleting the user.");
  }
};