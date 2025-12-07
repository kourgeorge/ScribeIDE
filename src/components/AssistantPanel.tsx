import '../styles/assistant.css';

type AssistantPanelProps = {
  focusItems: string[];
};

function AssistantPanel({ focusItems }: AssistantPanelProps) {
  return (
    <aside className="assistant-panel">
      <header className="panel-header">
        <div>
          <div className="eyebrow">Assistant</div>
          <h2>Chat</h2>
        </div>
        <span className="badge">Live</span>
      </header>
      <div className="chat-window">
        <div className="chat-message user">How do we keep context across chapters?</div>
        <div className="chat-message ai">
          Using a tiered memory strategy: global rules, rolling summaries, and a deep RAG search when you type `@` to
          reference specific files.
        </div>
      </div>
      <div className="context-indicator">
        <div className="context-title">Currently reading</div>
        <ul>
          {focusItems.map((item) => (
            <li key={item}>📖 {item}</li>
          ))}
        </ul>
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Ask Codex… (use @ to reference)" />
        <button className="primary-button">Send</button>
      </div>
    </aside>
  );
}

export default AssistantPanel;
