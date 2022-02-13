import { defaultKeymap } from '@codemirror/commands';
import { defaultHighlightStyle } from '@codemirror/highlight';
import { history, historyKeymap } from '@codemirror/history';
import { markdown, markdownLanguage } from '@codemirror/lang-markdown';
import { indentOnInput } from '@codemirror/language';
import { languages } from '@codemirror/language-data';
import { bracketMatching } from '@codemirror/matchbrackets';
import { EditorState } from '@codemirror/state';
import { EditorView, highlightActiveLine, keymap } from '@codemirror/view';
import { RefObject, useEffect, useRef, useState } from 'react';

const customTheme = EditorView.theme({
  '.cm-scroller': {
    fontFamily: 'sans-serif ',
  },
  '&.cm-editor.cm-focused': { outline: 'none' },
});

type Props = {
  doc: string;
  onEditorChange: (state: EditorState) => void;
};

const useCodeMirror = <T extends Element>({
  doc,
  onEditorChange,
}: Props): [RefObject<T>, EditorView | undefined] => {
  const containerRef = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();

  useEffect(() => {
    if (!containerRef.current) return;

    const startState = EditorState.create({
      doc,
      extensions: [
        keymap.of([...defaultKeymap, ...historyKeymap]),
        history(),
        indentOnInput(),
        bracketMatching(),
        defaultHighlightStyle.fallback,
        highlightActiveLine(),
        markdown({
          base: markdownLanguage,
          codeLanguages: languages,
          addKeymap: true,
        }),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onEditorChange && onEditorChange(update.state);
          }
        }),
        customTheme,
      ],
    });

    const newView = new EditorView({
      state: startState,
      parent: containerRef.current,
    });

    setEditorView(newView);
  }, [containerRef]);

  return [containerRef, editorView];
};

export default useCodeMirror;
