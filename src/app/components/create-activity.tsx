import React, { useState } from 'react';
import { ActivityConfig, DiaryRecord, ObservationConfig } from "../interface";
import { formatDate, formatDuration } from './utils';
import { Options, Stepper } from './common';

interface CreateActivityProperties {
  activityOptions: ActivityConfig[];
  observationOptions: ObservationConfig[];
  save: (record: DiaryRecord) => void;
}

export const CreateActivity = ({ activityOptions, observationOptions, save }: CreateActivityProperties) => {
  const [activityType, setActivityType] = useState<ActivityConfig>();
  const [observationType, setObservationType] = useState<ObservationConfig>();
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date>(new Date());

  const adjustDuration = (duration: number | undefined) => {
    const activityDuration = (duration as number) || 0;
    const newDuration = Math.max(0, activityDuration + duration);
    const diff = activityDuration - newDuration;

    setDuration(activityDuration);

    if (diff !== 0) {
      adjustStartDate(diff);
    }
  }

  const adjustStartDate = (minutesDiff: number) => {
    const started = new Date(startTime.getTime() + minutesDiff * 60 * 1000);
    setStartTime(started);
  }

  const saveActivity = (timer: boolean) => {
    if (activityType === null) return;

    const record: DiaryRecord = {
      activity: { id: activityType.id, started: startTime }
    }

    if (timer) {
      record.activity.duration = 'timer';
    }

    if (duration > 0) {
      record.activity.duration = duration;
    }

    if (observationType) {
      record.observation = observationType.id;
    }

    save(record);

    setActivityType(null);
    setObservationType(null);
    setDuration(0);
    setStartTime(new Date());
  }

  return (
    <div>
      <Options
        value={activityType}
        options={activityOptions.sort((x, y) => x.label < y.label ? -1 : 1)}
        onValueChange={activityOption => setActivityType(activityOption)}
        label={activity => activity.label}
      ></Options>

      <hr />

      <div className="mb-1">
        Observations:
        <Options
          value={observationType}
          options={observationOptions}
          label={(observation) => observation.label}
          onValueChange={observationOption => setObservationType(observationOption)}
        ></Options>
      </div>

      <hr />

      <div className="mb-1">
        Duration:
        <Stepper value={formatDuration((duration as number) || 0)} onChange={(step: number) => adjustDuration(step)} />
      </div>

      <div className="mb-1">
        Start time:
        <Stepper value={formatDate(startTime)} onChange={(step: number) => adjustStartDate(step)} />
      </div>

      <hr />

      <button className="save_btn" onClick={() => saveActivity(false)}>Save</button> <button className="save_btn" onClick={() => saveActivity(true)}>Start Timer</button>
    </div>
  )
}


