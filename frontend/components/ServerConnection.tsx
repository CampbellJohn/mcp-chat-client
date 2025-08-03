import { useState, useEffect } from 'react';
import { ServerConnection, getServers, connectServer } from '../services/api';

type ServerConnectionProps = {
  onServerConnect: (serverUrl: string) => void;
};

export default function ServerConnectionManager({ onServerConnect }: ServerConnectionProps) {
  const [servers, setServers] = useState<ServerConnection[]>([]);
  const [newServerUrl, setNewServerUrl] = useState('');
  const [newServerName, setNewServerName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      const serverList = await getServers();
      setServers(serverList);
    } catch (err) {
      console.error('Failed to fetch servers:', err);
      setError('Failed to fetch servers');
    }
  };

  const handleConnect = async () => {
    if (!newServerUrl.trim() || !newServerName.trim()) {
      setError('Please enter both server URL and name');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const result = await connectServer({
        url: newServerUrl,
        name: newServerName
      });
      
      setServers(prev => [...prev, result.server]);
      setNewServerUrl('');
      setNewServerName('');
      onServerConnect(result.server.url);
    } catch (err) {
      console.error('Failed to connect to server:', err);
      setError('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-gray-50 border-b border-gray-200">
      <h2 className="text-lg font-semibold mb-3">MCP Server Connections</h2>
      
      {error && (
        <div className="mb-3 p-2 bg-red-100 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex space-x-2 mb-2">
          <input
            type="text"
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            placeholder="Server name"
            className="flex-grow border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <input
            type="text"
            value={newServerUrl}
            onChange={(e) => setNewServerUrl(e.target.value)}
            placeholder="Server URL (e.g., http://localhost:3001)"
            className="flex-grow border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            onClick={handleConnect}
            disabled={isLoading || !newServerUrl.trim() || !newServerName.trim()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Connected Servers</h3>
        {servers.length === 0 ? (
          <p className="text-sm text-gray-500 italic">No servers connected yet</p>
        ) : (
          <div className="space-y-2">
            {servers.map((server) => (
              <div 
                key={server.url}
                className={`flex items-center justify-between p-2 rounded ${server.connected ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}
              >
                <div>
                  <div className="font-medium text-sm">{server.name}</div>
                  <div className="text-xs text-gray-500">{server.url}</div>
                </div>
                <div className="flex items-center">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${server.connected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {server.connected ? 'Connected' : 'Disconnected'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
