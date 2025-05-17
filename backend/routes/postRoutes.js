const express = require('express');
const {
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
} = require('../controllers/postController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const advancedResults = require('../middleware/advancedResults');
const Post = require('../models/Post');

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

module.exports = router;