import React, { useEffect, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Goal, GoalTrack } from '../../store';
import { activeGoalsAtom, Page, pageStateAtom } from '../app.state';
import { ScreenOverlay } from '../common/screen-overlay';

import './page-track.scss';
export const PageTrack = () => {
  const setPage = useSetRecoilState(pageStateAtom);
  const activeGoals = useRecoilValue(activeGoalsAtom);

  useEffect(() => {
    setPage({
      page: Page.Home,
      pageTitle: 'Home',
      pageHeaderAction: {
        label: 'New Goal',
        callback: () => setPage({ page: Page.AddGoal })
      }
    });
  }, []);

  return (
    <div className="page-track">
      <div>Page Track</div>
      <div>Goals:</div>
      <div>
        {activeGoals.map(goal => <Goal goal={goal} />)}
      </div>
    </div>
  );
}

const Goal = ({ goal }: { goal: Goal }) => (
  <div className="goal">
    <div className="goal__title">{goal.name}</div>
    {(goal.tracks || []).map(track => <GoalTrackAction track={track} />)}
  </div>
);

const GoalTrackAction = ({ track }: { track: GoalTrack }) => {
  const [overlay, setOverlay] = useState<boolean>();

  return (
    <>
      {overlay && (
        <ScreenOverlay onClose={() => setOverlay(false)}>
          Config
        </ScreenOverlay>
      )}
      <span className="goal-track" onClick={() => setOverlay(true)}>

        {track.type}
      </span>
    </>
  );
}
