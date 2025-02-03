import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain } from 'lucide-react';
import AdminLayout from './components/admin/AdminLayout';
import ModuleManager from './components/admin/ModuleManager';
import StepEditor from './components/admin/StepEditor';
import AIComponentConfig from './components/admin/AIComponentConfig';
import TemplateManager from './components/admin/TemplateManager';
import Settings from './components/admin/Settings';

// Import existing components if they exist, otherwise use placeholders
const ChatInterface = () => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-bold mb-4">Chat Interface</h2>
    <p>Chat interface placeholder</p>
  </div>
);

const ProgressSteps = ({ currentStep, onStepComplete, onComplete }: any) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-xl font-bold mb-4">Progress Steps</h2>
    <p>Progress steps placeholder</p>
  </div>
);

const RAGDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showChat, setShowChat] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleBrainClick = () => {
    setClickCount(prev => prev + 1);
    if (clickCount === 2) {
      setShowChat(true);
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700">
      {/* Background blur circles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-blue-500/30 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-1/4 w-1/2 h-1/2 bg-purple-500/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 flex flex-col min-h-screen">
        <div className="flex-1">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="relative inline-block">
                <button
                  onClick={handleBrainClick}
                  className="transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-full"
                  title="Skip to Chatbot"
                >
                  <Brain className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </button>
                <AnimatePresence>
                  {showPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.8 }}
                      className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 whitespace-nowrap bg-white/90 text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                    >
                      Ohh, You're smart eh? 🧠✨
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <h1 className="text-2xl md:text-4xl font-bold text-white">How RAG AI Chatbots Work</h1>
            </div>
            <p className="text-white/80 text-sm md:text-base max-w-2xl mx-auto">
              {showChat 
                ? "Now you're using a RAG-powered AI chatbot! Try asking questions about any documents you upload."
                : "Learn how Retrieval Augmented Generation (RAG) enhances AI chatbots with real-time document knowledge."}
            </p>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl mx-auto">
            {showChat ? (
              <ChatInterface />
            ) : (
              <ProgressSteps 
                currentStep={currentStep} 
                onStepComplete={setCurrentStep} 
                onComplete={() => setShowChat(true)} 
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="/admin/modules" replace />} />
          <Route path="modules" element={<ModuleManager />} />
          <Route 
            path="modules/:moduleId/steps" 
            element={
              <StepEditor 
                steps={[]} 
                onStepsChange={(steps) => console.log('Steps updated:', steps)} 
              />
            } 
          />
          <Route 
            path="components" 
            element={
              <AIComponentConfig 
                components={[]} 
                onComponentsChange={(components) => console.log('Components updated:', components)} 
              />
            } 
          />
        </Route>

        {/* RAG Demo Route */}
        <Route path="/rag-demo" element={<RAGDemo />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
      </Routes>
    </Router>
  );
};

export default App;