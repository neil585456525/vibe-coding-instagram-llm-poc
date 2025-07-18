# 🌟 Vibe Coding – Instagram LLM PoC

**AI-Powered Instagram Content Analysis & Template Generation — Built with Chat-Only Development Workflow**

> A 24-hour prototype showcasing how to build a full-stack LLM product using vibe coding: a fluid, AI-assisted development approach combining GitHub Copilot, ChatGPT, and Claude Sonnet 4.

[🎥 Watch the Demo](https://youtu.be/JjA7zuZ6Uq0) | [💬 Explore My Vibe Coding Technique](#the-ai-assisted-development-approach)

## 🎯 Project Overview

A full-stack application that analyzes Instagram posts and generates reusable content templates using AI. Built with React/Vite frontend, Node.js/Express backend, MongoDB, and OpenAI integration.

**🎥 [Demo Video - Project Demo & Development Process](https://youtu.be/JjA7zuZ6Uq0)**

**🎥 [Demo Video - Vibe Coding Showcase](https://youtu.be/6RB212Y6P-k)**

## 🧠 The AI-Assisted Development Approach

This project isn't just about the final product - it's a demonstration of how I leverage AI assistants to accelerate development while maintaining code quality and consistency. Built entirely using **GitHub Copilot Agent Mode** with **Claude Sonnet 4** model for maximum AI assistance.

### 🎯 From Idea to Implementation

The entire development process started with a natural conversation with ChatGPT about my product idea, which I then converted into a structured project prompt at `/prompts/create-project.prompt.xml`. This XML prompt became the foundation for the entire application architecture:

```xml
<projectSetup>
  <description>
    Build a Node.js project in TypeScript that retrieves Instagram posts 
    for a given account ID via the Graph API, stores them in MongoDB, 
    and performs tone/style analysis using OpenAI...
  </description>
  <techStack>
    Node.js, TypeScript, Express.js, MongoDB, OpenAI API, 
    Docker + Docker Compose
  </techStack>
  <endpoints>
    POST /crawl - Fetches and stores Instagram posts
    POST /analyze - AI-powered content analysis
    GET /templates - Retrieves generated templates
  </endpoints>
</projectSetup>
```

This demonstrates a key principle of **vibe coding**: starting with clear intent and letting AI handle the implementation details.

Here's how I did it:

### 📋 Structured AI Instructions

All AI interactions are guided by comprehensive instruction files in `.github/instructions/`:

```
.github/instructions/
├── cli-base.instructions.md         # Core environment loading and shell session management
├── cli-command.instructions.md      # Enforces consistent CLI patterns and absolute paths
├── common-chat-prompt.instructions.md # Quick command mappings for natural language shortcuts
├── general-coding.instructions.md   # Code standards, best practices, and TypeScript guidelines
├── instructions-guide.instructions.md # Meta-guide for instruction file management
└── repo-structure.instructions.md   # Project organization and file naming conventions
```

**Key Features:**
- **Absolute path enforcement**: Prevents navigation errors in monorepo structure
- **Yarn-only policy**: Consistent package management across all projects
- **TypeScript-first approach**: Type safety and modern development practices
- **Natural language shortcuts**: AI-friendly command mappings for complex workflows
- **Session persistence**: Environment variable loading for reliable AI tool execution

### 🌍 Environment Management System

The project uses a simple and reliable method to ensure correct path navigation during development:

**Core Components:**
- **Git-based navigation**: Use `cd "$(git rev-parse --show-toplevel)"` to always navigate to the project root, regardless of the current working directory.

**Example Command Pattern:**
```bash
# ✅ CORRECT: Use Git to determine the project root
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev
```

**Why This Design?**
- **Path Reliability**: Ensures commands always start from the correct project root.
- **AI Consistency**: Standardized pattern for all path-dependent commands.

### 🎛️ Custom AI Command Mappings

The magic happens in `common-chat-prompt.instructions.md` - I've created natural language shortcuts that map to complex development tasks:

```bash
# Instead of typing long commands, I just say:
"start app" → Automatically starts both backend Docker containers and frontend dev server
"install deps" → Installs dependencies for both frontend and backend
"open page" → Launches Playwright MCP browser integration for live debugging
"test api" → Runs comprehensive API test suite
"save vibe story" → Creates structured session summary for continuity
```

This dramatically reduces cognitive load and allows me to focus on problem-solving rather than remembering commands.

### 📚 Session Continuity with Vibe Stories

The `/vibe-story/` directory contains chronological documentation of each development session:

```
vibe-story/
├── vibe-2025-07-17-01instagram-api-migration.md
├── vibe-2025-07-17-02buffer-llm-complete-testing.md
├── vibe-2025-07-17-03buffer-ui-transformation.md
├── vibe-2025-07-17-04instagram-post-display-fix.md
├── vibe-2025-07-17-05video-thumbnail-support.md
├── vibe-2025-07-17-06generate-templates-endpoint-fix.md
├── vibe-2025-07-17-07generate-content-with-template-api.md
├── vibe-2025-07-17-08frontend-template-refresh-enhancement.md
└── vibe-2025-07-17-09backend-pipeline-control-system.md
```

Each vibe story captures:
- **Goals and decisions made**
- **Technical components implemented**
- **Code changes and snippets**
- **TODO items for next session**
- **Blockers and open questions**

This creates perfect continuity between AI sessions - I can pick up exactly where I left off, even hours later.

### 🎨 UI Consistency Through AI

Design consistency is maintained through a systematic visual reference approach:

**Initial Style Foundation:**
- **`/prompts/buffer-screenshots/`** - Original Buffer app screenshots used as design reference
- Provided AI assistant with authentic Buffer UI patterns at project start
- Established color schemes, typography, and layout conventions before development

**Living Design System:**
- **`/prompts/update-ui-design-guide-line.md`** - Instructions for UI updates
- **`/vibe-story/ui/ui-design-guide-line.md`** - Living design system documentation
- **`/vibe-story/ui/screenshots/`** - Actual application screenshots for ongoing reference

**Progressive Design Evolution:**
- Started with Buffer screenshots for authentic styling foundation
- Transitioned to application screenshots once UI was established
- Maintained visual consistency across all development sessions

The AI assistant automatically:
- References Buffer design patterns from initial screenshots
- Maintains color schemes and typography consistency
- Updates design documentation with each UI change
- Captures application screenshots for visual continuity tracking

### 🎭 Playwright MCP Integration

The most powerful feature: **live browser automation** during development.

When I say "open page", the AI assistant:
1. Launches the application in a Playwright-controlled browser
2. Takes accessibility snapshots of the current state
3. Provides interactive debugging capabilities
4. Allows for automated testing and user journey validation

This means I can debug UI issues, test user flows, and validate implementations without leaving the chat interface.

## 🏗️ Technical Architecture

### Backend (`buffer-llm-backend/`)
- **Node.js/Express** with TypeScript
- **MongoDB** for data persistence
- **Instagram Basic Display API** for content fetching
- **OpenAI API** for content analysis and template generation
- **Docker Compose** for development environment

### Frontend (`buffer-llm-frontend/`)
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Modern CSS** with responsive design
- **API integration** with error handling and loading states

### AI Integration
- **OpenAI GPT-4** for content analysis
- **Custom prompts** for template generation
- **Structured output** for consistent results

## 🚀 Getting Started

Thanks to the AI command mappings and environment management system, setup is simple:

- Set up Backend `.env` 
- Open copilot agent chat

  ```
  install deps 

  #suggest to start a new chat session after installing

  start app
  ```

The app will be available at `http://localhost:3000`

## 🎯 Key Features Developed

1. **Instagram Integration**: Direct access token integration with Instagram Basic Display API
2. **AI Content Analysis**: OpenAI-powered post analysis and pattern recognition
3. **Template Generation**: Automated creation of reusable content templates
4. **Template-Based Content Creation**: Generate new posts from existing templates
5. **Responsive UI**: Modern, Buffer-inspired design system

## 💡 AI-Assisted Development Highlights

### Vibe Coding Philosophy
- **Conversational Development**: Started with natural language product discussions
- **Structured Prompts**: Converted ideas into executable project specifications
- **GitHub Copilot Agent Mode**: Continuous AI assistance throughout development
- **Claude Sonnet 4**: Advanced reasoning for complex architectural decisions

### Rapid Iteration
- **9 major development sessions** in 24 hours
- **Seamless context switching** between frontend and backend
- **Automatic documentation** of decisions and changes
- **Consistent code quality** through AI-enforced standards

### Advanced Debugging
- **Live browser automation** for UI testing
- **Automated API testing** with custom scripts
- **Visual regression detection** through screenshots
- **Performance monitoring** and optimization
- **Environment troubleshooting** with smart error detection

### Code Quality
- **TypeScript throughout** with proper typing
- **Consistent naming conventions** enforced by AI
- **Comprehensive error handling** patterns
- **Modular architecture** with clear separation of concerns
- **Environment management** with shell session awareness

### 🔧 Technical Breakthroughs

**Environment Management System Design:**
- **Problem**: Shell session isolation in AI-assisted development
- **Solution**: Chained command pattern with environment loading
- **Impact**: 100% reliability for environment-dependent commands
- **Innovation**: First-class support for AI tool limitations

## 📄 License

MIT License - See LICENSE file for details.

---

**Built with AI assistance in 24 hours for Buffer Senior Frontend Engineer Application**

*This project showcases rapid prototyping, AI-assisted development, and modern full-stack architecture in a real-world application scenario using GitHub Copilot Agent Mode with Claude Sonnet 4 model.*