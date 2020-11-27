import firebase from 'firebase';
import { mapObjIndexed } from 'ramda';
import { DiaryRecordData } from './interface';

type DateToTimestamp<T> =
  T extends Date ? firebase.firestore.Timestamp :
  T extends object ? { [K in keyof T]: DateToTimestamp<T[K]> } :
  T;

function convertAllTimestamps<T extends object>(target: T) {
  return mapObjIndexed((val: any) => {
    if (val instanceof firebase.firestore.Timestamp) {
      return val.toDate();
    }

    if (typeof val === 'object' && val !== null) {
      return convertAllTimestamps(val);
    }

    return val;
  }, target);
}

export const DiaryRecordDataConverter = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<DateToTimestamp<DiaryRecordData>>,
    options: firebase.firestore.SnapshotOptions
  ): DiaryRecordData {
    return convertAllTimestamps(snapshot.data());
  },

  toFirestore(record: DiaryRecordData): firebase.firestore.DocumentData {
    return record;
  }
}
