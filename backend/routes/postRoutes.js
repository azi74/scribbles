import express from 'express';
import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
  dislikePost,
  undislikePost,
  sharePost,
} from '../controllers/postController.js';
import { protect } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import advancedResults from '../middleware/advancedResults.js';
import Post from '../models/Post.js';

const router = express.Router();

router
  .route('/')
  .get(
    advancedResults(Post, {
      path: 'author',
      select: 'name avatar',
    }),
    getPosts
  )
  .post(protect, upload.array('media'), createPost);

router
  .route('/:id')
  .get(getPost)
  .put(protect, updatePost)
  .delete(protect, deletePost);

router.route('/:id/like').put(protect, likePost);
router.route('/:id/unlike').put(protect, unlikePost);
router.route('/:id/dislike').put(protect, dislikePost);
router.route('/:id/undislike').put(protect, undislikePost);
router.route('/:id/share').put(protect, sharePost);

// Users posts
router.route('/users/:userId').get(getPosts);

export default router;
