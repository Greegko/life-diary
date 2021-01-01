import firebase from 'firebase';
import { CommentDataConverter, GoalDataConverter } from './firestore-converters';

export interface GoalRecord {
  date: Date;
  type: string;
  param?: any;
}

export interface GoalTrack {
  type: string;
  paramType?: 'duration' | 'number' | 'boolean';
}

export interface Goal {
  id: string;
  userId: string;
  createdAt: Date;
  startDate: Date;
  endDate: Date;
  name: string;
  tracks: GoalTrack[];
}

export interface Comment {
  id: string;
  userId: string;
  createdAt: Date;
  text: string;
}

export class Store {

  addComment(text: string, userId: string) {
    firebase.firestore().collection('/comments')
      .withConverter(CommentDataConverter)
      .add({
        text,
        userId,
        createdAt: new Date()
      } as Comment);
  }

  addGoal(goal: Goal, userId: string) {
    return firebase.firestore().collection('/goals')
      .withConverter(GoalDataConverter)
      .add({
        ...goal,
        userId,
        createdAt: new Date()
      });
  }

  addGoalRecord(goalId: string, goalRecord: GoalRecord) {
    firebase.firestore().collection('/goals/' + goalId + '/records').add(goalRecord);
  }

  getActiveGoals(userId: string): firebase.firestore.CollectionReference<Goal> {
    return firebase.firestore().collection('/goals')
      .withConverter(GoalDataConverter)
      .where('endDate', '>', new Date())
      .where('userId', '==', userId)
      .orderBy('endDate', 'desc') as firebase.firestore.CollectionReference<Goal>;
  }

}

export const store = new Store();
