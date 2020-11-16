import React from 'react';
import firebase from '../firebase';

import { DiaryRecordData } from '../interface';
import { Store } from '../store';
import { History } from './history';

import { Login } from './login';

interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecordData[];
}

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
      this.store.getRecords().where("userId", "==", this.state.currentUser.uid).get()
        .then(records => {
          this.setState({ records: records.docs.map(x => x.data() as DiaryRecordData) });
        });
    }
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(currentUser => {
      this.setState({ currentUser: currentUser.user });
    });
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
            <History records={this.state.records} />
          </div>
        }
      </div>
    )
  }
}
