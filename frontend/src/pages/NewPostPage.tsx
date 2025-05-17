
import React from 'react';
import Layout from '../components/Layout';
import NewPostForm from '../components/post/NewPostForm';

const NewPostPage: React.FC = () => {
  return (
    <Layout>
      <div className="container-blog py-8 md:py-12">
        <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
        <NewPostForm />
      </div>
    </Layout>
  );
};

export default NewPostPage;
