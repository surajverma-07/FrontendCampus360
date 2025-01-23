import React, { useState, useEffect, useRef } from "react"
import axios from "axios"
import io from "socket.io-client"
import { Box, TextField, Button, List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material"

const ChatWindow = ({ chatId, onMessageSent }) => {
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const socketRef = useRef()
  const messagesEndRef = useRef(null)

  useEffect(() => {
    socketRef.current = io("http://localhost:3000")

    socketRef.current.emit("join chat", chatId)

    socketRef.current.on("message received", (message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    fetchMessages()

    return () => {
      socketRef.current.emit("leave chat", chatId)
      socketRef.current.disconnect()
    }
  }, [chatId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`http://localhost:3000/api/v1/chat/messages/${chatId}`, {
        withCredentials: true,
      })
      setMessages(response.data.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching messages:", error)
      setError("Failed to load messages. Please try again.")
      setLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim()) return

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/chat/send",
        {
          chatId,
          content: newMessage,
        },
        { withCredentials: true },
      )

      const sentMessage = response.data.data
      socketRef.current.emit("new message", sentMessage)
      setMessages([...messages, sentMessage])
      setNewMessage("")
      onMessageSent()
    } catch (error) {
      console.error("Error sending message:", error)
      setError("Failed to send message. Please try again.")
    }
  }

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="error">{error}</Typography>
      </Box>
    )
  }

  return (
    <Box display="flex" flexDirection="column" height="100%">
      <List style={{ flexGrow: 1, overflow: "auto", padding: "16px" }}>
        {messages.map((message, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={message.content}
              secondary={
                <Typography component="span" variant="body2" color="textSecondary">
                  {message.sender.name} - {new Date(message.timestamp).toLocaleString()}
                </Typography>
              }
            />
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <Box component="form" onSubmit={handleSendMessage} display="flex" p={2}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginLeft: "10px" }}>
          Send
        </Button>
      </Box>
    </Box>
  )
}

export default ChatWindow

