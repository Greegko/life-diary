import React from 'react';
import { History } from '../history';
import { RecordUpdater } from '../hoc';

interface PageHistoryProperties {
  onDeleteRecord: (recordId: string) => void;
  onStopTimerOnRecord: (recordId: string) => void;
}
export const PageHistory =
  RecordUpdater(
    ({ onStopTimerOnRecord, onDeleteRecord }: PageHistoryProperties) => {
      return <History onStopTimer={onStopTimerOnRecord} onDelete={onDeleteRecord} />
    }
  );
