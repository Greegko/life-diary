import * as React from 'react';
import { DiaryRecordData } from '../interface';
import { formatDate } from './utils';

interface HistoryProperties {
  records: DiaryRecordData[];
}

import './history.scss';
export const History = (props: HistoryProperties) => (
  <div>
    History: {props.records.length}
    {props.records.sort(recordOrderer).map((record, i) => {
      if (record.activity) return <ActivityHistory key={i} record={record} />;
      if (record.mood) return <MoodHistory key={i} record={record} />;
      if (record.comment) return <CommentHistory key={i} record={record} />
    })}
  </div>
);

const recordOrderer = (x: DiaryRecordData, y: DiaryRecordData) => {
  const dateX = x.activity ? x.activity.started : x.createdAt;
  const dateY = y.activity ? y.activity.started : y.createdAt;

  return dateX < dateY ? 1 : -1;
}

const CommentHistory = ({ record }: { record: DiaryRecordData }) => (
  <div className="record-entry">
    <div>Comment</div>
    <div>{record.comment}</div>
  </div>
)

const MoodHistory = ({ record }: { record: DiaryRecordData }) => (
  <div className="record-entry">
    <div>Mood</div>
    <div>{record.mood}</div>
    <div>{formatDate(record.createdAt.toDate())}</div>
  </div>
);

const ActivityHistory = ({ record }: { record: DiaryRecordData }) => (
  <div className="record-entry">
    <div>Activity</div>
    <div>{record.activity.id}</div>
    <div>{formatDate(record.activity.started.toDate())}</div>
  </div>
);
