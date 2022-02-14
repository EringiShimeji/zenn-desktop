import { Flex, Box } from '@chakra-ui/react';
import { RefObject, VFC } from 'react';
import Preview from 'src/containers/molecules/Preview';
import Sidebar from '../molecules/Sidebar';

type Props = {
  doc: string;
  containerRef: RefObject<HTMLDivElement>;
};

const Editor: VFC<Props> = ({ doc, containerRef }) => (
  <Flex h="100vh" grow="1" direction="row">
    <Sidebar />
    <Flex grow="1" direction="row">
      <Box w="50%" marginLeft="2" ref={containerRef} />
      <Preview doc={doc} />
    </Flex>
  </Flex>
);

export default Editor;
