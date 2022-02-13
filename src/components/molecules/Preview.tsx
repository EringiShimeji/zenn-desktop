import { Box } from '@chakra-ui/react';
import { VFC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Preview: VFC<Props> = ({ children }) => (
  <Box
    className="znc"
    w="50%"
    marginRight="2"
    display="table-cell"
    verticalAlign="top"
    justifyContent="start"
  >
    {children}
  </Box>
);

export default Preview;
