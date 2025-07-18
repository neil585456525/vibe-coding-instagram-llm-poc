---
applyTo: "**"
---

# Repository Structure Guidelines

## Overall Project Organization

This project follows a monorepo structure with separate frontend and backend applications:

```
buffer-llm-template-prototype/
├── .github/
│   └── instructions/           # Project coding guidelines and instructions
├── buffer-llm-backend/         # Node.js/Express backend service
├── buffer-llm-frontend/        # React/Vite frontend application
├── prompts/                    # LLM agent prompts and instructions
│   ├── save-vibe-story.md      # Instructions for creating vibe story summaries
│   └── update-ui-design-guide-line.md  # UI design update instructions
├── vibe-story/                 # Session summaries and project state documentation
│   ├── ui/                     # UI-related documentation and assets
│   │   ├── screenshots/        # Application screenshots
│   │   └── ui-design-guide-line.md  # UI design guidelines
│   └── vibe-YYYY-MM-DD-##*.md  # Daily session summaries with sequential numbering
└── README.md                   # Project overview and setup instructions
```

## Backend Structure (`buffer-llm-backend/`)

```
buffer-llm-backend/
├── src/
│   ├── config/                 # Configuration files (database, etc.)
│   ├── middleware/             # Express middleware functions
│   ├── models/                 # Data models and schemas
│   ├── routes/                 # API route handlers
│   ├── services/               # Business logic and external service integrations
│   └── server.ts               # Main application entry point
├── temp_instagram_data/        # Temporary data storage for Instagram content
├── docker-compose.yml          # Production Docker configuration
├── docker-compose.dev.yml      # Development Docker configuration
├── Dockerfile                  # Production container build
├── Dockerfile.dev              # Development container build
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── .env                        # Environment variables (gitignored)
├── .env.example                # Environment variables template
├── test_api.sh                 # API testing script
```

## Frontend Structure (`buffer-llm-frontend/`)

```
buffer-llm-frontend/
├── public/
│   └── index.html              # HTML template
├── src/
│   ├── components/             # Reusable React components
│   ├── pages/                  # Page-level components
│   ├── hooks/                  # Custom React hooks
│   ├── services/               # API calls and external services
│   ├── types/                  # TypeScript type definitions
│   ├── utils/                  # Utility functions
│   ├── App.tsx                 # Root application component
│   ├── main.tsx                # Application entry point
│   ├── index.css               # Global styles
│   └── vite-env.d.ts          # Vite environment types
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── tsconfig.node.json          # Node-specific TypeScript config
├── vite.config.ts              # Vite bundler configuration
└── .eslintrc.cjs               # ESLint configuration
```

## File Naming Conventions

### General Rules

- Use **kebab-case** for directories and most files: `user-profile/`, `api-client.ts`
- Use **PascalCase** for React components: `UserProfile.tsx`, `ApiClient.tsx`
- Use **camelCase** for utility files and hooks: `apiHelpers.ts`, `useUserData.ts`
- Use **SCREAMING_SNAKE_CASE** for environment files: `.env`, `.env.example`

### Specific File Types

- **Components**: `ComponentName.tsx`
- **Pages**: `PageName.tsx`
- **Hooks**: `useHookName.ts`
- **Services**: `serviceName.ts`
- **Types**: `typeName.ts` or `types.ts`
- **Utils**: `utilityName.ts`
- **Tests**: `fileName.test.ts` or `fileName.spec.ts`
- **Vibe Stories**: `vibe-YYYY-MM-DD-##title-slug.md` (session summaries)
- **Prompts**: `kebab-case-description.md`

## Directory Guidelines

### Backend (`buffer-llm-backend/src/`)

- **`config/`**: Database connections, environment setup, third-party configurations
- **`middleware/`**: Authentication, error handling, logging, request validation
- **`models/`**: Database schemas, data models, type definitions
- **`routes/`**: API endpoint definitions, route handlers
- **`services/`**: Business logic, external API integrations, data processing

### Frontend (`buffer-llm-frontend/src/`)

- **`components/`**: Reusable UI components organized by feature or type
- **`pages/`**: Top-level page components that represent routes
- **`hooks/`**: Custom React hooks for state management and side effects
- **`services/`**: API clients, HTTP requests, external service integrations
- **`types/`**: TypeScript interfaces and type definitions
- **`utils/`**: Pure functions, helpers, constants, formatters

### Project Documentation (`vibe-story/`)

- **Root level**: Daily session summaries with format `vibe-YYYY-MM-DD-##title-slug.md`
- **`ui/`**: UI-related documentation, design guidelines, and visual assets
- **`ui/screenshots/`**: Application screenshots for documentation and reference

### Prompts (`prompts/`)

- **Root level**: LLM agent instructions and prompt templates
- **`save-vibe-story.md`**: Template for creating session summary documentation
- **`update-ui-design-guide-line.md`**: Instructions for UI design updates

## Import Organization

### Import Order

1. **Node modules**: React, external libraries
2. **Internal modules**: Services, utilities, types from project
3. **Relative imports**: Components and files from same directory or subdirectories

### Example

```typescript
// Node modules
import React, { useState, useEffect } from "react";
import axios from "axios";

// Internal modules
import { ApiClient } from "../services/api-client";
import { UserType } from "../types/user";
import { formatDate } from "../utils/date-helpers";

// Relative imports
import "./ComponentName.css";
import { ChildComponent } from "./child-component/ChildComponent";
```

## Configuration Files

### Environment Variables

- Use `.env.example` to document required environment variables
- Never commit actual `.env` files
- Use descriptive variable names: `INSTAGRAM_API_KEY`, `DATABASE_URL`

### Package Management

- Use **Yarn** for dependency management
- Keep `package.json` organized with clear scripts
- Group dependencies logically (dependencies vs devDependencies)

## Best Practices

### Code Organization

- Keep related files together in the same directory
- Use index files (`index.ts`) for clean imports from directories
- Separate concerns: UI logic, business logic, data access
- Follow single responsibility principle for files and functions

### Documentation

- Include README files in major directories when needed
- Use JSDoc comments for complex functions
- Keep inline comments focused on "why" not "what"
- Document environment variables and setup requirements

### Testing

- Place test files adjacent to the code they test
- Use descriptive test file names: `user-service.test.ts`
- Group tests by feature or component
- Maintain test data in dedicated fixtures directories
