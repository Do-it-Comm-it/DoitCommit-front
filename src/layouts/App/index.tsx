import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import MyPage from '@src/pages/MyPage';
import Home from '@src/pages/Home';
import { CommonComponentWrapper, PublicRoute } from '@src/routes/Route';
import { QueryClient, QueryClientProvider } from 'react-query';
import PrivateRoute from '@src/routes/PrivateRoute';

const App = () => {
  const { theme } = useDarkMode();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <React.Suspense fallback={<h2>Loading</h2>}>
        <ThemeProvider theme={theme === 'light' ? light : dark}>
          <BrowserRouter>
            <GlobalStyle />
            <CommonComponentWrapper>
              <PublicRoute exact path="/" component={Home} />
              <PrivateRoute path="/mypage" component={MyPage} />
            </CommonComponentWrapper>
          </BrowserRouter>
        </ThemeProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
};

export default App;
