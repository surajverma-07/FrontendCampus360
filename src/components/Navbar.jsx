import React from "react";
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
import { Select } from "@chakra-ui/react";
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
      <div className="w-screen h-20 md:mb-2 flex items-center justify-between">
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
                    <Select
                      className="w-40 p-2 border-2 border-blue-800"
                      placeholder="See More"
                      size="lg"
                    >
                      <option value="option1">
                        <Link
                          className="w-full h-full "
                          to={"/allcareer"}
                        >
                        All Career</Link>
                      </option>
                      <option value="option2">
                        <Link
                          className="w-full h-full "
                          to={"/allevent"}
                        >
                        All Event</Link>
                      </option>
                      <option value="option3">
                        <Link className="w-full h-full " to={"/allpost"}></Link>
                        All Post
                      </option>
                      <option value="option3">
                        <Link
                          className="w-full h-full "
                          to={"/allproducts"}
                        >
                        All Products</Link>
                      </option>
                      <option value="option3">
                        <Link
                          className="w-full h-full "
                          to={"/mycareer"}
                        >
                        My Careers</Link>
                      </option>
                      <option value="option3">
                        <Link className="w-full h-full " to={"/myevent"}>
                        My Event</Link>
                      </option>
                      <option value="option3">
                        <Link className="w-full h-full " to={"/mypost"}>
                        My Post</Link>
                      </option>
                      <option value="option3">
                        <Link
                          className="w-full h-full "
                          to={"/myproducts"}
                        >
                        My Products</Link>
                      </option>
                    </Select>
                    <div className="w-40">
                      <ListItem disablePadding onClick={handleLogout}>
                        <ListItemButton>
                          <ListItemIcon>
                            <LogoutIcon />
                          </ListItemIcon>
                          <ListItemText primary={"Logout"} />
                        </ListItemButton>
                      </ListItem>
                    </div>
                    <Avatar
                      alt="User Avatar"
                      className="mx-6"
                      src={userData?.avatarUrl || "/static/images/avatar/1.jpg"}
                      sx={{ width: 50, height: 50 }}
                    />
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
              <Select
                className="w-40 p-2 border-2 border-blue-800"
                placeholder="See More"
                size="lg"
              >
                <option value="option1">
                  <Link className="w-full h-full " to={"/allcareer"}>All
                  Career</Link>
                </option>
                <option value="option2">
                  <Link className="w-full h-full " to={"/allevent"}>All
                  Event</Link>
                </option>
                <option value="option3">
                  <Link className="w-full h-full " to={"/allpost"}>All
                  Post</Link>
                </option>
                <option value="option3">
                  <Link className="w-full h-full " to={"/allproducts"}>
                  All Products</Link>
                </option>
                <option value="option3">
                  <Link className="w-full h-full " to={"/mycareer"}>My
                  Careers</Link>
                </option>
                <option value="option3">
                  <Link className="w-full h-full " to={"/myevent"}>My
                  Event</Link>
                </option>
                <option value="option3">
                  <Link className="w-full h-full " to={"/mypost"}>My Post</Link>
                </option>
                <option value="option3">
                  <Link className="w-full h-full " to={"/myproducts"}>My
                  Products</Link>
                </option>
              </Select>
              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>{" "}
              <Avatar
                alt="User Avatar"
                className="mx-6"
                src={userData?.avatarUrl || "/static/images/avatar/1.jpg"}
                sx={{ width: 50, height: 50 }}
              />
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
