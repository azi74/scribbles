
import React, { useState } from 'react';
import Layout from '../components/Layout';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  
  // Get unique categories
  const categories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);
  
  return (
    <Layout>
      <section className="container-blog py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-yellow">Reviews</h1>
        <p className="text-xl text-muted-foreground mb-12 max-w-2xl">
          Explore our comprehensive reviews and ratings on products, services, and experiences.
        </p>
        
        {/* Category Filter */}
        <div className="mb-12 flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
        
        {/* Empty State */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2 heading-yellow">No reviews found</h3>
            <p className="text-muted-foreground">
              No reviews in the {selectedCategory} category yet. Check back soon!
            </p>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default Blog;
