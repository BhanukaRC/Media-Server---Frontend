import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import { Observable} from 'rxjs';
import {IUser} from '../models/IUser';
import { IMediaFile } from '../models/IMediaFile';
import { MediaFile } from '../models/MediaFile';

@Injectable({
  providedIn: 'root'
})
export class AddMediaService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
}

async addNewFile(mediaFile: IMediaFile): Promise<any> {
  let url = 'media';
  const formData = new FormData();
  console.log(mediaFile);
  formData.append('details', JSON.stringify(mediaFile));
  formData.append('file', mediaFile.file);
  return await this.postWithFormData<any>(url, formData);
}





}
