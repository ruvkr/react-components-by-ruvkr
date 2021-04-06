import { GlobalStyles } from './components/GlobalStyle';
import { Layout } from './containers/Layout';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Layout />
    </>
  );
};
