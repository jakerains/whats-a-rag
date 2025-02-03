import React, { useState } from 'react';
import { ModuleConfig, createModuleConfig } from '../../templates/config';

interface ModuleFormData {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
}

const ModuleManager: React.FC = () => {
  const [modules, setModules] = useState<ModuleConfig[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<ModuleFormData>({
    id: '',
    title: '',
    description: '',
    difficulty: 'beginner',
    prerequisites: [],
  });

  const handleCreateModule = () => {
    const newModule = createModuleConfig({
      ...formData,
      steps: [],
    });

    setModules([...modules, newModule]);
    setIsCreating(false);
    setFormData({
      id: '',
      title: '',
      description: '',
      difficulty: 'beginner',
      prerequisites: [],
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Learning Modules</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create New Module
        </button>
      </div>

      {/* Module Creation Form */}
      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Module</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Module ID
              </label>
              <input
                type="text"
                value={formData.id}
                onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="unique-module-id"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Module Title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                rows={3}
                placeholder="Module Description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Difficulty
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Prerequisites (comma-separated)
              </label>
              <input
                type="text"
                value={formData.prerequisites.join(', ')}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    prerequisites: e.target.value.split(',').map((p) => p.trim()),
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Basic programming, Mathematics"
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateModule}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Module
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Module List */}
      <div className="grid gap-4">
        {modules.map((module) => (
          <div
            key={module.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{module.title}</h3>
                <p className="text-gray-600 mb-2">{module.description}</p>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                    {module.difficulty}
                  </span>
                  <span className="text-gray-500 text-sm">
                    {module.steps.length} steps
                  </span>
                </div>
              </div>
              <div className="space-x-2">
                <button className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded-md">
                  Edit
                </button>
                <button className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-md">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleManager; 