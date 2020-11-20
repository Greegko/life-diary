import * as React from 'react';
import { ACTIVITY_OPTIONS, ActivityOption } from '../data';
import { Activity, DiaryRecord } from "../interface";
import { formatDate } from './utils';
import { Options } from './common';

interface CreateActivityProperties {
  save: (record: DiaryRecord) => void;
}

import './create-activity.scss';
export const CreateActivity = ({ save }: CreateActivityProperties) => {
  const [activityType, setActivityType] = React.useState<ActivityOption>();
  const [newActivity, setNewActivity] = React.useState<Activity | null>({
    name: null,
    started: new Date()
  });

  const setActivity = (activityOption: ActivityOption) => {
    setActivityType(activityOption);
    setNewActivity({ ...newActivity, name: activityOption.id });
  }

  const setDuration = (duration: number | undefined) => {
    setNewActivity({ ...newActivity, duration });
  }

  const adjustStartDate = (minuntesDiff: number) => {
    const started = new Date(newActivity.started.getTime() + minuntesDiff * 60 * 1000);
    setNewActivity({ ...newActivity, started });
  }

  const saveActivity = () => {
    save({ activity: newActivity });
    setActivityType(null);
    setNewActivity({
      name: null,
      started: new Date()
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
          value={newActivity.duration}
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
          {formatDate(newActivity.started)}
        </span>

        <span className="date-adjuster" onClick={() => adjustStartDate(5)}>{">"}</span>
        <span className="date-adjuster" onClick={() => adjustStartDate(30)}>{">>"}</span>
      </div>

      <hr />

      <button className="save_btn" onClick={saveActivity}>Save</button>
    </div>
  )
}


