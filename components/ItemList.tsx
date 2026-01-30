import React from 'react';
import { Item } from '../types';

interface ItemListProps {
  items: Item[];
  onDelete: (id: string) => void;
  onEdit: (item: Item) => void;
  onToggleComplete: (id: string, currentStatus: boolean) => void;
  loading: boolean;
}

const ItemList: React.FC<ItemListProps> = ({ items, onDelete, onEdit, onToggleComplete, loading }) => {
  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading items...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-dashed border-gray-300">
        <p className="text-gray-500">No items found. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Your Items ({items.length})</h2>
      <ul className="space-y-3">
        {items.map((item) => (
          <li 
            key={item._id} 
            className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${item.isCompleted ? 'opacity-75 bg-gray-50' : ''}`}
          >
            <div className="flex items-start gap-3 flex-1 cursor-pointer" onClick={() => onToggleComplete(item._id, item.isCompleted)}>
              <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${item.isCompleted ? 'border-green-500 bg-green-500' : 'border-gray-300'}`}>
                {item.isCompleted && (
                  <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <div>
                <h3 className={`font-semibold text-lg ${item.isCompleted ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {item.name}
                </h3>
                {item.description && (
                  <p className={`text-sm ${item.isCompleted ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.description}
                  </p>
                )}
                <span className="text-xs text-gray-400 mt-1 block">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:self-center self-end">
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-800 px-3 py-1 text-sm font-medium transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemList;