import React, { useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { DiaryRecord, MoodConfig, ObservationConfig } from "@common/firestore-entities";
import { configsAtom } from './app.state';
import { Options } from './common';

interface CreateStateProperties {
  save: (record: DiaryRecord) => void;
}

import './create-state.scss';
export const CreateState = (props: CreateStateProperties) => {
  const { moods, observations } = useRecoilValue(configsAtom);

  const [mood, setMood] = useState<MoodConfig>(null);
  const [observation, setObservation] = useState<ObservationConfig>(null);

  const commentRef = useRef<HTMLTextAreaElement>();

  const saveState = () => {
    const record = {} as DiaryRecord;

    if (observation) {
      record.observation = observation.id;
    }

    if (mood) {
      record.mood = mood.id;
    }

    if (commentRef.current.value) {
      record.comment = commentRef.current.value;
    }

    props.save(record);

    commentRef.current.value = '';
    setMood(null);
    setObservation(null);
  };

  return (
    <div className="create-state">
      Mood:
      <Options options={moods} value={mood} label={mood => mood.label} onValueChange={mood => setMood(mood)} />

      <hr />
      Observation:
      <Options options={observations} value={observation} label={mood => mood.label} onValueChange={observation => setObservation(observation)} />

      <hr />
      Comment:
      <textarea className="create-state__comment" ref={commentRef}></textarea>

      <button className="save_btn mt-1" onClick={() => saveState()}>Save</button>
    </div>
  );
}
