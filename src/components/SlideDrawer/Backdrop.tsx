import styled from 'styled-components';
import { motion, MotionValue, useTransform } from 'framer-motion';

interface Props {
  progress: MotionValue<number>;
  onClick?: () => void;
}

export const Backdrop: React.FC<Props> = ({ progress, onClick }) => {
  const opacity = useTransform(progress, [0.1, 0.9], [0, 1]);
  const pointerEvents = useTransform(progress, pointerTransformer);
  return <ScBackdrop style={{ opacity, pointerEvents }} onClick={onClick} />;
};

const pointerTransformer = (value: number) => {
  if (value < 0.9) return 'none';
  else return 'all';
};

const ScBackdrop = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 99;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.3);
`;
