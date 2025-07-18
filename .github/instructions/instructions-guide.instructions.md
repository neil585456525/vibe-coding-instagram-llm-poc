---
applyTo: "**/*.instructions.md"
---

# Copilot Instructions Authoring Guide

This guide provides coding and writing conventions for Copilot when creating or updating instruction files. These standards ensure consistency, clarity, and effectiveness across the project's Copilot customization files.

## 1. File Structure and Naming

- Use `.instructions.md` suffix for instruction files stored in `.copilot/`.
  - Example: `react-guidelines.instructions.md`
- Use `.github/copilot-instructions.md` for global workspace-level guidance.

## 2. Frontmatter

Each file must start with a YAML-style frontmatter block to declare file scope:

```
---
applyTo: "**/*.ts,**/*.tsx"
---
```

- Use `applyTo: "**"` for general rules.
- Use comma-separated globs for specific languages or file types.
- Avoid overly broad scoping unless intentional.

## 3. Section Structure

Use clear Markdown headers to organize content. Standard sections include:

```
# Project Coding Standards

## Naming Conventions
- ...

## Code Style
- ...

## Error Handling
- ...

## Framework/Language Specific Guidelines
- ...
```

- Always begin with a `#`-level heading for the document title.
- Use `##`-level subheadings for category groupings.
- Use `-` bullet points for rule items.
- Write in clear, directive language (see examples below).

## 4. Instruction Style

- ✅ Use second-person or imperative voice (e.g., “Use camelCase…”)
- ✅ Be specific (e.g., “Prefer `const` over `let`”)
- ✅ List rules as bullet points grouped by topic
- ✅ Reference other `.instructions.md` files if relevant
- ❌ Avoid vague or subjective phrases like “try to,” “maybe,” or “modern”

### Good Example:

```
## Naming Conventions
- Use camelCase for variables and functions
- Use PascalCase for React components and classes
```

## 5. Referencing Other Guidelines

If building on a base file, include a relative Markdown link:

```
Apply the [general coding guidelines](./general.instructions.md).
```

This allows Copilot to reuse existing guidance contextually.

## 6. Multi-File Organization

- General rules → `general.instructions.md`
- Framework-specific rules → `react.instructions.md`, `node.instructions.md`
- Style guides → `naming.instructions.md`, `typescript-style.instructions.md`
- Custom conventions → `team-practices.instructions.md`

## 7. Language Mapping Suggestions

| Language/Tech | File Glob           |
| ------------- | ------------------- |
| JavaScript    | `**/*.js`           |
| TypeScript    | `**/*.ts,**/*.tsx`  |
| Python        | `**/*.py`           |
| React         | `**/*.jsx,**/*.tsx` |
| Vue           | `**/*.vue`          |
| Markdown Docs | `**/*.md`           |

---

By following this guide, GitHub Copilot can generate consistent, scoped, and useful `.instructions.md` files that reflect project preferences and developer expectations.
