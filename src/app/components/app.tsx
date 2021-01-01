import React, { useCallback, useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import firebase from 'firebase';

import { store } from '../store';
import { Login } from './login';
import { Notification, Header, Footer } from './common';
import { activeGoalsAtom, currentUserIdAtom, notificationsAtom, Page, pageStateAtom } from './app.state';
import { Page as PageDisplay } from './page';

import '../style/theme.scss';
import '../style/style.scss';
import '../style/flex.scss';
import './app.scss';
export const App = () => {
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  const [pageState, setPageState] = useRecoilState(pageStateAtom);
  const setActiveGoals = useSetRecoilState(activeGoalsAtom);

  const removeNotification = useCallback((id: string) => {
    setNotifications(notifications => notifications.filter(([text, notificationId]) => notificationId !== id));
  }, []);

  const login = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (currentUserId === null) return;

    setPageState({ page: Page.Home, pageTitle: 'Home' });

    store.getActiveGoals(currentUserId).onSnapshot({
      next: records => setActiveGoals(records.docs.map(x => x.data()))
    });
  }, [currentUserId]);

  useEffect(() => {
    const sub = firebase.auth().onAuthStateChanged(currentUser => currentUser ? setCurrentUserId(currentUser.uid) : setCurrentUserId(null));
    return () => sub();
  }, []);

  if (!currentUserId || !pageState) {
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
        <PageDisplay />
      </div>

      {!pageState.hideFooter && <Footer />}
    </>
  )
}
