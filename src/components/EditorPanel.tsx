import type { ProjectNode } from '../data/sampleProject';
import '../styles/editor.css';

type EditorPanelProps = {
  selectedFile: ProjectNode | null;
  ghostSuggestion: string;
};

function EditorPanel({ selectedFile, ghostSuggestion }: EditorPanelProps) {
  return (
    <main className="editor-panel">
      <header className="panel-header">
        <div>
          <div className="eyebrow">Canvas</div>
          <h1>{selectedFile?.label ?? 'Start writing in Codex'}</h1>
        </div>
        <div className="actions">
          <button className="ghost-button" title="Inline edit (Cmd+K)">⌘K Inline Edit</button>
          <button className="primary-button" title="Export">Export</button>
        </div>
      </header>
      <section className="editor-body">
        <p className="placeholder">
          Select a file from the left to load its contents. This prototype keeps the layout simple so we can
          start integrating the editor engine (Tiptap) and AI features (ghost text, inline edits).
        </p>
        <div className="ghost-text">
          <span className="label">Ghost text</span>
          <p>{ghostSuggestion}</p>
        </div>
        <div className="suggestion-card">
          <div className="card-header">AI Suggestion Preview</div>
          <div className="diff-block">
            <div className="diff-line removed">- The system sometimes forgets distant context.</div>
            <div className="diff-line added">+ The tiered memory keeps Codex consistent across hundreds of pages.</div>
          </div>
          <div className="card-actions">
            <button className="ghost-button">Reject</button>
            <button className="primary-button">Accept</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default EditorPanel;
