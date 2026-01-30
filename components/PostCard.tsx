import React from 'react';
import { Link } from 'react-router-dom';
import { Post } from '../types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  // Strip HTML tags for description preview
  const plainTextDescription = post.content.replace(/<[^>]+>/g, '').substring(0, 150) + '...';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group">
      <Link to={`/posts/${post.slug}`} className="overflow-hidden block relative h-48">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
      </Link>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-3 flex items-center text-xs text-gray-500 uppercase tracking-wider font-semibold">
           <span className="text-accent">{post.author}</span>
           <span className="mx-2">•</span>
           <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        <Link to={`/posts/${post.slug}`} className="block mb-3">
             <h3 className="text-xl font-bold text-gray-800 group-hover:text-accent transition-colors line-clamp-2">
                 {post.title}
             </h3>
        </Link>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
           {plainTextDescription}
        </p>

        <Link
            to={`/posts/${post.slug}`}
            className="inline-flex items-center text-accent font-semibold hover:text-blue-700 transition-colors"
        >
            Read Article
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
        </Link>
      </div>
    </div>
  );
};

export default PostCard;