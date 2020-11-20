import firebase from 'firebase';
import { Mood } from "./data";

export interface Activity {
  name: string;
  started: Date;
  duration?: number;
}

export interface DiaryRecord {
  mood?: Mood;
  activity?: Activity;
  comment?: string;
}

export interface DiaryRecordData extends DiaryRecord {
  activity?: Activity & {
    started: firebase.firestore.Timestamp;
  }
  createdAt: firebase.firestore.Timestamp;
  updatedAt: firebase.firestore.Timestamp;
  userId: string;
}
