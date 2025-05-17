
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ThumbsUp, ThumbsDown, MessageSquare } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  return (
    <article className="blog-card group dark:bg-blog-dark-card dark:border-gray-800">
      <Link to={`/blog/${post.slug}`}>
        <img 
          src={post.coverImage} 
          alt={post.title} 
          className="w-full h-56 object-cover"
        />
      </Link>
      <div className="p-6 relative">
        <div className="flex items-center text-sm text-gray-500 dark:text-blog-dark-muted mb-3">
          <Calendar size={16} className="mr-1" />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</time>
        </div>
        <h3 className="text-xl font-bold mb-2 dark:text-blog-dark-text">
          <Link to={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </h3>
        <p className="text-gray-600 dark:text-blog-dark-muted mb-4">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.slug}`} 
          className="inline-flex items-center text-blog-black dark:text-blog-dark-text font-medium hover:underline"
        >
          Read More
        </Link>
        
        {/* Stats overlay on hover */}
        <div className="absolute bottom-4 right-4 flex items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center text-gray-500 dark:text-blog-dark-muted">
            <ThumbsUp size={16} className="mr-1" />
            <span>{post.likes || 0}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-blog-dark-muted">
            <ThumbsDown size={16} className="mr-1" />
            <span>{post.dislikes || 0}</span>
          </div>
          <div className="flex items-center text-gray-500 dark:text-blog-dark-muted">
            <MessageSquare size={16} className="mr-1" />
            <span>{post.comments?.length || 0}</span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
