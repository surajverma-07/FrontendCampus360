import React, { useState, useEffect } from 'react';
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
  Paper
} from '@mui/material';
import { Person, Group, EventNote, Flag } from '@mui/icons-material';

// Mock API calls (replace these with actual API calls)
const fetchProfile = () => Promise.resolve({ name: 'Admin', email: 'admin@example.com', college: 'Example University' });
const fetchUsers = () => Promise.resolve([
  { id: 1, name: 'User 1', email: 'user1@example.com', isBlocked: false },
  { id: 2, name: 'User 2', email: 'user2@example.com', isBlocked: true },
]);
const fetchEventOrganizerApplications = () => Promise.resolve([
  { id: 1, name: 'Applicant 1', email: 'applicant1@example.com' },
  { id: 2, name: 'Applicant 2', email: 'applicant2@example.com' },
]);
const fetchReportedUsers = () => Promise.resolve([
  { id: 1, name: 'Reported User 1', email: 'reported1@example.com', reportCount: 2 },
  { id: 2, name: 'Reported User 2', email: 'reported2@example.com', reportCount: 1 },
]);

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
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function AdminPanel() {
  const [tabValue, setTabValue] = useState(0);
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [reportedUsers, setReportedUsers] = useState([]);

  useEffect(() => {
    fetchProfile().then(setProfile);
    fetchUsers().then(setUsers);
    fetchEventOrganizerApplications().then(setApplications);
    fetchReportedUsers().then(setReportedUsers);
  }, []);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Implement profile update logic
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Implement password change logic
  };

  const handleBlockUser = (userId) => {
    // Implement user block logic
  };

  const handleUnblockUser = (userId) => {
    // Implement user unblock logic
  };

  const handleApproveApplication = (userId) => {
    // Implement application approval logic
  };

  const handleRejectApplication = (userId) => {
    // Implement application rejection logic
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Admin Panel
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="admin panel tabs">
          <Tab icon={<Person />} label="Profile" />
          <Tab icon={<Group />} label="Users" />
          <Tab icon={<EventNote />} label="Applications" />
          <Tab icon={<Flag />} label="Reported Users" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Card>
            <CardContent>
              {profile && (
                <form onSubmit={handleUpdateProfile}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    defaultValue={profile.name}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    defaultValue={profile.email}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="College"
                    defaultValue={profile.college}
                  />
                  <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                    Update Profile
                  </Button>
                </form>
              )}
              <form onSubmit={handleChangePassword} style={{ marginTop: '2rem' }}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Old Password"
                  type="password"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="New Password"
                  type="password"
                />
                <Button type="submit" variant="contained" color="secondary" sx={{ mt: 2 }}>
                  Change Password
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      {user.isBlocked ? (
                        <Button onClick={() => handleUnblockUser(user.id)} variant="contained" color="primary">
                          Unblock
                        </Button>
                      ) : (
                        <Button onClick={() => handleBlockUser(user.id)} variant="contained" color="secondary">
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

        <TabPanel value={tabValue} index={2}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>{application.name}</TableCell>
                    <TableCell>{application.email}</TableCell>
                    <TableCell>
                      <Button
                        onClick={() => handleApproveApplication(application.id)}
                        variant="contained"
                        color="primary"
                        sx={{ mr: 1 }}
                      >
                        Approve
                      </Button>
                      <Button
                        onClick={() => handleRejectApplication(application.id)}
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

        <TabPanel value={tabValue} index={3}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Report Count</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportedUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.reportCount}</TableCell>
                    <TableCell>
                      <Button onClick={() => handleBlockUser(user.id)} variant="contained" color="secondary">
                        Block
                      </Button>
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