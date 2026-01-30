import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 group">
      <Link to={`/product/${product._id}`} className="block relative h-64 overflow-hidden bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 mix-blend-multiply transform group-hover:scale-105 transition-transform duration-500"
        />
        {product.countInStock === 0 && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                Out of Stock
            </div>
        )}
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
            <span className="text-xs font-semibold text-accent uppercase tracking-wider bg-indigo-50 px-2 py-1 rounded-sm">
                {product.category}
            </span>
        </div>
        
        <Link to={`/product/${product._id}`} className="group-hover:text-accent transition-colors mb-2">
            <h3 className="text-lg font-bold text-gray-800 line-clamp-2 leading-tight">{product.name}</h3>
        </Link>
        
        <div className="flex items-center mb-4">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-200 fill-current'}`} viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                ))}
            </div>
            <span className="text-xs text-gray-400 ml-2">({product.numReviews})</span>
        </div>

        <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
              <span className="block text-xs text-gray-400">Price</span>
              <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
          </div>
          <Link
            to={`/product/${product._id}`}
            className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-accent hover:text-white transition-all shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;