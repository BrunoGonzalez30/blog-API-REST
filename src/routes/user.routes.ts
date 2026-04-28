import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getPostsByUserId } from "../controllers/user.controller.js";

const router = Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.get('/:id/posts', getPostsByUserId);

export default router;