import { v4 as uuid } from 'uuid';
import {
  HomeOutline,
  ShapesOutline,
  InformationOutline,
  CogOutline,
  LogoGithub,
} from '../../../assets/icons/essentials';

export const sidebaritems: {
  id: string;
  name: string;
  icon: JSX.Element;
}[] = [
  { id: uuid(), name: 'Home', icon: <HomeOutline /> },
  { id: uuid(), name: 'Components', icon: <ShapesOutline /> },
  { id: uuid(), name: 'Settings', icon: <CogOutline /> },
  { id: uuid(), name: 'About', icon: <InformationOutline /> },
  { id: uuid(), name: 'Github', icon: <LogoGithub /> },
];
