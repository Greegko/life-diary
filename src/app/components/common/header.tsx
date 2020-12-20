import React from 'react';
import { useRecoilValue } from 'recoil';
import { pageAtom } from '../app.state';

interface HeaderProperty {
  showBack?: boolean;
  actionText?: string;
  onBack?: () => void;
  onAction?: () => void;
}

import './header.scss';
export const Header = ({ onBack, onAction, showBack, actionText }: HeaderProperty) => {
  const page = useRecoilValue(pageAtom);

  return (
    <div className='header'>
      {showBack && <div className="header-back"><a onClick={onBack}>Back</a></div>}
      <div className="header-title">{page.pageTitle}</div>
      {actionText && <div className="header-action" onClick={onAction}>{actionText}</div>}
    </div>
  );
}
