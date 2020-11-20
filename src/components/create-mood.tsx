import * as React from 'react';
import { Mood } from '../data';
import { DiaryRecord } from "../interface";
import { Options } from './common';

interface CreateMoodProperties {
  save: (record: DiaryRecord) => void;
}

export const CreateMood = (props: CreateMoodProperties) => {
  const addMood = (mood: Mood) => {
    const record: DiaryRecord = { mood };

    props.save(record);
  }

  return (
    <div>
      <Options options={Object.entries(Mood)} label={mood => mood[0]} valueChange={mood => addMood(mood[1])} />
    </div>
  );
}
