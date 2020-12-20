import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import firebase from 'firebase';

import { DiaryRecordData } from '../interface';
import { Store } from '../store';
import { Login } from './login';
import { Notification, Header } from './common';
import { currentUserIdAtom, recordsAtom, allRecordsAtom, configsAtom, notificationsAtom } from './app.state';
import { Footer } from './footer';
import { Page } from './page';

import '../style/theme.scss';
import '../style/style.scss';
import '../style/flex.scss';
import './app.scss';
export const App = () => {
  const [store] = useState(() => new Store());
  const [currentUserId, setCurrentUserId] = useRecoilState(currentUserIdAtom);
  const [notifications, setNotifications] = useRecoilState(notificationsAtom);
  const setRecords = useSetRecoilState(recordsAtom);
  const setAllRecords = useSetRecoilState(allRecordsAtom);
  const setConfigs = useSetRecoilState(configsAtom);

  const removeNotification = useCallback((id: string) => {
    setNotifications(notifications => notifications.filter(([text, notificationId]) => notificationId !== id));
  }, []);

  const login = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    if (currentUserId === null) return;

    store.getRecords(currentUserId).onSnapshot({
      next: records => setRecords(records.docs.map(x => x.data() as DiaryRecordData))
    });

    store.getNumberOfRecords(currentUserId).then(numberOfRecords => setAllRecords(numberOfRecords));

    store.getConfig(currentUserId).then(configs => setConfigs(configs));
  }, [currentUserId]);

  useEffect(() => {
    const sub = firebase.auth().onAuthStateChanged(currentUser => setCurrentUserId(currentUser.uid));
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
