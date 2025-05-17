
import React from 'react';
import { blogPosts } from '../../data/blogPosts';
import BlogCard from '../BlogCard';

interface UserPostsProps {
  userId: string;
}

const UserPosts: React.FC<UserPostsProps> = ({ userId }) => {
  // Normally we'd filter posts by user ID
  // For now we'll just display some posts from our data
  const posts = blogPosts.slice(0, 3);

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No posts yet</h3>
        <p className="text-gray-500">When this user publishes posts, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      {posts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserPosts;
