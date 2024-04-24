import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

export const UpdateBookModal = ({ book, onClose, onUpdate }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [price, setPrice] = useState(book.price);


  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ ...book, title, status });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl">
        <button onClick={onClose} className="absolute top-0 right-0 m-4 text-gray-600 hover:text-gray-800">
          <FaTimes size={20} />
        </button>
        <form onSubmit={handleSubmit}>
          <h2 className="font-bold text-2xl mb-6">Update Book</h2>
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
            
            />
          </div>
            <div className="mb-4">
                <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
                <input
                type="text"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
                <input
                type="number"
                id="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm"
                
                />
            </div>
            
          
        
          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={onClose} className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200">Cancel</button>
            <button type="submit" className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
