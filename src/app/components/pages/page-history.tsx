import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Page, pageStateAtom } from '../app.state';

export const PageHistory = () => {
  const setPage = useSetRecoilState(pageStateAtom);

  useEffect(() => {
    setPage({ page: Page.History, pageTitle: 'History' });
  }, []);

  return <div>Page History</div>;
}