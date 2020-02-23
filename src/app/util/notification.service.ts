import { Injectable, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class NotificationService implements OnInit{

  constructor(private toastr: ToastrService) { }

  ngOnInit(){}

  showSuccessNotification(message:string){
    this.toastr.info('<span class="now-ui-icons ui-1_bell-53"></span>' +  message, 'Success Notification', {
      timeOut: 5000,
      closeButton: true,
      enableHtml: true,
      toastClass: "alert alert-success alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'right'
    });
  }

  showErrorgNotification(message:string){
    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>' + message, 'Error Notification', {
      timeOut: 8000,
      enableHtml: true,
      closeButton: true,
      toastClass: "alert alert-danger alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'right'
    });
  }

  showWarningNotification(message:string){
    this.toastr.error('<span class="now-ui-icons ui-1_bell-53"></span>' + message, 'Warning Notification', {
      timeOut: 5000,
      enableHtml: true,
      closeButton: true,
      toastClass: "alert alert-warning alert-with-icon",
      positionClass: 'toast-' + 'top' + '-' +  'right'
    });
  }
}
