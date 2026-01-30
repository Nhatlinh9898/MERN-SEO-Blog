import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { state, addToCart, removeFromCart, clearCart } = useCart();
  const { cartItems } = state;
  const navigate = useNavigate();

  const checkoutHandler = () => {
    // In a real app, this would redirect to login or shipping
    alert('Proceeding to checkout (Mock)!');
    clearCart();
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <p className="text-xl text-gray-500 mb-6">Your cart is empty.</p>
            <Link to="/" className="inline-block bg-accent text-white py-3 px-8 rounded-full font-semibold hover:bg-blue-600 transition-colors">
                Go Shopping
            </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="bg-white rounded-lg shadow-sm p-4 flex flex-col sm:flex-row items-center gap-4">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md" />
                
                <div className="flex-1 text-center sm:text-left">
                  <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-accent">
                    {item.name}
                  </Link>
                  <div className="text-gray-500 text-sm mt-1">{item.brand}</div>
                </div>
                
                <div className="text-lg font-bold text-gray-800 w-24 text-center">
                    ${item.price.toFixed(2)}
                </div>

                <div className="flex items-center">
                  <select
                    value={item.qty}
                    onChange={(e) => addToCart(item, Number(e.target.value))}
                    className="form-select border-gray-300 rounded-md shadow-sm focus:border-accent focus:ring focus:ring-accent focus:ring-opacity-50"
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 transition-colors p-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 sticky top-24">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
              
              <div className="flex justify-between mb-2 text-gray-600">
                <span>Items:</span>
                <span>{cartItems.reduce((acc, item) => acc + item.qty, 0)}</span>
              </div>
              
              <div className="flex justify-between mb-4 text-xl font-bold text-gray-900 pt-4 border-t border-gray-100">
                <span>Subtotal:</span>
                <span>
                  ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                </span>
              </div>

              <button
                onClick={checkoutHandler}
                disabled={cartItems.length === 0}
                className="w-full bg-accent text-white py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;