import React, { useState, useEffect } from "react"
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Tabs,
  Tab,
  Box,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material"
import axios from "axios"

const ChatList = ({ chats, onSelectChat, onNewChat, selectedChatId }) => {
  const [tabValue, setTabValue] = useState(0)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (tabValue === 1) {
      fetchUsers()
    }
  }, [tabValue])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:3000/api/v1/campus-connect/user/college/all", {
        withCredentials: true,
      })
      setUsers(response.data.data.collageStudents)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching users:", error)
      setError("Failed to load users. Please try again.")
      setLoading(false)
    }
  }

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  const handleUserSelect = async (userId) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/chat/create",
        { participantId: userId },
        { withCredentials: true },
      )
      onNewChat(response.data.data)
    } catch (error) {
      console.error("Error creating chat:", error)
      setError("Failed to create chat. Please try again.")
    }
  }

  const filteredChats = chats.filter((chat) =>
    chat.participants[0].name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchTerm.toLowerCase()))

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tab label="Chats" />
        <Tab label="Users" />
      </Tabs>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ m: 1 }}
      />
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" sx={{ m: 2 }}>
          {error}
        </Typography>
      ) : (
        <List sx={{ flexGrow: 1, overflowY: "auto" }}>
          {tabValue === 0
            ? filteredChats.map((chat) => (
                <ListItem
                  key={chat._id}
                  button
                  onClick={() => onSelectChat(chat._id)}
                  selected={chat._id === selectedChatId}
                >
                  <ListItemAvatar>
                    <Avatar src={chat.participants[0].profileImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={chat.participants[0].name}
                    secondary={
                      <Typography component="span" variant="body2" color="textSecondary">
                        {chat.messages[chat.messages.length - 1]?.content || "No messages yet"}
                      </Typography>
                    }
                  />
                </ListItem>
              ))
            : filteredUsers.map((user) => (
                <ListItem key={user._id} button onClick={() => handleUserSelect(user._id)}>
                  <ListItemAvatar>
                    <Avatar src={user.profileImage} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={
                      <Typography component="span" variant="body2" color="textSecondary">
                        {user.course} - {user.branch_section}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
        </List>
      )}
    </Box>
  )
}

export default ChatList

