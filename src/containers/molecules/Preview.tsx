import htmlReactParser from 'html-react-parser';
import { useEffect, useState, VFC } from 'react';
import Preview from 'components/molecules/Preview';

type Props = {
  doc: string;
};

const EnhancedPreview: VFC<Props> = ({ doc }) => {
  const [htmlText, setHtmlText] = useState('');

  useEffect(() => {
    setHtmlText(window.zenn.markdownToHtml(doc));
  }, [doc]);

  return <Preview>{htmlReactParser(htmlText)}</Preview>;
};

export default EnhancedPreview;
