import React from 'react';
import { useRecoilState } from 'recoil';

import { pageStateAtom, Page } from '../app.state';

import './footer.scss';
export const Footer = () => {
  const [pageState, setPageState] = useRecoilState(pageStateAtom);

  return (
    <div className="footer ">
      <div className={"footer-tab" + (pageState.page === Page.Home ? ' footer-tab--active' : '')} onClick={() => setPageState({ page: Page.Home })}>Track</div>
      <div className={"footer-tab" + (pageState.page === Page.Comment ? ' footer-tab--active' : '')} onClick={() => setPageState({ page: Page.Comment })}>Comment</div>
      <div className={"footer-tab" + (pageState.page === Page.History ? ' footer-tab--active' : '')} onClick={() => setPageState({ page: Page.History })}>History</div>
    </div>
  );
}
