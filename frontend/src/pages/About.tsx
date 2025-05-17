
import React from 'react';
import Layout from '../components/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container-blog py-8 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About Shadow Scribbles</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            Shadow Scribbles is dedicated to exploring the intersection of design, technology, and creativity. 
            Our mission is to provide thoughtful, in-depth content that inspires and educates our readers.
          </p>
          <p className="text-gray-600">
            We believe in the power of clean, minimalist design and the importance of focusing on what truly matters. 
            Our blog reflects this philosophy both in its content and its presentation.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Shadow Scribbles began as a personal project in 2023, born from a passion for design and a desire to share 
            ideas with a broader community. What started as a collection of thoughts has grown into a platform where 
            designers, developers, and content creators can find inspiration and practical insights.
          </p>
          <p className="text-gray-600">
            Our name, "Shadow Scribbles," reflects our approach to content creation – finding meaning and beauty in 
            the space between light and dark, the known and unknown, the straightforward and the complex.
          </p>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What We Cover</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blog-lightgray p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Design</h3>
              <p className="text-gray-600">
                From typography to color theory, user experience to visual aesthetics, we explore all aspects of design 
                with a focus on minimalism and functionality.
              </p>
            </div>
            
            <div className="bg-blog-lightgray p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Development</h3>
              <p className="text-gray-600">
                We dive into web technologies, coding practices, and development approaches that help bring designs to life 
                with efficiency and elegance.
              </p>
            </div>
            
            <div className="bg-blog-lightgray p-6 rounded-lg">
              <h3 className="text-xl font-bold mb-3">Content Strategy</h3>
              <p className="text-gray-600">
                Creating meaningful content requires strategy. We share insights on effective communication, 
                storytelling, and building connections with audiences.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Our Team</h2>
          <p className="text-gray-600 mb-8">
            Shadow Scribbles is brought to you by a team of passionate creators who believe in the power of 
            thoughtful design and meaningful content.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330" 
                alt="Alex Morgan"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
              />
              <h3 className="text-xl font-bold">Alex Morgan</h3>
              <p className="text-gray-600">Founder & Design Lead</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d" 
                alt="Jordan Lee"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
              />
              <h3 className="text-xl font-bold">Jordan Lee</h3>
              <p className="text-gray-600">Content Strategist</p>
            </div>
            
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e" 
                alt="Taylor Rivers"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover" 
              />
              <h3 className="text-xl font-bold">Taylor Rivers</h3>
              <p className="text-gray-600">Development Lead</p>
            </div>
          </div>
        </section>
        
        <section>
          <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600 mb-8">
            We'd love to hear from you! Whether you have a question, suggestion, or just want to say hello, 
            feel free to get in touch.
          </p>
          
          <form className="max-w-lg">
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
              <input 
                type="text" 
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-black" 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input 
                type="email" 
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-black" 
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
              <textarea 
                id="message"
                rows={5}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blog-black" 
              ></textarea>
            </div>
            
            <button 
              type="submit"
              className="px-6 py-3 bg-blog-black text-blog-white rounded-md font-medium hover:bg-gray-800 transition-colors"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default About;
