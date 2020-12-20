import React, { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';
import firebase from 'firebase';

import { DiaryRecord } from '../interface';
import { CreateActivity } from './create-activity';
import { CreateState } from './create-state';
import { History } from './history';
import { Swipeable } from './common';
import { currentUserIdAtom, notificationsAtom, pageAtom, Page as PageEnum } from './app.state';
import { store } from '../store';

export const Page = () => {
  const [page, setPage] = useRecoilState(pageAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);
  const setNotifications = useSetRecoilState(notificationsAtom);

  const addNotification = useCallback((text: string) => {
    setNotifications(notifications => ([...notifications, [text, Date.now().toString(36)]]));
  }, []);

  const saveRecord = (record: DiaryRecord) => {
    store.addRecord(record, currentUserId).then(() => {
      addNotification('Activity has been saved!');
    });
  }

  const onSwipeRight = () => {
    setPage({ page: Math.max(0, page.page - 1), pageTitle: '' });
  }

  const onSwipeLeft = () => {
    setPage({ page: Math.min(PageEnum.Account, page.page + 1), pageTitle: '' });
  }

  const onDeleteRecord = (recordId: string) => {
    store.deleteRecord(recordId, currentUserId).then(() => {
      addNotification('The activity has been deleted!');
    });
  }

  const onStopTimerOnRecord = (recordId: string) => {
    store.updateRecord(recordId, record => {
      record.activity.duration = dayjs(new Date()).diff(record.activity.started, 'minute');

      return record;
    }, currentUserId).then(() => {
      addNotification('The activity has been updated!');
    });
  }

  return (
    <Swipeable onSwipeLeft={() => onSwipeLeft()} onSwipeRight={() => onSwipeRight()}>
      {currentUserId && <div className='tab-content'>
        {page.page === PageEnum.Home && <div>Home</div>}
        {page.page === PageEnum.State && <CreateState save={record => saveRecord(record)} />}
        {page.page === PageEnum.Activity && <CreateActivity save={record => saveRecord(record)} />}
        {page.page === PageEnum.History && <History onStopTimer={onStopTimerOnRecord} onDelete={onDeleteRecord} />}
        {page.page === PageEnum.Account && (
          <div>
            <button onClick={() => firebase.auth().signOut()}>
              Logout
            </button>
          </div>
        )}
      </div>}
    </Swipeable>
  )
}
