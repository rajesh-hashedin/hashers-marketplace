import { DB_NAME } from '../constants/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DBService {
  setData(collectionName: string, data: any) {
    const allData = this.getAllData();
    allData[collectionName].push(data);
    this.setAllData(allData);
  }
  getData(collectionName: string) {
    const data = this.getAllData();
    return data[collectionName];
  }
  getAllData() {
    return JSON.parse(localStorage.getItem(DB_NAME) || '{}');
  }
  setAllData(data: any) {
    localStorage.setItem(DB_NAME, JSON.stringify(data));
  }
}
