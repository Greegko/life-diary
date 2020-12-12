import firebase from 'firebase';
import { STORE_CONFIG_INIT } from './store-init';
import { ConfigData, DiaryRecord, DiaryRecordData } from './interface';
import { DiaryRecordDataConverter } from './converters';

export class Store {

  private userRoot(userId) {
    return firebase.firestore().collection('/users').doc(userId);
  }

  createUser(userId: string) {
    this.userRoot(userId).set({
      configs: STORE_CONFIG_INIT
    });
  }

  deleteRecord(recordId: string, userId: string) {
    return this.userRoot(userId).collection('/records').doc(recordId).delete();
  }

  updateRecord(recordId: string, recordUpdater: (record: DiaryRecord) => DiaryRecord, userId: string) {
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
    return this.userRoot(userId).collection('/records').withConverter(DiaryRecordDataConverter) as firebase.firestore.CollectionReference<DiaryRecordData>;
  }

  getConfig(userId: string) {
    return this.userRoot(userId).get().then(doc => doc.data()['configs'] as ConfigData);
  }

}
