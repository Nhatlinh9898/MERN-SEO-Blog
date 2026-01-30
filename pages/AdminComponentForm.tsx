import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { createComponent, updateComponent, fetchComponentById } from '../services/productService';

const AdminComponentForm: React.FC = () => {
  const { productId, componentId } = useParams(); // URL params
  const navigate = useNavigate();
  const isEditMode = Boolean(componentId);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isEditMode && componentId) {
      setLoading(true);
      fetchComponentById(componentId).then((comp) => {
        if (comp) {
          setFormData({
            name: comp.name,
            description: comp.description,
            quantity: comp.quantity.toString(),
          });
        } else {
             setError("Component not found");
        }
        setLoading(false);
      });
    }
  }, [componentId, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        quantity: Number(formData.quantity),
      };

      if (isEditMode && componentId) {
        await updateComponent(componentId, payload);
        // We don't have easy access to productId here if it wasn't in the URL for edit mode
        // For simplicity in this mock, we go back to admin home or back 1 step
        navigate(-1);
      } else if (productId) {
        await createComponent(productId, payload);
        navigate(`/product/${productId}`);
      }
    } catch (err) {
      setError('Failed to save component.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in max-w-2xl">
      <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-accent mb-4 inline-block">
        &larr; Back
      </button>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{isEditMode ? 'Edit Component' : 'Add Component'}</h1>
      
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

      <div className="bg-white rounded-xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Component Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-accent focus:border-accent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
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
              {loading ? 'Saving...' : 'Save Component'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminComponentForm;