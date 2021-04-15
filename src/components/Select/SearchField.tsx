// import styled from 'styled-components';
import styles from './searchfield.module.scss';
// import { Search } from '../../assets/icons/essentials';
// import { Input, IconButton } from '../UI';

interface Props {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onSearch?: (value: string) => void;
}

export const SearchField: React.FC<Props> = ({
  value = '',
  onChange,
  onSearch,
  onSubmit,
}) => {
  return (
    <div className={styles.container}>
      {/* <ScInput
        value={value}
        onChange={onChange}
        onSubmit={() => onSubmit && onSubmit(value)}
        focus
      />
      <ScSearchIcon
        icon={<Search />}
        onClick={() => onSearch && onSearch(value)}
      /> */}
    </div>
  );
};

// const ScInput = styled(Input)`
//   width: 100%;
//   min-height: 36px;
//   padding-right: 36px;
// `;

// const ScSearchIcon = styled(IconButton)`
//   border-radius: 4px;
//   position: absolute;
//   right: 0;
// `;
