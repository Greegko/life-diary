export enum Mood { Happy, Sad, Curious, Motivated, Stressed, Energetic, Tired };

export interface Activity {
  name: string;
  started: Date;
  duration?: number;
}

export interface DiaryRecord {
  activity: Activity;
  mood: Mood;
  comment: string;
}

export interface DiaryRecordData extends DiaryRecord {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
