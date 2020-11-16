import * as React from 'react';
import { DiaryRecordData } from '../interface';

interface HistoryProperties {
  records: DiaryRecordData[];
}

export const History = (props: HistoryProperties) => (
  <div>History: {props.records.length}</div>
);
