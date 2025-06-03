
import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-muted py-12 mt-16">
      <div className="container-blog">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 heading-yellow">Reviews</h3>
            <p className="text-muted-foreground mb-4">
              Your trusted platform for honest reviews and ratings on products, services, and experiences.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 heading-yellow">Navigation</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="nav-link">Home</Link></li>
              <li><Link to="/blog" className="nav-link">Reviews</Link></li>
              <li><Link to="/about" className="nav-link">About</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 heading-yellow">Connect</h4>
            <ul className="space-y-2">
              <li><a href="#" className="nav-link">Twitter</a></li>
              <li><a href="#" className="nav-link">Instagram</a></li>
              <li><a href="#" className="nav-link">LinkedIn</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-muted-foreground">
            &copy; {currentYear} Reviews. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
