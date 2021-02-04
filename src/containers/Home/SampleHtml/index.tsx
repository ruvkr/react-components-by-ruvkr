import { useRef, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion } from 'framer-motion';
import './base.css';
import './default.css';
import { sample_html } from './sample_html';
import { Hightlight } from '../../../components/Hightlight';
import { IconButton } from '../../../components/Buttons';
import { ChevronBack } from '../../../assets/icons/essentials';

interface Props {
  onClose: () => void;
}

export const SampleHtml: React.FC<Props> = ({ onClose }) => {
  const [html, setHtml] = useState('');
  const readerRef = useRef<HTMLDivElement>(null);

  const updateLocalHtml = () => {
    if (!readerRef.current) return;
    const html = readerRef.current.innerHTML;
    localStorage.setItem('highlighted_html', html);
  };

  useEffect(() => {
    const html = localStorage.getItem('highlighted_html') ?? sample_html;
    setHtml(html);
  }, []);

  return createPortal(
    <>
      <ScBackdrop
        key='backdrop'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 33 }}
      />
      <ScContainer
        key='sample-html'
        initial={{ x: '100%' }}
        animate={{ x: '0%' }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 33 }}
      >
        <ScHeading>
          <IconButton icon={<ChevronBack />} onClick={onClose} />
          <ScLabel>
            Sample html taken from{' '}
            <ScA href='https://markdown-it.github.io/'>
              https://markdown-it.github.io/
            </ScA>
          </ScLabel>
        </ScHeading>
        <Hightlight readerRef={readerRef} onHighlight={updateLocalHtml} />
        <ScDocContainer>
          <ScDoc
            ref={readerRef}
            id='sample_html'
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </ScDocContainer>
      </ScContainer>
    </>,
    document.body
  );
};

const ScContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  background-color: ${p => p.theme.col4};
  grid-template-rows: auto 1fr;
  z-index: 100;
`;

const ScHeading = styled.div`
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 16px;
  padding: 8px;
  align-items: center;
  background-color: ${p => p.theme.col5};
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ScLabel = styled.label`
  width: 100%;
  color: ${p => rgba(p.theme.col1, 0.5)};
  text-align: center;
`;

const ScA = styled.a`
  color: inherit;
`;

const ScDocContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
`;

const ScDoc = styled.div`
  &::before,
  &::after {
    display: block;
    content: '';
    height: 52px;
  }

  * {
    user-select: text;
  }
`;

const ScBackdrop = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
  overflow: hidden;
`;
