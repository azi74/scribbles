import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please enter post title'],
    maxlength: [100, 'Title cannot exceed 100 characters'],
    minlength: [5, 'Title should have at least 5 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please enter post content'],
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  videos: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  audio: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  dislikes: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  tags: {
    type: [String],
    default: [],
  },
  shareCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model('Post', postSchema);
