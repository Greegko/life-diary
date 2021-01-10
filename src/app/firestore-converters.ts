import firebase from 'firebase';
import { mapObjIndexed, pipe } from 'ramda';
import { Comment, Goal } from './store';

type DateToTimestamp<T> =
  T extends Date ? firebase.firestore.Timestamp :
  T extends object ? { [K in keyof T]: DateToTimestamp<T[K]> } :
  T;

function convertTimestamps<T extends object>(target: T) {
  return mapObjIndexed((val: any) => {
    if (val instanceof firebase.firestore.Timestamp) {
      return val.toDate();
    }

    if (typeof val === 'object' && val !== null) {
      return convertTimestamps(val);
    }

    return val;
  }, target);
}

function convertArrays<T extends object>(target: T) {
  return mapObjIndexed((val: any) => {
    if (typeof val === 'object') {
      const keys = Object.keys(val);
      if (keys.every(x => parseInt(x).toString() === x)) return Object.values(val);

      return convertArrays(val);
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

    const parsers = pipe(
      convertTimestamps,
      convertArrays
    );

    return { id: snapshot.id, ...parsers(data) };
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
    return { id: snapshot.id, ...convertTimestamps(data) };
  },

  toFirestore(record: Comment): firebase.firestore.DocumentData {
    return record;
  }
}
