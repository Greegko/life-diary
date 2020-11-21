import firebase from 'firebase';

export interface Activity {
  id: ActivityConfig['id'];
  started: Date;
  duration?: number;
}

export interface DiaryRecord {
  mood?: MoodConfig['id'];
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

export type MoodConfig = { id: string, label: string };
export type ActivityConfig = { id: string, label: string, nsfw?: boolean };

export interface ConfigData {
  moods: MoodConfig[];
  activities: ActivityConfig[];
}
