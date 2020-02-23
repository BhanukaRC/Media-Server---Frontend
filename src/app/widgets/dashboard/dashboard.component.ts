import { Component, OnInit, OnChanges } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { IMediaFile } from '../../models/IMediaFile';
import { MediaFile } from '../../models/MediaFile';
import { User } from '../../models/User';
import { IUser } from '../../models/IUser';
import { DataService } from '../../services/data.service';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { NgbTypeaheadConfig, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Router } from "@angular/router";
import { ServerResponseTemplate } from '../../models/ServerResponseTemplate';
import { NotificationService } from '../../util/notification.service';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FileTypes } from '../../constants/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [NgbTypeaheadConfig]
})
export class DashboardComponent implements OnInit {

  fileTypes;
  files: IMediaFile[] = [];
  tempFiles: IMediaFile[] = [];
  search: any;
  formatter: any;
  inputText: string;
  logged: boolean = false;
  typeSelect: string;

  constructor(private dashboardService: DashboardService, private dataService: DataService,
    private config: NgbTypeaheadConfig, private router: Router,
    private notif: NotificationService, private ngxLoader: NgxUiLoaderService) {
    // config.showHint = true;
    config.editable = false;
  }

  typeaheadOnSelect(typeAheadObject: NgbTypeaheadSelectItemEvent): void {
    this.tempFiles = [];
    let media = new MediaFile(typeAheadObject);
    console.log(typeAheadObject);
    this.tempFiles.push(media);
    this.typeSelect = null
    console.log(this.tempFiles);
  }

  onChange() {
    this.tempFiles = this.files;
  }

  getType($event) {
    this.tempFiles = this.files;
    if ($event.target.value != null) {
      this.tempFiles = this.tempFiles.filter(item => item.fileType.toLowerCase() == $event.target.value.toLowerCase());
    }
  }

  ngOnInit() {

    this.fileTypes = FileTypes;
    if (this.dataService.getUser() != null) {
      this.logged = true;
    } else {
      this.logged = false;
      this.router.navigate(['../login']);
    }
    this.getFilesOfUser(this.dataService.getUser());
    this.search = (text: Observable<string>) =>
      text.pipe(
        debounceTime(0),
        distinctUntilChanged(),
        map(term => term === '' ? []
          : this.files.filter(v => v.fileName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
      );
    this.formatter = (x: { fileName: string }) => x.fileName;
  }

  async getFilesOfUser(user: User) {
    try {
      this.ngxLoader.start();
      const files = await this.dashboardService.getFilesOfUser(user) as IMediaFile[];
      this.ngxLoader.stop();
      this.files = files;
      console.log(this.files);
      this.tempFiles = files;
    } catch (err) {
      this.ngxLoader.stop();
      this.notif.showErrorgNotification(err.message);
    }
  }

  async download(file: MediaFile) {
    console.log(file);
    file = new MediaFile(file);
    try {
      this.ngxLoader.start();
      const blob = await this.dashboardService.downloadFile(file);
      this.ngxLoader.stop();
      let name = file.fileName + '.' + file.format;
      saveAs(blob, name);
      this.notif.showSuccessNotification("File successfully downloaded");

    } catch (err) {
      this.ngxLoader.stop();

      this.notif.showErrorgNotification(err);
    }
  }

  async delete(file: MediaFile) {
    try {
      this.ngxLoader.start();
      const response = await this.dashboardService.deleteFile(file) as ServerResponseTemplate;
      this.ngxLoader.stop();
      if (response.ack) {
        this.notif.showSuccessNotification(response.message);
        this.getFilesOfUser(this.dataService.getUser());
      } else {
        this.notif.showWarningNotification(response.message);
      }

    } catch (err) {
      this.ngxLoader.stop();
      this.notif.showErrorgNotification(err);
    }

  }


}
