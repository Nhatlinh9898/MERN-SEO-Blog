import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CartProvider } from './context/CartContext';

// Layout & Global Components
import Header from './components/Header';
import Footer from './components/Footer';
// import AIChatBot from './components/AIChatBot'; // Temporarily disabled

// Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CreatePostPage from './pages/CreatePostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';
import AdminDashboard from './pages/AdminDashboard';
import AdminProductList from './pages/AdminProductList';
import AdminProductForm from './pages/AdminProductForm';
import AdminComponentForm from './pages/AdminComponentForm';
import ItemManagerPage from './pages/ItemManagerPage';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-10 text-center bg-white min-h-screen flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Something went wrong.</h1>
          <p className="text-gray-600 mb-4 max-w-lg">The application encountered an unexpected error.</p>
          <pre className="bg-gray-100 p-4 rounded text-left text-sm text-red-800 overflow-auto max-w-2xl border border-gray-300">
            {this.state.error?.message}
          </pre>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reload Application
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <CartProvider>
          <Router>
            <div className="flex flex-col min-h-screen font-sans text-gray-900 bg-gray-50">
              <Header />
              
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  
                  {/* Blog Routes */}
                  <Route path="/posts/:slug" element={<PostDetailPage />} />

                  {/* Admin System Routes */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProductList />} />
                  <Route path="/admin/products/new" element={<AdminProductForm />} />
                  <Route path="/admin/products/:id/edit" element={<AdminProductForm />} />
                  <Route path="/admin/products/:productId/components/new" element={<AdminComponentForm />} />
                  <Route path="/admin/components/:componentId/edit" element={<AdminComponentForm />} />
                  <Route path="/create" element={<CreatePostPage />} />
                  <Route path="/edit/:slug" element={<EditPostPage />} />

                  {/* Utility Routes */}
                  <Route path="/tasks" element={<ItemManagerPage />} />
                  
                  {/* Fallback */}
                  <Route path="*" element={<div className="p-20 text-center text-gray-500 text-xl">404 - Page not found</div>} />
                </Routes>
              </main>

              {/* <AIChatBot /> */}
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

export default App;