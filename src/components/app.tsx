import React from 'react';
import firebase from '../firebase';
import { DiaryRecord } from '../interface';

import { Login } from './login';

interface AppState {
  currentUser: firebase.User | null;
  records: DiaryRecord[];
}

export class App extends React.PureComponent<{}, AppState> {
  state: AppState = {
    records: [],
    currentUser: null
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(currentUser => this.setState({ currentUser }));
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password).then(currentUser => {
      this.setState({ currentUser: currentUser.user });
    });
  }

  render() {
    return (
      <div>
        {!this.state.currentUser && <Login login={this.login} />}
      </div>
    )
  }
}
