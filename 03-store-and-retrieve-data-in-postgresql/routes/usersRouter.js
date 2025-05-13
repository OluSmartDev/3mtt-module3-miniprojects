import express from "express";
import { getUsers, getUser, createUser, updateUser, deleteUser, paramValidator, bodyValidator, bodyValidatorRequired, emailValidator, emailValidatorRequired, integerValidator, integerValidatorRequired } from "../controllers/usersController.js";

const router = express.Router();

router.get('/', getUsers)

router.get('/:id', paramValidator('id'), getUser)

router.post('/', bodyValidatorRequired('name'), emailValidatorRequired('email'), integerValidatorRequired('age'), createUser)

router.put('/:id', bodyValidator('name'), emailValidator('email'), integerValidator('age'), updateUser)

router.delete('/:id', paramValidator('id'), deleteUser)

export default router;