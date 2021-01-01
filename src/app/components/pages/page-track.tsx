import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Page, pageStateAtom } from '../app.state';

export const PageTrack = () => {
  const setPage = useSetRecoilState(pageStateAtom);

  useEffect(() => {
    setPage({
      page: Page.Home,
      pageTitle: 'Home',
      pageHeaderAction: {
        label: 'New Goal',
        callback: () => setPage({ page: Page.AddGoal })
      }
    });
  }, []);

  return <div>Page Track</div>;
}