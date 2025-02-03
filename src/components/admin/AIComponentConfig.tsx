import React, { useState } from 'react';

interface AIComponent {
  type: string;
  config: Record<string, any>;
  apiEndpoint?: string;
}

interface AIComponentConfigProps {
  components: AIComponent[];
  onComponentsChange: (components: AIComponent[]) => void;
}

const AIComponentConfig: React.FC<AIComponentConfigProps> = ({
  components,
  onComponentsChange,
}) => {
  const [editingComponent, setEditingComponent] = useState<number | null>(null);
  const [componentData, setComponentData] = useState<AIComponent>({
    type: '',
    config: {},
    apiEndpoint: '',
  });

  const handleAddComponent = () => {
    onComponentsChange([...components, componentData]);
    setComponentData({
      type: '',
      config: {},
      apiEndpoint: '',
    });
  };

  const handleUpdateComponent = (index: number) => {
    const newComponents = [...components];
    newComponents[index] = componentData;
    onComponentsChange(newComponents);
    setEditingComponent(null);
  };

  const handleDeleteComponent = (index: number) => {
    const newComponents = components.filter((_, i) => i !== index);
    onComponentsChange(newComponents);
  };

  const handleEditComponent = (index: number) => {
    setComponentData(components[index]);
    setEditingComponent(index);
  };

  const handleConfigChange = (configStr: string) => {
    try {
      const config = JSON.parse(configStr);
      setComponentData({ ...componentData, config });
    } catch (e) {
      // Handle invalid JSON
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {editingComponent !== null ? 'Edit AI Component' : 'Add AI Component'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Component Type
            </label>
            <input
              type="text"
              value={componentData.type}
              onChange={(e) =>
                setComponentData({ ...componentData, type: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              placeholder="e.g., classification, generation, completion"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              API Endpoint
            </label>
            <input
              type="text"
              value={componentData.apiEndpoint || ''}
              onChange={(e) =>
                setComponentData({ ...componentData, apiEndpoint: e.target.value })
              }
              className="w-full px-3 py-2 border rounded-md"
              placeholder="/api/your-endpoint"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Configuration (JSON)
            </label>
            <textarea
              value={JSON.stringify(componentData.config, null, 2)}
              onChange={(e) => handleConfigChange(e.target.value)}
              className="w-full px-3 py-2 border rounded-md font-mono text-sm"
              rows={6}
              placeholder="{\n  'model': 'your-model',\n  'parameters': {}\n}"
            />
          </div>
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setComponentData({
                  type: '',
                  config: {},
                  apiEndpoint: '',
                });
                setEditingComponent(null);
              }}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                editingComponent !== null
                  ? handleUpdateComponent(editingComponent)
                  : handleAddComponent()
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingComponent !== null ? 'Update Component' : 'Add Component'}
            </button>
          </div>
        </div>
      </div>

      {/* Component List */}
      <div className="space-y-4">
        {components.map((component, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold mb-2">{component.type}</h4>
                <p className="text-gray-600 text-sm mb-2">
                  Endpoint: {component.apiEndpoint}
                </p>
                <pre className="bg-gray-50 p-2 rounded text-sm">
                  {JSON.stringify(component.config, null, 2)}
                </pre>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditComponent(index)}
                  className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteComponent(index)}
                  className="px-3 py-1 text-red-500 hover:bg-red-50 rounded-md"
                >
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

export default AIComponentConfig; 