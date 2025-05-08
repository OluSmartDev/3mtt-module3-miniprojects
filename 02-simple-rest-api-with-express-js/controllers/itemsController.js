import {v4 as uuidv4} from 'uuid';
import {param, body, validationResult} from 'express-validator';

let items = [];

// --- Helper function to handle errors ---
const handleError = (res, status, message, details = null) => {
    console.error(`HTTP ${status} - ${message}`, details || '');
    return res.status(status).json({ error: message, details });
  };

export const getItems = (req, res) => {
    res.json(items);
}

export const getItem = () => {}

export const createItem = (req, res) => {
    const item = {id: uuidv4(), ...req.body};
    console.log(item);
    items.push(item);
    res.status(200).send("Item created successfully")
}

export const updateItem = () => {}

export const deleteItem = () => {}
