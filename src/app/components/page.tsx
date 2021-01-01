import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentUserIdAtom, pageAtom, Page as PageEnum } from './app.state';
import { PageTrack, PageComment, PageHistory } from './pages';

export const Page = () => {
  const { page } = useRecoilValue(pageAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);

  if (currentUserId) {
    return (
      <div className='tab-content'>
        {page === PageEnum.Home && <PageTrack />}
        {page === PageEnum.Comment && <PageComment />}
        {page === PageEnum.History && <PageHistory />}
      </div>
    );
  }

  return null;
}
