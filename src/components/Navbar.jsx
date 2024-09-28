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
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, setUserData, isAuthorized, setisAuthorized } = userState();
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleLogout = async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/campus-connect/user/logout",
      { withCredentials: true }
    );
    navigate("/");
  };

  const handleNavigation = (event) => {
    const value = event.target.value;
    if (value) {
      navigate(value);
    }
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
                      onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue) {
                          navigate(selectedValue);
                        }
                      }}
                    >
                      <option value="/allcareer">All Career</option>
                      <option value="/allevent">All Event</option>
                      <option value="/allpost">All Post</option>
                      <option value="/allproducts">All Products</option>
                      <option value="/mycareer">My Careers</option>
                      <option value="/myevent">My Event</option>
                      <option value="/mypost">My Post</option>
                      <option value="/myproducts">My Products</option>
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
                      onClick={onOpen}
                    />
                    <Modal
                      closeOnOverlayClick={false}
                      isOpen={isOpen}
                      onClose={onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Create your account</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Voluptatibus, aliquid!
                        </ModalBody>

                        <ModalFooter>
                          <Button colorScheme="blue" mr={3}>
                            Save
                          </Button>
                          <Button onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
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
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  if (selectedValue) {
                    navigate(selectedValue);
                  }
                }}
              >
                <option value="/allcareer">All Career</option>
                <option value="/allevent">All Event</option>
                <option value="/allpost">All Post</option>
                <option value="/allproducts">All Products</option>
                <option value="/mycareer">My Careers</option>
                <option value="/myevent">My Event</option>
                <option value="/mypost">My Post</option>
                <option value="/myproducts">My Products</option>
              </Select>

              <Button variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
              <Avatar
                alt="User Avatar"
                className="mx-6"
                src={userData?.avatarUrl || "/static/images/avatar/1.jpg"}
                sx={{ width: 50, height: 50 }}
                onClick={onOpen}
              />
              <Modal
                closeOnOverlayClick={false}
                isOpen={isOpen}
                onClose={onClose}
                isCentered // This will center the modal on the screen
              >
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader>Create your account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Voluptatibus, aliquid!
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" mr={3}>
                      Save
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
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
