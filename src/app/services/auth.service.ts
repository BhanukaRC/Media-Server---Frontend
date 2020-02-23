import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable} from 'rxjs';
import {IUser} from '../models/IUser';
import { IMediaFile } from '../models/IMediaFile';
import { MediaFile } from '../models/MediaFile';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
}

getUsers(): Promise<any>{
  const url = `user`;
  return this.get(url);
}

authenticateUser(user: IUser): Promise<any>{
  let url = `user/login`;
  return this.post<IUser>(url,user);
}


signup(user: IUser): Promise<any>{
  let url = 'user/signup';
  return this.post<IUser>(url, user);
}














}
