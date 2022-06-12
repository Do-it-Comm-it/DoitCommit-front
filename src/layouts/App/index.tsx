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
import ProtectedRoute from '@src/routes/ProtectedRoute';
import Skeleton from '@src/components/Molecules/LoadingSkeleton';
import Articles from '@src/components/Organisms/Board/Articles';
import { useRecoilValue } from 'recoil';
import { searchAtom } from '@src/recoil/atom/search';

const App = () => {
  const { theme } = useDarkMode();
  const queryClient = new QueryClient();
  const { search, tag, complete } = useRecoilValue(searchAtom);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools />

      <ThemeProvider theme={theme === 'light' ? light : dark}>
        <BrowserRouter>
          <GlobalStyle />
          <CommonComponentWrapper>
            <Route
              path="/*"
              element={
                <Skeleton.Suspense>
                  {complete ? (
                    <Articles search={search} tagType={tag} />
                  ) : (
                    <Home />
                  )}
                </Skeleton.Suspense>
              }
            />
            <Route
              path="/mypage/*"
              element={
                <Skeleton.Suspense>
                  <ProtectedRoute>
                    <MyPage />
                  </ProtectedRoute>
                </Skeleton.Suspense>
              }
            />
            <Route
              path="/community/*"
              element={
                <Skeleton.Suspense>
                  {complete ? (
                    <Articles search={search} tagType={tag} />
                  ) : (
                    <Board />
                  )}
                </Skeleton.Suspense>
              }
            />
          </CommonComponentWrapper>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
