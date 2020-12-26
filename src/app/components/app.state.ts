import firebase from 'firebase';
import { atom } from 'recoil';

import { Goal } from '../store';

export enum Page { Home };

export type PageObj = { page: Page, pageTitle: string };

export type NotificationTuple = [text: string, id: string];

export interface AppState {
  currentUser: firebase.User | null;
  notifications: [text: string, id: string][];
  activeGoals: Goal[];
  page: {
    page: Page,
    pageTitle?: string;
  };
}

export const activeGoalsAtom = atom<Goal[]>({
  key: 'activeGoals',
  default: []
});

export const pageAtom = atom<PageObj>({
  key: 'page',
  default: { page: Page.Home, pageTitle: 'Home' }
});

export const notificationsAtom = atom<NotificationTuple[]>({
  key: 'notifications',
  default: []
});

export const currentUserIdAtom = atom<string | null>({
  key: 'currentUserId',
  default: null
});
