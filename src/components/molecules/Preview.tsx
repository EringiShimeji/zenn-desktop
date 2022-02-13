import { Box } from '@chakra-ui/react';
import { VFC, ReactNode } from 'react';

type Props = {
  children?: ReactNode;
};

const Preview: VFC<Props> = ({ children }) => (
  <Box marginRight="2">{children}</Box>
);

export default Preview;
