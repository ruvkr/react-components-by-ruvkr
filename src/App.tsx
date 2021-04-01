import { GlobalStyles } from './components/GlobalStyle';
import { Layout } from './containers/Layout';
// import { TestComponent } from './containers/TestComponent';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Layout />
      {/* <TestComponent /> */}
    </>
  );
};
