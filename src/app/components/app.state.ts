import { atom } from 'recoil';

import { Goal } from '../store';

export enum Page { Home, Comment, History, AddGoal };

export type PageHeaderAction = { label: string, callback: () => void };
export type PageState = { page: Page, pageTitle?: string, back?: PageState; pageHeaderAction?: PageHeaderAction };

export type Notification = [text: string, id: string];

export const activeGoalsAtom = atom<Goal[]>({
  key: 'activeGoals',
  default: []
});

export const pageStateAtom = atom<PageState | null>({
  key: 'pageState',
  default: null
});

export const notificationsAtom = atom<Notification[]>({
  key: 'notifications',
  default: []
});

export const currentUserIdAtom = atom<string | null>({
  key: 'currentUserId',
  default: null
});
