---
applyTo: "**"
---

# Common Chat Prompt Instructions

## Quick Command Mappings

When the user types these common phrases, execute the corresponding actions immediately:

### Development Commands

#### "start app"

**Action**: Start the full development environment

Execute as single command to maintain environment context:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev
```

Then in a separate terminal session:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn dev
```

Confirm both services are running and provide access URLs

#### "stop app"

**Action**: Stop the development environment

Execute as single command:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev-down
```

Stop frontend development server (if running in background)

#### "open page" / "view app"

**Action**: Open the application in browser using Playwright MCP

1. Use Playwright MCP browser tools to navigate to http://localhost:3000
2. Take a snapshot of the current page state
3. Provide interactive browser session for testing and exploration
4. Allow for automated testing and interaction with the running application

### Documentation Commands

#### "save vibe story"

**Action**: Execute the save-vibe-story.md prompt

1. Read the current session context and progress
2. Follow the instructions in `/prompts/save-vibe-story.md`
3. Generate a structured summary of the session
4. Create filename with format: `vibe-YYYY-MM-DD-##title-slug.md`
5. Save to `/vibe-story/` directory
6. Include:
   - Project goals and decisions made
   - Technical components and tools used
   - Code changes and important snippets
   - TODO items and next steps
   - Any blockers or open questions

### Testing Commands

#### "test api"

**Action**: Run API tests

Execute as single command:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && ./test_api.sh
```

Report results and any failures

#### "test frontend"

**Action**: Run frontend tests

Execute as single command:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn test
```

Report test results

### Build Commands

#### "build app"

**Action**: Build both frontend and backend for production

Execute as single command to maintain environment context:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn build && cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn build
```

#### "deploy app"

**Action**: Deploy the application

1. Build both components
2. Start production Docker containers: `cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:up`

### Maintenance Commands

#### "install deps"

**Action**: Install dependencies for both frontend and backend

Execute as single command to maintain environment context:

```bash
cd "$(git rev-parse --show-toplevel)"/buffer-llm-frontend && yarn install && cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn install
```

#### "clean install"

**Action**: Clean and reinstall all dependencies

1. Remove node_modules and lockfiles
2. Fresh install for both frontend and backend

### Project Status Commands

#### "status" or "project status"

**Action**: Show current project status

1. Check running services (frontend, backend, database)
2. Show recent git changes
3. List any errors or warnings in logs
4. Show last vibe story date

#### "logs"

**Action**: Show application logs

1. Display backend Docker logs
2. Display frontend development server logs
3. Show any error messages

## Command Recognition Guidelines

- **Exact match not required**: Recognize variations like "start the app", "begin development", "fire up the servers", "open the page", "view the app", "show me the site", "set up the app", "setup app", "install everything"
- **Case insensitive**: Accept commands in any case
- **Context aware**: If user says "start" in a development context, assume "start app"; if user says "open" or "view" with app context, assume browser opening
- **Confirm actions**: For destructive operations, confirm before executing
- **Provide feedback**: Always acknowledge the command and show progress

## Integration with Existing Instructions

These commands should work alongside:

- CLI command instructions (absolute paths, yarn usage)
- General coding standards
- Repository structure guidelines
- Project-specific workflows

## Error Handling

If a command fails:

1. Show the exact error message
2. Suggest common fixes (check paths, install dependencies, etc.)
3. Refer to relevant instruction files
4. Offer to help troubleshoot

## Examples

**User**: "start app"
**Response**: "Starting the Buffer LLM application..."

- [Execute backend startup]
- [Execute frontend startup]
- "✅ Backend running on port 4000 via Docker"
- "✅ Frontend running on http://localhost:3000"
- "Your app is ready!"

**User**: "open page" / "view app"
**Response**: "Opening the application in Playwright browser..."

- [Navigate to http://localhost:3000 using Playwright MCP]
- [Take accessibility snapshot of the page]
- "✅ Application opened in interactive browser session"
- "Ready for testing and interaction!"

**User**: "save vibe story"
**Response**: "Creating vibe story for today's session..."

- [Analyze current session]
- [Generate summary following save-vibe-story.md]
- [Save to /vibe-story/vibe-2025-07-17-04instagram-post-display-fix.md]
- "✅ Vibe story saved: Fixed Instagram post display issues and type mismatches"
