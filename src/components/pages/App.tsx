import { VFC } from 'react';
import Editor from 'src/containers/organisms/Editor';

type Props = {
  doc: string;
  onEditorChange: (doc: string) => void;
};

const App: VFC<Props> = ({ doc, onEditorChange }) => (
  <Editor doc={doc} onChange={onEditorChange} />
);

export default App;
