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
export class DashboardService extends BaseService {


  constructor(http: HttpClient) {
    super(http);
  }

  getFilesOfUser(user: IUser): Promise<any> {
    let url = 'media/view';
    return this.post<IUser>(url, user);
  }

  downloadFile(mediaFile: MediaFile): Promise<any> {
    let url = 'media/download';
    let params = new HttpParams().set('id', mediaFile.id);
    params = params.set('ownerId', mediaFile.ownerId);
    return this.download(url, params);
  }

  async deleteFile(mediaFile: MediaFile): Promise<any> {
    let url = 'media/delete';
    return await this.delete<MediaFile>(url, mediaFile);
  }

}
