const express = require('express');
const {
  getComments,
  addComment,
  updateComment,
  deleteComment,
  likeComment,
  unlikeComment,
} = require('../controllers/commentController');
const { protect } = require('../middleware/auth');

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

module.exports = router;