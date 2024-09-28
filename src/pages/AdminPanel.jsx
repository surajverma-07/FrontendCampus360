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
  const [profileForm, setProfileForm] = useState({ name: '', email: '', college: '' });
  const [passwordForm, setPasswordForm] = useState({ oldPassword: '', newPassword: '' });

  // Fetch data when component mounts
  useEffect(() => {
    fetchProfile();
    fetchUsers();
    fetchEventOrganizerApplications();
    fetchReportedUsers();
  }, []);

  // Handle tab changes
  const handleTabChange = (event, newValue) => setTabValue(newValue);

  // Fetch Admin Profile
  const fetchProfile = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/campus-connect/admin/profile/', { withCredentials: true });
      setProfile(data.data.admin);
      setProfileForm(data.data.admin);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/campus-connect/admin/users/', { withCredentials: true });
      setUsers(data.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Fetch event organizer applications
  const fetchEventOrganizerApplications = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/campus-connect/admin/applications/', { withCredentials: true });
      setApplications(data.data.applications);
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  // Fetch reported users
  const fetchReportedUsers = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/v1/campus-connect/admin/reported-users/', { withCredentials: true });
      setReportedUsers(data.data.reportedUsers);
    } catch (error) {
      console.error('Error fetching reported users:', error);
    }
  };

  // Handle form changes
  const handleProfileFormChange = (e) => setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  const handlePasswordFormChange = (e) => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  // Update admin profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:3000/api/v1/campus-connect/admin/update-details/', profileForm, { withCredentials: true });
      alert('Profile updated successfully');
      fetchProfile();
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  // Change admin password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.patch('http://localhost:3000/api/v1/campus-connect/admin/change-password/', passwordForm, { withCredentials: true });
      alert('Password changed successfully');
      setPasswordForm({ oldPassword: '', newPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  // Block/Unblock user
  const handleUserBlockToggle = async (userId, action) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/campus-connect/admin/${action}-user/${userId}`, {}, { withCredentials: true });
      alert(`User ${action === 'block' ? 'blocked' : 'unblocked'} successfully`);
      fetchUsers();
    } catch (error) {
      console.error(`Error ${action === 'block' ? 'blocking' : 'unblocking'} user:`, error);
      alert(`Failed to ${action === 'block' ? 'block' : 'unblock'} user`);
    }
  };

  // Approve/Reject application
  const handleApplicationAction = async (userId, action) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/campus-connect/admin/${action}-application/${userId}`, {}, { withCredentials: true });
      alert(`Application ${action === 'approve' ? 'approved' : 'rejected'} successfully`);
      fetchEventOrganizerApplications();
    } catch (error) {
      console.error(`Error ${action === 'approve' ? 'approving' : 'rejecting'} application:`, error);
      alert(`Failed to ${action === 'approve' ? 'approve' : 'reject'} application`);
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
                      <Button
                        onClick={() => handleUserBlockToggle(user._id, user.isBlocked ? 'unblock' : 'block')}
                        variant="contained"
                        color={user.isBlocked ? 'success' : 'error'}
                      >
                        {user.isBlocked ? 'Unblock' : 'Block'}
                      </Button>
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
                  <TableCell>User ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.userId}>
                    <TableCell>{app.userId}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.email}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleApplicationAction(app.userId, 'approve')} variant="contained" color="success">
                        Approve
                      </Button>
                      <Button onClick={() => handleApplicationAction(app.userId, 'reject')} variant="contained" color="error">
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
                  <TableCell>Reports</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedUsers.map((report) => (
                  <TableRow key={report.userId}>
                    <TableCell>{report.name}</TableCell>
                    <TableCell>{report.email}</TableCell>
                    <TableCell>{report.reportCount}</TableCell>
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
