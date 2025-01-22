import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { User, MessageSquare, Heart } from "lucide-react";
import { userState } from "../context/UserContext";
import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, IconButton, Avatar } from '@mui/material';

function AllPost() {
  const [posts, setPosts] = useState([]);
  const { userData, setUserData, isAuthorized, setisAuthorized } = userState();

  const [visibleComments, setVisibleComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthorized) {
      navigate("/login");
    }

    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/campus-connect/post/all",
        { withCredentials: true }
      );
      setPosts(response.data.data.posts);
    } catch (error) {
      toast.error("Failed to fetch posts!");
    }
  };

  const toggleComments = (postId) => {
    setVisibleComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleLike = async (postId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/campus-connect/post/like-unlike/${postId}`,
        {},
        { withCredentials: true }
      );
      fetchPosts(); // Refetch posts to update likes
    } catch (error) {
      toast.error("Failed to like/unlike post");
    }
  };

  const handleComment = async (postId) => {
    try {
      await axios.post(
        `http://localhost:3000/api/v1/campus-connect/post/comment/${postId}`,
        { commentText: newComments[postId] },
        { withCredentials: true }
      );
      setNewComments((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts(); // Refetch posts to update comments
      toast.success("Comment added successfully");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        All Posts
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {posts
          ? posts.map((post) => (
              <Grid item xs={12} md={6} lg={4} xl={3} key={post._id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                      <Grid item>
                        <Avatar src={post.postedBy.profileImage} sx={{ width: 40, height: 40 }} />
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" color="text.secondary">
                          {post.postedBy.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.college}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardMedia
                  sx={{ width: 250, height: 250 }}
                    component="img"
                    // height="140"
                    image={post.postImage}
                    alt={post.content}
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {post.content}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <IconButton aria-label="like" onClick={() => handleLike(post._id)}>
                      <Heart
                        size={20}
                        fill={post.isLiked ? "red" : "none"}
                        color={post.isLiked ? "red" : "currentColor"}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {post.likeCount} {post.likeCount === 1 ? 'Like' : 'Likes'}
                      </Typography>
                    </IconButton>
                    <IconButton aria-label="comment" onClick={() => toggleComments(post._id)}>
                      <MessageSquare size={20} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        Comments ({post.comments.length})
                      </Typography>
                    </IconButton>
                  </CardActions>
                  {visibleComments[post._id] && (
                    <CardContent>
                      {post.comments .map((comment, index) => (
                        <div key={index} className="mb-2 last:mb-0">
                          <Typography variant="body2" color="text.secondary">
                            {comment.commentedBy.name }
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {comment.commentText}
                          </Typography>
                        </div>
                      ))}
                      <div className="mt-2">
                        <TextField
                          type="text"
                          value={newComments[post._id] || ""}
                          onChange={(e) =>
                            setNewComments((prev) => ({
                              ...prev,
                              [post._id]: e.target.value,
                            }))
                          }
                          placeholder="Add a comment..."
                          fullWidth
                        />
                        <Button
                          onClick={() => handleComment(post._id)}
                          variant="contained"
                          sx={{ mt: 2 }}
                        >
                          Post Comment
                        </Button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </Grid>
            ))
          : "No Post Available"}
      </Grid>
    </Container>
  );
}

export default AllPost;