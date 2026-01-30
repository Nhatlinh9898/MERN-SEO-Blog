import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product, ProductComponent } from '../types';
import { fetchProductById, fetchComponentsByProductId, deleteComponent } from '../services/productService';
import { useCart } from '../context/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [components, setComponents] = useState<ProductComponent[]>([]);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  const loadData = async () => {
    if (!id) return;
    const prod = await fetchProductById(id);
    setProduct(prod || null);
    if (prod) {
        const comps = await fetchComponentsByProductId(id);
        setComponents(comps);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, qty);
      navigate('/cart');
    }
  };

  const handleDeleteComponent = async (compId: string) => {
      if(window.confirm("Delete this component?")) {
          await deleteComponent(compId);
          loadData();
      }
  }

  if (loading) {
     return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-accent"></div>
        </div>
    );
  }

  if (!product) {
    return (
        <div className="container mx-auto px-4 py-8 text-center">
             <h2 className="text-2xl font-bold text-gray-800">Product Not Found</h2>
             <Link to="/" className="text-accent hover:underline mt-4 inline-block">Return Home</Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-accent mb-6 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Go Back
      </Link>

      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex justify-center items-center bg-gray-50 rounded-xl p-4">
            <img
              src={product.image}
              alt={product.name}
              className="max-w-full max-h-[500px] object-contain rounded-lg shadow-sm"
            />
          </div>

          <div className="flex flex-col">
            <div className="flex justify-between items-start">
                <div className="mb-2">
                    <span className="text-sm font-semibold text-accent uppercase tracking-wide">{product.brand}</span>
                </div>
                <Link to={`/admin/products/${product._id}/edit`} className="text-sm text-gray-400 hover:text-accent">
                    Edit (Admin)
                </Link>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            
            <div className="flex items-center mb-6">
                 <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300 fill-current'}`} viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.26.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.55-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
                <span className="text-gray-500 ml-2">({product.numReviews} reviews)</span>
            </div>

            <div className="text-3xl font-bold text-gray-900 mb-6 pb-6 border-b border-gray-100">
                ${product.price.toFixed(2)}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 mt-auto">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-gray-700">Status:</span>
                <span className={`font-bold ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                </span>
              </div>

              {product.countInStock > 0 && (
                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-gray-700">Quantity:</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                    className="form-select block w-24 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-accent focus:border-accent sm:text-sm rounded-md shadow-sm"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className={`w-full py-4 px-6 rounded-lg font-bold text-white shadow-md transition-all transform hover:-translate-y-1 ${
                    product.countInStock === 0 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-accent hover:bg-blue-600'
                }`}
              >
                {product.countInStock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Components Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Product Components</h2>
            <Link to={`/admin/products/${product._id}/components/new`} className="text-accent hover:underline font-medium">
                + Add Component (Admin)
            </Link>
          </div>
          
          {components.length === 0 ? (
              <p className="text-gray-500 italic">No components listed for this product.</p>
          ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {components.map(comp => (
                      <div key={comp._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between items-start mb-2">
                              <h3 className="font-bold text-lg text-gray-800">{comp.name}</h3>
                              <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">Qty: {comp.quantity}</span>
                          </div>
                          <p className="text-gray-600 text-sm mb-4">{comp.description}</p>
                          <div className="flex justify-end space-x-3 text-sm">
                              <Link to={`/admin/components/${comp._id}/edit`} className="text-blue-500 hover:text-blue-700">Edit</Link>
                              <button onClick={() => handleDeleteComponent(comp._id)} className="text-red-500 hover:text-red-700">Delete</button>
                          </div>
                      </div>
                  ))}
              </div>
          )}
      </div>
    </div>
  );
};

export default ProductDetailPage;