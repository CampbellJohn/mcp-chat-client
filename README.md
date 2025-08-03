# MCP Chat Client (Simplified MVP)

A minimal chat application with a Next.js frontend and FastAPI backend for connecting to MCP servers.

## Features

- Connect to MCP servers
- Simple chat interface
- Echo response functionality (for demonstration)

## Project Structure

- `frontend/` - Next.js frontend application
- `backend/` - FastAPI backend API

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- Python (v3.8 or later)

### Setup

1. Start the backend server:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

2. In a new terminal, start the frontend:
```bash
cd frontend
npm install
npm run dev
```

The application will be available at http://localhost:3000

## Environment Variables

Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## How It Works

This is a simplified MVP that demonstrates the basic structure for an MCP chat client:
- The backend provides a FastAPI server with endpoints for connecting to servers and chatting
- The frontend provides a Next.js interface for connecting to servers and chatting
- Currently, the chat functionality simply echoes the user's message
- To extend this application, you would implement actual MCP server connections in the backend
