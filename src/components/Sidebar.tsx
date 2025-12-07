import { ProjectNode } from '../data/sampleProject';
import '../styles/sidebar.css';

type SidebarProps = {
  projectTree: ProjectNode[];
  contextRules: {
    audience: string;
    tone: string;
    forbiddenWords: string[];
    glossary: string[];
  };
  onSelect: (node: ProjectNode) => void;
  selectedId?: string;
};

function Sidebar({ projectTree, contextRules, onSelect, selectedId }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <header className="section-header">Structure</header>
        <div className="file-tree">
          {projectTree.map((node) => (
            <TreeNode
              key={node.id}
              node={node}
              level={0}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      </div>
      <div className="sidebar-section">
        <header className="section-header">Context</header>
        <ul className="context-list">
          <li>
            <strong>Audience:</strong> {contextRules.audience}
          </li>
          <li>
            <strong>Tone:</strong> {contextRules.tone}
          </li>
          <li>
            <strong>Forbidden:</strong> {contextRules.forbiddenWords.join(', ')}
          </li>
          <li>
            <strong>Glossary:</strong>
            <ul className="glossary">
              {contextRules.glossary.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  );
}

type TreeNodeProps = {
  node: ProjectNode;
  level: number;
  onSelect: (node: ProjectNode) => void;
  selectedId?: string;
};

function TreeNode({ node, level, onSelect, selectedId }: TreeNodeProps) {
  const padding = 12 + level * 12;
  const isSelected = node.id === selectedId;
  const isFolder = node.type === 'folder';

  return (
    <div>
      <button
        className={`tree-node ${isSelected ? 'selected' : ''}`}
        style={{ paddingLeft: `${padding}px` }}
        onClick={() => onSelect(node)}
        aria-pressed={isSelected}
      >
        <span className="node-icon">{isFolder ? '📁' : '📄'}</span>
        {node.label}
      </button>
      {isFolder && node.children && (
        <div className="tree-children">
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              level={level + 1}
              onSelect={onSelect}
              selectedId={selectedId}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Sidebar;
