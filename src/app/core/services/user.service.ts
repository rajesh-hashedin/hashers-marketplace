import { DB_NAME } from '../constants/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  getLoggedInUser() {
    const data = this.getAllData();
    return data.loggedInUser;
  }
  setLoggedInUser(email: string) {
    const allData = this.getAllData();
    allData.loggedInUser = this.getAllData()['users']?.find(
      (user: any) => user.email === email
    );
    delete allData.loggedInUser.password;
    localStorage.setItem(DB_NAME, JSON.stringify(allData));
  }
  getAllData() {
    return JSON.parse(localStorage.getItem(DB_NAME) || '{}');
  }
}
