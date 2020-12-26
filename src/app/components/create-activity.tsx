import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { ActivityConfig, DiaryRecord, MoodConfig, ObservationConfig } from "@common/firestore-entities";
import { formatDate, formatDuration } from './utils';
import { Options, Stepper } from './common';
import { configsAtom } from './app.state';

interface CreateActivityProperties {
  save: (record: DiaryRecord) => void;
}

import './create-activity.scss';
export const CreateActivity = ({ save }: CreateActivityProperties) => {
  const { activities, moods, observations } = useRecoilValue(configsAtom);

  const [activity, setActivity] = useState<ActivityConfig>();
  const [observation, setObservation] = useState<ObservationConfig>();
  const [mood, setMood] = useState<MoodConfig>();
  const [duration, setDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<Date>(new Date());

  const commentRef = useRef<HTMLTextAreaElement>();

  const adjustDuration = (durationStep: number) => {
    const newDuration = Math.max(0, duration + durationStep);
    const diff = duration - newDuration;

    setDuration(newDuration);

    if (diff !== 0) {
      adjustStartDate(diff);
    }
  }

  const adjustStartDate = (minutesDiff: number) => {
    const started = new Date(startTime.getTime() + minutesDiff * 60 * 1000);
    setStartTime(started);
  }

  const saveActivity = (timer: boolean) => {
    if (activity === null) return;

    const record: DiaryRecord = {
      activity: { id: activity.id, started: startTime }
    }

    if (timer) {
      record.activity.duration = 'timer';
    } else if (duration > 0) {
      record.activity.duration = duration;
    }

    if (observation) {
      record.observation = observation.id;
    }

    if (mood) {
      record.mood = mood.id;
    }

    if (commentRef.current.value) {
      record.comment = commentRef.current.value;
    }

    save(record);

    commentRef.current.value = '';
    setActivity(null);
    setObservation(null);
    setMood(null);
    setDuration(0);
    setStartTime(new Date());
  }

  return (
    <div>
      <Options
        value={activity}
        options={activities}
        onValueChange={activityOption => setActivity(activityOption)}
        label={activity => activity.label}
      ></Options>

      <hr />

      <div className="mb-1">
        Observations:
        <Options
          value={observation}
          options={observations}
          label={(observation) => observation.label}
          onValueChange={observationOption => setObservation(observationOption)}
        ></Options>
      </div>

      <hr />

      <div className="mb-1">
        Mood:
        <Options
          value={mood}
          options={moods}
          label={(mood) => mood.label}
          onValueChange={moodOption => setMood(moodOption)}
        ></Options>
      </div>

      <hr />

      <div className="mb-1">
        Comment:
        <textarea className="create-activity__comment" ref={commentRef}></textarea>
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

      <button className="save_btn mr-1" onClick={() => saveActivity(false)}>Save</button>
      <button className="save_btn" onClick={() => saveActivity(true)}>Start Timer</button>
    </div>
  )
}


