import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { User, MessageSquare, Heart } from 'lucide-react';

function AllPost() {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [newComments, setNewComments] = useState({});

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/post/all', { withCredentials: true });
      setPosts(response.data.data.posts);
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

  return (
    <div className="container mx-auto px-8 md:px-4 pt-32 md:pt-6 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8">All Posts</h1>
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
                  <span className="ml-2 text-sm">Comments ({post.comments.length})</span>
                </button>
                <button className="flex items-center" onClick={() => handleLike(post._id)}>
                  <Heart 
                    size={20} 
                    fill={post.isLiked ? "red" : "none"} 
                    color={post.isLiked ? "red" : "currentColor"}
                  />
                  <span className="ml-2 text-sm">Like ({post.likeCount})</span>
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
             
            </div>
          </div>
        )) : "No Post Available"}
      </div>
    </div>
  );
}

export default AllPost;