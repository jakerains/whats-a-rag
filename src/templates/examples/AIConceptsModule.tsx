import React from 'react';
import BaseTemplate from '../BaseTemplate';
import { createModuleConfig } from '../config';

const AIConcepts = () => {
  const moduleConfig = createModuleConfig({
    id: 'ai-concepts-101',
    title: 'Introduction to AI Concepts',
    description: 'Learn the fundamental concepts of Artificial Intelligence through interactive examples.',
    difficulty: 'beginner',
    prerequisites: ['Basic programming knowledge', 'Understanding of mathematics'],
    steps: [
      {
        title: 'What is Artificial Intelligence?',
        content: `
          <div>
            <p>Artificial Intelligence (AI) is the simulation of human intelligence by machines. 
            It encompasses various techniques and approaches to create systems that can perform tasks 
            typically requiring human intelligence.</p>
            
            <h3>Key Components:</h3>
            <ul>
              <li>Machine Learning</li>
              <li>Neural Networks</li>
              <li>Natural Language Processing</li>
              <li>Computer Vision</li>
            </ul>
          </div>
        `,
        interactive: false,
      },
      {
        title: 'Understanding Machine Learning',
        content: `
          <div>
            <p>Machine Learning is a subset of AI that focuses on creating systems that can learn 
            from and improve with experience.</p>
            
            <h3>Types of Machine Learning:</h3>
            <ul>
              <li>Supervised Learning</li>
              <li>Unsupervised Learning</li>
              <li>Reinforcement Learning</li>
            </ul>
          </div>
        `,
        interactive: true,
        assessment: {
          type: 'quiz',
          questions: [
            {
              question: 'Which of these is NOT a type of machine learning?',
              options: [
                'Supervised Learning',
                'Unsupervised Learning',
                'Reinforcement Learning',
                'Automatic Learning',
              ],
              answer: 'Automatic Learning',
            },
          ],
        },
      },
      {
        title: 'Hands-on Example',
        content: React.createElement('div', {}, [
          React.createElement('p', { key: 'intro' }, 
            'Let\'s try a simple example of AI in action. This demo shows how a basic classification algorithm works.'
          ),
          React.createElement('div', { 
            key: 'demo',
            className: 'border p-4 mt-4 bg-gray-50 rounded-md'
          }, 'Interactive AI Demo Component')
        ]),
        interactive: true,
      },
    ],
    aiComponents: [
      {
        type: 'classification',
        config: {
          model: 'simple-classifier',
          parameters: {
            // Configuration for the AI component
          }
        },
        apiEndpoint: '/api/classify'
      }
    ],
    ui: {
      theme: 'light',
      layout: 'default'
    }
  });

  const handleComplete = () => {
    console.log('Module completed!');
    // Handle module completion
  };

  const handleStepComplete = (stepIndex: number) => {
    console.log(`Step ${stepIndex + 1} completed!`);
    // Handle step completion
  };

  return (
    <BaseTemplate
      config={moduleConfig}
      onComplete={handleComplete}
      onStepComplete={handleStepComplete}
    />
  );
};

export default AIConcepts; 