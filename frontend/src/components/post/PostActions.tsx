
import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageSquare, Share } from 'lucide-react';
import { Button } from '../ui/button';
import CommentsModal from './CommentsModal';
import ShareModal from './ShareModal';

interface PostActionsProps {
  postId: number;
  postTitle: string;
  likesCount?: number;
  dislikesCount?: number;
  commentsCount?: number;
}

const PostActions: React.FC<PostActionsProps> = ({ 
  postId, 
  postTitle, 
  likesCount = 0, 
  dislikesCount = 0, 
  commentsCount = 0 
}) => {
  const [likes, setLikes] = useState(likesCount);
  const [dislikes, setDislikes] = useState(dislikesCount);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
      if (isDisliked) {
        setDislikes(dislikes - 1);
        setIsDisliked(false);
      }
    }
  };

  const handleDislike = () => {
    if (isDisliked) {
      setDislikes(dislikes - 1);
      setIsDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      setIsDisliked(true);
      if (isLiked) {
        setLikes(likes - 1);
        setIsLiked(false);
      }
    }
  };

  // Get current URL for sharing
  const getPostUrl = () => {
    return window.location.href;
  };

  return (
    <div className="flex items-center justify-between py-4 border-t border-b border-blog-lightgray2">
      <div className="flex items-center space-x-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLike}
          className={`flex items-center gap-1 ${isLiked ? 'text-blue-600' : ''}`}
        >
          <ThumbsUp size={18} />
          <span>{likes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleDislike}
          className={`flex items-center gap-1 ${isDisliked ? 'text-red-500' : ''}`}
        >
          <ThumbsDown size={18} />
          <span>{dislikes}</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setIsCommentsOpen(true)}
          className="flex items-center gap-1"
        >
          <MessageSquare size={18} />
          <span>{commentsCount}</span>
        </Button>
      </div>
      
      <Button 
        variant="ghost" 
        size="sm" 
        className="flex items-center gap-1"
        onClick={() => setIsShareModalOpen(true)}
      >
        <Share size={18} />
        <span>Share</span>
      </Button>

      <CommentsModal 
        isOpen={isCommentsOpen} 
        onClose={() => setIsCommentsOpen(false)} 
        postId={postId}
        postTitle={postTitle}
      />
      
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postTitle={postTitle}
        postUrl={getPostUrl()}
      />
    </div>
  );
};

export default PostActions;
