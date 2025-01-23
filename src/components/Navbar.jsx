import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useMediaQuery,
  useTheme,
  Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { userState } from "../context/UserContext"
import axios from "axios"

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, setUserData, isAuthorized,setIsAdmin ,isAdmin, setIsAuthorized } = userState()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const [anchorEls, setAnchorEls] = useState({
    post: null,
    event: null,
    career: null,
    product: null,
  })
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null)

  const handleMenuOpen = (category, event) => {
    setAnchorEls({ ...anchorEls, [category]: event.currentTarget })
  }

  const handleMenuClose = (category) => {
    setAnchorEls({ ...anchorEls, [category]: null })
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null)
  }

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:3000/api/v1/campus-connect/user/logout", { withCredentials: true })
      setIsAuthorized(false)
      setUserData(null)
      console.log("Logout successful");
      navigate("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const menuItems = [
    { title: "Post", options: ["Add Post", "My Posts", "All Posts"] },
    { title: "Event", options: ["Add Event", "My Events", "All Events"] },
    { title: "Career", options: ["Add Career", "My Careers", "All Careers"] },
    { title: "Product", options: ["Add Product", "My Products", "All Products"] },
  ]
  console.log("User Data at Navbar :: ",userData);
  console.log("Is Authorized at Navbar :: ",isAuthorized);
  console.log("Is Admin at Navbar :: ",isAdmin);
  const renderMenu = (category) => (
    <Menu
      anchorEl={anchorEls[category.toLowerCase()]}
      open={Boolean(anchorEls[category.toLowerCase()])}
      onClose={() => handleMenuClose(category.toLowerCase())}
    >
      {menuItems
        .find((item) => item.title === category)
        .options.map((option) => (
          <MenuItem
            key={option}
            onClick={() => {
              handleMenuClose(category.toLowerCase())
              navigate(`/${category.toLowerCase()}/${option.toLowerCase().replace(" ", "-")}`)
            }}
          >
            {option}
          </MenuItem>
        ))}
    </Menu>
  )

  const renderMobileMenu = (
    <Menu anchorEl={mobileMenuAnchorEl} open={Boolean(mobileMenuAnchorEl)} onClose={handleMobileMenuClose}>
      {menuItems.flatMap((item) => [
        <MenuItem key={item.title} onClick={handleMobileMenuClose}>
          <Typography variant="subtitle1">{item.title}</Typography>
        </MenuItem>,
        ...item.options.map((option) => (
          <MenuItem
            key={`${item.title}-${option}`}
            onClick={() => {
              handleMobileMenuClose()
              navigate(`/${item.title.toLowerCase()}/${option.toLowerCase().replace(" ", "-")}`)
            }}
          >
            {option}
          </MenuItem>
        )),
      ])}
      {isAuthorized ? (
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      ) : (
        [
          <MenuItem
            key="login"
            onClick={() => {
              handleMobileMenuClose()
              navigate("/login")
            }}
          >
            Login
          </MenuItem>,
          <MenuItem
            key="signup"
            onClick={() => {
              handleMobileMenuClose()
              navigate("/signup")
            }}
          >
            Sign Up
          </MenuItem>,
        ]
      )}
    </Menu>
  )
  if(userData?.data?.loggedInAdmin) {
    setIsAdmin(true);
  }
  const route = `${isAdmin ? "/adminpanel" : "/profile"}`;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
          Campus360
        </Typography>
        {!isMobile && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {isAuthorized &&
              menuItems.map((item) => (
                <React.Fragment key={item.title}>
                  <Button color="inherit" onClick={(e) => handleMenuOpen(item.title.toLowerCase(), e)}>
                    {item.title}
                  </Button>
                  {renderMenu(item.title)}
                </React.Fragment>
              ))}
            {isAuthorized ? (
              <>
                <Avatar
                  alt="User Avatar"
                  src={userData?.data?.user?.profileImage || "/static/images/avatar/1.jpg"}
                  sx={{ width: 40, height: 40, marginLeft: 2, cursor: "pointer" }}
                  onClick={() => navigate(route)}
                />
                <Button color="inherit" onClick={handleLogout} sx={{ marginLeft: 2 }}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/signup">
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        )}
        {isMobile && (
          <IconButton edge="end" color="inherit" aria-label="menu" onClick={handleMobileMenuOpen}>
            <MenuIcon />
          </IconButton>
        )}
      </Toolbar>
      {renderMobileMenu}
    </AppBar>
  )
}

export default Navbar

