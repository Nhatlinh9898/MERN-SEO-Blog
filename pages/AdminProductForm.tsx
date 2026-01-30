import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createProduct, updateProduct, fetchProductById } from '../services/productService';
import { Product } from '../types';

const AdminProductForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    image: '',
    brand: '',
    category: '',
    countInStock: '',
    description: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && id) {
      setLoading(true);
      fetchProductById(id).then((product) => {
        if (product) {
          setFormData({
            name: product.name,
            price: product.price.toString(),
            image: product.image,
            brand: product.brand,
            category: product.category,
            countInStock: product.countInStock.toString(),
            description: product.description,
          });
        } else {
            setError("Product not found");
        }
        setLoading(false);
      });
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const productPayload = {
        name: formData.name,
        price: Number(formData.price),
        image: formData.image || 'https://via.placeholder.com/300',
        brand: formData.brand,
        category: formData.category,
        countInStock: Number(formData.countInStock),
        description: formData.description,
      };

      if (isEditMode && id) {
        await updateProduct(id, productPayload);
      } else {
        await createProduct(productPayload);
      }
      navigate('/admin/products');
    } catch (err) {
      setError('Failed to save product.');
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in max-w-2xl">
      <Link to="/admin/products" className="text-gray-500 hover:text-accent mb-4 inline-block">
        &larr; Back to List
      </Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Product' : 'Create Product'}</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
              <input
                type="number"
                name="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Count In Stock</label>
              <input
                type="number"
                name="countInStock"
                required
                min="0"
                value={formData.countInStock}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
              <input
                type="text"
                name="brand"
                required
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              required
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
            ></textarea>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-accent text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>

        {isEditMode && (
          <div className="mt-8 pt-8 border-t border-gray-100">
             <h3 className="text-xl font-bold mb-4">Product Components</h3>
             <Link to={`/admin/products/${id}/components/new`} className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-2 rounded transition-colors">
                + Add Component
             </Link>
             {/* List of components could be shown here, but they are shown on the detail page */}
             <div className="mt-4">
                 <p className="text-sm text-gray-500">Manage components in the Product Detail View or add new ones here.</p>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductForm;