import React, { useState } from 'react';
import axios from 'axios';

const AddPost = () => {
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', content);
    if (file) {
      formData.append('postImage', file);
    }

    try {
      const response = await axios.post('http://localhost:3000/api/v1/campus-connect/post/add', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error while adding post');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add a New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
          <textarea
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>  
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Image:</label>
          <input
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
        </div>
        <button
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
          type="submit"
        >
          Add Post
        </button>
      </form>
      {message && <p className="mt-4 text-center text-green-500">{message}</p>}
    </div>
  );
};

export default AddPost;