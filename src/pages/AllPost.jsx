import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function AllPost() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/campus-connect/post/all',{withCredentials:true});
        setPosts(response.data.posts);
        console.log("posts : ", response.data.posts);
      } catch (error) {
        toast.error('Failed to fetch posts!');
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto px-8 md:px-4 pt-32 md:pt-6 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8 ">All Posts</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {posts ?  posts.map((post) => (
          <div
            key={post._id}
            className="bg-[#212931] rounded-lg shadow-md p-6 w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4"
          >
            <img
              src={post.postImage}
              alt={post.content}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-[#66D9EF] mb-4">
              {post.content}
            </h2>
            <p className="text-[#C7C5B8]">Posted by: {post.postedBy.name}</p>
            <p className="text-[#C7C5B8]">College: {post.college}</p>
            <p className="text-[#C7C5B8]">Likes: {post.likesCount}</p>
            <div className="flex flex-wrap gap-x-4">
              {post.comments.map((comment) => (
                <div key={comment.commentedAt} className="bg-[#2F343A] rounded-lg shadow-md p-4 w-full">
                  <p className="text-[#C7C5B8]">{comment.commentText}</p>
                  <p className="text-[#C7C5B8]">Commented by: {comment.commentedBy.name}</p>
                  <p className="text-[#C7C5B8]">Commented at: {comment.commentedAt}</p>
                </div>
              ))}
            </div>
            <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4">
              <Link to={`/post/${post._id}`}>Details</Link>
            </button>
          </div>
        ))
        :"<div> No Post Available </div>"}
       
      </div>
    </div>
  );
}

export default AllPost;