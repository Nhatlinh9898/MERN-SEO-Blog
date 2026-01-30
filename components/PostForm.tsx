import React, { useState, useEffect } from 'react';
import { Post, PostInput } from '../types';

interface PostFormProps {
    initialData?: Partial<Post>;
    onSubmit: (data: PostInput) => void;
    isEditMode?: boolean;
}

const PostForm: React.FC<PostFormProps> = ({ initialData = {}, onSubmit, isEditMode = false }) => {
    const [title, setTitle] = useState(initialData.title || '');
    const [content, setContent] = useState(initialData.content || '');
    const [imageUrl, setImageUrl] = useState(initialData.imageUrl || '');
    const [author, setAuthor] = useState(initialData.author || 'Admin');
    const [metaTitle, setMetaTitle] = useState(initialData.metaTitle || '');
    const [metaDescription, setMetaDescription] = useState(initialData.metaDescription || '');
    const [keywords, setKeywords] = useState(initialData.keywords ? initialData.keywords.join(', ') : '');
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if(initialData) {
            setTitle(initialData.title || '');
            setContent(initialData.content || '');
            setImageUrl(initialData.imageUrl || '');
            setAuthor(initialData.author || 'Admin');
            setMetaTitle(initialData.metaTitle || '');
            setMetaDescription(initialData.metaDescription || '');
            setKeywords(initialData.keywords ? initialData.keywords.join(', ') : '');
        }
    }, [initialData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !content) {
            setError('Title and Content are required.');
            return;
        }
        setError(null);
        
        const formData: PostInput = {
            title,
            content,
            imageUrl,
            author,
            metaTitle,
            metaDescription,
            keywords: keywords.split(',').map(kw => kw.trim()).filter(kw => kw !== '')
        };

        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
                    {error}
                </div>
            )}

            <div className="space-y-6">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Post Title <span className="text-red-500">*</span></label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter post title"
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-shadow"
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Content (HTML supported) <span className="text-red-500">*</span></label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="<p>Write your post content here...</p>"
                        rows={10}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent font-mono text-sm"
                    ></textarea>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder="https://example.com/image.jpg"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        SEO Settings
                    </h3>
                    
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Title</label>
                                <span className={`text-xs ${metaTitle.length > 60 ? 'text-red-500' : 'text-gray-400'}`}>{metaTitle.length}/60</span>
                            </div>
                            <input
                                type="text"
                                value={metaTitle}
                               onChange={(e) => setMetaTitle(e.target.value)}
                                placeholder="SEO Title (max 60 chars)"
                                maxLength={60}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            />
                        </div>

                        <div>
                             <div className="flex justify-between">
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Meta Description</label>
                                <span className={`text-xs ${metaDescription.length > 160 ? 'text-red-500' : 'text-gray-400'}`}>{metaDescription.length}/160</span>
                            </div>
                            <textarea
                                value={metaDescription}
                                onChange={(e) => setMetaDescription(e.target.value)}
                                placeholder="SEO Description (max 160 chars)"
                                rows={3}
                                maxLength={160}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            ></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Keywords (comma separated)</label>
                            <input
                                type="text"
                                value={keywords}
                                onChange={(e) => setKeywords(e.target.value)}
                                placeholder="react, seo, blog"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button type="submit" className="w-full bg-accent hover:bg-blue-600 text-white font-bold py-3 rounded-lg shadow-md transition-colors transform hover:-translate-y-0.5">
                        {isEditMode ? 'Update Post' : 'Publish Post'}
                    </button>
                </div>
            </div>
        </form>
    );
};

export default PostForm;