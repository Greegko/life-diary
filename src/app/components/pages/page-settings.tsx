import React from 'react';
import firebase from 'firebase';

export const PageSettings = () => (
  <div>
    <button onClick={() => firebase.auth().signOut()}>
      Logout
    </button>
  </div>
);
