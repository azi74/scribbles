import express from 'express';
import {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  uploadAvatar,
} from '../controllers/userController.js';
import { protect, authorize } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import advancedResults from '../middleware/advancedResults.js';
import User from '../models/User.js';

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

export default router;
