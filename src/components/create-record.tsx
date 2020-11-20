import * as React from 'react';
import { ACTIVITY_OPTIONS } from '../data';
import { DiaryRecord } from "../interface";

interface CreateRecordProperties {
  save: (record: DiaryRecord) => void;
}

import './create-record.scss';
export const CreateRecord = ({ save }: CreateRecordProperties) => {
  const [newRecord, setNewRecord] = React.useState<DiaryRecord | null>(null);

  const setData = (activityId: string) => {
    const record = {
      activity: {
        name: activityId,
        started: new Date()
      }
    };

    setNewRecord(record);
  }

  const saveRecord = () => {
    save(newRecord);
    setNewRecord(null);
  }

  return (
    <div>
      <div className='activities'>
        {ACTIVITY_OPTIONS.map(({ id, name }) => (
          <div key={id} className={"activity " + (newRecord?.activity.name === id ? "activity--active" : "")} onClick={() => setData(id)}>
            {name}
          </div>
        ))}
      </div>

      <button className="save_btn" onClick={saveRecord}>Save</button>
    </div>
  )
}


