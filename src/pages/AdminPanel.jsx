// AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { Person, Group, EventNote, Flag } from '@mui/icons-material';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default function AdminPanel() {
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    college: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: '',
    newPassword: '',
  });

  // Fetch data when component mounts
  useEffect(() => {
    fetchProfile();
    fetchUsers();
    fetchEventOrganizerApplications();
    fetchReportedUsers();
  }, []);

  // Function to handle tab changes
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Fetch Admin Profile
  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/campus-connect/admin/profile/',
        { withCredentials: true }
      );
      setProfile(response.data.data.admin);
      setProfileForm({
        name: response.data.data.admin.name,
        email: response.data.data.admin.email,
        college: response.data.data.admin.college,
      });
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/campus-connect/admin/users/',
        { withCredentials: true }
      );
      setUsers(response.data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch event organizer applications
  const fetchEventOrganizerApplications = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/campus-connect/admin/applications/',
        { withCredentials: true }
      );
      setApplications(response.data.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Fetch reported users
  const fetchReportedUsers = async () => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/campus-connect/admin/reported-users/',
        { withCredentials: true }
      );
      setReportedUsers(response.data.data.reportedUsers);
    } catch (error) {
      console.error('Error fetching reported users:', error);
    }
  };

  // Handle profile form change
  const handleProfileFormChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  // Handle password form change
  const handlePasswordFormChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  // Update admin profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        'http://localhost:3000/api/v1/campus-connect/admin/update-details/',
        profileForm,
        { withCredentials: true }
      );
      alert('Profile updated successfully');
      fetchProfile(); // Refresh profile data
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  // Change admin password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        'http://localhost:3000/api/v1/campus-connect/admin/change-password/',
        passwordForm,
        { withCredentials: true }
      );
      alert('Password changed successfully');
      setPasswordForm({ oldPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  // Block user
  const handleBlockUser = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/campus-connect/admin/block-user/${userId}`,
        {},
        { withCredentials: true }
      );
      alert('User blocked successfully');
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error blocking user:', error);
      alert('Failed to block user');
    }
  };

  // Unblock user
  const handleUnblockUser = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/campus-connect/admin/unblock-user/${userId}`,
        {},
        { withCredentials: true }
      );
      alert('User unblocked successfully');
      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error unblocking user:', error);
      alert('Failed to unblock user');
    }
  };

  // Approve application
  const handleApproveApplication = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/campus-connect/admin/approve-application/${userId}`,
        {},
        { withCredentials: true }
      );
      alert('Application approved successfully');
      fetchEventOrganizerApplications(); // Refresh applications
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Failed to approve application');
    }
  };

  // Reject application
  const handleRejectApplication = async (userId) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/campus-connect/admin/reject-application/${userId}`,
        {},
        { withCredentials: true }
      );
      alert('Application rejected successfully');
      fetchEventOrganizerApplications(); // Refresh applications
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Failed to reject application');
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Container */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        {/* Tabs */}
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin panel tabs">
          <Tab icon={<Person />} label="Profile" />
          <Tab icon={<Group />} label="Users" />
          <Tab icon={<EventNote />} label="Applications" />
          <Tab icon={<Flag />} label="Reported Users" />
        </Tabs>

        {/* Tab Panels */}
        {/* Profile Tab */}
        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardContent>
              {profile && (
                <>
                  <form onSubmit={handleUpdateProfile}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Name"
                      name="name"
                      value={profileForm.name}
                      onChange={handleProfileFormChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Email"
                      name="email"
                      value={profileForm.email}
                      onChange={handleProfileFormChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="College"
                      name="college"
                      value={profileForm.college}
                      onChange={handleProfileFormChange}
                    />
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                      Update Profile
                    </Button>
                  </form>
                  <form onSubmit={handleChangePassword} style={{ marginTop: '2rem' }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Old Password"
                      name="oldPassword"
                      type="password"
                      value={passwordForm.oldPassword}
                      onChange={handlePasswordFormChange}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="New Password"
                      name="newPassword"
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordFormChange}
                    />
                    <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
                      Change Password
                    </Button>
                  </form>
                </>
              )}
            </CardContent>
          </Card>
        </TabPanel>

        {/* Users Tab */}
        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Blocked</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.college}</TableCell>
                    <TableCell>{user.isBlocked ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <Button
                          onClick={() => handleUnblockUser(user._id)}
                          variant="contained"
                          color="primary"
                        >
                          Unblock
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleBlockUser(user._id)}
                          variant="contained"
                          color="secondary"
                        >
                          Block
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Applications Tab */}
        <TabPanel value={tabValue} index={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application._id}>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>{application.college}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleApproveApplication(application._id)}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleRejectApplication(application._id)}
                        variant="contained"
                        color="secondary"
                      >
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        {/* Reported Users Tab */}
        <TabPanel value={tabValue} index={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Report Count</TableCell>
                  <TableCell>College</TableCell>
                  <TableCell>Blocked</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedUsers.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.reportCount}</TableCell>
                    <TableCell>{user.college}</TableCell>
                    <TableCell>{user.isBlocked ? 'Yes' : 'No'}</TableCell>
                    <TableCell>
                      {!user.isBlocked && (
                        <Button
                          onClick={() => handleBlockUser(user._id)}
                          variant="contained"
                          color="secondary"
                        >
                          Block
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>
      </Container>
    </Box>
  );
}
