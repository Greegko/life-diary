import * as React from 'react';
import { lensPath, set, view } from 'ramda';
import { ACTIVITY_OPTIONS, ActivityOption } from '../data';
import { DiaryRecord } from "../interface";
import { Options } from './common';

interface CreateRecordProperties {
  save: (record: DiaryRecord) => void;
}

import './create-record.scss';
export const CreateRecord = ({ save }: CreateRecordProperties) => {
  const [activityType, setActivityType] = React.useState<ActivityOption>();
  const [newRecord, setNewRecord] = React.useState<DiaryRecord | null>({
    activity: {
      name: null,
      started: new Date()
    }
  });

  const setActivity = (activityOption: ActivityOption) => {
    setActivityType(activityOption);

    const activityName = lensPath(['activity', 'name']);
    setNewRecord(set(activityName, activityOption.name, newRecord));
  }

  const setDuration = (duration: number | undefined) => {
    const durationLens = lensPath(['activity', 'duration']);
    setNewRecord(set(durationLens, duration, newRecord));
  }

  const adjustStartDate = (minuntesDiff: number) => {
    const startedDateLens = lensPath(['activity', 'started']);
    const date = view(startedDateLens, newRecord) as Date;

    date.setTime(date.getTime() + minuntesDiff * 60 * 1000);
    setNewRecord({ ...newRecord });
  }

  const saveRecord = () => {
    save(newRecord);
    setActivityType(null);
    setNewRecord({
      activity: {
        name: null,
        started: new Date()
      }
    });
  }

  return (
    <div>
      <Options
        value={activityType}
        options={ACTIVITY_OPTIONS}
        valueChange={activityOption => setActivity(activityOption)}
        label={activity => activity.name}
      ></Options>

      <hr />

      <div className="mb-1">
        Duration:
        <Options
          value={newRecord.activity.duration}
          options={[undefined, 15, 30, 45, 60]}
          valueChange={duration => setDuration(duration)}
          label={duration => duration ? duration + "m" : "ø"}
        ></Options>
      </div>

      <div className="mb-1">
        Start time:
        <span className="date-adjuster" onClick={() => adjustStartDate(-30)}>{"<<"}</span>
        <span className="date-adjuster" onClick={() => adjustStartDate(-5)}>{"<"}</span>

        <span className="start-date">
          {newRecord.activity.started.toISOString().split('T')[0]}
          {' '}
          {newRecord.activity.started.toISOString().split('T')[1].split(':').slice(0, 2).join(':')}
        </span>

        <span className="date-adjuster" onClick={() => adjustStartDate(5)}>{">"}</span>
        <span className="date-adjuster" onClick={() => adjustStartDate(30)}>{">>"}</span>
      </div>

      <hr />

      <button className="save_btn" onClick={saveRecord}>Save</button>
    </div>
  )
}


