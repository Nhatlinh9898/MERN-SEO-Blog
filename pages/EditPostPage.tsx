import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostBySlug, updatePost } from '../api/postsApi';
import { Post, PostInput } from '../types';
import PostForm from '../components/PostForm';
import SeoHelmet from '../components/SeoHelmet';

const EditPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if(!slug) return;
    const loadPost = async () => {
      try {
        setError(null);
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        console.error("Failed to load post");
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug, navigate]);

  const handleSubmit = async (postData: PostInput) => {
    if(!slug) return;
    try {
      setError(null);
      const updatedPost = await updatePost(slug, postData);
      navigate(`/posts/${updatedPost.slug}`);
    } catch (err: any) {
      console.error(err);
      setError(`Error updating post: ${err.message || 'Unknown error'}`);
    }
  };

  if (loading) return (
     <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
    </div>
  );

  if (!post) return null;

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in max-w-4xl">
      <SeoHelmet
        title={`Edit: ${post.title} - MERN SEO Blog`}
        description="Edit your article."
      />

      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Article</h1>
        <p className="text-gray-500">Updating "{post.title}"</p>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-center">
            {error}
        </div>
      )}

      <PostForm initialData={post} onSubmit={handleSubmit} isEditMode={true} />
    </div>
  );
};

export default EditPostPage;