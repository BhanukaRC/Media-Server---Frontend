import { Injectable, OnDestroy } from '@angular/core';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnDestroy{

  ngOnDestroy(){
    this.removeUser();
  }

  constructor() { }

  changeUser(user: IUser) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.setItem('user', null);
    localStorage.removeItem('user');
  }

  getUser(){

    return JSON.parse(localStorage.getItem('user')) as IUser;

  }
}
