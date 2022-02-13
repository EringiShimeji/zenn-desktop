import { EditorState } from '@codemirror/state';
import { VFC } from 'react';
import Editor from 'components/organisms/Editor';
import useCodeMirror from 'hooks/use-codemirror';

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

  return <Editor containerRef={containerRef} doc={doc} />;
};

export default EnhancedEditor;
