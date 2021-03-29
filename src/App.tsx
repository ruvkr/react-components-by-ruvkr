import { GlobalStyles } from './components/GlobalStyle';
import { Home } from './containers/Home/Home';
// import { SideDrawer } from './components/SlideDrawer';
// import { TestComponent } from './containers/TestComponent';

export const App: React.FC = () => {
  return (
    <>
      <GlobalStyles />
      <Home />
      {/* <TestComponent /> */}
    </>
  );
};
