import { VFC, useState } from 'react';
import Editor from 'containers/organisms/Editor';

const EnhancedApp: VFC = () => {
  const [doc, setDoc] = useState('# Hello world');
  const handleEditorChange = (newDoc: string) => {
    setDoc(newDoc);
  };

  return <Editor doc={doc} onChange={handleEditorChange} />;
};

export default EnhancedApp;
