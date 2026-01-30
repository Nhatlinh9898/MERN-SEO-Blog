import React, { useState, useEffect } from 'react';
import { ItemInput, Item } from '../types';

interface ItemFormProps {
  onSave: (data: ItemInput) => void;
  editingItem: Item | null;
  onCancelEdit: () => void;
}

const ItemForm: React.FC<ItemFormProps> = ({ onSave, editingItem, onCancelEdit }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (editingItem) {
      setName(editingItem.name);
      setDescription(editingItem.description || '');
    } else {
      setName('');
      setDescription('');
    }
  }, [editingItem]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert('Please add a name');
      return;
    }
    onSave({ name, description });
    
    // Only reset if not editing (if editing, parent handles flow)
    if (!editingItem) {
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-200">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        {editingItem ? 'Edit Item' : 'Add New Item'}
      </h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Item Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Buy Milk"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Optional details..."
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
        >
          {editingItem ? 'Update Item' : 'Add Item'}
        </button>
        
        {editingItem && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ItemForm;