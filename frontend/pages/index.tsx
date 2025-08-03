import Head from 'next/head';
import { useState } from 'react';
import ChatWindow from '../components/ChatWindow';
import ServerConnectionManager from '../components/ServerConnection';

export default function Home() {
  const [selectedServer, setSelectedServer] = useState('');

  const handleServerConnect = (serverUrl: string) => {
    setSelectedServer(serverUrl);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Head>
        <title>MCP Chat Client</title>
        <meta name="description" content="Chat client for MCP servers" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex-grow flex flex-col p-4">
        <h1 className="text-3xl font-bold text-center my-4">MCP Chat Client</h1>
        <div className="flex-grow flex flex-col max-w-4xl w-full mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <ServerConnectionManager onServerConnect={handleServerConnect} />
          <div className="flex-grow h-0">
            <ChatWindow serverUrl={selectedServer} />
          </div>
        </div>
      </main>

      <footer className="p-4 bg-white border-t border-gray-200 text-center text-gray-600">
        <p>MCP Chat Client &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
