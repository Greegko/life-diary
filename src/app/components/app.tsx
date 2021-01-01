import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import firebase from 'firebase';

import { Store } from '../store';
import { Login } from './login';
import { Notification, Header } from './common';
import { activeGoalsAtom, currentUserIdAtom, notificationsAtom } from './app.state';
import { Page } from './page';

import '../style/theme.scss';
import '../style/style.scss';
import '../style/flex.scss';
import './app.scss';
import { Footer } from './common/footer';
export const App = () => {
  const [store] = useState(() => new Store());
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  const setActiveGoals = useSetRecoilState(activeGoalsAtom);

  const removeNotification = useCallback((id: string) => {
    setNotifications(notifications => notifications.filter(([text, notificationId]) => notificationId !== id));
  }, []);

  const login = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (currentUserId === null) return;

    store.getActiveGoals(currentUserId).onSnapshot({
      next: records => setActiveGoals(records.docs.map(x => x.data()))
    });
  }, [currentUserId]);

  useEffect(() => {
    const sub = firebase.auth().onAuthStateChanged(currentUser => currentUser ? setCurrentUserId(currentUser.uid) : setCurrentUserId(null));
    return () => sub();
  }, []);

  if (!currentUserId) {
    return (
      <div>
        <Login login={login} />
      </div>
    );
  }

  return (
    <>
      {notifications.map(([notificationText, id]) =>
        <Notification key={id} text={notificationText} onDestroy={() => removeNotification(id)} />
      )}

      <Header />

      <div className="content">
        <Page />
      </div>

      <Footer />
    </>
  )
}
