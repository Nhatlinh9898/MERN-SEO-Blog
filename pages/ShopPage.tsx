import React, { useEffect, useState } from 'react';
import { Product } from '../types';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';
import SeoHelmet from '../components/SeoHelmet';

const ShopPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter States
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setError(null);
        const data = await fetchProducts();
        setAllProducts(data);
        setFilteredProducts(data);
        
        // Extract unique categories
        const cats = ['All', ...Array.from(new Set(data.map(p => p.category)))];
        setCategories(cats);
        
      } catch (err: any) {
        console.error(err);
        setError("Unable to retrieve products.");
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = allProducts;

    if (selectedCategory !== 'All') {
        result = result.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    setFilteredProducts(result);
  }, [selectedCategory, searchQuery, allProducts]);

  return (
    <div className="animate-fade-in pb-12">
      <SeoHelmet
        title="Shop - MERN Ecommerce"
        description="Browse our collection of high-quality electronics and gadgets."
      />

      <div className="bg-white shadow-sm border-b border-gray-100 py-8 mb-8">
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-gray-900">Shop</h1>
            <div className="text-sm text-gray-500 mt-2">Home / Shop</div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8">
            
            {/* Sidebar Filters */}
            <aside className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 sticky top-24">
                    <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Search</h3>
                    <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent mb-8 text-sm"
                    />

                    <h3 className="font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">Categories</h3>
                    <ul className="space-y-2">
                        {categories.map(cat => (
                            <li key={cat}>
                                <button 
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${selectedCategory === cat ? 'bg-indigo-50 text-accent font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    {cat}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>

            {/* Product Grid */}
            <div className="flex-1">
                {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-accent border-t-transparent"></div>
                </div>
                ) : error ? (
                    <div className="text-center py-12 bg-red-50 rounded-xl border border-red-100">
                        <p className="text-red-700 font-medium">{error}</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-400 text-lg">No products match your criteria.</p>
                    <button onClick={() => {setSelectedCategory('All'); setSearchQuery('');}} className="mt-4 text-accent hover:underline">Clear Filters</button>
                </div>
                ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default ShopPage;