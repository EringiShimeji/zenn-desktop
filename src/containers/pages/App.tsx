import { VFC, useState, useEffect } from 'react';
import Editor from 'src/containers/organisms/Editor';

const EnhancedApp: VFC = () => {
  const [doc, setDoc] = useState('# Hello world');
  const handleEditorChange = (newDoc: string) => {
    setDoc(newDoc);
  };

  useEffect(() => {
    window.fileIO.saveMarkdownData(doc);
  }, [doc]);

  return <Editor doc={doc} onChange={handleEditorChange} />;
};

export default EnhancedApp;
