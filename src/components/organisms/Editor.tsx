import { Flex, Box } from '@chakra-ui/react';
import { RefObject, VFC } from 'react';
import Preview from 'containers/molecules/Preview';

type Props = {
  doc: string;
  containerRef: RefObject<HTMLDivElement>;
};

const Editor: VFC<Props> = ({ doc, containerRef }) => (
  <Flex direction="row">
    <Box w="50%" marginLeft="2" ref={containerRef} />
    <Preview doc={doc} />
  </Flex>
);

export default Editor;
