
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ThumbsUp, Reply } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Comment {
  id: number;
  author: {
    id: number; // Added id for author
    name: string;
    avatar: string;
  };
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
}

// Updated dummy comments with additional properties
const dummyComments: Comment[] = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'Jane Cooper',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    content: 'This is such a great article! I especially loved the part about design principles.',
    date: '2023-11-10T14:30:00',
    likes: 5,
    isLiked: false,
  },
  {
    id: 2,
    author: {
      id: 2,
      name: 'Robert Fox',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    content: 'I have a question about the methodology you mentioned. Would you mind elaborating?',
    date: '2023-11-11T09:15:00',
    likes: 3,
    isLiked: false,
  },
];

interface CommentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  postId: number;
  postTitle: string;
}

const CommentsModal: React.FC<CommentsModalProps> = ({ isOpen, onClose, postId, postTitle }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<Comment[]>(dummyComments);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: {
          id: 1, // Assuming current user has ID 1
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
        },
        content: replyTo 
          ? `@${comments.find(c => c.id === replyTo)?.author.name} ${commentText}`
          : commentText,
        date: new Date().toISOString(),
        likes: 0,
        isLiked: false,
      };
      
      setComments([...comments, newComment]);
      setCommentText('');
      setReplyTo(null);
    }
  };

  const handleLike = (commentId: number) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
          isLiked: !comment.isLiked,
        };
      }
      return comment;
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Comments on "{postTitle}"</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {comments.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No comments yet. Be the first to comment!
            </div>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Link to={`/profile/${comment.author.id}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={comment.author.avatar} />
                    <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/profile/${comment.author.id}`}
                      className="font-medium hover:underline"
                    >
                      {comment.author.name}
                    </Link>
                    <span className="text-xs text-gray-500">
                      {new Date(comment.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1 mb-2">{comment.content}</p>
                  <div className="flex gap-4 items-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleLike(comment.id)}
                      className={`flex items-center gap-1 h-8 px-2 ${comment.isLiked ? 'text-blue-600' : ''}`}
                    >
                      <ThumbsUp size={14} />
                      <span className="text-xs">{comment.likes}</span>
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
                        setReplyTo(comment.id);
                        setCommentText(`@${comment.author.name} `);
                      }}
                      className="flex items-center gap-1 h-8 px-2"
                    >
                      <Reply size={14} />
                      <span className="text-xs">Reply</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        
        <form onSubmit={handleSubmitComment} className="border-t pt-4">
          {replyTo && (
            <div className="mb-2 text-sm text-blue-600 flex justify-between items-center">
              <span>
                Replying to {comments.find(c => c.id === replyTo)?.author.name}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setReplyTo(null);
                  setCommentText('');
                }}
              >
                Cancel
              </Button>
            </div>
          )}
          <div className="flex gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1 flex gap-2">
              <Input 
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1"
              />
              <Button type="submit" size="sm" disabled={!commentText.trim()}>
                <Send size={16} />
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CommentsModal;
