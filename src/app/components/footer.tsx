import React, { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { pageAtom, Page as PageEnum } from './app.state';

export const Footer = () => {
  const [page, setPage] = useRecoilState(pageAtom);

  const setPagei = useCallback((page: PageEnum) => {
    setPage({ page, pageTitle: '' });
  }, []);

  return (
    <div className="footer">
      <div className="tabs">
        <div className={"tab" + (page.page === PageEnum.Home ? " tab--active" : "")} onClick={() => setPagei(PageEnum.Home)}>Home</div>
        <div className={"tab" + (page.page === PageEnum.State ? " tab--active" : "")} onClick={() => setPagei(PageEnum.State)}>State</div>
        <div className={"tab" + (page.page === PageEnum.Activity ? " tab--active" : "")} onClick={() => setPagei(PageEnum.Activity)}>Activity</div>
        <div className={"tab" + (page.page === PageEnum.History ? " tab--active" : "")} onClick={() => setPagei(PageEnum.History)}>History</div>
      </div>
    </div>
  );
}
