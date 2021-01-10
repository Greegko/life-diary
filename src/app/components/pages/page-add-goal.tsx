import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import dayjs from 'dayjs';

import { currentUserIdAtom, Page, pageStateAtom } from '../app.state';
import { Goal, GoalTrack, store } from '../../store';
import { Options, Stepper } from '../common';

import './page-add-goal.scss';
export const PageAddGoal = () => {
  const setPage = useSetRecoilState(pageStateAtom);
  const currentUserId = useRecoilValue(currentUserIdAtom);

  const goalNameRef = useRef<HTMLInputElement>();

  const [goalTracks, setGoalTracks] = useState<GoalTrack[]>(() => []);
  const [startDate, setStartDate] = useState<number>(0);
  const [goalDuration, setGoalDuartion] = useState<number>(1);

  useEffect(() => {
    setPage({
      page: Page.AddGoal,
      pageTitle: 'Add Goal',
      hideFooter: true,
      back: { page: Page.Home }
    });
  }, []);

  const deleteTrack = useCallback((goalTrack: GoalTrack) => {
    setGoalTracks(tracks => tracks.filter(x => x !== goalTrack));
  }, []);

  const updateTrack = useCallback((originalGoalTrack: GoalTrack, newGoalTrack: GoalTrack) => {
    setGoalTracks(tracks => {
      const trackCopy = [...tracks];
      const goalIndex = tracks.findIndex(x => x === originalGoalTrack);

      trackCopy.splice(goalIndex, 1, newGoalTrack);

      return trackCopy;
    });
  }, []);

  const addEmptyTrack = useCallback(() => {
    setGoalTracks(tracks => [...tracks, {} as GoalTrack]);
  }, []);

  const saveGoal = () => {
    store.addGoal({
      tracks: goalTracks,
      name: goalNameRef.current.value,
      startDate: dayjs().add(startDate, 'day').toDate(),
      endDate: dayjs().add(goalDuration * 7 + startDate, 'day').toDate()
    } as Goal, currentUserId);
  }

  return (
    <div className="page-add-goal">
      <div>
        <div>Name</div>
        <input ref={goalNameRef} />
      </div>
      <div className="mt-2">
        <div>Start Date</div>
        <Stepper smallStep={1} bigStep={7} onChange={val => setStartDate(date => date + val)}>
          {dayjs().add(startDate, 'day').format('YYYY-MM-DD')}
        </Stepper>
      </div>
      <div className="mt-2">
        <div>End Date</div>
        <Stepper smallStep={1} bigStep={4} onChange={val => setGoalDuartion(goalDuration => Math.max(1, goalDuration + val))}>
          {dayjs().add(goalDuration * 7 + startDate, 'day').format('YYYY-MM-DD')}
          <span> ({goalDuration} weeks)</span>
        </Stepper>
      </div>
      <div className="mt-2">
        <div onClick={() => addEmptyTrack()}>Add Track</div>
        <div>Tracks</div>
        {goalTracks.map(goalTrack => (
          <div>
            <div><a onClick={() => deleteTrack(goalTrack)}>Delete</a></div>
            <div>
              <TrackDetails {...goalTrack} onTrackUpdate={updatedTrack => updateTrack(goalTrack, updatedTrack)} />
            </div>
          </div>
        ))}
      </div>

      <button className="save" onClick={() => saveGoal()}>Add Goal</button>
    </div>
  );
}

interface TrackDetailsProperties {
  onTrackUpdate: (value: GoalTrack) => void;
}

const TrackDetails = ({ type, paramType, paramDefaultValue, onTrackUpdate }: GoalTrack & TrackDetailsProperties) => {
  const updateTrack = (goalTrack: Partial<GoalTrack>) => {
    const track = {} as GoalTrack;

    console.log('Update', goalTrack, type, paramType, paramDefaultValue);

    if (type) track.type = type;
    if (paramType) track.paramType = paramType;
    if (paramDefaultValue) track.paramDefaultValue = paramDefaultValue;

    Object.assign(track, goalTrack);

    onTrackUpdate(track);
  };

  return (
    <div>
      <div>
        Name
        <input value={type} onChange={event => updateTrack({ type: event.target.value })} />
      </div>
      <div>Param (optional)</div>
      <Options options={['duration', 'boolean', 'number']} value={paramType} onValueChange={val => updateTrack({ paramType: val })} />
      Default value: <input value={paramDefaultValue} onChange={event => updateTrack({ paramDefaultValue: event.target.value })} />
    </div>
  );
};
