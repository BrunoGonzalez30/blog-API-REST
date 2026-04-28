import { Router } from "express";
import { getAllPost, getPostById, createPost, updatePost, deletePost } from "../controllers/post.controller.js";

const router = Router();

router.get('/', getAllPost);
router.get('/:id', getPostById);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);

export default router;