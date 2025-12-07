import { useState } from 'react';
import Sidebar from './Sidebar';
import EditorPanel from './EditorPanel';
import AssistantPanel from './AssistantPanel';
import { ProjectNode, projectTree, contextRules, assistantFocus } from '../data/sampleProject';
import '../styles/layout.css';

function Layout() {
  const [selectedFile, setSelectedFile] = useState<ProjectNode | null>(null);
  const [ghostSuggestion] = useState(
    'This architecture keeps Codex responsive even when handling hundreds of pages.'
  );

  return (
    <div className="app-shell">
      <Sidebar
        projectTree={projectTree}
        contextRules={contextRules}
        onSelect={setSelectedFile}
        selectedId={selectedFile?.id}
      />
      <EditorPanel selectedFile={selectedFile} ghostSuggestion={ghostSuggestion} />
      <AssistantPanel focusItems={assistantFocus} />
    </div>
  );
}

export default Layout;
