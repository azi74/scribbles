
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, Instagram, Copy, Check } from "lucide-react";
import { toast } from 'sonner';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  postTitle: string;
  postUrl: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, postTitle, postUrl }) => {
  const [copied, setCopied] = React.useState(false);
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook size={20} />,
      color: 'bg-[#1877F2] hover:bg-[#0E5FC0]',
      shareUrl: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'Twitter',
      icon: <Twitter size={20} />,
      color: 'bg-[#1DA1F2] hover:bg-[#0C85D0]',
      shareUrl: `https://twitter.com/intent/tweet?text=${encodeURIComponent(postTitle)}&url=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin size={20} />,
      color: 'bg-[#0A66C2] hover:bg-[#084B8A]',
      shareUrl: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`
    },
    {
      name: 'Instagram',
      icon: <Instagram size={20} />,
      color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90',
      shareUrl: `https://www.instagram.com/`
    }
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(postUrl)
      .then(() => {
        setCopied(true);
        toast.success('Link copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        toast.error('Failed to copy link');
      });
  };
  
  const handleShareClick = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Share this post</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex flex-wrap gap-2 justify-center">
            {shareLinks.map((platform) => (
              <Button
                key={platform.name}
                className={`${platform.color} text-white min-w-[120px]`}
                onClick={() => handleShareClick(platform.shareUrl)}
              >
                {platform.icon}
                <span>{platform.name}</span>
              </Button>
            ))}
          </div>
          
          <div className="relative mt-2">
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                value={postUrl}
                readOnly
                className="flex-1 p-2 bg-transparent focus:outline-none text-sm"
              />
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={copyToClipboard}
                className="px-3"
              >
                {copied ? <Check size={18} /> : <Copy size={18} />}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
