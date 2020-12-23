import React, { useEffect, useState } from 'react';
import { animated, useTransition } from 'react-spring';

interface NotificationProperties {
  text: string;
  onDestroy: () => void;
}

import './notification.scss';
export const Notification = ({ text, onDestroy }: NotificationProperties) => {
  const [show, setShow] = useState(true);
  const transition = useTransition([show], {
    from: { opacity: 0, top: -15 },
    enter: () => show ? { opacity: 1, top: 15 } : false,
    leave: { opacity: 0, top: -15 },
    onRest: () => !show && onDestroy()
  });

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 3000);
  }, []);

  return (
    transition((props) =>
      <animated.div style={props as any} className='notification'>
        {text}
      </animated.div>
    ));
}
