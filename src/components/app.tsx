import React, { useEffect, useReducer, useState } from 'react';
import firebase from 'firebase';

import { DiaryRecord, DiaryRecordData } from '../interface';
import { Store } from '../store';
import { CreateActivity } from './create-activity';
import { CreateComment } from './create-comment';
import { CreateMood } from './create-mood';
import { History } from './history';
import { Login } from './login';
import { Swipeable } from './common';
import { appStateInitialValue, appStateReducer, Page } from './app.state';
import dayjs from 'dayjs';

import './style.scss';
import './theme.scss';
import './app.scss';
export const App = () => {
  const [store] = useState(() => new Store());
  const [state, dispatch] = useReducer(appStateReducer, appStateInitialValue);

  const login = (email: string, password: string) => {
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      currentUser => dispatch({ type: 'setUser', value: currentUser.user })
    );
  }

  const saveRecord = (record: DiaryRecord) => {
    store.addRecord(record, state.currentUser.uid);
  }

  const onSwipeRight = () => {
    dispatch({ type: 'setPage', value: Math.max(0, state.page - 1) });
  }

  const onSwipeLeft = () => {
    dispatch({ type: 'setPage', value: Math.min(Page.Account, state.page + 1) });
  }

  const onDeleteRecord = (recordId: string) => {
    store.deleteRecord(recordId, state.currentUser.uid);
  }

  const onStopTimerOnRecord = (recordId: string) => {
    store.updateRecord(recordId, record => {
      record.activity.duration = dayjs(new Date()).diff(record.activity.started, 'minute');

      return record;
    }, state.currentUser.uid);
  }

  useEffect(() => {
    if (state.currentUser === null) return;

    store.getRecords(state.currentUser.uid).onSnapshot({
      next: records => dispatch({ type: 'setRecords', value: records.docs.map(x => x.data() as DiaryRecordData) })
    });

    store.getConfig(state.currentUser.uid).then(configs => dispatch({ type: 'setConfigs', value: configs }));
  }, [state.currentUser]);

  useEffect(() => {
    const sub = firebase.auth().onAuthStateChanged(currentUser => dispatch({ type: 'setUser', value: currentUser }));
    return () => sub();
  }, [])

  if (!state.currentUser) {
    return (
      <div>
        <Login login={login} />
      </div>
    );
  }

  return (
    <>
      <Swipeable onSwipeLeft={() => onSwipeLeft()} onSwipeRight={() => onSwipeRight()}>
        {state.currentUser && <div className='tab-content'>
          {state.page === Page.Home && <div>Home</div>}
          {state.page === Page.Comment && <CreateComment save={record => saveRecord(record)} />}
          {state.page === Page.Mood && <CreateMood moodOptions={state.configs.moods} save={record => saveRecord(record)} />}
          {state.page === Page.Activity && <CreateActivity activityOptions={state.configs.activities} save={record => saveRecord(record)} />}
          {state.page === Page.History && <History records={state.records} onStopTimer={onStopTimerOnRecord} onDelete={onDeleteRecord} />}
          {state.page === Page.Account && (
            <div>
              <button onClick={() => firebase.auth().signOut()}>
                Logout
              </button>
            </div>
          )}
        </div>}
      </Swipeable>

      <div className="tabs">
        <div className={"tab" + (state.page === Page.Home ? " tab--active" : "")} onClick={() => dispatch({ type: 'setPage', value: Page.Home })}>Home</div>
        <div className={"tab" + (state.page === Page.Comment ? " tab--active" : "")} onClick={() => dispatch({ type: 'setPage', value: Page.Comment })}>Comment</div>
        <div className={"tab" + (state.page === Page.Mood ? " tab--active" : "")} onClick={() => dispatch({ type: 'setPage', value: Page.Mood })}>Mood</div>
        <div className={"tab" + (state.page === Page.Activity ? " tab--active" : "")} onClick={() => dispatch({ type: 'setPage', value: Page.Activity })}>Activity</div>
        <div className={"tab" + (state.page === Page.History ? " tab--active" : "")} onClick={() => dispatch({ type: 'setPage', value: Page.History })}>History</div>
        <div className={"tab" + (state.page === Page.Account ? " tab--active" : "")} onClick={() => dispatch({ type: 'setPage', value: Page.Account })}>Account</div>
      </div>
    </>
  )
}
