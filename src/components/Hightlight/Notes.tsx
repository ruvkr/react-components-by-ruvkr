import { useState } from 'react';
import styled, { css } from 'styled-components';
import { rgba } from 'polished';
import { Button } from '../Buttons';
import { Checkmark, Remove } from '../../assets/icons/essentials';

interface Props {
  note: string | null;
  updateNote: (note: string) => void;
}

export const Notes: React.FC<Props> = ({ note, updateNote }) => {
  const [value, setValue] = useState(note ?? '');

  const changeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = event.target as HTMLTextAreaElement;
    target.style.height = '';
    target.style.height = Math.min(target.scrollHeight, 240) + 'px';
    const value = target.value;
    setValue(value);
  };

  const removeHandler = () => {
    setValue('');
    updateNote('');
  };

  return (
    <ScContainer>
      <ScTextarea
        placeholder='No notes'
        value={value}
        onChange={changeHandler}
        rows={4}
      />
      <ScControls>
        <Button
          icon={<Checkmark />}
          name='Save'
          onClick={() => updateNote(value)}
        />
        <Button icon={<Remove />} name='Delete' onClick={removeHandler} />
        <ScInfo children='Click above to add or edit' />
      </ScControls>
    </ScContainer>
  );
};

const ScContainer = styled.div`
  display: grid;
  grid-gap: 8px;
  padding: 8px;
`;

const ScInfo = styled.label`
  font-size: 14px;
  text-align: right;
  color: ${p => p.theme.col3};
`;

const ScControls = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  grid-gap: 8px;
`;

const ScTextarea = styled.textarea(
  ({ theme }) => css`
    font: inherit;
    border: none;
    border-radius: 4px;
    padding: 0.5em;
    margin: 0;
    background-color: transparent;
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
    ::placeholder {
      color: ${p => p.theme.col3};
    }
  `
);
