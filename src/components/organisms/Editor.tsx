import { HStack, Box } from '@chakra-ui/react';
import { RefObject, VFC } from 'react';
import Preview from 'containers/molecules/Preview';

type Props = {
  doc: string;
  containerRef: RefObject<HTMLDivElement>;
};

const Editor: VFC<Props> = ({ doc, containerRef }) => (
  <HStack>
    <Box marginLeft="2" ref={containerRef} />;
    <Preview doc={doc} />
  </HStack>
);

export default Editor;
