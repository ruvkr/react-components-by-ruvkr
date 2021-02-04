import { useState } from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Button } from '../Buttons';
import { Checkmark, Remove } from '../../assets/icons/essentials';

export const Notes: React.FC = () => {
  const [value, setValue] = useState('');

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = '';
    target.style.height = Math.min(target.scrollHeight, 240) + 'px';
    const value = target.value;
    setValue(value);
  };

  return (
    <ScContainer>
      <ScLabel children='Click to add or edit' />
      <ScTextarea value={value} onChange={changeHandler} rows={4} />
      <ScControls>
        <Button icon={<Checkmark />} name='Save' />
        <Button icon={<Remove />} name='Delete' />
      </ScControls>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  padding: 8px;
`;

const ScLabel = styled.label`
  font-size: 14px;
  color: ${p => rgba(p.theme.col1, 0.5)};
`;

const ScControls = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  justify-content: center;
  grid-gap: 8px;
`;

const ScTextarea = styled.textarea(
  ({ theme }) => css`
    font: inherit;
    border: none;
    border-radius: 4px;
    padding: 0.5em;
    margin: 0;
    background-color: ${theme.col4};
    color: ${rgba(theme.col1, 0.5)};
    resize: none;
    transition: all 300ms ease-in-out;

    &:hover:not(:disabled),
    &:focus {
      outline: none;
      box-shadow: 0 0 0 2px ${theme.col3};
      transition: all 300ms ease-in-out;
    }
    &:disabled {
      opacity: 0.2;
      cursor: not-allowed;
    }
    &::selection {
      background-color: ${theme.col2};
    }
  `
);
