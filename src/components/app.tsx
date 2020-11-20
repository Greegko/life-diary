import React from 'react';
import firebase from '../firebase';

import { DiaryRecord, DiaryRecordData } from '../interface';
import { Store } from '../store';
import { CreateActivity } from './create-activity';
import { History } from './history';

import { Login } from './login';

interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecordData[];
}

import './style.scss';
export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    records: [],
    currentUser: null
  };

  store: Store = new Store();

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }));
  }

  componentDidUpdate(prevProps: object, prevState: AppState) {
    if (prevState.currentUser !== this.state.currentUser) {
      this.store.getRecords().where("userId", "==", this.state.currentUser.uid).onSnapshot({
        next: records => {
          this.setState({ records: records.docs.map(x => x.data() as DiaryRecordData) });
        }
      });
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
            <CreateActivity save={record => this.saveRecord(record)} />
            <History records={this.state.records} />
          </div>
        }
      </div>
    )
  }
}
