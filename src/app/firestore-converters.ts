import firebase from 'firebase';
import { mapObjIndexed } from 'ramda';
import { Comment, Goal } from './store';

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

export const GoalDataConverter = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<DateToTimestamp<Goal>>,
    options: firebase.firestore.SnapshotOptions
  ): Goal {
    const data = snapshot.data();
    return { id: snapshot.id, ...convertAllTimestamps(data) };
  },

  toFirestore(record: Goal): firebase.firestore.DocumentData {
    return record;
  }
}

export const CommentDataConverter = {
  fromFirestore(
    snapshot: firebase.firestore.QueryDocumentSnapshot<DateToTimestamp<Comment>>,
    options: firebase.firestore.SnapshotOptions
  ): Comment {
    const data = snapshot.data();
    return { id: snapshot.id, ...convertAllTimestamps(data) };
  },

  toFirestore(record: Comment): firebase.firestore.DocumentData {
    return record;
  }
}
