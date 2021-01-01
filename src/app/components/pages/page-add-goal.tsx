import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { Page, pageStateAtom } from '../app.state';

export const PageAddGoal = () => {
  const setPage = useSetRecoilState(pageStateAtom);

  useEffect(() => {
    setPage({
      page: Page.AddGoal,
      pageTitle: 'Add Goal',
      hideFooter: true,
      back: { page: Page.Home }
    });
  }, []);

  return <div>Page Add Goal</div>;
}