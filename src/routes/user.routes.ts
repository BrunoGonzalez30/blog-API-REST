import { Router } from "express";
import { getAllUsers, getUserById, createUser, updateUser, deleteUser, getPostsByUserId } from "../controllers/user.controller.js";
import { roleMiddleware } from "../middlewares/role.middleware.js";

const router = Router();

router.get('/', roleMiddleware('ADMIN'), getAllUsers);
router.get('/:id', roleMiddleware('ADMIN'), getUserById);
router.put('/:id', roleMiddleware('ADMIN'), updateUser);
router.delete('/:id', roleMiddleware('ADMIN'), deleteUser);
router.get('/:id/posts', getPostsByUserId);

export default router;