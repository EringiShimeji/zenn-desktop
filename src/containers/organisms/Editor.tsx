import { EditorState } from '@codemirror/state';
import { useEffect, VFC } from 'react';
import Editor from 'src/components/organisms/Editor';
import useCodeMirror from 'src/hooks/use-codemirror';

type Props = {
  doc: string;
  onChange: (doc: string) => void;
};

const EnhancedEditor: VFC<Props> = ({ doc, onChange }) => {
  const handleEditorChange = (state: EditorState) =>
    onChange(state.doc.toString());
  const [containerRef] = useCodeMirror<HTMLDivElement>({
    doc,
    onEditorChange: handleEditorChange,
  });

  useEffect(() => {});

  return <Editor containerRef={containerRef} doc={doc} />;
};

export default EnhancedEditor;
