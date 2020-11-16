import firebase from './firebase';
import { DiaryRecord } from './interface';

export class Store {

  addRecord(record: DiaryRecord, userId: string) {
    return firebase.firestore().collection('/records').add({
      ...record,
      userId,
      createAt: new Date(),
      updateAt: new Date()
    });
  }

  getRecords() {
    return firebase.firestore().collection('/records');
  }

}
