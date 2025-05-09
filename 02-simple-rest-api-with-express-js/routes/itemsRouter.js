import express from "express";
import { getItems, getItem, createItem, updateItem, deleteItem, paramValidator, bodyValidator } from "../controllers/itemsController.js";

const router = express.Router();

router.get('/', getItems)

router.get('/:id', paramValidator('id'), getItem)

router.post('/', bodyValidator('name'), bodyValidator('description'), createItem)

router.put('/:id', paramValidator('id'), bodyValidator('name'), bodyValidator('description'), updateItem)

router.delete('/:id', paramValidator('id'), deleteItem)

export default router;