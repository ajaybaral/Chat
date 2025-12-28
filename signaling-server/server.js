const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 3001;

// Store connected users
const connectedUsers = new Map();

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Handle user authentication with userId
  socket.on('authenticate', (userId) => {
    connectedUsers.set(userId, socket.id);
    socket.userId = userId;
    console.log(`User ${userId} authenticated with socket ${socket.id}`);
  });

  // Handle new offer (User A calls User B)
  socket.on('newOffer', ({ newOffer, sendToUserId }) => {
    console.log(`New offer from ${socket.userId} to ${sendToUserId}`);
    const targetSocketId = connectedUsers.get(sendToUserId);
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('newOfferAwaiting', {
        offererUserId: socket.userId,
        offer: newOffer,
        offererSocketId: socket.id
      });
      console.log(`Offer sent to user ${sendToUserId}`);
    } else {
      console.log(`User ${sendToUserId} not connected`);
      socket.emit('callError', { message: 'User not available' });
    }
  });

  // Handle answer (User B accepts call from User A)
  socket.on('newAnswer', async (offerObj) => {
    console.log(`Answer received from ${socket.userId}`);
    const targetSocketId = connectedUsers.get(offerObj.offererUserId);
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('answerResponse', offerObj);
      console.log(`Answer sent to ${offerObj.offererUserId}`);
    }
    
    // Acknowledge the answer
    socket.emit('answerAcknowledged');
  });

  // Handle ICE candidates
  socket.on('sendIceCandidateToSignalingServer', ({ iceCandidate, iceUserId }) => {
    console.log(`ICE candidate from ${socket.userId} to ${iceUserId}`);
    const targetSocketId = connectedUsers.get(iceUserId);
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('receivedIceCandidateFromServer', iceCandidate);
    }
  });

  // Handle call hangup
  socket.on('hangupCall', (targetUserId) => {
    console.log(`Hangup from ${socket.userId} to ${targetUserId}`);
    const targetSocketId = connectedUsers.get(targetUserId);
    
    if (targetSocketId) {
      io.to(targetSocketId).emit('hangupCallReq');
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    if (socket.userId) {
      connectedUsers.delete(socket.userId);
      console.log(`User ${socket.userId} removed from connected users`);
    }
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    connectedUsers: connectedUsers.size,
    timestamp: new Date().toISOString()
  });
});

server.listen(PORT, () => {
  console.log(`✅ Signaling server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/health`);
});
