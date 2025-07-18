---
applyTo: "**"
---

# General Coding Standards

## Naming Conventions

- Use **PascalCase** for classes, interfaces, types, and components
- Use **camelCase** for variables, functions, methods, and properties
- Use **SCREAMING_SNAKE_CASE** for constants and environment variables
- Use **kebab-case** for file names and directories
- Prefix private class members with underscore (`_privateMethod`)

## TypeScript Guidelines

- Use TypeScript for all new code
- Prefer `interface` over `type` for object shapes
- Use `const` assertions for immutable data
- Implement proper typing for function parameters and returns
- Use optional chaining (`?.`) and nullish coalescing (`??`) operators
- Avoid `any` type - use `unknown` or proper typing instead

## Code Organization

- Keep functions and methods focused and single-purpose
- Use meaningful names that describe intent
- Prefer composition over inheritance
- Implement proper separation of concerns
- Follow domain-driven design principles

## Error Handling

- Use try/catch blocks for async operations that may fail
- Implement proper error boundaries and recovery
- Always log errors with contextual information
- Use custom error types for better error categorization
- Provide meaningful error messages for debugging

## Async Programming

- Use `async/await` instead of Promise chains
- Handle rejected promises appropriately
- Implement proper timeout handling for external calls
- Use Promise.all() for concurrent operations when possible

## Import/Export Standards

- Use ES6 module syntax (`import/export`)
- Prefer named exports over default exports for utilities
- Use default exports for main classes and components
- Group imports: Node modules, internal modules, relative imports
- Use absolute imports when available

## Package Management

- Use **Yarn** as the package manager for all projects
- Run `yarn install` instead of `npm install` for dependency installation
- Use `yarn add <package>` for adding new dependencies
- Use `yarn add -D <package>` for adding development dependencies
- Prefer yarn scripts in package.json over npm scripts
- Use yarn workspaces for monorepo configurations when applicable

## Comments and Documentation

- Write self-documenting code with clear naming
- Add comments for complex business logic
- Document public APIs and interfaces
- Include examples in documentation
- Keep comments up-to-date with code changes

## Performance Considerations

- Avoid unnecessary computations in loops
- Use appropriate data structures for the use case
- Implement pagination for large data sets
- Cache frequently accessed data when appropriate
- Monitor and optimize database queries

## Security Best Practices

- Validate all input data
- Use parameterized queries for database access
- Sanitize data before output
- Implement proper authentication and authorization
- Never log sensitive information (passwords, tokens, etc.)

## Testing Standards

- Write tests for all business logic
- Use descriptive test names that explain the scenario
- Follow Arrange-Act-Assert pattern
- Mock external dependencies in unit tests
- Maintain high test coverage for critical paths

### Code Generation Best Practices

- **Incremental approach**: Break large tasks into smaller, manageable chunks
- **State persistence**: Update relay prompts after each significant milestone
- **Context preservation**: Document architectural decisions and reasoning in relay prompts
- **Interruption handling**: Design code generation to be resumable at any point
- **Quality assurance**: Include validation steps and testing criteria in relay prompts
- **Error recovery**: Document known issues and their solutions in relay prompts
- **Progress tracking**: Maintain a clear record of what has been implemented vs planned

### Collaboration Guidelines

- **Update relay prompts** when modifying ongoing code generation tasks
- **Reference existing relay prompts** when joining an existing code generation effort
- **Clean up relay prompts** from `/prompts/temp/` after task completion or when they become obsolete
- **Timestamp relay prompts** to track progress chronologically
- **Keep relay prompts focused** on specific features or modules to avoid complexity
