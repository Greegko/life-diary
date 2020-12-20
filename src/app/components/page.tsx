import React from 'react';
import { useRecoilValue } from 'recoil';

import { currentUserIdAtom, pageAtom, Page as PageEnum } from './app.state';
import { PageHome, PageState, PageActivity, PageHistory, PageSettings } from './pages';

export const Page = () => {
  const { page } = useRecoilValue(pageAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);

  if (currentUserId) {
    return (
      <div className='tab-content'>
        {page === PageEnum.Home && <PageHome />}
        {page === PageEnum.State && <PageState />}
        {page === PageEnum.Activity && <PageActivity />}
        {page === PageEnum.History && <PageHistory />}
        {page === PageEnum.Account && <PageSettings />}
      </div>
    );
  }

  return null;
}
