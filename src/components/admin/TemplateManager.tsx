import React, { useState } from 'react';

interface Template {
  id: string;
  name: string;
  description: string;
  type: 'module' | 'step' | 'assessment';
  content: string;
}

const TemplateManager: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Omit<Template, 'id'>>({
    name: '',
    description: '',
    type: 'module',
    content: '',
  });

  const handleCreateTemplate = () => {
    const newTemplate: Template = {
      id: Date.now().toString(),
      ...formData,
    };
    setTemplates([...templates, newTemplate]);
    setIsCreating(false);
    setFormData({
      name: '',
      description: '',
      type: 'module',
      content: '',
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Templates</h2>
        <button
          onClick={() => setIsCreating(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Create Template
        </button>
      </div>

      {/* Template Creation Form */}
      {isCreating && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4">Create New Template</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Template Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-md"
                placeholder="Template Name"
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
                placeholder="Template Description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Template['type'] })}
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="module">Module Template</option>
                <option value="step">Step Template</option>
                <option value="assessment">Assessment Template</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-3 py-2 border rounded-md font-mono text-sm"
                rows={10}
                placeholder="Template content (JSON or markdown)"
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
                onClick={handleCreateTemplate}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Create Template
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Template List */}
      <div className="grid gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-2">{template.description}</p>
                <span className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-md">
                  {template.type}
                </span>
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

export default TemplateManager; 