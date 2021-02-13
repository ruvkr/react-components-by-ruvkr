import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { rgba } from 'polished';
import { motion, useTransform, MotionValue } from 'framer-motion';

const d_middle = 'M 3,13 23,13';
const d_top = ['M 13,5 23,5', 'M 13,13 20.07106,5.92894'];

interface Props {
  onClick?: () => void;
  progress: MotionValue<number>;
}

export const TogglerButton: React.FC<Props> = ({ onClick, progress }) => {
  const d = useTransform(progress, [0, 1], d_top);
  const middleRotate = useTransform(progress, [0, 1], [0, 45]);
  const rotate = useTransform(progress, v => v * 90);

  return createPortal(
    <ScContainer>
      <ScInner>
        <ScBackground style={{ opacity: progress }} />
        <ScToggler onClick={onClick}>
          <ScFocus tabIndex={-1}>
            <svg width='100%' height='100%' viewBox='0 0 26 26'>
              <motion.g fill='none' style={{ rotate }}>
                <ScPath d={d} />
                <ScPath d={d_middle} style={{ rotate: middleRotate }} />
                <ScPathBottom d={d} />
              </motion.g>
            </svg>
          </ScFocus>
        </ScToggler>
      </ScInner>
    </ScContainer>,
    document.body
  );
};

const ScContainer = styled.div`
  position: absolute;
  z-index: 110;
  width: 64px;
  height: 64px;
  top: 0;
  left: 0;
`;

const ScInner = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ScToggler = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
  z-index: 1;

  &:focus,
  &:active {
    outline: none;
    & > div {
      background-color: ${p => rgba(p.theme.col2, 0.2)};
      transition: background-color 300ms ease-in-out;
    }
  }
`;

const ScFocus = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px;
  border-radius: 8px;
  display: flex;
  background-color: transparent;
  transition: background-color 300ms ease-in-out;

  &:focus,
  &:active {
    outline: none;
  }
`;

const ScBackground = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-image: radial-gradient(${p => p.theme.col5} 25%, transparent 75%);
`;

const ScPath = styled(motion.path)`
  stroke: ${p => p.theme.col2};
  stroke-width: 2;
  stroke-linecap: round;
  transform-origin: center;
`;

const ScPathBottom = styled(ScPath)`
  transform: rotate(180deg);
`;
