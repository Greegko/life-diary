import React, { useCallback } from 'react';
import dayjs from "dayjs";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DiaryRecord } from "../../interface";
import { store } from "../../store";
import { currentUserIdAtom, notificationsAtom } from "../app.state";

export const RecordUpdater = (Component) => {
  return () => {
    const currentUserId = useRecoilValue(currentUserIdAtom);
    const setNotifications = useSetRecoilState(notificationsAtom);

    const addNotification = useCallback((text: string) => {
      setNotifications(notifications => ([...notifications, [text, Date.now().toString(36)]]));
    }, []);

    const onSaveRecord = useCallback((record: DiaryRecord) => {
      store.addRecord(record, currentUserId).then(() => {
        addNotification('Activity has been saved!');
      });
    }, []);

    const onDeleteRecord = useCallback((recordId: string) => {
      store.deleteRecord(recordId, currentUserId).then(() => {
        addNotification('The activity has been deleted!');
      });
    }, []);

    const onStopTimerOnRecord = useCallback((recordId: string) => {
      store.updateRecord(recordId, record => {
        record.activity.duration = dayjs(new Date()).diff(record.activity.started, 'minute');

        return record;
      }, currentUserId).then(() => {
        addNotification('The activity has been updated!');
      });
    }, []);

    return <Component {...{ onStopTimerOnRecord, onDeleteRecord, onSaveRecord }} />;
  }
};
