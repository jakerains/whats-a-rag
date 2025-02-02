# RAG AI Chatbot Demo - User Manual

## Table of Contents
1. [Getting Started](#getting-started)
2. [Project Structure](#project-structure)
3. [Running the Application](#running-the-application)
4. [Configuration](#configuration)
5. [Features](#features)
6. [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites
- Node.js 18 or higher
- npm 9 or higher
- GitHub Personal Access Token (PAT)

### Installation
1. Clone the repository
2. Install dependencies:
```bash
npm install
```

### Environment Setup
1. Create a `.env` file in the root directory
2. Add your GitHub token:
```env
GITHUB_TOKEN=your_github_token_here
VITE_API_URL=/api
```

## Project Structure
```
project/
├── docs/               # Documentation
├── server/             # Backend server
│   ├── index.js        # Server entry point
│   └── services/       # Server services
├── src/                # Frontend source
│   ├── components/     # React components
│   ├── lib/           # Utility functions
│   └── services/      # Frontend services
└── public/            # Static assets
```

## Running the Application

### Development Mode
Start both frontend and backend servers:
```bash
npm run dev
```
This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:3001

### Production Build
```bash
npm run build
```

## Configuration

### GitHub Token Setup
1. Go to GitHub Settings > Developer Settings > Personal Access Tokens
2. Generate a new token with required permissions
3. Add token to `.env` file

### API Configuration
- Backend API runs on port 3001
- Frontend proxies `/api` requests to backend
- All API endpoints are prefixed with `/api`

## Features

### Document Upload
1. Click "Upload Document" or drag & drop
2. Supported formats:
   - PDF (.pdf)
   - Text files (.txt)

### Chat Interface
- Type messages in the input field
- Press Enter or click Send
- System shows typing indicators
- Error messages appear in red
- Successful responses in white

### RAG Process Visualization
1. Document Chunking
2. Vector Embedding
3. Semantic Retrieval
4. Response Generation

## Troubleshooting

### Common Issues

#### Connection Error
```
Error: Failed to connect to AI service
```
**Solution**: Check your GitHub token in `.env` file

#### Server Not Starting
```
Error: Port 3001 is already in use
```
**Solution**: Kill the process using port 3001 or change the port in `server/index.js`

#### File Upload Error
```
Error: No files were uploaded
```
**Solution**: Ensure file format is supported (PDF or TXT)

### Error Messages

- `LLM Connection Error`: Issue with AI service connection
- `Invalid response from server`: Backend processing error
- `HTTP error!`: Network or API endpoint issue

### Support

For additional support:
1. Check the console for detailed error messages
2. Verify environment variables
3. Ensure all dependencies are installed
4. Check server logs for backend issues

## Best Practices

1. **Document Upload**
   - Keep files under 10MB
   - Use clear, readable text
   - Avoid scanned documents

2. **Chat Interface**
   - Ask clear, specific questions
   - Wait for responses before sending new messages
   - Check error messages for guidance

3. **System Resources**
   - Close unused browser tabs
   - Monitor memory usage
   - Clear browser cache if issues persist