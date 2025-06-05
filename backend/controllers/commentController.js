import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/async.js';

// @desc    Get comments for a post
// @route   GET /api/v1/posts/:postId/comments
// @access  Public
export const getComments = asyncHandler(async (req, res, next) => {
  const comments = await Comment.find({ post: req.params.postId })
    .populate('user', 'name avatar')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: comments.length,
    data: comments,
  });
});

// @desc    Add comment to a post
// @route   POST /api/v1/posts/:postId/comments
// @access  Private
export const addComment = asyncHandler(async (req, res, next) => {
  req.body.post = req.params.postId;
  req.body.user = req.user.id;

  const post = await Post.findById(req.params.postId);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.postId}`, 404)
    );
  }

  const comment = await Comment.create(req.body);

  res.status(201).json({
    success: true,
    data: comment,
  });
});

// @desc    Update comment
// @route   PUT /api/v1/comments/:id
// @access  Private
export const updateComment = asyncHandler(async (req, res, next) => {
  let comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    );
  }

  if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this comment`,
        401
      )
    );
  }

  comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    Delete comment
// @route   DELETE /api/v1/comments/:id
// @access  Private
export const deleteComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    );
  }

  if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this comment`,
        401
      )
    );
  }

  await comment.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Like a comment
// @route   PUT /api/v1/comments/:id/like
// @access  Private
export const likeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    );
  }

  if (comment.likes.includes(req.user.id)) {
    return next(new ErrorResponse('You have already liked this comment', 400));
  }

  comment.likes.push(req.user.id);
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});

// @desc    Unlike a comment
// @route   PUT /api/v1/comments/:id/unlike
// @access  Private
export const unlikeComment = asyncHandler(async (req, res, next) => {
  const comment = await Comment.findById(req.params.id);

  if (!comment) {
    return next(
      new ErrorResponse(`Comment not found with id of ${req.params.id}`, 404)
    );
  }

  if (!comment.likes.includes(req.user.id)) {
    return next(new ErrorResponse('You have not liked this comment', 400));
  }

  comment.likes = comment.likes.filter(
    (id) => id.toString() !== req.user.id.toString()
  );
  await comment.save();

  res.status(200).json({
    success: true,
    data: comment,
  });
});
