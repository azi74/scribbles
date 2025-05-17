
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import FeaturedPost from '../components/FeaturedPost';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const Home: React.FC = () => {
  // Get the two latest posts for the featured section
  const featuredPosts = blogPosts.slice(0, 2);
  
  // Get the next 8 posts for the recent posts section
  const recentPosts = blogPosts.slice(2, 10);
  
  // Get the remaining posts for categories sections
  const remainingPosts = blogPosts.slice(10);
  
  // Get unique categories
  const categories = [...new Set(remainingPosts.map(post => post.category))];
  
  return (
    <Layout>
      <section className="container-blog py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Thoughts, stories and ideas
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-2xl">
          Welcome to Shadow Scribbles, a blog exploring design, development, and the creative process.
        </p>
        
        {/* Featured Posts - Two side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {featuredPosts.map(post => (
            <div key={post.id} className="w-full">
              <FeaturedPost post={post} />
            </div>
          ))}
        </div>
        
        {/* Recent Posts - Responsive grid with 4 posts per row on large screens */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Recent Articles</h2>
            <Link to="/blog" className="text-blog-black font-medium hover:underline">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
        
        {/* Categories Sections */}
        {categories.slice(0, 2).map(category => (
          <div key={category} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold">{category}</h2>
              <Link 
                to={`/blog?category=${category}`} 
                className="text-blog-black font-medium hover:underline"
              >
                More in {category}
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {remainingPosts
                .filter(post => post.category === category)
                .slice(0, 3)
                .map(post => (
                  <BlogCard key={post.id} post={post} />
                ))
              }
            </div>
          </div>
        ))}
        
        {/* CTA Section */}
        <div className="bg-blog-lightgray rounded-lg p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Never miss a new post
          </h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter to get notified about new content, features, and updates.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-lg mb-3 sm:mb-0 sm:mr-2 flex-grow border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blog-black"
            />
            <button className="bg-blog-black text-blog-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
