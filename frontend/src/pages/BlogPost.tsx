
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import Layout from '../components/Layout';
import { blogPosts } from '../data/blogPosts';
import PostActions from '../components/post/PostActions';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the post by slug
  const post = blogPosts.find(post => post.slug === slug);
  
  // If post not found, show error
  if (!post) {
    return (
      <Layout>
        <div className="container-blog py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="mb-6">Sorry, the post you're looking for doesn't exist.</p>
          <Link 
            to="/blog" 
            className="inline-flex items-center px-4 py-2 bg-blog-black text-blog-white rounded-lg"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Blog
          </Link>
        </div>
      </Layout>
    );
  }
  
  // Format date
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  // Get related posts (same category, exclude current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 3);
  
  return (
    <Layout>
      <article className="container-blog py-8 md:py-16 max-w-4xl mx-auto">
        {/* Back to blog link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center text-gray-600 hover:text-blog-black mb-8"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to Blog
        </Link>
        
        {/* Post header */}
        <header className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 font-serif">{post.title}</h1>
          
          <div className="flex flex-wrap items-center text-gray-600 gap-4">
            <div className="flex items-center">
              <Calendar size={16} className="mr-1" />
              <time dateTime={post.date}>{formattedDate}</time>
            </div>
            
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <Link to={`/profile/1`} className="hover:underline">
                {post.author.name}
              </Link>
            </div>
            
            <div className="bg-blog-lightgray px-3 py-1 rounded-full text-sm">
              {post.category}
            </div>
          </div>
        </header>
        
        {/* Featured image */}
        <div className="mb-8 md:mb-12">
          <img 
            src={post.coverImage} 
            alt={post.title}
            className="w-full h-auto rounded-lg shadow-md" 
          />
        </div>
        
        {/* Post actions (likes, comments, etc.) */}
        <PostActions 
          postId={post.id} 
          postTitle={post.title} 
          likesCount={Math.floor(Math.random() * 50)}
          dislikesCount={Math.floor(Math.random() * 10)}
          commentsCount={Math.floor(Math.random() * 20)}
        />
        
        {/* Post content - improve typography for readability */}
        <div 
          className="prose prose-lg max-w-none dark:prose-invert mt-8 mb-12 mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Author section */}
        <div className="border-t border-b border-blog-lightgray2 dark:border-gray-700 py-8 my-12">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Link to={`/profile/1`}>
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-white dark:border-gray-800 shadow-md" 
              />
            </Link>
            <div>
              <h3 className="text-xl font-bold mb-2">
                <Link to={`/profile/1`} className="hover:underline">
                  {post.author.name}
                </Link>
              </h3>
              <p className="text-gray-600 dark:text-gray-300">{post.author.bio}</p>
            </div>
          </div>
        </div>
        
        {/* Related posts section */}
        {relatedPosts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 font-serif">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map(relatedPost => (
                <div key={relatedPost.id} className="blog-card hover-lift hover-shadow">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <img 
                      src={relatedPost.coverImage} 
                      alt={relatedPost.title}
                      className="w-full h-48 object-cover" 
                    />
                  </Link>
                  <div className="p-4">
                    <h3 className="font-bold mb-2 font-serif">
                      <Link 
                        to={`/blog/${relatedPost.slug}`}
                        className="hover:underline"
                      >
                        {relatedPost.title}
                      </Link>
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      <time dateTime={relatedPost.date}>
                        {new Date(relatedPost.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </time>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </article>
    </Layout>
  );
};

export default BlogPost;
