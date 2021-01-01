import React from 'react';
import { useRecoilValue } from 'recoil';

import { pageStateAtom, Page as PageEnum } from './app.state';
import { PageTrack, PageComment, PageHistory, PageAddGoal } from './pages';

export const Page = () => {
  const pageState = useRecoilValue(pageStateAtom);

  if (pageState) {
    return (
      <div className='tab-content'>
        {pageState.page === PageEnum.Home && <PageTrack />}
        {pageState.page === PageEnum.Comment && <PageComment />}
        {pageState.page === PageEnum.History && <PageHistory />}
        {pageState.page === PageEnum.AddGoal && <PageAddGoal />}
      </div>
    );
  }

  return null;
}
