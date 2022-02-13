import { defaultKeymap } from '@codemirror/commands';
import {
  defaultHighlightStyle,
  HighlightStyle,
  tags,
} from '@codemirror/highlight';
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
    fontFamily: 'Consolas, "MS Gothic"',
  },
  '&.cm-editor.cm-focused': { outline: 'none' },
});
const syntaxHighlighting = HighlightStyle.define([
  {
    tag: tags.heading1,
    marginTop: '1em',
    lineHeight: '1.5',
    fontWeight: '700',
    fontSize: '1.4em',
  },
  {
    tag: tags.heading2,
    marginTop: '1em',
    lineHeight: '1.5',
    fontWeight: '700',
    fontSize: '1.3em',
  },
  {
    tag: tags.heading3,
    marginTop: '1em',
    lineHeight: '1.5',
    fontWeight: '700',
    fontSize: '1.2em',
  },
  {
    tag: tags.heading4,
    marginTop: '1em',
    lineHeight: '1.5',
    fontWeight: '700',
    fontSize: '1.1em',
  },
  {
    tag: tags.heading5,
    marginTop: '1em',
    lineHeight: '1.5',
    fontWeight: '700',
  },
  {
    tag: tags.heading6,
    marginTop: '1em',
    lineHeight: '1.5',
    fontWeight: '700',
    fontSize: '.9em',
  },
]);

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
        customTheme,
        syntaxHighlighting,
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onEditorChange && onEditorChange(update.state);
          }
        }),
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
