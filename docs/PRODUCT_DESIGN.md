# Codex Product Design Document (PDD)

## 1. Product Philosophy: "The IDE for Prose"

Most writing AI tools treat text like a blog post. **Codex** treats text like a software project where later chapters depend on earlier definitions.

- **Target User:** Technical authors, documentation writers, researchers.
- **Core Value:** Context-aware writing so the AI understands the entire manuscript, not just the current page.

## 2. User Interface Design (The Layout)

The UI mirrors developer tools while remaining optimized for reading and writing prose.

- **Left Sidebar (The Structure):**
  - **File Tree:** Folders for *Front Matter, Chapters, Back Matter, Research Notes*.
  - **"Context" Panel:** A dedicated area for global rules such as audience, tone, and forbidden words (similar to `.cursorrules`).
- **Center Stage (The Editor):**
  - **Canvas:** A clean, distraction-free writing area powered by Tiptap.
  - **Typography:** Serif styling with comfortable margins.
  - **Bubble Menu:** Appears on text selection with actions like Rewrite, Expand, and Shorten.
- **Right Sidebar (The Assistant):**
  - **Chat:** Persistent AI chat interface.
  - **Context Indicator:** Displays what files the AI is currently reading (for example, "Reading: Chapter 1, Character Bios").

## 3. Technical Architecture (The Stack)

Codex is a **local-first** desktop application.

### A. Application Shell (Tauri)

- **Why:** Provides file system access to save projects as `.md` or `.json` locally.
- **Backend (Rust):** Handles file I/O, vector database coordination, and PDF export logic.
- **Frontend (React + TypeScript):** Renders the UI.

### B. Editor Engine (Tiptap + ProseMirror)

- **Why:** Supplies a headless editor suitable for custom AI blocks.
- **Custom Node:** An `<AISuggestion>` node lets the AI insert highlighted suggestions (green/red) that users explicitly Accept or Reject, similar to resolving git merge conflicts.

### C. "Long Memory" Backend (RAG)

- **Vector Database:** SQLite with `sqlite-vec` (or a local LanceDB instance) running on the user's machine.
- **Orchestrator:** LangChain.js.

## 4. Intelligence Engine: Handling Long Corpus

A tiered context strategy keeps the AI aware of large manuscripts.

### Tier 1: Global Context (Always Active)

- **Input:** User-defined settings like tone, style guide, and glossary.
- **Implementation:** Injected as a system prompt at the start of every AI call.

### Tier 2: Rolling Summary (Narrative Flow)

- **Problem:** Maintain continuity across chapters.
- **Solution:** After completing a chapter, a background job generates a ~300-word summary.
- **Execution:** While writing new sections, the AI receives summaries of all previous chapters rather than full text to preserve tokens and narrative flow.

### Tier 3: Deep Dive (On-Demand RAG)

- **Scenario:** User asks to verify consistency (e.g., "Does this contradict what I said about neural networks?").
- **Action:**
  1. Embed the query.
  2. Search the local vector DB for relevant text chunks from any chapter.
  3. Retrieve matching paragraphs and supply them to the AI for comparison.

## 5. Feature Specifications

### Feature A: "Cmd+K" (Inline Edit)

- **Trigger:** User highlights a paragraph and presses Cmd+K.
- **UI:** Floating input bar appears.
- **Prompt:** "Make this sound more professional."
- **Behavior:** AI streams a new version and shows a diff view (old text strikethrough red, new text green). User presses Enter to accept.

### Feature B: Smart Auto-Complete (Ghost Text)

- **Trigger:** User pauses typing for 2 seconds.
- **Behavior:** AI analyzes the previous ~500 words and suggests the next sentence as gray ghost text, similar to GitHub Copilot.
- **Action:** Press Tab to accept.

### Feature C: Reference System (`@`)

- **Trigger:** User types `@` in chat.
- **Dropdown:** Lists all chapters, character sheets, or research notes.
- **Result:** Forces the AI to load the selected file into its context window.

## 6. Data Structure (File System)

Projects use a portable folder layout managed by `project.json`.

```
/MyBookProject
  ├── project.json         // Metadata (Title, Author, Order of chapters)
  ├── .codex/              // Hidden folder for App Data
  │   ├── vector_index.db  // The AI memory (Vector Store)
  │   ├── summaries.json   // Auto-generated summaries of chapters
  ├── chapters/
  │   ├── 01_intro.md
  │   ├── 02_architecture.md
  ├── assets/              // Images
  └── export/              // PDF/EPUB outputs
```

## 7. Implementation Strategy (Milestones)

1. **Milestone 1 – The Editor:** Build a Tauri app with Markdown editing, file saving, and a file tree.
2. **Milestone 2 – The Chat:** Connect the assistant sidebar to an LLM API (Claude or OpenAI).
3. **Milestone 3 – The Brain:** Implement the Cmd+K inline replacement workflow.
4. **Milestone 4 – The Memory:** Add a vector database for whole-book search and retrieval.
