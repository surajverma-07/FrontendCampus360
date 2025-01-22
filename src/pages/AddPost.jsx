import React, { useState } from "react";
import { Typography, Button, TextField, Box, Grid } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const navigate = useNavigate();
const AddPost = () => {
  const [formData, setFormData] = useState({
    content: "",
  });
  const [postImage, setPostImage] = useState(null);
  const [loading,setLoading] = useState(false);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPostImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("content", formData.content);
    if (postImage) {
      formDataToSend.append("postImage", postImage);
    }

    try {
      const response = await axios.post("http://localhost:3000/api/v1/campus-connect/post/add", formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      // Handle response
      setLoading(true)
      toast.success("Post Added Successfully")
      navigate('/post/my-posts');

    } catch (error) {
      // Handle error
      setLoading(false)
      toast.error(`Error in adding post ${error}`,)
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
      <Typography variant="h6" gutterBottom>
        Add New Post
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            name="content"
            label="Post Content"
            fullWidth
            multiline
            rows={4}
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="raised-button-file">
            <Button variant="contained" component="span">
              Upload Post Image
            </Button>
          </label>
          {postImage && <Typography variant="body2">{postImage.name}</Typography>}
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {loading?"Loading...":"Add Post"}
      </Button>
    </Box>
  );
};

export default AddPost;
