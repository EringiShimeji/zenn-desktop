import { Box, Flex, IconButton, Spacer } from '@chakra-ui/react';
import { VFC } from 'react';
import { VscFiles, VscAccount } from 'react-icons/vsc';

const Sidebar: VFC = () => (
  <Flex direction="column" h="100%">
    <Box>
      <IconButton aria-label="Show files" icon={<VscFiles />} />
    </Box>
    <Spacer />
    <Box>
      <IconButton aria-label="Show files" icon={<VscAccount />} />
    </Box>
  </Flex>
);

export default Sidebar;
