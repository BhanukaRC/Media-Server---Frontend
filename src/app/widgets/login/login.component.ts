import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IUser } from '../../models/IUser';
import { ServerResponseTemplate } from '../../models/ServerResponseTemplate';

import { Router } from "@angular/router";
import { DataService } from '../../services/data.service';
import { NotificationService } from '../../util/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  users: IUser[] = [];
  loggedUser: IUser = new IUser();

  constructor(private authService: AuthService, private router: Router, private dataService: DataService,
    private notif: NotificationService, private ngxLoader: NgxUiLoaderService) {
  }

  ngOnInit() {
  }

  async authenticateUser(user: IUser) {
    try {
      this.ngxLoader.start();
      const response = await this.authService.authenticateUser(user) as ServerResponseTemplate;
      this.ngxLoader.stop();
      if (response.ack) {
        let temp = user;
        temp.password = "";
        temp.id = response.results;
        this.dataService.changeUser(temp);
        this.router.navigate(['../dashboard']);
      } else {
        this.notif.showWarningNotification("Wrong username or password")
      }
    } catch (err) {
      this.ngxLoader.stop();
      this.notif.showErrorgNotification(err.message);
    }
  }

  getInputs() {
    if (this.checkNull()) {
      this.authenticateUser(this.loggedUser);
    } else {
      this.notif.showErrorgNotification("Invalid inputs!!");
    }
  }

  checkNull() {
    if (this.loggedUser.username === undefined || this.loggedUser.username === '') {
      return false;
    }
    if (this.loggedUser.password === undefined || this.loggedUser.password === '') {
      return false;
    }
    else {
      return true;
    }
  }

}
