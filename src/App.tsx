import { useEffect } from 'react';
import { GlobalStyles } from './components/GlobalStyle';
import { Layout } from './containers/Layout';
import { initializeStore } from './store';

export const App: React.FC = () => {
  useEffect(initializeStore, []);

  return (
    <>
      <GlobalStyles />
      <Layout />
    </>
  );
};
