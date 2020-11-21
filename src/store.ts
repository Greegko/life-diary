import firebase from 'firebase';
import { STORE_CONFIG_INIT } from './store-init';
import { ConfigData, DiaryRecord, DiaryRecordData } from './interface';

export class Store {

  private userRoot(userId) {
    return firebase.firestore().collection('/users').doc(userId);
  }

  createUser(userId: string) {
    this.userRoot(userId).set({
      configs: STORE_CONFIG_INIT
    });
  }

  addRecord(record: DiaryRecord, userId: string) {
    return this.userRoot(userId).collection('/records').add({
      ...record,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  getRecords(userId: string): firebase.firestore.CollectionReference<DiaryRecordData> {
    return this.userRoot(userId).collection('/records') as firebase.firestore.CollectionReference<DiaryRecordData>;
  }

  getConfig(userId: string) {
    return this.userRoot(userId).get().then(doc => doc.data()['configs'] as ConfigData);
  }

}
