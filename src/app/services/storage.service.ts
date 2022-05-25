import { Injectable } from '@angular/core';
import { User } from '../models/user';

const USERKEY="user-key";
@Injectable({
  providedIn: 'root'
})
export class StorageService {


  constructor() { }

  saveUser(user:User){
    localStorage.setItem(USERKEY,JSON.stringify(user));
  }
  removeUser(){
    localStorage.removeItem(USERKEY);
  }
  getUser():User|null{
    const user=localStorage.getItem(USERKEY);
    return user?JSON.parse(user):null;
  }
}