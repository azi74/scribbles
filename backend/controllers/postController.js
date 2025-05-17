const Post = require('../models/Post');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all posts
// @route   GET /api/v1/posts
// @route   GET /api/v1/users/:userId/posts
// @access  Public
exports.getPosts = asyncHandler(async (req, res, next) => {
  if (req.params.userId) {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'name avatar')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get single post
// @route   GET /api/v1/posts/:id
// @access  Public
exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id).populate(
    'author',
    'name avatar bio'
  );

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Create new post
// @route   POST /api/v1/posts
// @access  Private
exports.createPost = asyncHandler(async (req, res, next) => {
  // Add user to req.body
  req.body.author = req.user.id;

  const post = await Post.create(req.body);

  res.status(201).json({
    success: true,
    data: post,
  });
});

// @desc    Update post
// @route   PUT /api/v1/posts/:id
// @access  Private
exports.updatePost = asyncHandler(async (req, res, next) => {
  let post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is post owner or admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this post`,
        401
      )
    );
  }

  post = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Delete post
// @route   DELETE /api/v1/posts/:id
// @access  Private
exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is post owner or admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this post`,
        401
      )
    );
  }

  await post.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});

// @desc    Like a post
// @route   PUT /api/v1/posts/:id/like
// @access  Private
exports.likePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if the user has already liked the post
  if (post.likes.includes(req.user.id)) {
    return next(new ErrorResponse('You have already liked this post', 400));
  }

  // Check if the user has disliked the post and remove it
  if (post.dislikes.includes(req.user.id)) {
    post.dislikes = post.dislikes.filter(
      (id) => id.toString() !== req.user.id.toString()
    );
  }

  post.likes.push(req.user.id);
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Unlike a post
// @route   PUT /api/v1/posts/:id/unlike
// @access  Private
exports.unlikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if the user has liked the post
  if (!post.likes.includes(req.user.id)) {
    return next(new ErrorResponse('You have not liked this post', 400));
  }

  post.likes = post.likes.filter(
    (id) => id.toString() !== req.user.id.toString()
  );
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Dislike a post
// @route   PUT /api/v1/posts/:id/dislike
// @access  Private
exports.dislikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if the user has already disliked the post
  if (post.dislikes.includes(req.user.id)) {
    return next(new ErrorResponse('You have already disliked this post', 400));
  }

  // Check if the user has liked the post and remove it
  if (post.likes.includes(req.user.id)) {
    post.likes = post.likes.filter(
      (id) => id.toString() !== req.user.id.toString()
    );
  }

  post.dislikes.push(req.user.id);
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Undislike a post
// @route   PUT /api/v1/posts/:id/undislike
// @access  Private
exports.undislikePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  // Check if the user has disliked the post
  if (!post.dislikes.includes(req.user.id)) {
    return next(new ErrorResponse('You have not disliked this post', 400));
  }

  post.dislikes = post.dislikes.filter(
    (id) => id.toString() !== req.user.id.toString()
  );
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});

// @desc    Share a post
// @route   PUT /api/v1/posts/:id/share
// @access  Private
exports.sharePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    return next(
      new ErrorResponse(`Post not found with id of ${req.params.id}`, 404)
    );
  }

  post.shareCount += 1;
  await post.save();

  res.status(200).json({
    success: true,
    data: post,
  });
});