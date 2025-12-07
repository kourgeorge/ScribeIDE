export type ProjectNode = {
  id: string;
  label: string;
  type: 'folder' | 'file';
  children?: ProjectNode[];
};

export const projectTree: ProjectNode[] = [
  {
    id: 'front-matter',
    label: 'Front Matter',
    type: 'folder',
    children: [
      { id: 'foreword', label: 'Foreword.md', type: 'file' },
      { id: 'preface', label: 'Preface.md', type: 'file' }
    ]
  },
  {
    id: 'chapters',
    label: 'Chapters',
    type: 'folder',
    children: [
      { id: 'chapter-1', label: '01_intro.md', type: 'file' },
      { id: 'chapter-2', label: '02_architecture.md', type: 'file' },
      { id: 'chapter-3', label: '03_memory.md', type: 'file' }
    ]
  },
  {
    id: 'notes',
    label: 'Research Notes',
    type: 'folder',
    children: [
      { id: 'notes-rag', label: 'RAG Findings.md', type: 'file' },
      { id: 'notes-style', label: 'Style Guide.md', type: 'file' }
    ]
  }
];

export const contextRules = {
  audience: 'Senior engineers',
  tone: 'Witty but precise',
  forbiddenWords: ['synergy', 'paradigm shift'],
  glossary: ['RAG (Retrieval-Augmented Generation)', 'Vector DB: sqlite-vec']
};

export const assistantFocus = ['02_architecture.md', 'Character Bios'];
