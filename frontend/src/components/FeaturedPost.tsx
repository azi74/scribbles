
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { BlogPost } from '../types/blog';

interface FeaturedPostProps {
  post: BlogPost;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <article className="relative overflow-hidden rounded-lg h-[500px] group">
      <div className="absolute inset-0">
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
      </div>
      
      <div className="relative h-full flex flex-col justify-end p-8">
        <div className="flex items-center text-sm text-blog-lightgray mb-3">
          <Calendar size={16} className="mr-1" />
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</time>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{post.title}</h2>
        <p className="text-blog-lightgray mb-6 max-w-2xl">{post.excerpt}</p>
        <Link 
          to={`/blog/${post.slug}`}
          className="inline-flex items-center px-4 py-2 bg-blog-white text-blog-black font-medium rounded hover:bg-blog-lightgray transition-colors"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
};

export default FeaturedPost;
