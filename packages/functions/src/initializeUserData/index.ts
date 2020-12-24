import { firestore } from 'firebase-admin';
import { EventContext } from 'firebase-functions';
import { UserRecord } from 'firebase-functions/lib/providers/auth';

import { STORE_CONFIG_INIT } from './init-data';

export function initializeUserData(user: UserRecord, context: EventContext) {
  return firestore().doc('/users/' + user.uid).set({
    configs: STORE_CONFIG_INIT
  });
}
