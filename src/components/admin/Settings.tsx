import React, { useState } from 'react';

interface Settings {
  aiProvider: 'azure' | 'groq' | 'openai';
  apiKey: string;
  defaultModel: string;
  theme: 'light' | 'dark' | 'system';
  enableAnalytics: boolean;
  maxTokens: number;
}

const Settings: React.FC = () => {
  const [settings, setSettings] = useState<Settings>({
    aiProvider: 'groq',
    apiKey: '',
    defaultModel: 'llama-3.3-70b-versatile',
    theme: 'system',
    enableAnalytics: true,
    maxTokens: 2000,
  });

  const handleSave = () => {
    // Save settings to localStorage or backend
    localStorage.setItem('adminSettings', JSON.stringify(settings));
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Settings</h2>
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Settings
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="space-y-6">
          {/* AI Provider Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">AI Provider Configuration</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  AI Provider
                </label>
                <select
                  value={settings.aiProvider}
                  onChange={(e) => setSettings({ ...settings, aiProvider: e.target.value as Settings['aiProvider'] })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="groq">Groq</option>
                  <option value="azure">Azure AI</option>
                  <option value="openai">OpenAI</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  API Key
                </label>
                <input
                  type="password"
                  value={settings.apiKey}
                  onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter API key"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Default Model
                </label>
                <input
                  type="text"
                  value={settings.defaultModel}
                  onChange={(e) => setSettings({ ...settings, defaultModel: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter model name"
                />
              </div>
            </div>
          </div>

          {/* UI Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">UI Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Theme
                </label>
                <select
                  value={settings.theme}
                  onChange={(e) => setSettings({ ...settings, theme: e.target.value as Settings['theme'] })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.enableAnalytics}
                  onChange={(e) => setSettings({ ...settings, enableAnalytics: e.target.checked })}
                  className="mr-2"
                />
                <label className="text-sm font-medium text-gray-700">
                  Enable Analytics
                </label>
              </div>
            </div>
          </div>

          {/* Advanced Settings */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Advanced Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Tokens
                </label>
                <input
                  type="number"
                  value={settings.maxTokens}
                  onChange={(e) => setSettings({ ...settings, maxTokens: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-md"
                  min="100"
                  max="10000"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 