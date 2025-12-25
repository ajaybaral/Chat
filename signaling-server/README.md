# EchoChat Signaling Server

WebRTC signaling server for video calling functionality.

## Quick Start

```bash
# Install dependencies
npm install

# Run in development
npm run dev

# Run in production
npm start
```

## Environment Variables

```env
PORT=3001  # Default port
```

## Deploy to Railway.app (Free)

1. Create account at https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select this directory
4. Railway will auto-detect and deploy
5. Copy the deployment URL (e.g., `https://your-app.railway.app`)
6. Update `client/.env`:
   ```
   VITE_SIGNALLING_SERVER_URL=https://your-app.railway.app/
   ```

## Deploy to Render.com (Free)

1. Create account at https://render.com
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Set root directory to `signaling-server`
5. Build Command: `npm install`
6. Start Command: `npm start`
7. Copy the deployment URL
8. Update `client/.env` with the URL

## Testing Locally

1. Run: `npm start`
2. Server runs on `http://localhost:3001`
3. Visit `http://localhost:3001/health` to verify
4. Update `client/.env`:
   ```
   VITE_SIGNALLING_SERVER_URL=http://localhost:3001/
   ```

## Endpoints

- `GET /health` - Health check (returns connected users count)

## Socket.IO Events

### Client → Server
- `authenticate` - Register user with userId
- `newOffer` - Send call offer to another user
- `newAnswer` - Send call answer
- `sendIceCandidateToSignalingServer` - Exchange ICE candidates
- `hangupCall` - End call

### Server → Client  
- `newOfferAwaiting` - Incoming call notification
- `answerResponse` - Call accepted
- `receivedIceCandidateFromServer` - ICE candidate from peer
- `hangupCallReq` - Peer ended call
- `callError` - Call failed (user offline)
