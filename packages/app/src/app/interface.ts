export interface Activity {
  id: ActivityId;
  started: Date;
  duration?: number | 'timer';
}

export interface DiaryRecord {
  mood?: MoodId;
  activity?: Activity;
  observation?: ObservationId;
  comment?: string;
}

export interface DiaryRecordData extends DiaryRecord {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  id: string;
}
export type MoodId = string;
export type ActivityId = string;
export type ObservationId = string;

export type MoodConfig = { id: MoodId, label: string };
export type ActivityConfig = { id: ActivityId, label: string };
export type ObservationConfig = { id: ObservationId, label: string };

export interface ConfigData {
  moods: MoodConfig[];
  activities: ActivityConfig[];
  observations: ObservationConfig[];
}
