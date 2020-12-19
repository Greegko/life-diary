import React, { ReactElement, useState } from 'react';
import { useDrag } from 'react-use-gesture';
import { DiaryRecordData } from '../interface';
import { ListItem, ListItemAction } from './common';
import { formatDate } from './utils';

interface HistoryProperties {
  records: DiaryRecordData[];
  onDelete: (recordId: string) => void;
  onStopTimer: (recordId: string) => void;
}

import './history.scss';
export const History = (props: HistoryProperties) => {
  const bind = useDrag(({ event }) => event.stopPropagation());

  return (
    <div>
      <h2>History: {props.records.length}</h2>
      <div {...bind()}>
        {props.records.sort(recordOrderer).map((record, i) => {
          if (record.activity) return <ActivityHistory key={i} record={record} />;

          return <StateHistory key={i} record={record} />;
        }).map(wrapHistoryWithListItem({ onDelete: props.onDelete, onStopTimer: props.onStopTimer }))}
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

const StateHistory = ({ record }: HistoryDisplayProperties) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="record-entry">
      <div className="row">
        <div className="col-3 col-pad-4">State</div>
        <div className="col-5">{formatDate(record.createdAt)}</div>
      </div>
      {(record.mood || record.observation) && (
        <div>
          {record.mood} {record.observation}
        </div>
      )}

      {record.comment && (
        <div className="row">
          <div className="col-12" style={{ cursor: 'pointer' }} onClick={() => setOpen(!open)}>{open ? "[Hide comment]" : "[Show comment]"}</div>
          {open && <div className="col-12 record-entry__comment">{record.comment}</div>}
        </div>
      )}
    </div>
  );
}

const ActivityHistory = ({ record }: HistoryDisplayProperties) => {
  const isTimer = record.activity.duration === 'timer';

  return (
    <div className={"record-entry" + (isTimer ? ' record-entry--active' : "")}>
      <div className="row">
        <div className="col-3">Activity</div>
        <div className="col-4">{record.activity.id}</div>
        <div className="col-5">{formatDate(record.activity.started)}</div>
      </div>
    </div>
  );
}

interface HistoryActionHandlers {
  onDelete: (recordId: string) => void;
  onStopTimer: (recordId: string) => void;
}

const wrapHistoryWithListItem = (handlers: HistoryActionHandlers) => (element: ReactElement<HistoryDisplayProperties>): JSX.Element => {
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
