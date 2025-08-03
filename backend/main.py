from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI(title="MCP Chat API", description="Simplified API for connecting to MCP servers")

# Pydantic models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    server_url: str

class ChatResponse(BaseModel):
    response: str

class ServerConnection(BaseModel):
    url: str
    name: str
    connected: bool = False

# In-memory storage for connections
connections: List[ServerConnection] = []

@app.get("/")
def read_root():
    return {"message": "MCP Chat API is running"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.get("/servers")
def list_servers():
    return connections

@app.post("/servers/connect")
def connect_server(server: ServerConnection):
    # Simplified connection logic
    server.connected = True
    connections.append(server)
    return {"message": f"Connected to server {server.name}", "server": server}

@app.post("/chat", response_model=ChatResponse)
async def chat(chat_request: ChatRequest):
    # Simplified chat logic - just echo the last message for now
    if chat_request.messages:
        last_message = chat_request.messages[-1]
        return ChatResponse(response=f"Echo: {last_message.content}")
    return ChatResponse(response="Hello! I'm your MCP assistant. How can I help you today?")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
