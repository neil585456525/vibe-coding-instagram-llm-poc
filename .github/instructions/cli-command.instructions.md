---
applyTo: "**"
---

# CLI Command Instructions

Apply the [CLI Base Instructions](./cli-base.instructions.md).

## 🚨 CRITICAL: Directory Navigation Requirements

**⚠️ MANDATORY: ALWAYS navigate to the correct ABSOLUTE directory path before executing ANY commands:**

- **For frontend commands**: `cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend/`
- **For backend commands**: `cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend/`

**❌ NEVER run commands from the root directory or wrong paths**
**✅ ALWAYS use the Git-based navigation to ensure correct paths**

### Examples:

```bash
# ✅ CORRECT: Frontend development with Git-based navigation
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn dev

# ✅ CORRECT: Backend development with Git-based navigation (use Docker Compose)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev

# ✅ CORRECT: Installing both frontend and backend dependencies in single command
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn install && cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn install

# ❌ WRONG: These will fail - never use relative paths from root or separate commands
# cd buffer-llm-frontend && yarn dev
# cd buffer-llm-backend && yarn docker:dev
```

## Package Manager

**Always use Yarn for package management:**

- ✅ Use `yarn install` instead of `npm install`
- ✅ Use `yarn add <package>` instead of `npm install <package>`
- ✅ Use `yarn dev` instead of `npm run dev`
- ✅ Use `yarn build` instead of `npm run build`

### Common Commands:

```bash
# ⚠️ REMEMBER: Always navigate to the correct directory first using Git-based navigation!

# Install dependencies
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn install
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn install

# Start development server
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn dev
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev

# Build for production
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn build
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn build

# Run tests
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn test
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn test

# Add new dependency
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn add <package-name>
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn add <package-name>

# Add dev dependency
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn add -D <package-name>
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn add -D <package-name>

# Remove dependency
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn remove <package-name>
# OR
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn remove <package-name>
```

## Project Structure Awareness

This is a **monorepo** with separate frontend and backend applications:

```
buffer-llm-template-prototype/
├── buffer-llm-backend/     # Node.js/Express API server
├── buffer-llm-frontend/    # React/Vite web application
```

**Important Notes:**

- Each directory has its own `package.json` and dependencies
- Commands must be run from the appropriate directory
- Frontend runs on port 3000, backend runs on port 4000 via Docker
- Backend requires Docker Compose for development (includes MongoDB and other services)
- Frontend proxies API requests to backend via Vite configuration

## Common Workflow Examples:

### Starting Development Environment:

```bash
# Terminal 1 - Start backend with Docker Compose (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev

# Terminal 2 - Start frontend (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn dev
```

### Backend Docker Commands:

```bash
# Start backend development environment with Docker (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev

# Stop backend development environment (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev-down

# Start production backend with Docker (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:up

# Stop production backend (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:down

# Build Docker images (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:build
```

### Installing New Dependencies:

```bash
# Add dependency to frontend (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn add react-router-dom

# Add dependency to backend (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn add express-rate-limit
```

### Building for Production:

```bash
# Build frontend (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn build

# Build backend (Git-based navigation required)
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn build
```
