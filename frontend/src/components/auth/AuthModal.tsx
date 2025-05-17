
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<string>("login");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold transition-opacity duration-300">
            {activeTab === "login" ? "Welcome Back" : "Create Account"}
          </DialogTitle>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <div className="relative overflow-hidden">
            <TabsContent 
              value="login"
              className={cn(
                "absolute w-full transition-all duration-300 ease-in-out",
                activeTab === "login" ? "translate-x-0 opacity-100" : "translate-x-[-100%] opacity-0"
              )}
            >
              <LoginForm onClose={onClose} />
            </TabsContent>
            
            <TabsContent 
              value="signup"
              className={cn(
                "absolute w-full transition-all duration-300 ease-in-out",
                activeTab === "signup" ? "translate-x-0 opacity-100" : "translate-x-[100%] opacity-0"
              )}
            >
              <SignupForm onClose={onClose} />
            </TabsContent>
            
            {/* Invisible spacer div to maintain the container height */}
            <div className={cn(
              "invisible",
              activeTab === "login" ? "h-[380px]" : "h-[480px]"
            )}></div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
