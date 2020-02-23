import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { UserProfileService } from '../../services/user-profile.service';
import { IUser } from '../../models/IUser';
import { User } from '../../models/User';
import { Router } from "@angular/router";
import { ServerResponseTemplate } from '../../models/ServerResponseTemplate';
import { NotificationService } from '../../util/notification.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loggedUser: IUser = new IUser();
  tempUser: IUser = new IUser();
  user: string = '';
  validity: boolean;
  logged: boolean = false;
  existingAccounts = [];
  existingUsernames = [];
  existingEmails = [];


  constructor(private userProfileService: UserProfileService, private dataService: DataService,
    private router: Router, private notif: NotificationService, private ngxLoader: NgxUiLoaderService,
    private authService: AuthService) { }

  ngOnInit() {
    if (this.dataService.getUser() != null) {
      this.logged = true;
      this.getUserDetails(this.dataService.getUser());
      this.getUsers();
      this.validity = true;
    } else {
      this.logged = false;
      this.router.navigate(['../login']);
    }
  }

  async getUserDetails(user: IUser) {
    try {
      this.ngxLoader.start();
      const userDetails = await this.userProfileService.getUserDetails(user) as IUser;
      this.ngxLoader.stop();
      this.tempUser = new User(userDetails[0]);
      this.loggedUser = new User(userDetails[0]);
    } catch (err) {
      this.ngxLoader.stop();
      this.notif.showErrorgNotification(err.message);
    }
  }

  async changeUserDetails() {
    try {
      this.ngxLoader.start();
      const response = await this.userProfileService.updateUser(this.tempUser) as ServerResponseTemplate;
      this.ngxLoader.stop();
      this.getUsers();
      this.dataService.changeUser(this.tempUser);
      if (response.ack == true) {
        this.notif.showSuccessNotification(response.message);
        this.loggedUser.email = this.tempUser.email;
        this.loggedUser.username = this.tempUser.username;
      } else {
        this.notif.showWarningNotification(response.message);
      }


      // location.reload();
    } catch (err) {
      this.ngxLoader.stop();
      this.notif.showErrorgNotification(err.message);
    }

  }
  usernameCheck() {
    this.checkDifference();
    for (let i = 0; i < this.existingUsernames.length; i++) {
      if (this.existingUsernames[i] === this.tempUser.username) {
        this.notif.showWarningNotification("Username already exists");
        this.validity = true;
        return;
      }
    }
  }

  emailCheck() {
    this.checkDifference();
    for (let i = 0; i < this.existingEmails.length; i++) {
      if (this.existingEmails[i] === this.tempUser.email) {
        this.notif.showWarningNotification("Email already exists!");

        this.validity = true;
        return;
      }
    }
  }

  async getUsers() {
    try {
      this.ngxLoader.start();
      this.existingAccounts = await this.authService.getUsers() as IUser[];
      this.ngxLoader.stop();
      this.existingUsernames = [];
      this.existingEmails = [];
      for (let account of this.existingAccounts) {
        this.existingUsernames.push(account.username);
        this.existingEmails.push(account.email);
      }
    }
    catch (err) {
      this.ngxLoader.stop();

      this.notif.showErrorgNotification(err.message);
    }

  }

  // detectChange() {
  //   this.checkDifference();
  // }

  checkDifference() {

    if (this.tempUser.username === undefined || this.tempUser.username === '') {
      this.validity = true;
    }
    else if (this.tempUser.email === undefined || this.tempUser.email === '') {
      this.validity = true;
    }
    else if (this.loggedUser.email === this.tempUser.email && this.loggedUser.username === this.tempUser.username) {
      this.validity = true;

    }
    else {
      this.validity = false;
    }
  }

}
