import React from "react";
import Avatar from "@mui/material/Avatar";
import { Link } from "react-router-dom";
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
const Navbar = () => {
  const { userData, setUserData, isAuthorized, setisAuthorized } = userState();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  return (
    <>
    {console.log("User Data :"+ userData , "isAUthorized :" + isAuthorized)}
      <div className="w-screen h-20 md:mb-10  flex items-center justify-between ">
        <div className="text-3xl  md:ml-4 ml-1">
          {" "}
          <Link to={"/"}>Campus360</Link>{" "}
        </div>
        <div className="md:hidden">
          {" "}
          <Button onClick={toggleDrawer(true)}>
            {" "}
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
                      <div className="text-3xl py-3">Campus360</div>
                    </ListItemButton>
                  </ListItem>
                </Link>
                <Divider />
                {!isAuthorized && (
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
                  </>
                )}
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
                <Divider />
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Logout"} />
                  </ListItemButton>
                </ListItem>
              </List>
            </Box>
          </Drawer>
        </div>
        <div className="md:mr-5 hidden  text-xl mr-1 md:flex">
          <div className="mx-4 rounded-lg  p-2 ">
            <Link to={"/login"}>
              {" "}
              <Button variant="outlined">Login</Button>
            </Link>
          </div>
          <div className="mx-4 rounded-lg  p-2 ">
            <Link to={"/signup"}>
              {" "}
              <Button variant="outlined">SignUp</Button>
            </Link>
          </div>
          <Avatar
            alt="Remy Sharp"
            className="mx-6"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 50, height: 50 }}
          />
        </div>
      </div>
    </>
  );
};

export default Navbar;
