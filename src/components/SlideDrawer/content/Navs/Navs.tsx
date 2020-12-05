import styled from 'styled-components';

import { NavitemsGroupI } from './types';
import { sample_navs } from './sample_navs';
import { NavitemsGroup } from './NavitemsGroup';

interface Props {
  navs?: NavitemsGroupI[];
}

export const Navs: React.FC<Props> = ({ navs = sample_navs }) => {
  const _navs = navs.map(itemsGroup => (
    <NavitemsGroup
      key={itemsGroup.id}
      name={itemsGroup.name}
      collapsable={itemsGroup.collapsable}
      collapsed={itemsGroup.collapsed}
      items={itemsGroup.items}
    />
  ));
  return <ScContainer>{_navs}</ScContainer>;
};

const ScContainer = styled.div`
  width: 100%;
  padding: 8px 0;
`;
