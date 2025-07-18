---
applyTo: "**"
---

# CLI Base Instructions

## 🚨 CRITICAL: Environment Setup Requirements

**⚠️ MANDATORY: ALWAYS navigate to the project root using Git before running commands:**

Instead of sourcing the environment file to get `PROJECT_ABSOLUTE_PATH`, use the following pattern to navigate to the project root:

```bash
# ✅ CORRECT: Use Git to determine the project root
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn dev
```

### 🛠️ When Using the Agent with `run_in_terminal`

- Every time the agent uses the `run_in_terminal` tool with `isBackground: false`, it launches a **new shell session**.
- As a result, you MUST include the Git-based navigation in **every command**:

```bash
# ✅ CORRECT: Use Git to determine the project root
cd "$(git rev-parse --show-toplevel)"/buffer-llm-backend && yarn docker:dev
```

**Best Practice**: Always use the Git-based navigation command at the start of your commands to ensure you're in the correct project directory.

---

**❌ NEVER run commands without navigating to the project root first**  
**✅ ALWAYS run `cd "$(git rev-parse --show-toplevel)"` at the beginning of each new shell session or after using `run_in_terminal`**
