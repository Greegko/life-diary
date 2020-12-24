import firebase from 'firebase';
import { ConfigData, DiaryRecord, DiaryRecordData } from '@common/firestore-entities';
import { DiaryRecordDataConverter } from './firestore-converters';

export class Store {

  private userRoot(userId) {
    return firebase.firestore().collection('/users').doc(userId);
  }

  deleteRecord(recordId: string, userId: string) {
    return this.userRoot(userId).collection('/records').doc(recordId).delete();
  }

  async updateRecord(recordId: string, recordUpdater: (record: DiaryRecord) => DiaryRecord, userId: string) {
    return this.userRoot(userId).collection('/records').doc(recordId).withConverter(DiaryRecordDataConverter).get().then(doc => {
      const convertedData = recordUpdater(doc.data()) as DiaryRecordData;
      convertedData.updatedAt = new Date();
      doc.ref.update(convertedData);
    });
  }

  addRecord(record: DiaryRecord, userId: string) {
    return this.userRoot(userId).collection('/records').withConverter(DiaryRecordDataConverter).add({
      ...record,
      createdAt: new Date(),
      updatedAt: new Date()
    } as DiaryRecordData);
  }

  getRecords(userId: string): firebase.firestore.CollectionReference<DiaryRecordData> {
    return this.userRoot(userId).collection('/records').withConverter(DiaryRecordDataConverter).limit(15) as firebase.firestore.CollectionReference<DiaryRecordData>;
  }

  async getNumberOfRecords(userId: string) {
    return this.userRoot(userId).collection('/records').get().then(records => records.size);
  }

  getConfig(userId: string) {
    return this.userRoot(userId).get().then(doc => doc.data()['configs'] as ConfigData);
  }

}

export const store = new Store();
