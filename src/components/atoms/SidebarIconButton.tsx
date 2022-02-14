import { IconButton } from '@chakra-ui/react';
import { ReactElement, VFC } from 'react';

type Props = {
  'aria-label': string;
  icon: ReactElement;
  onClick: () => void;
};

const SidebarIconButton: VFC<Props> = ({
  'aria-label': ariaLabel,
  icon,
  onClick,
}) => <IconButton aria-label={ariaLabel} icon={icon} onClick={onClick} />;

export default SidebarIconButton;
