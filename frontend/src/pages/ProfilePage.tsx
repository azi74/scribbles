
import React from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import UserProfile from '../components/profile/UserProfile';

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  
  // For demo purposes, we'll assume user ID "1" is the logged-in user
  const isOwnProfile = userId === "1";
  
  return (
    <Layout>
      <UserProfile userId={userId || ''} isOwnProfile={isOwnProfile} />
    </Layout>
  );
};

export default ProfilePage;
