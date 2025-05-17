const express = require('express');
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
} = require('../controllers/userController');
const { protect, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');
const advancedResults = require('../middleware/advancedResults');
const User = require('../models/User');

const router = express.Router();

router.use(protect);
router.use(authorize('admin'));

router
  .route('/')
  .get(advancedResults(User, '-password'), getUsers);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

router.route('/avatar/upload').put(upload.single('avatar'), uploadAvatar);

module.exports = router;