import { useReducer, useRef } from 'react';
import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion';
import styles from './styles.module.scss';
import { Toggler } from './Toggler';
import { OptionItem } from './types';
import { Items } from './Items';
import { InputContainer } from '../common/InputContainer';
import { AtCircle, ArrowForward } from '../../assets/icons/essentials';

export interface SelectProps {
  name?: string;
  title?: string;
  disabled?: boolean;
  icon?: JSX.Element;
  togglerIcon?: JSX.Element;
  items?: OptionItem[];
  hideOnClick?: boolean;
  zIndex?: number;
}

interface State {
  // activeItems: OptionItem[];
  // prevItems: OptionItem[][];
  // forwardItems: OptionItem[][];
  show: boolean;
}

export const Select: React.FC<SelectProps> = ({
  name,
  title,
  disabled = false,
  icon,
  togglerIcon = <ArrowForward />,
  items = [],
  hideOnClick = true,
  zIndex,
}) => {
  const [state, dispatch] = useReducer(reducer, {
    // activeItems: items,
    // prevItems: [],
    // forwardItems: [],
    show: false,
  });

  const { show } = state;
  const buttonRef = useRef<HTMLButtonElement>(null);

  const togglerShow = () => {
    if (disabled || items.length === 0) return;
    if (show) dispatch({ show: false });
    else dispatch({ show: true });
  };

  return (
    <div className={styles.container}>
      <Toggler
        name={'Select'}
        title={title}
        disabled={disabled}
        icon={<AtCircle />}
        onClick={togglerShow}
        forwardRef={buttonRef}
        badge={
          <motion.div animate={{ rotate: show ? 90 : 0 }} className={styles.badge}>
            {togglerIcon}
          </motion.div>
        }
      />

      <AnimateSharedLayout>
        <AnimatePresence>
          {show && (
            <InputContainer
              items={''}
              anchorRef={buttonRef}
              domContainerName='select-container'
              onOutsideClick={() => show && togglerShow()}
              zIndex={zIndex}
              children={<Items items={items} onClick={() => hideOnClick && togglerShow()} />}
            />
          )}
        </AnimatePresence>
      </AnimateSharedLayout>
    </div>
  );
};

const reducer = (state: State, payload: Partial<State>): State => ({
  ...state,
  ...payload,
});
