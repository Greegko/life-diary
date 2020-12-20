import firebase from 'firebase';
import { atom, selector } from 'recoil';
import { DiaryRecordData, ConfigData } from '../interface';

export enum Page { Home, State, Activity, History, Account };

export type PageObj = { page: Page, pageTitle: string };

export type NotificationTuple = [text: string, id: string];

export interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecordData[];
  allRecords: number;
  configs: ConfigData;
  notifications: [text: string, id: string][];
  page: {
    page: Page,
    pageTitle?: string;
  };
}

export const configsAtom = atom<ConfigData>({
  key: 'configs',
  default: { activities: [], moods: [], observations: [] }
});

export const pageAtom = atom<PageObj>({
  key: 'page',
  default: { page: Page.Home, pageTitle: 'Home' }
});

export const notificationsAtom = atom<NotificationTuple[]>({
  key: 'notifications',
  default: []
});

export const recordsAtom = atom<DiaryRecordData[]>({
  key: 'records',
  default: []
});

export const recordsSortedSelector = selector<DiaryRecordData[]>({
  key: 'recordsSorted',
  get({ get }) {
    const recordOrderer = (x: DiaryRecordData, y: DiaryRecordData) => {
      const dateX = x.activity ? x.activity.started : x.createdAt;
      const dateY = y.activity ? y.activity.started : y.createdAt;

      return dateX < dateY ? 1 : -1;
    }

    return [...get(recordsAtom)].sort(recordOrderer);
  }
})

export const allRecordsAtom = atom<number>({
  key: 'allRecords',
  default: 0
});

export const currentUserIdAtom = atom<string | null>({
  key: 'currentUserId',
  default: null
});
