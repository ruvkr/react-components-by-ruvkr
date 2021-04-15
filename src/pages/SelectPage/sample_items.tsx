import { v4 as uuid } from 'uuid';
import { OptionItem } from '../../components/Select';
import { CloudUpload, Share, Bookmarks, Cloud, Document, List, Layers } from '../../assets/icons/essentials';

export const options: OptionItem[] = [
  {
    id: uuid(),
    name: 'Upload file',
    icon: <CloudUpload />,
  },
  '---',
  {
    id: uuid(),
    name: 'Share with others',
    icon: <Share />,
  },
  {
    id: uuid(),
    name: 'Bookmark this page',
    icon: <Bookmarks />,
  },
  '---',
  {
    id: uuid(),
    name: 'Cloud',
    icon: <Cloud />,
    disabled: true,
    onClick: () => console.log('cloud'),
  },
  {
    id: uuid(),
    name: 'Sort by',
    icon: <List />,
  },
  {
    id: uuid(),
    name: 'Download PDF',
    icon: <Document />,
    disabled: true,
  },
  '---',
  {
    id: uuid(),
    name: 'Deep submenu',
    icon: <Layers />,
  },
  {
    id: uuid(),
    name: 'Other option 1',
  },
  {
    id: uuid(),
    name: 'Other option 2',
  },
  {
    id: uuid(),
    name: 'Other option 3',
  },
  {
    id: uuid(),
    name: 'Other option 4',
  },
  {
    id: uuid(),
    name: 'Other option 5',
  },
  {
    id: uuid(),
    name: 'Other option 6',
  },
  {
    id: uuid(),
    name: 'Other option 7',
  },
  {
    id: uuid(),
    name: 'Other option 8',
  },
  {
    id: uuid(),
    name: 'Other option 9',
  },
  {
    id: uuid(),
    name: 'Other option 10',
  },
  {
    id: uuid(),
    name: 'Other option 11',
  },
  {
    id: uuid(),
    name: 'Other option 12',
  },
  {
    id: uuid(),
    name: 'Other option 13',
  },
  {
    id: uuid(),
    name: 'Other option 14',
  },
  {
    id: uuid(),
    name: 'Other option 15',
  },
  {
    id: uuid(),
    name: 'Other option 16',
  },
  {
    id: uuid(),
    name: 'Other option 17',
  },
  {
    id: uuid(),
    name: 'Other option 18',
  },
  {
    id: uuid(),
    name: 'Other option 19',
  },
  {
    id: uuid(),
    name: 'Other option 20',
  },
];
