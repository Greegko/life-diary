import React from 'react';

interface HeaderProperty {
  title: string;
  showBack?: boolean;
  actionText?: string;
  onBack?: () => void;
  onAction?: () => void;
}

import './header.scss';
export const Header = ({ title, onBack, onAction, showBack, actionText }: HeaderProperty) => (
  <div className='header'>
    {showBack && <div className="header-back"><a onClick={onBack}>Back</a></div>}
    <div className="header-title">{title}</div>
    {actionText && <div className="header-action" onClick={onAction}>{actionText}</div>}
  </div>
);
