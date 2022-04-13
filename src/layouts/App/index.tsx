import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import useDarkMode from '@src/hooks/useDarkMode';
import { dark, light } from '@src/utils/theme';
import GlobalStyle from './GlobalStyles';
import '@src/assets/fonts/font.css';
import MyPage from '@src/pages/MyPage';
import Home from '@src/pages/Home';
import Board from '@src/pages/Board';
import { CommonComponentWrapper } from '@src/routes/Route';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
const App = () => {
  const { theme } = useDarkMode();
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />
      <React.Suspense fallback={<h2>Loading</h2>}>
        <ThemeProvider theme={theme === 'light' ? light : dark}>
          <BrowserRouter>
            <GlobalStyle />
            <CommonComponentWrapper>
              <Route path="/*" element={<Home />} />
              <Route path="/mypage/*" element={<MyPage />} />
              <Route path="/community/*" element={<Board />} />
            </CommonComponentWrapper>
          </BrowserRouter>
        </ThemeProvider>
      </React.Suspense>
    </QueryClientProvider>
  );
};

export default App;
