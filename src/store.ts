import firebase from 'firebase';
import { DiaryRecord, DiaryRecordData } from './interface';

export class Store {

  private userRoot(userId) {
    return firebase.firestore().collection('/users').doc(userId);
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
  }

}
