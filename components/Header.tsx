import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { state } = useCart();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = (state.cartItems || []).reduce((acc, item) => acc + item.qty, 0);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return 'text-accent font-semibold';
    if (path !== '/' && location.pathname.startsWith(path)) return 'text-accent font-semibold';
    return 'text-gray-300 hover:text-white transition-colors';
  };

  return (
    <header className="bg-primary text-white sticky top-0 z-50 shadow-lg border-b border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2 group">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
               <span className="text-white text-sm">M</span>
            </div>
            <span>MERN<span className="text-accent">Shop</span></span>
          </Link>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8 items-center text-sm font-medium">
            <Link to="/" className={isActive('/')}>Home</Link>
            <Link to="/shop" className={isActive('/shop')}>Shop</Link>
            <Link to="/tasks" className={isActive('/tasks')}>Tasks</Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-6">
             <Link to="/admin" className="text-sm font-medium text-gray-300 hover:text-white flex items-center gap-1 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                Admin
             </Link>

             <Link to="/cart" className="relative group p-1">
                <div className="p-2 bg-gray-800 rounded-full group-hover:bg-gray-700 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                </div>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-primary">
                    {cartCount}
                  </span>
                )}
             </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
             <Link to="/cart" className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
             </Link>
             <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-300 hover:text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isMobileMenuOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
             </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800 space-y-2 animate-slide-up">
                <Link to="/" className="block py-2 text-gray-300 hover:text-white hover:bg-gray-800 px-2 rounded" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
                <Link to="/shop" className="block py-2 text-gray-300 hover:text-white hover:bg-gray-800 px-2 rounded" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
                <Link to="/tasks" className="block py-2 text-gray-300 hover:text-white hover:bg-gray-800 px-2 rounded" onClick={() => setIsMobileMenuOpen(false)}>Tasks</Link>
                <Link to="/admin" className="block py-2 text-accent hover:text-accent-hover font-semibold px-2 rounded" onClick={() => setIsMobileMenuOpen(false)}>Admin Dashboard</Link>
            </div>
        )}
      </div>
    </header>
  );
};

export default Header;