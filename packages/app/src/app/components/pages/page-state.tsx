import React from 'react';
import { DiaryRecord } from '../../interface';
import { CreateState } from '../create-state';
import { RecordUpdater } from '../hoc';

interface PageStateProperties {
  onSaveRecord: (record: DiaryRecord) => void;
}
export const PageState =
  RecordUpdater(
    ({ onSaveRecord }: PageStateProperties) => {
      return <CreateState save={record => onSaveRecord(record)} />;
    }
  );
