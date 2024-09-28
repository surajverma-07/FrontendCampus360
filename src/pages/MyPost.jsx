import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { User, MessageSquare, Heart } from 'lucide-react';
import { Box, Container, Grid, Typography, Button, TextField, Card, CardContent, CardMedia, CardActions, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';

function MyPost() {
  const [posts, setPosts] = useState([]);
  const [visibleComments, setVisibleComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [selectedPost, setSelectedPost] = useState(null);
  const [open, setOpen] = useState(false);

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

  const handleClickOpen = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 10, p: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        My Posts
      </Typography>
      <Grid container spacing={2} sx={{ justifyContent: 'center' }}>
        {posts ? posts.map((post) => (
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
                component="img"
                height="140"
                image={post.postImage}
                alt={post.content}
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {post.content}
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: 'space-between' }}>
                <Grid container spacing={2}>
                  <Grid item >
                    <IconButton aria-label="like" onClick={() => handleLike(post._id)}>
                      <Heart size={20 }
                        fill={post.isLiked ? "red" : "none"}
                        color={post.isLiked ? "red" : "currentColor"}
                      />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {post.likeCount} {post.likeCount === 1 ? 'Like' : 'Likes'}
                      </Typography>
                    </IconButton>
                  </Grid>
                  <Grid item>
                    <IconButton aria-label="comment" onClick={() => toggleComments(post._id)}>
                      <MessageSquare size={20} />
                      <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        Comments ({post.comments.length})
                      </Typography>
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item>
                    <Button variant="contained" color="primary" size="small" onClick={() => handleClickOpen(post)}>Update</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="error" size="small" onClick={() => handleDelete(post._id)}>Delete</Button>
                  </Grid>
                </Grid>
              </CardActions>
              {visibleComments[post._id] && (
                <CardContent>
                  {post.comments.map((comment, index) => (
                    <div key={index} className="mb-2 last:mb-0">
                      <Typography variant="body2" color="text.secondary">
                        {comment.commentedBy.name}
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
                      onChange={(e) => setNewComments(prev => ({ ...prev, [post._id]: e.target.value }))}
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
        )) : "No Post Available"}
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Update Post
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              type="text"
              value={selectedPost ? selectedPost.content : ""}
              onChange={(e) => setSelectedPost({ ...selectedPost, content: e.target.value })}
              placeholder="Content"
              fullWidth
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleUpdate(selectedPost._id)} autoFocus>
            Update Post
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyPost;