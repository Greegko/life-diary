import React from 'react';
import { render } from 'react-dom';
import { App } from './app/components/app';

document.addEventListener('DOMContentLoaded', function () {
  render(<App />, document.getElementById('app'));
});