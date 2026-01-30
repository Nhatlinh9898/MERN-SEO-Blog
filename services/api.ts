import { Item, ItemInput } from '../types';

// CONSTANTS representing DB Collection
const STORAGE_KEY = 'mern_app_items';

// Helper to mimic network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// --- SIMULATED BACKEND CONTROLLERS ---

export const getItems = async (): Promise<Item[]> => {
  await delay(300); // Simulate network latency
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const createItem = async (data: ItemInput): Promise<Item> => {
  await delay(300);
  const items = await getItems();
  
  const newItem: Item = {
    _id: Date.now().toString(), // Mock ObjectId
    name: data.name,
    description: data.description || '',
    isCompleted: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  items.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return newItem;
};

export const updateItem = async (id: string, updates: Partial<Item>): Promise<Item> => {
  await delay(300);
  const items = await getItems();
  const index = items.findIndex((i) => i._id === id);

  if (index === -1) throw new Error('Item not found');

  const updatedItem = {
    ...items[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  };

  items[index] = updatedItem;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  return updatedItem;
};

export const deleteItem = async (id: string): Promise<void> => {
  await delay(300);
  const items = await getItems();
  const filteredItems = items.filter((i) => i._id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredItems));
};