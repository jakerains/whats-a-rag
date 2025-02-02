import Groq from "groq-sdk";

export class AIService {
  constructor() {
    this.token = process.env.GROQ_API_KEY;
    this.modelName = "llama-3.3-70b-versatile";
    
    if (!this.token) {
      throw new Error('Groq API key is not configured');
    }

    this.client = new Groq({
      apiKey: this.token
    });
  }

  static getInstance() {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  async testConnection() {
    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: [{
          role: "system",
          content: "You are a test assistant. Respond with 'Connection successful!'"
        }, {
          role: "user",
          content: "Test connection"
        }]
      });

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      return {
        success: true,
        message: completion.choices[0].message.content
      };
    } catch (error) {
      console.error('Connection test failed:', error);
      return {
        success: false,
        error: error.message || 'Failed to connect to Groq API'
      };
    }
  }

  async generateResponse(message, context) {
    const hasContext = context && context !== "No documents have been uploaded yet.";
    const systemMessage = hasContext
      ? `You are an interactive RAG chatbot. Use this context to answer questions:\n\n${context}`
      : `You are an interactive RAG chatbot. No documents are uploaded yet. I can explain how RAG works, or you can upload documents to see it in action!`;

    try {
      const completion = await this.client.chat.completions.create({
        model: this.modelName,
        messages: [
          {
            role: "system",
            content: systemMessage
          },
          {
            role: "user",
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 4096,
        top_p: 1
      });

      if (!completion.choices?.[0]?.message?.content) {
        throw new Error('Invalid response format from API');
      }

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Groq API Error:', error);
      throw error;
    }
  }
}

AIService.instance = null;