import React from 'react';

interface ScreenOverlayProperties {
  children: any;
  onClose: () => void;
}

import './screen-overlay.scss';
export const ScreenOverlay = ({ onClose, children }: ScreenOverlayProperties) => {
  return (
    <div className="screen-overlay">
      <div className="screen-overlay__wrap">
        <div className="screen-overlay__content">{children}</div>
        <div className="screen-overlay__background" onClick={onClose}></div>
      </div>
    </div>
  );
}
