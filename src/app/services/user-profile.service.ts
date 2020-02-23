import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';
import { IMediaFile } from '../models/IMediaFile';
import { MediaFile } from '../models/MediaFile';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService extends BaseService {

  constructor(http: HttpClient) {
    super(http);
  }

  updateUser(user: IUser): Promise<any> {
    let url = 'user/update';
    return this.update(url, user);
  }

  getUserDetails(user: IUser): Promise<any> {
    let url = 'user/details';
    return this.post<IUser>(url, user);
  }

}
