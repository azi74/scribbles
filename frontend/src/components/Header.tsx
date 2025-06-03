
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Image, File, Film, Headphones } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AuthModal from './auth/AuthModal';
import NewPostModal from './post/NewPostModal';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const user = {
    name: 'Alex Morgan',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    id: '1'
  };
  
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      
      setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      
      setPrevScrollPos(currentScrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);
  
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <>
      <header className={`border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-10 transition-transform duration-300 ${visible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="w-full px-4 md:px-8 lg:px-12 py-5">
          <div className="flex items-center justify-between">
            <Link to="/" className="text-2xl font-bold heading-yellow">Reviews</Link>
            
            <button 
              className="md:hidden text-foreground"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="nav-link font-medium">Home</Link>
              <Link to="/blog" className="nav-link font-medium">Reviews</Link>
              <Link to="/about" className="nav-link font-medium">About</Link>
              <ThemeToggle />
              
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-auto hover:bg-transparent">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <Link to={`/profile/${user.id}`}>
                      <DropdownMenuItem>
                        <User size={16} className="mr-2" />
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={() => setIsNewPostModalOpen(true)}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M12 5v14M5 12h14"/>
                      </svg>
                      New Review
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut size={16} className="mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button onClick={() => setIsAuthModalOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Sign In
                </Button>
              )}
            </nav>
          </div>
          
          {isMenuOpen && (
            <nav className="md:hidden py-4 flex flex-col space-y-4 animate-fade-in">
              <Link 
                to="/" 
                className="nav-link font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/blog" 
                className="nav-link font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Reviews
              </Link>
              <Link 
                to="/about" 
                className="nav-link font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              
              {isLoggedIn ? (
                <>
                  <Link 
                    to={`/profile/${user.id}`}
                    className="nav-link font-medium flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User size={16} className="mr-2" />
                    Profile
                  </Link>
                  <button 
                    className="nav-link font-medium flex items-center"
                    onClick={() => {
                      setIsMenuOpen(false);
                      setIsNewPostModalOpen(true);
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M12 5v14M5 12h14"/>
                    </svg>
                    New Review
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="nav-link font-medium flex items-center"
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Button 
                  onClick={() => {
                    setIsAuthModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Sign In
                </Button>
              )}
            </nav>
          )}
        </div>
      </header>
      
      {/* Demo login toggle */}
      <div className="fixed bottom-4 left-4 bg-card text-card-foreground p-2 rounded-md z-50 shadow-sm border border-border">
        <button 
          onClick={toggleLoginState} 
          className="text-sm hover:bg-accent hover:text-accent-foreground px-2 py-1 rounded"
        >
          {isLoggedIn ? "Switch to Logged Out" : "Switch to Logged In"}
        </button>
      </div>
      
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      
      <NewPostModal isOpen={isNewPostModalOpen} onClose={() => setIsNewPostModalOpen(false)} />
    </>
  );
};

export default Header;
