import express from 'express';
import { getPosts, createPost, updatePost, deletePost } from '../controllers/posts.js'
import auth from '../middleware/auth.js';

const router = express.Router();

//http://localhost.:5000/posts

router.get('/', getPosts); 
router.post('/', auth, createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;