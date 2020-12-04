import firebase from 'firebase';

import { DiaryRecordData, ActivityConfig, MoodConfig } from '../interface';

export enum Page { Home, Comment, Mood, Activity, History, Account };

export interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecordData[];
  configs: {
    activities: ActivityConfig[];
    moods: MoodConfig[];
  };
  page: Page;
}

export type AppStateAction =
  { type: 'setConfigs', value: { activities: ActivityConfig[], moods: MoodConfig[] } } |
  { type: 'setRecords', value: DiaryRecordData[] } |
  { type: 'setUser', value: firebase.User } |
  { type: 'setPage', value: Page };

export function appStateReducer(state: AppState, action: AppStateAction): AppState {
  switch (action.type) {
    case "setConfigs":
      return { ...state, configs: action.value };
    case "setRecords":
      return { ...state, records: action.value };
    case "setUser":
      return { ...state, currentUser: action.value };
    case "setPage":
      return { ...state, page: action.value };
    default:
      return state;
  }
}

export const appStateInitialValue: AppState = {
  records: [],
  configs: { activities: [], moods: [] },
  currentUser: null,
  page: Page.History
};
