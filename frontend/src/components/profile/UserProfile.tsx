
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '../ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { Edit, Settings, User, Plus } from 'lucide-react';
import UserPosts from './UserPosts';
import UserLikedPosts from './UserLikedPosts';
import EditProfileModal from './EditProfileModal';
import NewPostModal from '../post/NewPostModal';
import ImageViewerModal from '../common/ImageViewerModal';

interface UserProfileProps {
  userId: string;
  isOwnProfile?: boolean;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId, isOwnProfile = false }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isNewPostModalOpen, setIsNewPostModalOpen] = useState(false);
  const [imageViewerConfig, setImageViewerConfig] = useState<{
    isOpen: boolean;
    imageUrl: string;
    aspectRatio: number;
  }>({
    isOpen: false,
    imageUrl: '',
    aspectRatio: 16/9
  });

  // This will be fetched from API in the future
  const userInfo = {
    id: userId,
    name: 'Alex Morgan',
    username: 'alexmorgan',
    bio: 'UI/UX designer with a passion for minimalist interfaces and user-centered design.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    coverImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643',
    following: 125,
    followers: 1240,
    joinDate: '2023-01-15',
  };

  // Get user statistics
  // In a real app, these would be fetched from the API
  const userStats = {
    totalPosts: 18,
    categories: 4,
    avgReadTime: 8
  };

  const handleImageClick = (imageUrl: string, aspectRatio: number) => {
    setImageViewerConfig({
      isOpen: true,
      imageUrl,
      aspectRatio
    });
  };

  return (
    <div className="container-blog py-8">
      {/* Cover image with user name and username */}
      <div className="relative">
        <div 
          className="h-48 md:h-64 rounded-lg bg-cover bg-center cursor-pointer"
          style={{ backgroundImage: `url(${userInfo.coverImage})` }}
          onClick={() => handleImageClick(userInfo.coverImage, 16/9)}
        >
          <div className="absolute bottom-8 left-8 text-white drop-shadow-md">
            <h1 className="text-2xl md:text-3xl font-bold">{userInfo.name}</h1>
            <p className="text-sm md:text-base">@{userInfo.username}</p>
          </div>
        </div>
      </div>
      
      {/* Profile info */}
      <div className="flex flex-col md:flex-row gap-6 items-start mt-10">
        <div 
          className="cursor-pointer relative -mt-24 md:-mt-28 z-10 ml-6"
          onClick={() => handleImageClick(userInfo.avatar, 1)}
        >
          <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-white dark:border-gray-800 rounded-full shadow-md">
            <AvatarImage src={userInfo.avatar} />
            <AvatarFallback>{userInfo.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        
        <div className="flex-1 mt-4 md:mt-0">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {isOwnProfile ? (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setIsEditModalOpen(true)}>
                  <Edit size={16} className="mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings size={16} className="mr-2" />
                  Settings
                </Button>
                <Button onClick={() => setIsNewPostModalOpen(true)}>
                  <Plus size={16} className="mr-2" />
                  New Post
                </Button>
              </div>
            ) : (
              <Button>
                <User size={16} className="mr-2" />
                Follow
              </Button>
            )}
          </div>
          
          <p className="mt-4">{userInfo.bio}</p>
          
          <div className="flex gap-4 mt-4 text-sm">
            <div>
              <span className="font-bold">{userInfo.following}</span> Following
            </div>
            <div>
              <span className="font-bold">{userInfo.followers}</span> Followers
            </div>
            <div>
              Joined {new Date(userInfo.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </div>
          </div>
        </div>
      </div>

      {/* User Statistics */}
      {isOwnProfile && (
        <div className="mt-8 mb-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card className="bg-blog-lightgray/50 border-none hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <h3 className="text-4xl font-bold mb-2">{userStats.totalPosts}</h3>
              <p className="text-gray-600">Your Articles</p>
            </CardContent>
          </Card>
          <Card className="bg-blog-lightgray/50 border-none hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <h3 className="text-4xl font-bold mb-2">{userStats.categories}</h3>
              <p className="text-gray-600">Categories</p>
            </CardContent>
          </Card>
          <Card className="bg-blog-lightgray/50 border-none hover:shadow-md transition-shadow">
            <CardContent className="pt-6">
              <h3 className="text-4xl font-bold mb-2">{userStats.avgReadTime}+</h3>
              <p className="text-gray-600">Minutes Average Read</p>
            </CardContent>
          </Card>
        </div>
      )}
      
      {/* Tabs for different sections */}
      <Tabs defaultValue="posts" className="mt-8">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          {isOwnProfile && (
            <>
              <TabsTrigger value="liked">Liked Posts</TabsTrigger>
              <TabsTrigger value="drafts">Drafts</TabsTrigger>
            </>
          )}
        </TabsList>
        
        <TabsContent value="posts">
          <UserPosts userId={userId} />
        </TabsContent>
        
        {isOwnProfile && (
          <>
            <TabsContent value="liked">
              <UserLikedPosts userId={userId} />
            </TabsContent>
            
            <TabsContent value="drafts">
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">You don't have any drafts yet</h3>
                <p className="text-gray-500 mb-4">Create your first post by clicking the button below</p>
                <Button>Create New Post</Button>
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>

      <EditProfileModal 
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        userInfo={userInfo}
      />

      <NewPostModal
        isOpen={isNewPostModalOpen}
        onClose={() => setIsNewPostModalOpen(false)}
      />

      <ImageViewerModal 
        isOpen={imageViewerConfig.isOpen}
        onClose={() => setImageViewerConfig(prev => ({ ...prev, isOpen: false }))}
        imageUrl={imageViewerConfig.imageUrl}
        aspectRatio={imageViewerConfig.aspectRatio}
      />
    </div>
  );
};

export default UserProfile;
