import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import axios from "axios";

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    rollnum:'',  // Adjusted field name
    email: '',
    password: '',
    college: '',
    course: '',
    branch_section: '', 
    year: ''  // Adjusted field name
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send form data as a JSON object
      const response = await axios.post('http://localhost:3000/api/v1/campus-connect/user/register', formData,{
        withCredentials: true
      });
      console.log('Sign up successful:', response.data);
    } catch (error) {
      console.error('Sign up error:', error);
    }
  };

  return (
    <div>
      <p className='text-center text-4xl mb-10'>Sign Up</p>

      <form onSubmit={handleSubmit} className='flex gap-4 md:flex-row flex-col'>
        <div className='md:w-1/2 h-full md:h-1/2 w-full'>
          <img src='/signup.png' alt='Sign Up' />
        </div>
        <div className='md:w-1/2 flex flex-col gap-4 h-full md:h-1/2 px-14 w-full'>
          <TextField
            name='name'
            onChange={handleChange}
            label='Name'
            variant='outlined'
            value={formData.name}
          />
          <TextField
            name='username'
            onChange={handleChange}
            label='Username'
            variant='outlined'
            value={formData.username}
          />
          <TextField
            name='rollnum'  // Adjusted field name
            onChange={handleChange}
            label='Roll No.'
            variant='outlined'
            value={formData.rollnum}
          />
          <TextField
            name='email'
            onChange={handleChange}
            label='Email'
            variant='outlined'
            value={formData.email}
          />
          <TextField
            name='password'
            onChange={handleChange}
            type='password'
            label='Password'
            variant='outlined'
            value={formData.password}
          />
          <TextField
            name='college'
            onChange={handleChange}
            label='College'
            variant='outlined'
            value={formData.college}
          />
          <TextField
            name='course'
            onChange={handleChange}
            label='Course'
            variant='outlined'
            value={formData.course}
          />
          <TextField
            name='branch_section'  // Adjusted field name
            onChange={handleChange}
            label='Branch & Section'
            variant='outlined'
            value={formData.branch_section}
          />
          <TextField
            name='year'
            onChange={handleChange}
            label='Year'
            variant='outlined'
            value={formData.year}
          />
          <Button variant="outlined" type="submit" className="w-56 h-14">
            Create Account
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
