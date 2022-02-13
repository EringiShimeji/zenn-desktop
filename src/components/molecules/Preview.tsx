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
    fontFamily="Meiryo"
    sx={{ 'h1, h2, h3, h4, h5, h6': { fontWeight: '700' } }}
  >
    {children}
  </Box>
);

export default Preview;
