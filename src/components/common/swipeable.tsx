import React from 'react';
import { useDrag } from "react-use-gesture";

export interface SwipeableProperties {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  children?: any;
}

export const Swipeable = ({ children, onSwipeLeft, onSwipeRight }: SwipeableProperties) => {
  const bind = useDrag(({ down, velocity, direction: [xDir] }) => {
    if (!down && velocity > 0.2) {
      if (xDir < 0 && onSwipeLeft) {
        onSwipeLeft();
      }

      if (xDir > 0 && onSwipeRight) {
        onSwipeRight();
      }
    }
  });

  return (
    <div {...bind()} style={{ height: '100%' }}>
      {children}
    </div>
  )
}
