import React from 'react';
import { render } from 'react-dom';
import { RecoilRoot } from 'recoil';
import { App } from './app/components/app';

document.addEventListener('DOMContentLoaded', function () {
  render(
    <RecoilRoot>
      <App />
    </RecoilRoot>,
    document.getElementById('app')
  );
});