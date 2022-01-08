import React from 'react';
import { render } from 'react-dom';
import App from '@src/layouts/App';
import { RecoilRoot } from 'recoil';
import { axiosResponseInterceptor } from '@src/utils/fetcher';

axiosResponseInterceptor();
render(
  <RecoilRoot>
    <App />
  </RecoilRoot>,
  document.querySelector('#app'),
);
