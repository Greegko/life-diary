import React from 'react';
import firebase from 'firebase';

import { ActivityConfig, DiaryRecord, DiaryRecordData, MoodConfig } from '../interface';
import { Store } from '../store';
import { CreateActivity } from './create-activity';
import { CreateMood } from './create-mood';
import { History } from './history';

import { Login } from './login';

interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecordData[];
  configs: {
    activities: ActivityConfig[];
    moods: MoodConfig[];
  }
}

import './style.scss';
export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    records: [],
    configs: { activities: [], moods: [] },
    currentUser: null
  };

  store: Store = new Store();

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }));
  }

  componentDidUpdate(prevProps: object, prevState: AppState) {
    if (prevState.currentUser !== this.state.currentUser) {
      this.store.getRecords(this.state.currentUser.uid).onSnapshot({
        next: records => {
          this.setState({ records: records.docs.map(x => x.data() as DiaryRecordData) });
        }
      });

      this.store.getConfig(this.state.currentUser.uid).then(configs => this.setState({ configs }));
    }
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(currentUser => {
      this.setState({ currentUser: currentUser.user });
    });
  }

  saveRecord(record: DiaryRecord): void {
    this.store.addRecord(record, this.state.currentUser.uid);
  }

  render() {
    return (
      <div>
        {!this.state.currentUser &&
          <div>
            <Login login={this.login} />
          </div>
        }

        {this.state.currentUser &&
          <div>
            <CreateMood moodOptions={this.state.configs.moods} save={record => this.saveRecord(record)} />
            <hr />
            <CreateActivity activityOptions={this.state.configs.activities} save={record => this.saveRecord(record)} />
            <hr />
            <History records={this.state.records} />
            <hr />
            <button onClick={() => firebase.auth().signOut()}>
              Logout
            </button>
          </div>
        }
      </div>
    )
  }
}
