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
    {props.records.map((record, i) => record.activity ? <ActivityHistory key={i} record={record} /> : <MoodHistory key={i} record={record} />)}
  </div>
);

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
    <div>{record.activity.name}</div>
    <div>{formatDate(record.activity.started.toDate())}</div>
  </div>
);
