import { createHash } from 'crypto';

export class DocumentStore {
  constructor() {
    this.chunks = [];
    this.vectorStore = new Map();
  }

  static getInstance() {
    if (!DocumentStore.instance) {
      DocumentStore.instance = new DocumentStore();
    }
    return DocumentStore.instance;
  }

  async addDocument(text, source) {
    // Split text into chunks of roughly 1000 characters, preserving sentence boundaries
    const chunks = text.match(/[^.!?]+[.!?]+/g) || [text];
    
    for (const chunk of chunks) {
      const trimmedChunk = chunk.trim();
      if (trimmedChunk.length === 0) continue;

      // Create a unique ID for the chunk
      const chunkId = createHash('md5')
        .update(`${source}-${trimmedChunk}`)
        .digest('hex');

      // Store the chunk with metadata
      this.chunks.push({
        id: chunkId,
        content: trimmedChunk,
        metadata: {
          source,
          timestamp: new Date().toISOString()
        }
      });
    }

    console.log(`Processed ${chunks.length} chunks from document: ${source}`);
  }

  getContext(query = '', maxChunks = 3) {
    if (this.chunks.length === 0) {
      return "No documents have been uploaded yet.";
    }

    // If no query is provided, return the most recent chunks
    if (!query) {
      return this.chunks
        .slice(-maxChunks)
        .map(chunk => chunk.content)
        .join("\n\n");
    }

    // Simple keyword-based relevance scoring
    const queryTerms = query.toLowerCase().split(/\s+/);
    const scoredChunks = this.chunks.map(chunk => {
      const content = chunk.content.toLowerCase();
      const score = queryTerms.reduce((acc, term) => {
        return acc + (content.includes(term) ? 1 : 0);
      }, 0);
      return { ...chunk, score };
    });

    // Sort by relevance score and take top chunks
    const relevantChunks = scoredChunks
      .sort((a, b) => b.score - a.score)
      .slice(0, maxChunks);

    // Format the context with source attribution
    return relevantChunks
      .map(chunk => `[From ${chunk.metadata.source}]: ${chunk.content}`)
      .join("\n\n");
  }

  clear() {
    this.chunks = [];
    this.vectorStore.clear();
    console.log('Document store cleared');
  }
}

DocumentStore.instance = null;