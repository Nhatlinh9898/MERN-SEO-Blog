import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Post, Product } from '../types';
import { getPosts } from '../api/postsApi';
import { fetchProducts } from '../services/productService';
import PostCard from '../components/PostCard';
import ProductCard from '../components/ProductCard';
import SeoHelmet from '../components/SeoHelmet';

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [postsData, productsData] = await Promise.all([
            getPosts(),
            fetchProducts()
        ]);
        setPosts(postsData.slice(0, 3)); // Featured 3 posts
        setProducts(productsData.slice(0, 4)); // Featured 4 products
      } catch (err) {
        console.error("Failed to load home data", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="animate-fade-in pb-20">
        <SeoHelmet
            title="MERNShop - Modern E-commerce Platform"
            description="The best place to buy electronics and learn about web development."
        />

        {/* Hero Section */}
        <div className="bg-primary text-white pt-24 pb-20 md:pt-32 md:pb-28 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
             {/* Decorative circles */}
             <div className="absolute top-10 right-10 w-64 h-64 bg-accent opacity-20 rounded-full blur-3xl"></div>
             <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
             
            <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
                <span className="inline-block py-1 px-3 rounded-full bg-gray-800 border border-gray-700 text-xs font-semibold text-accent mb-6">MERN Stack Architecture V1.0</span>
                <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
                    Next Generation <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-accent">E-Commerce System</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Experience a seamless shopping journey powered by modern web technologies. Shop the latest gadgets or dive into our technical insights.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link to="/shop" className="px-8 py-4 bg-accent text-white rounded-lg font-bold hover:bg-accent-hover transition-all shadow-lg shadow-indigo-500/30 transform hover:-translate-y-1">
                        Shop Products
                    </Link>
                    <Link to="/admin" className="px-8 py-4 bg-gray-800 text-white rounded-lg font-bold hover:bg-gray-700 transition-all border border-gray-700">
                        System Admin
                    </Link>
                </div>
            </div>
        </div>

        {/* Featured Products Section */}
        <div className="container mx-auto px-4 py-16">
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Trending Now</h2>
                    <p className="text-gray-500">Top selling electronics selected for you</p>
                </div>
                <Link to="/shop" className="text-accent font-semibold hover:text-accent-hover flex items-center gap-1 group">
                    View All Products 
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </Link>
            </div>
            
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {[1,2,3,4].map(i => <div key={i} className="h-80 bg-gray-200 rounded-2xl animate-pulse"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>

        {/* Feature Strip */}
        <div className="bg-white py-16 border-y border-gray-100">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="p-4">
                        <div className="w-16 h-16 bg-blue-50 text-accent rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">🚀</div>
                        <h3 className="text-xl font-bold mb-2">High Performance</h3>
                        <p className="text-gray-500">Built with React and optimized for speed and SEO.</p>
                    </div>
                    <div className="p-4">
                        <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">🛡️</div>
                        <h3 className="text-xl font-bold mb-2">Secure System</h3>
                        <p className="text-gray-500">Industry standard practices for data protection.</p>
                    </div>
                    <div className="p-4">
                        <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl">⚙️</div>
                        <h3 className="text-xl font-bold mb-2">Scalable Architecture</h3>
                        <p className="text-gray-500">Designed to grow with your business needs.</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Latest Blog Posts Section */}
        <div className="container mx-auto px-4 py-20 bg-gray-50">
             <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">System Insights</h2>
                    <p className="text-gray-500">Technical articles and development updates</p>
                </div>
            </div>

            {loading ? (
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1,2,3].map(i => <div key={i} className="h-64 bg-gray-200 rounded-2xl animate-pulse"></div>)}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            )}
        </div>
    </div>
  );
};

export default HomePage;