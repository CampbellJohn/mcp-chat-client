// API service for communicating with the backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ServerConnection {
  url: string;
  name: string;
  connected: boolean;
}

export interface ChatRequest {
  messages: Message[];
  server_url: string;
}

export interface ChatResponse {
  response: string;
}

// Fetch all servers
export async function getServers(): Promise<ServerConnection[]> {
  const response = await fetch(`${API_BASE_URL}/servers`);
  return response.json();
}

// Connect to a server
export async function connectServer(server: Omit<ServerConnection, 'connected'>): Promise<{message: string, server: ServerConnection}> {
  const response = await fetch(`${API_BASE_URL}/servers/connect`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(server),
  });
  return response.json();
}

// Send a chat message
export async function sendChatMessage(chatRequest: ChatRequest): Promise<ChatResponse> {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(chatRequest),
  });
  return response.json();
}

// Health check
export async function healthCheck(): Promise<{status: string}> {
  const response = await fetch(`${API_BASE_URL}/health`);
  return response.json();
}
