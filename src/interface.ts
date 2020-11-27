export interface Activity {
  id: ActivityConfig['id'];
  started: Date;
  duration?: number | 'timer';
}

export interface DiaryRecord {
  mood?: MoodConfig['id'];
  activity?: Activity;
  comment?: string;
}

export interface DiaryRecordData extends DiaryRecord {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export type MoodConfig = { id: string, label: string };
export type ActivityConfig = { id: string, label: string, nsfw?: boolean };

export interface ConfigData {
  moods: MoodConfig[];
  activities: ActivityConfig[];
}
