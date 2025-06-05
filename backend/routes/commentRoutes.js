import express from 'express';
import {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
} from '../controllers/commentController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router
  .route('/')
  .get(getComments)
  .post(protect, addComment);

router
  .route('/:id')
  .put(protect, updateComment)
  .delete(protect, deleteComment);

router.route('/:id/like').put(protect, likeComment);
router.route('/:id/unlike').put(protect, unlikeComment);

export default router;
