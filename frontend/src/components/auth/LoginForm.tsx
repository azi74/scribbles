
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Facebook, Mail } from 'lucide-react';

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login submitted');
    // Will implement actual login later
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="name@example.com" required />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" required />
      </div>
      
      <div className="text-right text-sm">
        <a href="#" className="text-blog-black hover:underline">
          Forgot password?
        </a>
      </div>
      
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-blog-lightgray2"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <Button type="button" variant="outline" className="w-full">
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#4285F4"/>
            <path d="M10.648 15.026h2.261l-3.522-7.512h-2.092L3.772 15.026h2.16l.769-1.727h3.118l.769 1.727zm-5.31-3.326l1.12-2.512 1.119 2.512h-2.24z" fill="#34A853"/>
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z" fill="#FBBC05"/>
            <path d="M13.742 8.339l2.239 1.601c-.748 1.123-1.946 1.93-3.571 1.93-2
.194 0-3.997-1.805-3.997-4.045s1.803-4.045 3.997-4.045c1.547 0 2.704.697 3.483 1.796l-2.168 1.837c-.364-.678-1.024-1.12-1.815-1.12-1.242 0-2.247 1.054-2.247 2.532 0 1.479 1.005 2.533 2.247 2.533.761 0 1.461-.421 1.815-1.12z" fill="#EA4335"/>
          </svg>
          Google
        </Button>
        <Button type="button" variant="outline" className="w-full">
          <Mail className="mr-2 h-4 w-4" />
          Email
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;
