import React from 'react';
import { useRecoilState } from 'recoil';
import { pageStateAtom } from '../app.state';

import './header.scss';
export const Header = () => {
  const [pageState, setPageState] = useRecoilState(pageStateAtom);

  return (
    <div className='header'>
      {pageState.back && <a className="header-back" onClick={() => setPageState(pageState.back)}>Back</a>}
      <div className="header-title">{pageState.pageTitle}</div>
      {pageState.pageHeaderAction &&
        <a className="header-action" onClick={pageState.pageHeaderAction.callback}>{pageState.pageHeaderAction.label}</a>
      }
    </div>
  );
}
