import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/postsApi';
import PostForm from '../components/PostForm';
import SeoHelmet from '../components/SeoHelmet';
import { PostInput } from '../types';

const CreatePostPage: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (postData: PostInput) => {
    try {
      setError(null);
      const newPost = await createPost(postData);
      navigate(`/posts/${newPost.slug}`);
    } catch (err: any) {
      console.error(err);
      setError(`Error creating post: ${err.message || 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in max-w-4xl">
      <SeoHelmet
        title="Create New Post - MERN SEO Blog"
        description="Write and publish a new article."
      />
      
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Write New Article</h1>
        <p className="text-gray-500">Share your knowledge with the world</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
        </div>
      )}

      <PostForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreatePostPage;