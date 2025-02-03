# AI Learning Apps Template System

## Core Structure
- `/src` - Core application source
  - `/components` - Reusable UI components
    - `/admin` - Admin interface components
      - `AdminLayout.tsx` - Main admin layout
      - `ModuleManager.tsx` - Module management interface
      - `StepEditor.tsx` - Step editing interface
      - `AIComponentConfig.tsx` - AI component configuration
  - `/lib` - Shared utilities and helpers
  - `/services` - API and service integrations
  - `/templates` - Base templates for different learning modules
  - `/types` - TypeScript type definitions

## Template System
### Base Components
- Learning Module Template
- Interactive Examples Framework
- Step-by-Step Tutorial Engine
- Assessment System

### Admin Interface
1. Module Management
   - Create/Edit/Delete modules
   - Configure module settings
   - Manage learning steps
   - Preview module content

2. Step Editor
   - Content editing
   - Interactive component configuration
   - Assessment setup
   - Step ordering and organization

3. AI Component Configuration
   - Component type definition
   - API endpoint configuration
   - Parameter settings
   - Component testing

### Extension Points
1. Content Definition
   - Module configuration
   - Learning steps
   - Interactive examples
   - Assessments

2. UI Customization
   - Theme configuration
   - Layout templates
   - Component overrides

3. Backend Integration
   - API endpoints
   - Service connectors
   - Data models

## Configuration System
- Module configuration files
- Content structure
- Theme customization
- API integration settings

## Usage Guidelines
1. Creating New Modules
   - Use admin interface
   - Configure module settings
   - Define content and interactions
   - Customize UI if needed

2. Development Workflow
   - Module development
   - Testing
   - Deployment

## Technical Decisions
- React + TypeScript for frontend
- Vite for build system
- Tailwind CSS for styling
- Configuration-driven content system
- Modular architecture for easy extension
- Admin interface for content management 