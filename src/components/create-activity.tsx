import React from 'react';
import { Activity, ActivityConfig, DiaryRecord } from "../interface";
import { formatDate, formatDuration } from './utils';
import { Options, Stepper } from './common';

interface CreateActivityProperties {
  activityOptions: ActivityConfig[];
  save: (record: DiaryRecord) => void;
}

export const CreateActivity = ({ activityOptions, save }: CreateActivityProperties) => {
  const [activityType, setActivityType] = React.useState<ActivityConfig>();
  const [newActivity, setNewActivity] = React.useState<Activity | null>({
    id: null,
    started: new Date()
  });

  const setActivity = (activityOption: ActivityConfig) => {
    setActivityType(activityOption);
    setNewActivity(activity => ({ ...activity, id: activityOption.id }));
  }

  const adjustDuration = (duration: number | undefined) => {
    const activityDuration = newActivity.duration || 0;
    const newDuration = Math.max(0, activityDuration + duration);
    const diff = activityDuration - newDuration;

    if (diff !== 0) {
      adjustStartDate(diff);
    }

    setNewActivity(activity => ({ ...activity, duration: newDuration > 0 ? newDuration : undefined }));
  }

  const adjustStartDate = (minuntesDiff: number) => {
    const started = new Date(newActivity.started.getTime() + minuntesDiff * 60 * 1000);
    setNewActivity(activity => ({ ...activity, started }));
  }

  const saveActivity = () => {
    save({ activity: newActivity });
    setActivityType(null);
    setNewActivity({
      id: null,
      started: new Date()
    });
  }

  return (
    <div>
      <Options
        value={activityType}
        options={activityOptions}
        valueChange={activityOption => setActivity(activityOption)}
        label={activity => activity.label}
      ></Options>

      <hr />

      <div className="mb-1">
        Duration:
        <Stepper value={formatDuration(newActivity.duration || 0)} onChange={(step: number) => adjustDuration(step)} />
      </div>

      <div className="mb-1">
        Start time:
        <Stepper value={formatDate(newActivity.started)} onChange={(step: number) => adjustStartDate(step)} />
      </div>

      <hr />

      <button className="save_btn" onClick={saveActivity}>Save</button>
    </div>
  )
}


