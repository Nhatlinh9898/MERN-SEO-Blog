import { Product, ProductComponent } from '../types';
import { products as initialProducts } from './mockData';

// CONSTANTS for LocalStorage keys
const PRODUCTS_KEY = 'mern_products';
const COMPONENTS_KEY = 'mern_components';

// Helper to initialize data
const initializeData = () => {
  if (!localStorage.getItem(PRODUCTS_KEY)) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem(COMPONENTS_KEY)) {
    localStorage.setItem(COMPONENTS_KEY, JSON.stringify([]));
  }
};

// Initialize on load
initializeData();

// --- PRODUCT SERVICES (Simulating Backend API) ---

export const fetchProducts = async (): Promise<Product[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const stored = localStorage.getItem(PRODUCTS_KEY);
      resolve(stored ? JSON.parse(stored) : []);
    }, 300);
  });
};

export const fetchProductById = async (id: string): Promise<Product | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      resolve(products.find((p) => p._id === id));
    }, 200);
  });
};

export const createProduct = async (productData: Omit<Product, '_id' | 'rating' | 'numReviews'>): Promise<Product> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      const newProduct: Product = {
        ...productData,
        _id: Date.now().toString(),
        rating: 0,
        numReviews: 0
      };
      products.push(newProduct);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
      resolve(newProduct);
    }, 400);
  });
};

export const updateProduct = async (id: string, productData: Partial<Product>): Promise<Product> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      const index = products.findIndex(p => p._id === id);
      if (index !== -1) {
        products[index] = { ...products[index], ...productData };
        localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
        resolve(products[index]);
      } else {
        reject(new Error("Product not found"));
      }
    }, 400);
  });
};

export const deleteProduct = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const products: Product[] = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]');
      const filtered = products.filter(p => p._id !== id);
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(filtered));
      
      // Also delete associated components
      const components: ProductComponent[] = JSON.parse(localStorage.getItem(COMPONENTS_KEY) || '[]');
      const filteredComponents = components.filter(c => c.productId !== id);
      localStorage.setItem(COMPONENTS_KEY, JSON.stringify(filteredComponents));

      resolve();
    }, 400);
  });
};

// --- COMPONENT SERVICES (Simulating Backend API) ---

export const fetchComponentsByProductId = async (productId: string): Promise<ProductComponent[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const components: ProductComponent[] = JSON.parse(localStorage.getItem(COMPONENTS_KEY) || '[]');
      resolve(components.filter(c => c.productId === productId));
    }, 200);
  });
};

export const fetchComponentById = async (id: string): Promise<ProductComponent | undefined> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const components: ProductComponent[] = JSON.parse(localStorage.getItem(COMPONENTS_KEY) || '[]');
      resolve(components.find(c => c._id === id));
    }, 200);
  });
};

export const createComponent = async (productId: string, componentData: Omit<ProductComponent, '_id' | 'productId'>): Promise<ProductComponent> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const components: ProductComponent[] = JSON.parse(localStorage.getItem(COMPONENTS_KEY) || '[]');
      const newComponent: ProductComponent = {
        ...componentData,
        _id: Date.now().toString(),
        productId
      };
      components.push(newComponent);
      localStorage.setItem(COMPONENTS_KEY, JSON.stringify(components));
      resolve(newComponent);
    }, 300);
  });
};

export const updateComponent = async (id: string, componentData: Partial<ProductComponent>): Promise<ProductComponent> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const components: ProductComponent[] = JSON.parse(localStorage.getItem(COMPONENTS_KEY) || '[]');
      const index = components.findIndex(c => c._id === id);
      if (index !== -1) {
        components[index] = { ...components[index], ...componentData };
        localStorage.setItem(COMPONENTS_KEY, JSON.stringify(components));
        resolve(components[index]);
      } else {
        reject(new Error("Component not found"));
      }
    }, 300);
  });
};

export const deleteComponent = async (id: string): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const components: ProductComponent[] = JSON.parse(localStorage.getItem(COMPONENTS_KEY) || '[]');
      const filtered = components.filter(c => c._id !== id);
      localStorage.setItem(COMPONENTS_KEY, JSON.stringify(filtered));
      resolve();
    }, 300);
  });
};