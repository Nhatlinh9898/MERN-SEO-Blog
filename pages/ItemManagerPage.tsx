import React, { useState, useEffect } from 'react';
import ItemList from '../components/ItemList';
import ItemForm from '../components/ItemForm';
import { Item, ItemInput } from '../types';
import * as api from '../services/api';
import SeoHelmet from '../components/SeoHelmet';

const ItemManagerPage: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const data = await api.getItems();
      setItems(data.reverse());
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveItem = async (data: ItemInput) => {
    try {
      setError(null);
      if (editingItem) {
        const updated = await api.updateItem(editingItem._id, data);
        setItems((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
        setEditingItem(null);
      } else {
        const created = await api.createItem(data);
        setItems((prev) => [created, ...prev]);
      }
    } catch (err: any) {
      setError('Failed to save item: ' + err.message);
    }
  };

  const handleDeleteItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await api.deleteItem(id);
      setItems((prev) => prev.filter((item) => item._id !== id));
      if (editingItem?._id === id) setEditingItem(null);
    } catch (err: any) {
      setError('Failed to delete item: ' + err.message);
    }
  };

  const handleToggleComplete = async (id: string, currentStatus: boolean) => {
    try {
      const updated = await api.updateItem(id, { isCompleted: !currentStatus });
      setItems((prev) => prev.map((item) => (item._id === id ? updated : item)));
    } catch (err: any) {
      setError('Failed to update status: ' + err.message);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 animate-fade-in max-w-3xl">
       <SeoHelmet title="Task Manager - MERN App" description="Manage your daily tasks." />
       
       <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
          <p className="text-gray-500">A simple CRUD example using local storage</p>
       </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 flex justify-between items-center">
            <span>{error}</span>
            <button onClick={() => setError(null)} className="font-bold">×</button>
          </div>
        )}

        <ItemForm 
          onSave={handleSaveItem} 
          editingItem={editingItem} 
          onCancelEdit={() => setEditingItem(null)}
        />

        <ItemList
          items={items}
          loading={loading}
          onDelete={handleDeleteItem}
          onEdit={setEditingItem}
          onToggleComplete={handleToggleComplete}
        />
    </div>
  );
};

export default ItemManagerPage;