import React from 'react';
import { animated, useSpring } from 'react-spring';
import { useDrag } from 'react-use-gesture';

export interface ListItemAction {
  title: string;
  backgroundColor: string;
  onClick: () => void;
}

export interface ListItemProperties {
  children: any;
  actions?: ListItemAction[];
}

const OPTION_WIDTH = 60;

import './list-item.scss';
export const ListItem = ({ children, actions }: ListItemProperties) => {
  const [props, set] = useSpring(() => ({ width: 0 }));
  const optionsWidth = actions.length * OPTION_WIDTH;

  const bind = useDrag(({ movement: [mx], down, direction: [xDir] }) => {
    if (!down) {
      const isLeft = xDir < 0;
      set({ width: isLeft ? optionsWidth : 0 });
    } else {
      set({ width: Math.min(optionsWidth, mx * -1) });
    }
  });

  return (
    <div className='list-item' {...bind()}>
      <animated.div className="list-item__content" style={{ transform: props.width.interpolate(x => `translateX(-${x}px)`) }}>
        {children}
      </animated.div>
      <animated.div className="list-item__actions" style={props}>
        {actions.map(action => (
          <div className='list-item__actions__action' style={{ backgroundColor: action.backgroundColor }} onClick={action.onClick}>
            {action.title}
          </div>
        ))}
      </animated.div>
    </div>
  );
};
