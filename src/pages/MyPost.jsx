import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { User, MessageSquare, Heart } from 'lucide-react';

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/post/my', { withCredentials: true });
      setPosts(response.data.data.posts);
      console.log(response.data.data.posts);
    } catch (error) {
      toast.error('Failed to fetch posts!');
    }
  };

  const toggleComments = (postId) => {
    setVisibleComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/campus-connect/post/like-unlike/${postId}`, {}, { withCredentials: true });
      fetchPosts(); // Refetch posts to update likes
    } catch (error) {
      toast.error('Failed to like/unlike post');
    }
  };

  const handleComment = async (postId) => {
    try {
      await axios.post(`http://localhost:3000/api/v1/campus-connect/post/comment/${postId}`, 
        { commentText: newComments[postId] }, 
        { withCredentials: true }
      );
      setNewComments(prev => ({ ...prev, [postId]: '' }));
      fetchPosts(); // Refetch posts to update comments
      toast.success('Comment added successfully');
    } catch (error) {
      toast.error('Failed to add comment');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/campus-connect/post/update/${id}`, 
        { content: selectedPost.content }, 
        { withCredentials: true }
      );
      toast.success('Post updated successfully!');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to update post!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-connect/post/delete/${id}`, { withCredentials: true });
      toast.success('Post deleted successfully!');
      fetchPosts();
    } catch (error) {
      toast.error('Failed to delete post!');
    }
  };

  return (
    <div className="container mx-auto px-8 md:px-4 pt-32 md:pt-6 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8">My Posts</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {posts ? posts.map((post) => (
          <div key={post._id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 text-black">
            <div className="p-4">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center overflow-hidden">
                  {post.postedBy.profileImage ? (
                    <img src={post.postedBy.profileImage} alt={post.postedBy.name} className="w-full h-full object-cover" />
                  ) : (
                    <User className="text-white" size={20} />
                  )}
                </div>
                <div className="ml-3">
                  <h2 className="font-bold text-sm">{post.postedBy.name}</h2>
                  <p className="text-xs text-gray-500">{post.college}</p>
                </div>
              </div>
              <div className="bg-white rounded-lg aspect-square flex items-center justify-center mb-4 overflow-hidden">
                <img src={post.postImage} alt={post.content} className="w-full h-full object-cover" />
              </div>
              <p className="text-sm mb-4">{post.content}</p>
              <div className="flex justify-between text-gray-500 mb-4">
                <button className="flex items-center" onClick={() => toggleComments(post._id)}>
                  <MessageSquare size={20} />
                  <span className="ml-2 text-sm">Comments ({post.comments .length})</span>
                </button>
                <button className="flex items-center" onClick={() => handleLike(post._id)}>
                  <Heart 
                    size={20} 
                    fill={post.isLiked ? "red" : "none"} 
                    color={post.isLiked ? "red" : "currentColor"}
                  />
                  <span className="ml-2 text-sm">Like ({post.likeCount})</span>
                </button>
                <button className="flex items-center" onClick={() => setSelectedPost(post)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75-.75h.665a.75.75 0 01.75.75v16.69a.75.75 0 01-.75.75h-.665a.75.75 0 01-.75-.75v-16.69zm-3.75 12.69a.75.75 0 00-1.5 0v-3.38a.75.75 0 00-1.5 0v3.38a.75.75 0 001.5 0zm3.75 0a.75.75 0 00-1.5 0v-3.38a.75.75 0 00-1.5 0v3.38a.75.75 0 001.5 0z" />
                  </svg>
                  <span className="ml-2 text-sm">Edit</span>
                </button>
                <button className="flex items-center" onClick={() => handleDelete(post._id)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75-.75h.665a.75.75 0 01.75.75v16.69a.75.75 0 01-.75.75h-.665a.75.75 0 01-.75-.75v-16.69zm-3.75 12.69a.75.75 0 00-1.5 0v-3.38a.75.75 0 00-1.5 0v3.38a.75.75 0 001.5 0zm3.75 0a.75.75 0 00-1.5 0v-3.38a.75.75 0 00-1.5 0v3.38a.75.75 0 001.5 0z" />
                  </svg>
                  <span className="ml-2 text-sm">Delete</span>
                </button>
              </div>
              {visibleComments[post._id] && (
                <div className="bg-gray-200 p-3 rounded-lg mb-4">
                  {post.comments.map((comment, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <p className="font-bold text-sm">{comment.commentedBy.name}</p>
                      <p className="text-sm">{comment.commentText}</p>
                    </div>
                  ))}
                  <div className="mt-2">
                    <input
                      type="text"
                      value={newComments[post._id] || ''}
                      onChange={(e) => setNewComments(prev => ({ ...prev, [post._id]: e.target.value }))}
                      placeholder="Add a comment..."
                      className="w-full p-2 rounded-md"
                    />
                    <button 
                      onClick={() => handleComment(post._id)}
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              )}
              {selectedPost && selectedPost._id === post._id && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center">
                  <div className="bg-gray-200 p-4 rounded-lg w-1/2">
                    <h2 className="text-2xl font-bold mb-4">Update Post</h2>
                    <form>
                      <label>
                        Content:
                        <textarea
                          value={selectedPost.content}
                          onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
                          className="w-full p-2 rounded-md"
                        />
                      </label>
                      <br />
                      <button
                        className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                        onClick={() => handleUpdate(selectedPost._id)}
                      >
                        Update
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                        onClick={() => setSelectedPost(null)}
                      >
                        Cancel
                      </button>
                    </form>
                  </div>
                </div>
              )}
            </div>
          </div>
        )) : "No Post Available"}
      </div>
    </div>
  );
}

export default MyPost;