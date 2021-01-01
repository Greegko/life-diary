import React from 'react';
import { useRecoilState } from 'recoil';

import { pageAtom, Page } from '../app.state';

import './footer.scss';
export const Footer = () => {
  const [{ page }, setPage] = useRecoilState(pageAtom);

  return (
    <div className="footer ">
      <div className={"footer-tab" + (page === Page.Home ? ' footer-tab--active' : '')} onClick={() => setPage({ page: Page.Home, pageTitle: 'Home' })}>Track</div>
      <div className={"footer-tab" + (page === Page.Comment ? ' footer-tab--active' : '')} onClick={() => setPage({ page: Page.Comment, pageTitle: 'Comment' })}>Comment</div>
      <div className={"footer-tab" + (page === Page.History ? ' footer-tab--active' : '')} onClick={() => setPage({ page: Page.History, pageTitle: 'History' })}>History</div>
    </div>
  );
}
