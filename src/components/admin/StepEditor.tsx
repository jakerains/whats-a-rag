import React, { useState } from 'react';
import { LearningStep } from '../../templates/config';

interface StepEditorProps {
  steps: LearningStep[];
  onStepsChange: (steps: LearningStep[]) => void;
}

const StepEditor: React.FC<StepEditorProps> = ({ steps, onStepsChange }) => {
  const [editingStep, setEditingStep] = useState<number | null>(null);
  const [stepData, setStepData] = useState<LearningStep>({
    title: '',
    content: '',
    interactive: false,
  });

  const handleAddStep = () => {
    onStepsChange([...steps, stepData]);
    setStepData({
      title: '',
      content: '',
      interactive: false,
    });
  };

  const handleUpdateStep = (index: number) => {
    const newSteps = [...steps];
    newSteps[index] = stepData;
    onStepsChange(newSteps);
    setEditingStep(null);
  };

  const handleDeleteStep = (index: number) => {
    const newSteps = steps.filter((_, i) => i !== index);
    onStepsChange(newSteps);
  };

  const handleEditStep = (index: number) => {
    setStepData(steps[index]);
    setEditingStep(index);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">
          {editingStep !== null ? 'Edit Step' : 'Add New Step'}
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Step Title
            </label>
            <input
              type="text"
              value={stepData.title}
              onChange={(e) => setStepData({ ...stepData, title: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Step Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={typeof stepData.content === 'string' ? stepData.content : ''}
              onChange={(e) => setStepData({ ...stepData, content: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
              rows={6}
              placeholder="Step content in HTML format"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={stepData.interactive}
              onChange={(e) =>
                setStepData({ ...stepData, interactive: e.target.checked })
              }
              className="mr-2"
            />
            <label className="text-sm font-medium text-gray-700">
              Interactive Step
            </label>
          </div>
          {stepData.interactive && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assessment Configuration
              </label>
              <select
                value={stepData.assessment?.type || 'quiz'}
                onChange={(e) =>
                  setStepData({
                    ...stepData,
                    assessment: {
                      type: e.target.value as 'quiz' | 'practical' | 'code',
                      questions: [],
                    },
                  })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="quiz">Quiz</option>
                <option value="practical">Practical Exercise</option>
                <option value="code">Code Challenge</option>
              </select>
            </div>
          )}
          <div className="flex justify-end space-x-3">
            <button
              onClick={() => {
                setStepData({
                  title: '',
                  content: '',
                  interactive: false,
                });
                setEditingStep(null);
              }}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={() =>
                editingStep !== null ? handleUpdateStep(editingStep) : handleAddStep()
              }
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              {editingStep !== null ? 'Update Step' : 'Add Step'}
            </button>
          </div>
        </div>
      </div>

      {/* Step List */}
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                <div className="flex items-center space-x-2">
                  {step.interactive && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-md">
                      Interactive
                    </span>
                  )}
                  {step.assessment && (
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-sm rounded-md">
                      {step.assessment.type}
                    </span>
                  )}
                </div>
              </div>
              <div className="space-x-2">
                <button
                  onClick={() => handleEditStep(index)}
                  className="px-3 py-1 text-blue-500 hover:bg-blue-50 rounded-md"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStep(index)}
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

export default StepEditor; 