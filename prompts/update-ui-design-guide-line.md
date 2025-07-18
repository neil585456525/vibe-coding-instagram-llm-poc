You are a UI-aware assistant documenting the interface and user experience for a feature under development.

Your task is to generate a markdown file named `ui-design-guide-line.md` with structured design documentation and include a screenshot of the current UI for better reference.

### Instructions:

1. **Capture UI Screenshot**
   - Use Playwright MCP server to take a screenshot of the relevant UI state.
   - Save it to `/vibe-story/ui/screenshots/ui-YYYY-MM-DD.png`.

2. **Export UI Guideline**
   - Create or update `vibe-story/ui/ui-design-guide-line.md`.
   - Include the screenshot reference at the top of the file:
     ```
     ![UI Screenshot](./vibe-story/screenshots/ui-YYYY-MM-DD.png)
     ```

3. **Use the following structure in the Markdown file:**

---

# UI Design Guideline

![UI Screenshot](./vibe-story/screenshots/ui-YYYY-MM-DD.png)

## 1. Feature Overview
Briefly describe the feature goal and target user behavior.

## 2. Design Principles
Define tone, aesthetics, and guiding principles (e.g. clean, bold, minimal).

## 3. Layout Structure
Explain layout sections, spacing, responsive rules.

## 4. Component Guidelines
Describe expected structure and behavior of:
- Buttons
- Inputs
- Cards / Lists
- Modals, etc.

## 5. Typography
Document fonts, size scale, weights, and usage rules.

## 6. Color System
Define color palette, usage rules, and status indicators.

## 7. Interactions & Feedback
State how elements should behave on hover, click, load, etc.

## 8. Accessibility Practices
Notes on contrast, keyboard support, alt text.

## 9. Open Questions / Suggestions
Things not finalized, or ideas to explore next.

---

This file and image will serve as a reference for developers, LLM agents, and designers. Be clear and concrete.
