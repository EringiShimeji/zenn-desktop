import { VFC } from 'react';
import { VscFiles } from 'react-icons/vsc';
import SidebarIconButton from '../atoms/SidebarIconButton';

type Props = {
  onClick: () => void;
};

const ExplorerButton: VFC<Props> = ({ onClick }) => (
  <SidebarIconButton
    aria-label="Explore files"
    icon={<VscFiles />}
    onClick={onClick}
  />
);

export default ExplorerButton;
