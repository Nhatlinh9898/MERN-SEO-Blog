import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-gray-400 py-12 mt-auto border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-1">
                <h3 className="text-white text-lg font-bold mb-4">MERN<span className="text-accent">Shop</span></h3>
                <p className="text-sm leading-relaxed mb-4">
                    A comprehensive full-stack e-commerce solution built for performance and scalability.
                </p>
                <div className="flex space-x-4">
                    {/* Social Placeholders */}
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                         <span className="text-xs">FB</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                         <span className="text-xs">TW</span>
                    </div>
                    <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-accent transition-colors cursor-pointer">
                         <span className="text-xs">GH</span>
                    </div>
                </div>
            </div>
            
            <div>
                <h4 className="text-white font-semibold mb-4">Shop</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/shop" className="hover:text-accent transition-colors">All Products</Link></li>
                    <li><Link to="/shop" className="hover:text-accent transition-colors">Electronics</Link></li>
                    <li><Link to="/cart" className="hover:text-accent transition-colors">My Cart</Link></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-4">Support</h4>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-accent transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-accent transition-colors">Contact Us</a></li>
                </ul>
            </div>

            <div>
                <h4 className="text-white font-semibold mb-4">Admin</h4>
                <ul className="space-y-2 text-sm">
                    <li><Link to="/admin" className="hover:text-accent transition-colors">Dashboard</Link></li>
                    <li><Link to="/admin/products" className="hover:text-accent transition-colors">Manage Products</Link></li>
                    <li><Link to="/create" className="hover:text-accent transition-colors">Write Post</Link></li>
                </ul>
            </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} MERN Architecture. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;