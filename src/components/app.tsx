import React from 'react';
import firebase from 'firebase';

import { ActivityConfig, DiaryRecord, DiaryRecordData, MoodConfig } from '../interface';
import { Store } from '../store';
import { CreateActivity } from './create-activity';
import { CreateComment } from './create-comment';
import { CreateMood } from './create-mood';
import { History } from './history';
import { Login } from './login';

enum Page { Home, Comment, Mood, Activity, History, Account };

interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecordData[];
  configs: {
    activities: ActivityConfig[];
    moods: MoodConfig[];
  };
  tab: Page;
}

import './style.scss';
import './theme.scss';
import './app.scss';
export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    records: [],
    configs: { activities: [], moods: [] },
    currentUser: null,
    tab: 0
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

  saveRecord(record: DiaryRecord) {
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

        {this.state.currentUser && <div className='tab-content'>
          {this.state.tab === Page.Home && <div>Home</div>}
          {this.state.tab === Page.Comment && <CreateComment save={record => this.saveRecord(record)} />}
          {this.state.tab === Page.Mood && <CreateMood moodOptions={this.state.configs.moods} save={record => this.saveRecord(record)} />}
          {this.state.tab === Page.Activity && <CreateActivity activityOptions={this.state.configs.activities} save={record => this.saveRecord(record)} />}
          {this.state.tab === Page.History && <History records={this.state.records} />}
          {this.state.tab === Page.Account && (
            <div>
              <button onClick={() => firebase.auth().signOut()}>
                Logout
              </button>
            </div>
          )}
        </div>}

        <div className="tabs">
          <div className={"tab" + (this.state.tab === Page.Home ? " tab--active" : "")} onClick={() => this.setState({ tab: Page.Home })}>Home</div>
          <div className={"tab" + (this.state.tab === Page.Comment ? " tab--active" : "")} onClick={() => this.setState({ tab: Page.Comment })}>Comment</div>
          <div className={"tab" + (this.state.tab === Page.Mood ? " tab--active" : "")} onClick={() => this.setState({ tab: Page.Mood })}>Mood</div>
          <div className={"tab" + (this.state.tab === Page.Activity ? " tab--active" : "")} onClick={() => this.setState({ tab: Page.Activity })}>Activity</div>
          <div className={"tab" + (this.state.tab === Page.History ? " tab--active" : "")} onClick={() => this.setState({ tab: Page.History })}>History</div>
          <div className={"tab" + (this.state.tab === Page.Account ? " tab--active" : "")} onClick={() => this.setState({ tab: Page.Account })}>Account</div>
        </div>
      </div>
    )
  }
}
