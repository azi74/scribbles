
import React from 'react';
import { blogPosts } from '../../data/blogPosts';
import BlogCard from '../BlogCard';

interface UserLikedPostsProps {
  userId: string;
}

const UserLikedPosts: React.FC<UserLikedPostsProps> = ({ userId }) => {
  // Normally we'd fetch liked posts for this user
  // For now we'll just display some posts from our data
  const likedPosts = blogPosts.slice(2, 5);

  if (likedPosts.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">No liked posts yet</h3>
        <p className="text-gray-500">Posts you like will appear here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4">
      {likedPosts.map(post => (
        <BlogCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default UserLikedPosts;
