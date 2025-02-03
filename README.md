# AI Learning Apps Template System

A flexible template system for creating interactive AI learning applications. This system allows you to quickly build educational modules that explain AI concepts through step-by-step tutorials and hands-on examples.

## Features

- 🎓 Step-by-step learning modules
- 🔄 Interactive examples
- 📝 Built-in assessment system
- 🎨 Customizable UI themes
- 🔌 Extensible AI component integration
- 📱 Responsive design

## Getting Started

1. Clone the template:
\`\`\`bash
git clone https://github.com/jakerains/whats-a-rag.git your-new-module
cd your-new-module
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create a new module:
   - Copy the example module from `src/templates/examples/AIConceptsModule.tsx`
   - Modify the configuration and content to match your needs

4. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

## Creating a New Module

1. Create a new file in `src/templates/modules/` for your module
2. Import and use the BaseTemplate component
3. Configure your module using the `createModuleConfig` helper:

\`\`\`typescript
const moduleConfig = createModuleConfig({
  id: 'your-module-id',
  title: 'Your Module Title',
  description: 'Module description',
  difficulty: 'beginner',
  steps: [
    // Define your learning steps
  ],
  // Additional configuration...
});
\`\`\`

## Module Configuration

### Basic Structure
- `id`: Unique identifier for the module
- `title`: Module title
- `description`: Brief description
- `difficulty`: 'beginner' | 'intermediate' | 'advanced'
- `prerequisites`: Array of prerequisite knowledge
- `steps`: Array of learning steps

### Step Configuration
Each step can include:
- `title`: Step title
- `content`: HTML content or React component
- `interactive`: Boolean for interactive components
- `assessment`: Optional assessment configuration

## Customization

### Themes
Modify the UI theme in your module configuration:
\`\`\`typescript
ui: {
  theme: 'light' | 'dark' | 'custom',
  customStyles: {
    // Custom CSS properties
  }
}
\`\`\`

### AI Integration
Configure AI components:
\`\`\`typescript
aiComponents: [{
  type: 'your-ai-component',
  config: {
    // Component configuration
  },
  apiEndpoint: '/your-api-endpoint'
}]
\`\`\`

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - See LICENSE file for details