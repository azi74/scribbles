
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import FeaturedPost from '../components/FeaturedPost';
import BlogCard from '../components/BlogCard';
import { blogPosts } from '../data/blogPosts';

const Home: React.FC = () => {
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  
  // Get the three latest posts for the featured section
  const featuredPosts = blogPosts.slice(0, 3);
  
  // Get unique genres from blog posts
  const genres = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];
  
  // Filter posts by genre for the latest reviews section
  const filteredPosts = selectedGenre === 'All' 
    ? blogPosts.slice(3, 11) 
    : blogPosts.filter(post => post.category === selectedGenre).slice(0, 8);
  
  // Get the remaining posts for categories sections
  const remainingPosts = blogPosts.slice(11);
  
  // Get unique categories for the bottom sections
  const categories = [...new Set(remainingPosts.map(post => post.category))];
  
  return (
    <Layout>
      <section className="container-blog py-8 md:py-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 heading-yellow">
          Honest Reviews, Trusted Opinions
        </h1>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl">
          Welcome to Reviews, your go-to platform for comprehensive reviews on products, services, and experiences from real users.
        </p>
        
        {/* Featured Posts - Three side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {featuredPosts.map(post => (
            <div key={post.id} className="w-full">
              <FeaturedPost post={post} />
            </div>
          ))}
        </div>
        
        {/* Latest Reviews with Genre Filter */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold heading-yellow">Latest Reviews</h2>
            <Link to="/blog" className="text-primary font-medium hover:underline">
              View All
            </Link>
          </div>
          
          {/* Genre Filter Bar */}
          <div className="mb-8 flex flex-wrap gap-2">
            {genres.map(genre => (
              <button
                key={genre}
                className={`px-6 py-3 rounded-2xl text-sm font-medium transition-all duration-200 hover:scale-105 ${
                  selectedGenre === genre
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
                onClick={() => setSelectedGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPosts.map(post => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Empty State for Genre Filter */}
          {filteredPosts.length === 0 && selectedGenre !== 'All' && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2 heading-yellow">No reviews found</h3>
              <p className="text-muted-foreground">
                No reviews in the {selectedGenre} category yet. Check back soon!
              </p>
            </div>
          )}
        </div>
        
        {/* Categories Sections */}
        {categories.slice(0, 2).map(category => (
          <div key={category} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold heading-yellow">{category} Reviews</h2>
              <Link 
                to={`/blog?category=${category}`} 
                className="text-primary font-medium hover:underline"
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
        <div className="bg-accent rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 heading-yellow">
            Never miss a new review
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Subscribe to our newsletter to get notified about new reviews, ratings, and trusted recommendations.
          </p>
          <div className="flex flex-col sm:flex-row max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-3 rounded-2xl mb-3 sm:mb-0 sm:mr-2 flex-grow border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-medium hover:bg-primary/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
