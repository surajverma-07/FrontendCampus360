import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Avatar from "@mui/material/Avatar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";
import LogoutIcon from "@mui/icons-material/Logout";
import { userState } from "../context/UserContext";
import FormControl from '@mui/material/FormControl';
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, isAuthorized, setisAuthorized } = userState();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/campus-connect/user/logout",
      { withCredentials: true }
    );
    navigate("/");
  };

  return (
    <>
      <div className="w-screen h-16 md:mb-4 flex items-center justify-between">
        <div className="text-3xl md:ml-4 ml-1">
          <Link to={"/"}>Campus360</Link>
        </div>

        <div className="md:hidden">
          <Button onClick={toggleDrawer(true)}>
            <AddIcon />
          </Button>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
            >
              <List>
                <Link to={"/"}>
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        <SchoolIcon />
                      </ListItemIcon>
                      <ListItemText primary="Campus360" />
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />

                {isAuthorized ? (
                  <>
                   <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={""}
          label="Age"
          // onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
 <ListItem disablePadding onClick={handleLogout}>
                      <ListItemButton>
                        <ListItemIcon>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText primary={"Logout"} />
                      </ListItemButton>
                    </ListItem>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <PersonAddAltIcon />
                          </ListItemIcon>
                          <ListItemText primary={"Login"} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                    <Divider />

                    <Link to={"/signup"}>
                      <ListItem disablePadding>
                        <ListItemButton>
                          <ListItemIcon>
                            <PersonPinIcon />
                          </ListItemIcon>
                          <ListItemText primary={"Signup"} />
                        </ListItemButton>
                      </ListItem>
                    </Link>
                  </>
                )}
              </List>
            </Box>
          </Drawer>
        </div>

        <div className="md:mr-5 hidden text-xl mr-1 md:flex">
          {isAuthorized ? (
            ""
          ) : (
            <>
              <div className="mx-4 rounded-lg p-2">
                <Link to={"/login"}>
                  <Button variant="outlined">Login</Button>
                </Link>
              </div>
              <div className="mx-4 rounded-lg p-2">
                <Link to={"/signup"}>
                  <Button variant="outlined">Sign Up</Button>
                </Link>
              </div>
            </>
          )}
          {isAuthorized ? (
            <>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                className="w-32"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={"SEE MORE"}
                label="See More"
                // onChange={handleChange}
              >
                <MenuItem value={10}>All Careers</MenuItem>
                <MenuItem value={20}>All Events</MenuItem>
                <MenuItem value={30}>All Post</MenuItem>
                <MenuItem value={40}>All Products</MenuItem>
                <MenuItem value={50}>My Careers</MenuItem>
                <MenuItem value={60}>My Events</MenuItem>
                <MenuItem value={70}>My Post</MenuItem>
                <MenuItem value={80}>My Products</MenuItem>
                <MenuItem value={90}>All post</MenuItem>
              </Select>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            ""
          )}

          <Avatar
            alt="User Avatar"
            className="mx-6"
            src={userData?.avatarUrl || "/static/images/avatar/1.jpg"}
            sx={{ width: 50, height: 50 }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
