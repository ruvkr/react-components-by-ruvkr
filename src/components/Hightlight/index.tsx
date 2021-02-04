import { useReducer, useEffect } from 'react';
import * as CSS from 'csstype';
import { IconButton } from '../Buttons';
import { Tabs, TabItem } from '../Tabs';
import { useHighlightRange } from '../../hooks';
import {
  ColorWand,
  Close,
  ColorFill,
  ChatboxEllipses,
} from '../../assets/icons/essentials';
import { StyleEditor } from './StyleEditor';
import { Notes } from './Notes';

interface Props {
  readerRef: React.MutableRefObject<HTMLElement | null>;
  className?: string;
  size?: number;
  onHighlight?: () => void;
}

interface State {
  selecting: boolean;
  selectedId: string | null;
  selectedStyles: CSS.Properties<string> | null;
  selectedNote: string | null;
  tagName: string;
  attributes: { [key: string]: string };
  styles: CSS.Properties<string>;
}

const initialState: State = {
  selecting: false,
  selectedId: null,
  selectedStyles: null,
  selectedNote: null,
  tagName: 'span',
  attributes: { class: 'highlighted' },
  styles: { backgroundColor: '#fabc02', color: '#222831' },
};

export const Hightlight: React.FC<Props> = ({ readerRef, onHighlight }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selecting,
    selectedId,
    tagName,
    attributes,
    styles,
    selectedStyles,
    selectedNote,
  } = state;

  const styleChangeHandler = (styles: CSS.Properties<string>) => {
    if (selectedId) {
      updateStyle(styles);
      onHighlight && onHighlight();
      if (selectedStyles) {
        dispatch({ selectedStyles: styles });
        return;
      }
    }

    dispatch({ styles });
    localStorage.setItem('highlight_style', JSON.stringify(styles));
  };

  const highlightHandler = () => {
    if (selectedId) removeHighlight();
    else highlight();
    onHighlight && onHighlight();
  };

  const {
    cancel,
    highlight,
    removeHighlight,
    updateStyle,
    updateNote,
  } = useHighlightRange({
    readerRef,
    tagName,
    attributes,
    styles,
    stateChangeCallback: dispatch,
  });

  const tabs: TabItem[] = [
    {
      id: 'highlight',
      name: 'highlight',
      icon: props => (
        <IconButton
          {...props}
          icon={<ColorWand />}
          active={Boolean(selectedId)}
        />
      ),
      isButton: true,
      onClick: highlightHandler,
    },
    {
      id: 'styles',
      name: 'styles',
      icon: props => <IconButton {...props} icon={<ColorFill />} />,
      content: (
        <StyleEditor
          allStyles={selectedStyles ?? styles}
          onChange={styleChangeHandler}
        />
      ),
    },
    {
      id: 'note',
      name: 'note',
      icon: props => (
        <IconButton
          {...props}
          icon={<ChatboxEllipses />}
          disabled={selectedId === null}
        />
      ),
      content: (
        <Notes
          note={selectedNote}
          updateNote={note => {
            updateNote(note);
            onHighlight && onHighlight();
          }}
        />
      ),
    },
    {
      id: 'dismiss',
      name: 'dismiss',
      icon: props => <IconButton {...props} icon={<Close />} />,
      isButton: true,
      onClick: cancel,
    },
  ];

  useEffect(() => {
    const localStyles = localStorage.getItem('highlight_style');
    localStyles && dispatch({ styles: JSON.parse(localStyles) });
  }, []);

  return (
    <Tabs
      show={Boolean(selecting || selectedId)}
      tabItems={tabs}
      resetOnHide
      //
    />
  );
};

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});
