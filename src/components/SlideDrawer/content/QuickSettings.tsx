import { useContext } from 'react';
import styled from 'styled-components';
import { darken } from 'polished';
import { v4 as uuid } from 'uuid';

import { SDContext } from './SDContent';
import { Switch } from '../../Switch';

const sample_settings = [
  { id: uuid(), name: 'Dark Mode', on: true, disabled: false },
  { id: uuid(), name: 'Receive notifications', on: false, disabled: false },
  { id: uuid(), name: 'New settings', on: false, disabled: true },
  { id: uuid(), name: 'Other settings', on: true, disabled: true },
];

export const QuickSettings: React.FC = () => {
  const { opened } = useContext(SDContext);

  const settings = sample_settings.map(item => (
    <ScItem key={item.id}>
      <ScName>{item.name}</ScName>
      <Switch on={item.on} disabled={item.disabled} focusable={opened} />
    </ScItem>
  ));

  return <ScContainer>{settings}</ScContainer>;
};

const ScContainer = styled.div`
  width: 100%;
  padding: 8px;
  background-color: ${p => darken(0.01, p.theme.col5)};
`;

const ScItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${p => p.theme.col2};
  padding: 12px;
`;

const ScName = styled.div``;
