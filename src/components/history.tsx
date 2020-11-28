import React from 'react';
import { useDrag } from 'react-use-gesture';
import { DiaryRecordData } from '../interface';
import { ListItem, ListItemAction } from './common';
import { formatDate } from './utils';

interface HistoryProperties {
  records: DiaryRecordData[];
}

import './history.scss';
export const History = (props: HistoryProperties) => {
  const bind = useDrag(({ event }) => event.stopPropagation());

  const onDelete = (recordId: string) => {
    console.log('Deleted!', recordId);
  };

  const onStopTimer = (recordId: string) => {
    console.log('Stop Timer', recordId);
  };

  return (
    <div>
      <h2>History: {props.records.length}</h2>
      <div {...bind()}>
        {props.records.sort(recordOrderer).map((record, i) => {
          if (record.activity) return <ActivityHistory key={i} record={record} />;
          if (record.mood) return <MoodHistory key={i} record={record} />;
          if (record.comment) return <CommentHistory key={i} record={record} />;
        }).map(wrapHistoryWithListItem({ onDelete, onStopTimer }))}
      </div>
    </div>
  );
};

const recordOrderer = (x: DiaryRecordData, y: DiaryRecordData) => {
  const dateX = x.activity ? x.activity.started : x.createdAt;
  const dateY = y.activity ? y.activity.started : y.createdAt;

  return dateX < dateY ? 1 : -1;
}

interface HistoryDisplayProperties {
  record: DiaryRecordData;
}

const CommentHistory = ({ record }: HistoryDisplayProperties) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="record-entry">
      <div>Comment</div>
      <div style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>{open ? "[close]" : "[open]"}</div>
      <div>{formatDate(record.createdAt)}</div>
      {open && <pre className="new-line comment">{record.comment}</pre>}
    </div>
  )
}

const MoodHistory = ({ record }: HistoryDisplayProperties) => (
  <div className="record-entry">
    <div>Mood</div>
    <div>{record.mood}</div>
    <div>{formatDate(record.createdAt)}</div>
  </div>
);

const ActivityHistory = ({ record }: HistoryDisplayProperties) => {
  const isTimer = record.activity.duration === 'timer';

  return (
    <div className={"record-entry" + (isTimer ? ' record-entry--active' : "")}>
      <div>Activity</div>
      <div>{record.activity.id}</div>
      <div>{formatDate(record.activity.started)}</div>
    </div>
  );
}

interface HistoryActionHandlers {
  onDelete: (recordId: string) => void;
  onStopTimer: (recordId: string) => void;
}

const wrapHistoryWithListItem = (handlers: HistoryActionHandlers) => (element: React.ReactElement<HistoryDisplayProperties>): JSX.Element => {
  const baseActions: ListItemAction[] = [{ onClick: () => handlers.onDelete(element.props.record.id), title: 'Delete', backgroundColor: 'red' }];

  if (element.props.record.activity && element.props.record.activity.duration === 'timer') {
    const extendedActions = [
      { title: 'Stop Timer', onClick: () => handlers.onStopTimer(element.props.record.id), backgroundColor: 'green' },
      ...baseActions,
    ];

    return <ListItem actions={extendedActions}>{element}</ListItem>;
  }

  return <ListItem actions={baseActions}>{element}</ListItem>;
}
