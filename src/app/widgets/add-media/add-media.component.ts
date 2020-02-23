import { Component, OnInit } from '@angular/core';
import { FileTypes } from '../../constants/constants'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AddMediaService } from '../../services/add-media.service';
import { MediaFile } from '../../models/MediaFile';
import { IMediaFile } from '../../models/IMediaFile';
import { DataService } from '../../services/data.service';
import { IUser } from '../../models/IUser';
import { Router } from "@angular/router";
import { ServerResponseTemplate } from '../../models/ServerResponseTemplate';
import { NotificationService } from '../../util/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-add-media',
  templateUrl: './add-media.component.html',
  styleUrls: ['./add-media.component.scss']
})
export class AddMediaComponent implements OnInit {

  FileTypes;
  private mediaAddForm: FormGroup;
  private selectedFileType = 'Audio';
  fileSize: string = '';
  logged: boolean = false;

  constructor(private fb: FormBuilder, private addMediaService:AddMediaService, private dataService: DataService, 
    private router: Router, private notif: NotificationService, private ngxLoader: NgxUiLoaderService) { 
    this.mediaAddForm = fb.group({
      'mediaName': [null, Validators.required],
      'mediaPath': [null, Validators.required],
      'uploadedFile': [null, Validators.required] 
    });
  }

  ngOnInit() {
    if (this.dataService.getUser() != null) {
      this.logged = true;
    } else {
      this.logged = false;
      this.router.navigate(['../login']);
    }
    this.FileTypes = FileTypes;
  }
  
  async uploadFile(formVal:any){
    try {
      this.ngxLoader.start();
      const response = await this.addMediaService.addNewFile(this.prepareData(formVal)) as ServerResponseTemplate ;
      this.ngxLoader.stop();
      if(response.ack === true){
        this.notif.showSuccessNotification(response.message);
      } else {
        this.notif.showWarningNotification(response.message);
        this.notif.showWarningNotification(response.message);
      }
    }catch(err){
      this.ngxLoader.stop();
      this.notif.showErrorgNotification(err);
    }
  }

  getType($event){
    this.selectedFileType = $event.target.value;
  }

  onFileChange($event) {
    console.log('Upload event detected');
    if ($event != null) {
        //  file <- uploadedFile
        const file = $event.target.files[0];
        //  set file value
        console.log(file);
        this.mediaAddForm.controls['uploadedFile'].setValue(file);
        this.fileSize = (file.size/1024).toFixed(1) + " KB"
    } else {
        // for validation purposes
        this.mediaAddForm.controls['uploadedFile'].setValue('');
    }
}


prepareData(formVal:any){
  let mediaFile = new IMediaFile();
  mediaFile.fileName = formVal.mediaName;
  mediaFile.fileType = this.selectedFileType;
  mediaFile.path = formVal.mediaPath;
  mediaFile.size = this.fileSize;
  mediaFile.ownerId = this.dataService.getUser().id;
  mediaFile.file = formVal.uploadedFile;
  mediaFile.date = formVal.uploadedFile.lastModified;
  mediaFile.setFormat(formVal.uploadedFile.type);
  
  return mediaFile;
}

}
