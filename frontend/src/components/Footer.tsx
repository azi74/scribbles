
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-blog-lightgray py-12 mt-16">
      <div className="container-blog">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4">Shadow Scribbles</h3>
            <p className="text-gray-600 mb-4">
              A minimalist blog focused on thoughtful content and clean design.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/blog" className="nav-link">Blog</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="nav-link">Twitter</a></li>
              <li><a href="#" className="nav-link">Instagram</a></li>
              <li><a href="#" className="nav-link">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-blog-mediumgray mt-8 pt-8 text-center">
          <p className="text-gray-600">
            &copy; {currentYear} Shadow Scribbles. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
