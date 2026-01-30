import { Post } from '../types';
import { samplePosts } from '../services/mockData';

const STORAGE_KEY = 'mern_blog_posts';

// Helper to simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Helper to slugify text
const slugify = (text: string) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-');  // Replace multiple - with single -
};

// Initialize data
const initData = () => {
  if (!localStorage.getItem(STORAGE_KEY)) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(samplePosts));
  }
};
initData();

export const getPosts = async (): Promise<Post[]> => {
  await delay(500);
  const posts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  return posts.sort((a: Post, b: Post) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  await delay(300);
  const posts: Post[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const post = posts.find(p => p.slug === slug);
  if (!post) throw new Error('Post not found');
  return post;
};

export const createPost = async (postData: Omit<Post, '_id' | 'slug' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
  await delay(600);
  const posts: Post[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  
  // Check title uniqueness
  if (posts.some(p => p.title === postData.title)) {
    throw new Error('Post title already exists');
  }

  const newPost: Post = {
    ...postData,
    _id: Date.now().toString(),
    slug: slugify(postData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    // Fallbacks for SEO if not provided
    metaTitle: postData.metaTitle || postData.title,
    metaDescription: postData.metaDescription || postData.content.substring(0, 150),
    keywords: postData.keywords || []
  };

  posts.push(newPost);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return newPost;
};

export const updatePost = async (slug: string, postData: Partial<Post>): Promise<Post> => {
  await delay(600);
  const posts: Post[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const index = posts.findIndex(p => p.slug === slug);
  
  if (index === -1) throw new Error('Post not found');

  const updatedPost = {
    ...posts[index],
    ...postData,
    updatedAt: new Date().toISOString(),
    // Regenerate slug if title changed (optional, usually keeping slug is better for SEO, but let's allow change here)
    slug: postData.title ? slugify(postData.title) : posts[index].slug
  };

  posts[index] = updatedPost;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  return updatedPost;
};

export const deletePost = async (slug: string): Promise<void> => {
  await delay(400);
  const posts: Post[] = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  const filteredPosts = posts.filter(p => p.slug !== slug);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredPosts));
};