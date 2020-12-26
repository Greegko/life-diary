import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentUserIdAtom, pageAtom, Page as PageEnum } from './app.state';
import { PageTrack } from './pages';

export const Page = () => {
  const { page } = useRecoilValue(pageAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);

  if (currentUserId) {
    return (
      <div className='tab-content'>
        {page === PageEnum.Home && <PageTrack />}
      </div>
    );
  }

  return null;
}
