import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Post } from '../types';
import { getPostBySlug, deletePost } from '../api/postsApi';
import SeoHelmet from '../components/SeoHelmet';

const PostDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    const loadPost = async () => {
      try {
        const data = await getPostBySlug(slug);
        setPost(data);
      } catch (err) {
        setError('Post not found');
      } finally {
        setLoading(false);
      }
    };
    loadPost();
  }, [slug]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article? This action cannot be undone.')) {
      if (slug) {
        await deletePost(slug);
        navigate('/');
      }
    }
  };

  if (loading) {
     return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
        </div>
    );
  }

  if (!post || error) {
    return (
        <div className="container mx-auto px-4 py-20 text-center">
             <h2 className="text-3xl font-bold text-gray-800 mb-4">404</h2>
             <p className="text-xl text-gray-500 mb-8">Article not found.</p>
             <Link to="/" className="bg-accent text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors">Return Home</Link>
        </div>
    );
  }

  return (
    <div className="animate-fade-in bg-gray-50 min-h-screen pb-16">
      <SeoHelmet
        title={post.metaTitle}
        description={post.metaDescription}
        keywords={post.keywords}
        imageUrl={post.imageUrl}
        slug={post.slug}
      />

      {/* Header Image */}
      <div className="w-full h-[400px] relative">
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 text-white container mx-auto">
             <div className="max-w-4xl mx-auto">
                <div className="flex items-center space-x-4 mb-4 text-sm font-medium opacity-90">
                    <span className="bg-accent px-3 py-1 rounded-full">Article</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <span>by {post.author}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-2 shadow-sm">{post.title}</h1>
             </div>
          </div>
      </div>

      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-12">
            
            {/* Content Body */}
            <div 
                className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>

            {/* Actions */}
            <div className="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
                <Link to="/" className="text-gray-500 hover:text-accent font-medium flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Back to Articles
                </Link>

                <div className="flex space-x-3">
                    <Link 
                        to={`/edit/${post.slug}`} 
                        className="px-5 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={handleDelete} 
                        className="px-5 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetailPage;