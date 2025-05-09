import {v4 as uuidv4} from 'uuid';
import {param, body, validationResult} from 'express-validator';

// --- Helper function to validate param using express-validator ---
export const paramValidator = (propertyName) => {
    return param(propertyName).isUUID().withMessage(`Invalid item ${propertyName}`);
}

// --- Helper function to to validate body inputs using express-validator ---
export const bodyValidator = (propertyName) => {
    return body(propertyName).notEmpty().withMessage(`${propertyName} is required`).isString().trim().escape();
}

// --- Helper function to handle errors ---
const handleError = (res, status, message, details = null) => {
    console.error(`HTTP ${status} - ${message}`, details || '');
    return res.status(status).json({ error: message, details });
  };

// --- Instantiate in-memory data store for items as an empty array ---
let items = [];

// --- Retrieve all items ---
export const getItems = (req, res) => {
    res.json(items);
}

// --- Retrieve a single item by ID ---
export const getItem = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return handleError(res, 400, 'Invalid request parameters', errors.array());
    }

    const { id } = req.params;

    const foundItem = items.find((item) => item.id === id);

    if (foundItem) {
        res.json(foundItem);
    } else {
        handleError(res, 404, "Item not found");
    }
}

// --- Create a new item ---
export const createItem = (req, res) => {
    
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return handleError(res, 400, 'Invalid request body', errors.array());
    }

    const item = {id: uuidv4(), ...req.body};

    try {
        items.push(item);
        res.status(201).json({"message": `An item named ${item.name} was created successfully`})
        console.log(item);
    } catch (error) {
        handleError(res, 500, 'Failed to create item', error.message);
    }
}

// --- Update an item by ID ---
export const updateItem = (req, res) => {
    const paramErrors = validationResult(req);
    if (!paramErrors.isEmpty()) {
        return handleError(res, 400, 'Invalid request parameters', paramErrors.array());
    }

    const bodyErrors = validationResult(req);
    if (!bodyErrors.isEmpty()) {
        return handleError(res, 400, 'Invalid request body', bodyErrors.array());
    }

    const { id } = req.params;
    const {name, description } = req.body;
    const itemIndex = items.findIndex(item => item.id === id);

    if (itemIndex !== -1) {
        try {
        items[itemIndex] = { id, name, description };
        res.json(items[itemIndex]);
        } catch (error) {
        handleError(res, 500, 'Failed to update item', error.message);
        }
    } else {
        handleError(res, 404, 'Item not found');
    }
}

// --- Delete an item by ID---
export const deleteItem = (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return handleError(res, 400, 'Invalid request parameters');
    }

    const { id } = req.params;

    const foundItem = items.find((item) => item.id === id);

    if (!foundItem) {
        return handleError(res, 404, "Item not found");
    }

    items = items.filter((item) => item.id !== id);

    res.json({"message": `item with ID ${id} has been successfuly deleted`});    
}