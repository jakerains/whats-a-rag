import React, { useState } from 'react';
import { ModuleConfig, LearningStep } from './config';

interface BaseTemplateProps {
  config: ModuleConfig;
  onComplete?: () => void;
  onStepComplete?: (stepIndex: number) => void;
}

const BaseTemplate: React.FC<BaseTemplateProps> = ({
  config,
  onComplete,
  onStepComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState<Record<number, boolean>>({});

  const handleStepComplete = (stepIndex: number) => {
    setProgress((prev) => ({ ...prev, [stepIndex]: true }));
    onStepComplete?.(stepIndex);

    if (stepIndex === config.steps.length - 1) {
      onComplete?.();
    }
  };

  const renderStep = (step: LearningStep) => {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">{step.title}</h2>
        <div className="prose max-w-none">
          {typeof step.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: step.content }} />
          ) : (
            step.content
          )}
        </div>
        {step.interactive && (
          <div className="mt-6 p-4 bg-gray-50 rounded-md">
            {/* Interactive component placeholder - will be implemented by specific modules */}
            <div className="text-gray-500">Interactive Component</div>
          </div>
        )}
        {step.assessment && (
          <div className="mt-6 border-t pt-6">
            <h3 className="text-xl font-semibold mb-4">Assessment</h3>
            {/* Assessment component placeholder - will be implemented by specific modules */}
            <div className="text-gray-500">Assessment Component</div>
          </div>
        )}
      </div>
    );
  };

  const renderProgress = () => {
    return (
      <div className="flex items-center space-x-2 mb-6">
        {config.steps.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              progress[index]
                ? 'bg-green-500'
                : index === currentStep
                ? 'bg-blue-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">{config.title}</h1>
        <p className="text-gray-600">{config.description}</p>
        {config.prerequisites && config.prerequisites.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold">Prerequisites:</h3>
            <ul className="list-disc list-inside">
              {config.prerequisites.map((prereq, index) => (
                <li key={index}>{prereq}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {renderProgress()}

      {renderStep(config.steps[currentStep])}

      <div className="mt-6 flex justify-between">
        <button
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={currentStep === config.steps.length - 1}
          onClick={() => {
            handleStepComplete(currentStep);
            setCurrentStep((prev) => prev + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BaseTemplate; 