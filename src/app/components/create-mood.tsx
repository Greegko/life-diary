import React from 'react';
import { DiaryRecord, MoodConfig } from "../interface";
import { Options } from './common';

interface CreateMoodProperties {
  moodOptions: MoodConfig[];
  save: (record: DiaryRecord) => void;
}

export const CreateMood = (props: CreateMoodProperties) => {
  const addMood = (mood: MoodConfig) => {
    props.save({ mood: mood.id });
  }

  return (
    <div>
      <Options options={props.moodOptions} label={mood => mood.label} valueChange={mood => addMood(mood)} />
    </div>
  );
}
