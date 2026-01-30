import React from 'react';
import { Link } from 'react-router-dom';
import SeoHelmet from '../components/SeoHelmet';

const AdminDashboard: React.FC = () => {
  return (
    <div className="animate-fade-in pb-12 bg-gray-50 min-h-screen">
      <SeoHelmet title="Admin Dashboard - MERN System" />

      {/* Admin Header */}
      <div className="bg-primary text-white py-12 shadow-lg">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">System Dashboard</h1>
            <p className="text-gray-400">Welcome back, Administrator. Manage your e-commerce ecosystem.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-accent">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Sales</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">$12,450.00</h3>
                    </div>
                    <div className="p-3 bg-indigo-50 rounded-full text-accent">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                </div>
                <div className="mt-4 text-sm text-green-600 font-medium">
                    +15% from last month
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Active Products</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">24</h3>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-full text-blue-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path></svg>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    Inventory Status: Good
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Blog Posts</p>
                        <h3 className="text-2xl font-bold text-gray-800 mt-1">12</h3>
                    </div>
                    <div className="p-3 bg-purple-50 rounded-full text-purple-500">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </div>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    Latest: "React SEO Guide"
                </div>
            </div>
        </div>

        {/* Management Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Inventory Management */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-2 rounded-lg">📦</span>
                    Inventory Management
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Control stock levels, update prices, and organize product categories.
                </p>
                <div className="flex gap-4">
                    <Link to="/admin/products" className="flex-1 bg-white border border-gray-200 text-gray-700 hover:border-accent hover:text-accent py-3 rounded-lg text-center font-medium transition-all">
                        View Products
                    </Link>
                    <Link to="/admin/products/new" className="flex-1 bg-accent text-white py-3 rounded-lg text-center font-bold hover:bg-accent-hover transition-colors shadow-md">
                        + Add Product
                    </Link>
                </div>
            </div>

             {/* Content Management */}
             <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-purple-100 text-purple-600 p-2 rounded-lg">✍️</span>
                    Content System
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Manage blog articles, SEO metadata, and technical documentation.
                </p>
                <div className="flex gap-4">
                    <Link to="/" className="flex-1 bg-white border border-gray-200 text-gray-700 hover:border-purple-500 hover:text-purple-600 py-3 rounded-lg text-center font-medium transition-all">
                        View Blog
                    </Link>
                    <Link to="/create" className="flex-1 bg-purple-600 text-white py-3 rounded-lg text-center font-bold hover:bg-purple-700 transition-colors shadow-md">
                        + Write Article
                    </Link>
                </div>
            </div>

            {/* Task System */}
             <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 p-2 rounded-lg">✅</span>
                    Task Operations
                </h2>
                <p className="text-gray-500 mb-6 text-sm">
                    Internal todo lists and operational tasks.
                </p>
                <Link to="/tasks" className="block w-full bg-gray-50 text-gray-700 py-3 rounded-lg text-center font-medium hover:bg-gray-100 transition-colors">
                    Open Task Manager
                </Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;