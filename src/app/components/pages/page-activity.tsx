import React from 'react';
import { DiaryRecord } from '@common/firestore-entities';
import { CreateActivity } from '../create-activity';
import { RecordUpdater } from '../hoc';

interface PageActivityProperties {
  onSaveRecord: (record: DiaryRecord) => void;
}
export const PageActivity =
  RecordUpdater(
    ({ onSaveRecord }: PageActivityProperties) => {
      return <CreateActivity save={record => onSaveRecord(record)} />;
    }
  );
