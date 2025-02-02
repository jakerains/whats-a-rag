import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { config } from 'dotenv';
import { DocumentStore } from './services/document-store.js';
import { AIService } from './services/ai-service.js';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../dist')));

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize services
let documentStore;
let aiService;

try {
  documentStore = DocumentStore.getInstance();
  aiService = AIService.getInstance();
} catch (error) {
  console.error('Failed to initialize services:', error);
  process.exit(1);
}

// Root endpoint
app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.json({ 
    status: 'ok',
    message: 'RAG AI Chatbot API is running'
  });
});

// Test LLM connection endpoint
app.get('/api/test-llm', async (req, res) => {
  try {
    const result = await aiService.testConnection();
    if (!result.success) {
      throw new Error('Failed to connect to AI service');
    }
    res.json(result);
  } catch (error) {
    console.error('LLM Connection Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const context = documentStore.getContext(message);
    const response = await aiService.generateResponse(message, context);
    res.json({ response });
  } catch (error) {
    console.error('Chat error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    res.status(500).json({ error: error.message });
  }
});

app.post('/api/process-documents', upload.array('files'), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files were uploaded' });
    }

    for (const file of req.files) {
      const text = file.buffer.toString('utf-8');
      await documentStore.addDocument(text, file.originalname);
    }

    res.json({ message: 'Documents processed successfully' });
  } catch (error) {
    console.error('Document processing error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/documents', (req, res) => {
  try {
    documentStore.clear();
    res.json({ message: 'Document store cleared successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve index.html for all other routes (SPA fallback)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`GitHub Token configured: ${!!process.env.GITHUB_TOKEN}`);
});