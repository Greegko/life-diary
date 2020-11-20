export interface Activity {
  name: string;
  started: Date;
  duration?: number;
}

export interface DiaryRecord {
  activity: Activity;
  comment?: string;
}

export interface DiaryRecordData extends DiaryRecord {
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
