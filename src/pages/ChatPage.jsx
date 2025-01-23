import React, { useState, useEffect } from "react"
import { Grid, Paper, Typography, CircularProgress } from "@mui/material"
import axios from "axios"
import ChatList from "../components/chat/ChatList"
import ChatWindow from "../components/chat/ChatWindow"

const ChatPage = () => {
  const [selectedChat, setSelectedChat] = useState(null)
  const [chats, setChats] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchChats()
  }, [])

  const fetchChats = async () => {
    try {
      setLoading(true)
      const response = await axios.get("http://localhost:3000/api/v1/chat/chats", { withCredentials: true })
      setChats(response.data.data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching chats:", err)
      setError("Failed to load chats. Please try again later.")
      setLoading(false)
    }
  }

  const handleSelectChat = (chatId) => {
    setSelectedChat(chatId)
  }

  const handleNewChat = (newChat) => {
    setChats((prevChats) => [newChat, ...prevChats])
    setSelectedChat(newChat._id)
  }

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography color="error">{error}</Typography>
      </div>
    )
  }

  return (
    <Grid container spacing={2} sx={{ height: "calc(100vh - 64px)", padding: 2 }}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ height: "100%", overflowY: "auto" }}>
          <ChatList
            chats={chats}
            onSelectChat={handleSelectChat}
            onNewChat={handleNewChat}
            selectedChatId={selectedChat}
          />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Paper elevation={3} sx={{ height: "100%" }}>
          {selectedChat ? (
            <ChatWindow chatId={selectedChat} onMessageSent={fetchChats} />
          ) : (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
              <Typography variant="h6" color="textSecondary">
                Select a chat or user to start messaging
              </Typography>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default ChatPage

